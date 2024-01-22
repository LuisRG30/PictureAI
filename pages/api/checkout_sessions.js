const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

import { Formidable } from 'formidable';

import { createReadStream } from 'fs';

import S3 from '../../cloud/s3';
import Dynamo from '../../cloud/dynamo';

export const config = {
  api: {
    bodyParser: false
  }
}

export default async function handler(req, res) {

  if (req.method === 'POST') {
    try {
      const data = await new Promise((resolve, reject) => {
        const form = new Formidable();
        form.parse(req, (err, fields, files) => {
          if (err) {
            console.log(err);
            reject({ err })
          }
          resolve({ err, fields, files })
        }) 
      });
      const products  = JSON.parse(data.fields.products);
      const image = data.files.image;
      const gender = data.fields.gender;
      const hairColors = JSON.parse(data.fields.hairColors);
      const varyFacialHair = JSON.parse(data.fields.varyFacialHair);
      const session = await stripe.checkout.sessions.create({
        line_items: products.map(product => {
          return {
            price: product.default_price,
            quantity: 1,
          }
        }),
        mode: 'payment',
        allow_promotion_codes: true,
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      });
      
      const s3 = new S3();
      await s3.upload({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `images/${session.payment_intent}/${image[0].originalFilename}`,
        Body: createReadStream(image[0].filepath),
      });
      const dynamo = new Dynamo(process.env.AWS_REGION)
      console.log('HERE IS THE GENDER', gender)
      console.log('HERE ARE THE HAIR COLORS', hairColors)
      console.log('HERE IS THE VARY FACIAL HAIR', varyFacialHair)
      const params = {
        TableName: 'customers',
        Item: {
          'paymentIntentId': { S: session.payment_intent },
          'pricesBeforeCheckout': {
            L: products.map(product => {
              return {
                S: product.default_price
              }
            })
          },
          'session': { S: session.id },
          'preferences': { M: {}},
        }
      };
      dynamo.put(params);
      res.status(200).json(session);
    } catch (err) {
      console.log(err);
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    console.log('Method not allowed');
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}