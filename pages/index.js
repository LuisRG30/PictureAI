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

  const [gender, setGender] = React.useState(null);

  const [hairColors, setHairColors] = React.useState([]);

  const [varyFacialHair, setVaryFacialHair] = React.useState(null);


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
      for (const product of products) {
        product.selected = false;
      }
      console.log(products);
      setProducts(products);
    }
    getProducts();  
  }, []);

  React.useEffect(() => {
    if (image) {
      const getFaces = async (image) => {
        try {
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
      } catch (error) {
        console.log(error);
      }
      }
      getFaces(image);
    }
  }, [image]);

  const sendOrderInfo = async () => {
    const selectedProducts = products.filter(product => product.selected);
    const formData = new FormData();
    formData.append('image', image);
    formData.append('products', JSON.stringify(selectedProducts));
    formData.append('gender', gender);
    formData.append('hairColors', JSON.stringify(hairColors));
    formData.append('varyFacialHair', varyFacialHair);
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

  function toggleSelectHairColor(hairColor) {
    const updatedHairColors = [...hairColors];
    const index = updatedHairColors.indexOf(hairColor);
    if (index > -1) {
      updatedHairColors.splice(index, 1);
    } else {
      updatedHairColors.push(hairColor);
    }
    setHairColors(updatedHairColors);
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
    <h3>Preferences</h3>
    <div>
      <div>
        <p>Choose a prefered gender</p>
        <input type='radio' id='man' name='gender' value='man' onClick={() => setGender('man')} />
        <label for='man'>Man</label>
        <input type='radio' id='woman' name='gender' value='woman' onClick={() => setGender('woman')} />
        <label for='woman'>Woman</label>
        <input type='radio' id='non-binary' name='gender' value='uninon-binary' onClick={() => setGender('non-binary')} />
        <label for='unisex'>Do not specify</label>
      </div>
      <div>
        <p>Choose one or more of these hair colors</p>
        <input type='checkbox' id='blonde' name='hair' value='blonde' onClick={() => toggleSelectHairColor('blonde')} />
        <label for='blonde'>Blonde</label>
        <input type='checkbox' id='brown' name='hair' value='brown' onClick={() => toggleSelectHairColor('brown')} />
        <label for='brown'>Brown</label>
        <input type='checkbox' id='black' name='hair' value='black' onClick={() => toggleSelectHairColor('black')} />
        <label for='black'>Black</label>
        <input type='checkbox' id='red' name='hair' value='red' onClick={() => toggleSelectHairColor('red')} />
        <label for='red'>Red</label>
        <input type='checkbox' id='grey' name='hair' value='grey' onClick={() => toggleSelectHairColor('grey')} />
        <label for='grey'>Grey</label>
        <input type='checkbox' id='white' name='hair' value='white' onClick={() => toggleSelectHairColor('white')} />
        <label for='white'>White</label>
      </div>
      <div>
        <p>Would you like us to create pictures with varied facial hair styles?</p>
        <input type='radio' id='yes' name='facialHair' value={true} onClicks={() => setVaryFacialHair(true)} />
        <label for='yes'>Yes</label>
        <input type='radio' id='no' name='facialHair' value={false} onClick={() => setVaryFacialHair(false)} />
        <label for='no'>No</label>
      </div>
    </div>
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