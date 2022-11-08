# Marketplace Listing Page - Next.js
![screenshot](./screenshot.png)
This is a simple example of an Marketplace Listing Page. Created using the standard `create-next-app` script.
You can see a deployed version of this template at [https://manifold-nextjs-template-marketplace.vercel.app/](https://manifold-nextjs-template-marketplace.vercel.app/)

## Configuration
Create an a file called `.env.local` in the root of the project. Copy and paste the values from `env.example` into the `.env.local` file and fill those values in with your own. `DATA_NETWORK` is required (`1` for Mainnet and `5` for Goerli) and `DATA_FALLBACK_PROVIDER` is optional if you want people to see your site even if they do not have Metamask installed on their browser.


## Available Scripts
In the project directory, you can run:

`yarn start`
Open http://localhost:3000 to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.

`yarn build`
Builds the app for production.

~+~++~+~+~+~++~+~+~+~++~~++~+
~++~+~++~+~++~+~+~++~+~++~+~++~

# Marketplace Listing Page

<img src="screenshot.png" width="300" />

This is a simple example of an Marketplace Listing Page.

This was created using the standard create-next-app script.

## Configuration
Please make sure you set the NEXT_APP_NETWORK and NEXT_APP_MARKETPLACE_LISTING_ID in the .env or your own .env.local.

## How does it work?
In this example, we are adding a [Connect Widget](https://docs.manifold.xyz/v/manifold-for-developers/resources/widgets/connect-widget) and a [Marketplace Widget](https://docs.manifold.xyz/v/manifold-for-developers/resources/widgets/marketplace-widgets) which will display a marketplace listing.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
