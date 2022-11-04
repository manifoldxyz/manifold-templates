# NFT Profile Page

<img src="screenshot.png" width="300" />

This is a simple example of an NFT Profile Page. It contains a way for someone to connect their wallet and view their NFTs.

This was created using the standard create-react-app script.

## Configuration
Please make sure you set the VUE_APP_NETWORK, VUE_APP_MANIFOLD_APP_NAME and VUE_APP_MANIFOLD_CLIENT_ID in the .env or your own .env.local.

## How does it work?
In this example, we are adding a [Connect Widget](https://docs.manifold.xyz/v/manifold-for-developers/resources/widgets/connect-widget), which will allow a user to authenticate to your website.  Once authenticated, your app will have access to a [Data Client](https://docs.manifold.xyz/v/manifold-for-developers/resources/widgets/connect-widget/data-client), which allows you to retrieve information about the user's NFTs.

## Available Scripts

### Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
