# VisageVerse Image Generator Full Stack Minimal Application

The VisageVerse minimal application aims to deliver the following functionallity:
1. Provide a home page with a product catalog where user can select a number of products in their order. (Located at / route).
2. A page within the single page application where after selecting the products, it shows a bar or modal with a summary of the selected products and the price. In the center of this page, there is a widget to upload a single picture of the user himself, all this in the context of the single page application (also at the / route).
3. A confirmation page that is displayed after redirection from Stripe at the moment of a successfull or unsuccessful purchase. It tells the user the status of the charge operation (could be displayed at / or another route like /confirmation).
4. A delivery page, where after gaining access to a link via email, our users can retrieve the pictures they have paid for. A zip file is automatically downloaded, the pictures displayed on screen with animations for the most important pictures that came out of the user's order -decided by product tier hierarchy.
5. A privacy policy and terms and conditions page that tells the user about our data managemenr within the app.



## Running the sample (with stripe webhooks)

### Development

1. Build the application
~~~shell
$ npm install
~~~

2. _Optional_: download and run the [Stripe CLI](https://stripe.com/docs/stripe-cli)
~~~shell
$ stripe listen --forward-to localhost:3000/api/webhooks
~~~

3. Run the application
~~~shell
$ STRIPE_WEBHOOK_SECRET=$(stripe listen --print-secret) npm run dev
~~~

4. Go to [localhost:3000](http://localhost:3000)

Notice commands can be run all alone and environment variables are really set in the code intended to be read from a .env file.

