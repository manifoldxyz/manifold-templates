# Squarespace NFT Profile Page

<img src="./images/screenshot.png" width="500" />

This is a simple example of an NFT Profile Page. It contains a way for someone to connect their wallet and view their NFTs.


## Video Guide
https://www.loom.com/share/42b38c54ccc64b00ac8098fd425acc4b

1) https://developer.manifoldxyz.dev/apps -- create an app in dev portal
2) https://docs.manifold.xyz/v/manifold-for-developers/guides/squarespace/simple-squarespace-site -- to get the code to "install"/inject the connect widget
3) https://github.com/manifoldxyz/manifold-templates/tree/main/squarespace/nft_profile_page -- to get the code to configure the connect widget

## Configuration
Please make sure you set the `data-app-name`, `data-client-id` and `data-network` in the index.html file.

## How does it work?
In this example, we are adding a [Connect Widget](https://docs.manifold.xyz/v/manifold-for-developers/resources/widgets/connect-widget), which will allow a user to authenticate to your website.  Once authenticated, your app will have access to a [Data Client](https://docs.manifold.xyz/v/manifold-for-developers/resources/widgets/connect-widget/data-client), which allows you to retrieve information about the user's NFTs.

## Steps
1. Go to the site editor for your website (editor.wix.com) and  click "Add Block" => "Code"<br />
![Squarespace add code block](./images/site-editor-embed-code-menu.png)
2. A component box will appear on your page. Click it and press the edit button. **Copy and paste the following into the box** (make sure to replace the variables found in Configuration):
```
<head>
    <script src="https://connect.manifoldxyz.dev/3.2.1/connect.umd.min.js"></script>
    <link rel="stylesheet" href="https://connect.manifoldxyz.dev/3.2.1/connect.css">
  </head>
<body>
  <script>
    window.addEventListener('m-authenticated', async (event) => {
      // Get the data client instance
      const client = event.detail.client;

      // Get the NFTs owned by the currently connected wallet
      const tokens = await client.getNFTsOfOwner();

      // Create a div element for each token you own
      for (let i = 0; i < tokens.length; i++) {
        const img = document.createElement("img");
        img.src = tokens[i].image;
        img.height = 200;
        img.width = 200;
        document.getElementById("nfts").appendChild(img);
      }
    })
    window.addEventListener('m-unauthenticated', async (event) => {
      document.getElementById("nfts").innerHTML = "";
    })
  </script>
  <div>
    <div
      data-widget="m-connect"
      data-app-name="YOUR-APP-NAME"
      data-client-id="YOUR-CLIENT-ID"
      style="margin-top: 10px; margin-bottom: 10px; display: flex; flex-direction: row; justify-content: center;"
    >
  </div>
  <div id="nfts"></div>
</body>
```
<br/>

![Squarespace Component](./images/site-editor-embed-code-component.png)
