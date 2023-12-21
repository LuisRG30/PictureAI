import React from 'react';

import axios from 'axios';

import { loadStripe } from '@stripe/stripe-js';

import ServiceCard from '../components/ServiceCard';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);


export default function PreviewPage() {
  const [products, setProducts] = React.useState([]);

  const [image, setImage] = React.useState(null);

  const [faces, setFaces] = React.useState(null);

  React.useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
    }

    const getProducts = async () => {
      const response = await fetch('/api/products');
      const products = await response.json();
      for (const product of products.data) {
        product.selected = false;
      }
      setProducts(products.data);
      console.log(products.data);
    }
    getProducts();  
  }, []);

  React.useEffect(() => {
    if (image) {
      const getFaces = async (image) => {
        const formData = new FormData();
        formData.append('faces', image);
        const response = await axios.post(process.env.NEXT_PUBLIC_FACE_DETECTION_URL, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'mode': 'cors',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          }
        });
        setFaces(response.data.faces);
      }
      getFaces(image);
    }
  }, [image]);

  const sendOrderInfo = async () => {
    const selectedProducts = products.filter(product => product.selected);
    const formData = new FormData();
    formData.append('image', image);
    formData.append('products', JSON.stringify(selectedProducts));
    const response = await axios.post('/api/checkout_sessions', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    const session = await response.data;
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    console.log(error.message);
  }


  return (
    <div>
    {products.map((product, index) => (
      <div
        key={product.id}
        onClick={() => {
          const updatedProducts = [...products];
          updatedProducts[index].selected = !updatedProducts[index].selected;
          setProducts(updatedProducts);
        }}
      >
        <ServiceCard
          key={product.id}
          name={product.name}
          image={product.images[0]}
          selected={product.selected}
        />
      </div>
    ))}
    <hr />
    <input
      type="file"
      name="photo"
      onChange={event => {
        const file = event.target.files[0];
        setImage(file);
      }}
    />
    <b>
      {
        faces === 1 ? 
        'OK' : `There are ${faces} faces in this photo. Please upload a photo with only one face.`
      }
    </b>
    <hr />
    <div>
      <section>
        <button onClick={sendOrderInfo}>
          Checkout
        </button>
      </section>
      <style jsx>
        {`
          section {
            background: #ffffff;
            display: flex;
            flex-direction: column;
            width: 400px;
            height: 112px;
            border-radius: 6px;
            justify-content: space-between;
          }
          button {
            height: 36px;
            background: #556cd6;
            border-radius: 4px;
            color: white;
            border: 0;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
          }
          button:hover {
            opacity: 0.8;
          }
        `}
      </style>
    </div>
    </div>
  );
}