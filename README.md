# VisageVerse Image Generator Full Stack Minimal Application

The VisageVerse minimal application aims to deliver the following functionallity:
1. Provide a home page with the description of the service with some examples. (Located at / route).
2. A page with the product catalog of individual images where user can select a number of products in their order. Includes a filter to select a gender (male/female/all) and to show only those images. It also includes a small form to specify preferences about the images. If male is selected then the formulary is: exclude bald?, vary facial hair?, and possible hair colors. If female is selected, then: possible hair colors. (Located at /images route)
3. A page where the mystery boxes are offered, with the same form mentioned in 2., including "select gender" for the images in the mystery box. (Located at /mystery-boxes route)
4. A page within the single page application where after selecting the products, it shows a bar or modal with a summary of the selected products and the price. In the center of this page, there is a widget to upload a single picture of the user himself, all this in the context of the single page application (also at the / route).
5. A confirmation page that is displayed after redirection from Stripe at the moment of a successfull or unsuccessful purchase. It tells the user the status of the charge operation (could be displayed at / or another route like /confirmation).
6. A delivery page, where after gaining access to a link via email, our users can retrieve the pictures they have paid for. A zip file is automatically downloaded, the pictures displayed on screen with animations for the most important pictures that came out of the user's order -decided by product tier hierarchy.
   Animation:
   A mystery box opening while drum rolls or any music plays that builds up hype.
   Once opened, claps or victory music plays and animation shows one of the top tier images in the box covering most of the screen.
   Top tier image fades out and all images are displayed as thumbnails, ordered by tier.
   Images have a color glow depending on its tier.
   Legendary: orange
   Epic: purple
   Rare: blue
   Common: No glow
   When hover on images, image name shows

   Animation reference: FIFA packs https://www.youtube.com/watch?v=fPrTSA1ULso
   Clash royale chests https://www.youtube.com/watch?v=h75wpfiPaaI
8. A privacy policy and terms and conditions page that tells the user about our data managemenr within the app.



## Running the sample (with stripe webhooks)

### Development

1. Build the application
~~~shell
$ yarn add
~~~

2. _Optional_: download and run the [Stripe CLI](https://stripe.com/docs/stripe-cli)
~~~shell
$ stripe listen --forward-to localhost:3000/api/webhooks
~~~

3. Run the application
~~~shell
$ yarn dev
~~~

4. Go to [localhost:3000](http://localhost:3000)

Notice commands can be run all alone and environment variables are really set in the code intended to be read from a .env file.


## Functional Details

### Catalog

Catalog is loaded from Stripe and has images rendered already. The idea here is to simply make UI changes without altering state management (which is very simple). A "products" state variable is initialized as an empty list and gets the products Stripe and gives them the "selected" attribute set to false by default. Mapping products to html/react elements allows us to show the products in whatever order needed. There are also meta tags that help in ordering the products -mainly in ordering them by tiers. Modify rendering and ordering.

### Image upload

There is a form component with button and drag n drop to upload the image. Then there comes a response from an api service which verifies there is a single detectable face present in the image. Enabling next steps depends on the result of this operation coming as an integer equal to 1 (which is the expected number of faces in the image). Happy path is to enable the user to go to the next action "Proceed to checkout". If face validation is different from 1, then display a message to the user; if there is an error with the api call, fail silently and allow the user to proceed at their own risk. The api service is already integrated and has a sample on how to render results to the user. Modify image upload widget and conform to the current backend implementation.

### Redirect to Stripe

Clicking the "proceed to checkout" or similar button automatically redirects the user to stripe and finishes the first part of the exprience. Simply modify the button UI/UX.

### Confirm Stripe operation

Stripe redirects back to our website after a finished operation. Now it redirects to the same / page, but this is flexible and we can have a /confirmation page. That page should render the confirmation status in a pleasent and clear way for our users.

### Download images

After clicking a link on their email (handled by backend) the user lands on the /fullfilment/[pi] page where there is an "images" variable that has all the data for the images the user got including names for the products corresponding to such images, the image links and metadata regarding the product tiers. Here we need to show the products to the user, make each image available for download individually, and have a button for downlaod all. The download all functionality is already coded in: a zip file with all the images is download in page load. Simply make the "download all" button replay that action. 

## Environment Variables

The required environment variables to be placed in a .env file in the root of the proyect are:
1. NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
2. STRIPE_SECRET_KEY
3. STRIPE_WEBHOOK_SECRET
4. AWS_S3_BUCKET_NAME
5. AWS_ACCESS_KEY_ID
6. AWS_SECRET_ACCESS_KEY
7. AWS_SQS_URL
8. NEXT_PUBLIC_FACE_DETECTION_URI

All variables will be provided by codes owners for local development purposes and will be ready with sample data where necessary.
