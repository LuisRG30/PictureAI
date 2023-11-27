const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

import { Formidable } from 'formidable';

import { createReadStream } from 'fs';

import { S3 } from 'aws-sdk';

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
      const s3 = new S3({
        region: 'us-east-1',
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      });
      s3.upload({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `images/${session.payment_intent}/${image[0].originalFilename}`,
        Body: image[0].filepath,
      }, (err, data) => {
        if (err) {
          console.log(err);
          throw err;
        }
        console.log(data);
      });
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