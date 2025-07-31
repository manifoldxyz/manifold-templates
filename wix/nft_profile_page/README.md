# Wix NFT Profile Page

<img src="./images/screenshot.png" width="300" />

This is a simple example of an NFT Profile Page. It contains a way for someone to connect their wallet and view their NFTs.
See a deployed example on a Wix site [here](https://www.dganphoto.com/about).

## Configuration
Please make sure you set the `data-app-name`, `data-client-id` and `data-network` in the index.html file.

## How does it work?
In this example, we are adding a [Connect Widget](https://docs.manifold.xyz/v/manifold-for-developers/resources/widgets/connect-widget), which will allow a user to authenticate to your website.  Once authenticated, your app will have access to a [Data Client](https://docs.manifold.xyz/v/manifold-for-developers/resources/widgets/connect-widget/data-client), which allows you to retrieve information about the user's NFTs.

## Steps
1. Go to the site editor for your website (editor.wix.com) then in the menu click "Add Elements" => "Embeded Code" => "Custom element" <br />
![Wix add custom element](./images/site-editor-embed-html-menu.png)
2. A component with a grey inner box will appear on your page. Click the grey box and select "Code" and **copy and paste the following into the box** (make sure to replace the variables found in Configuration):
```
<head>
    <script src="https://connect.manifoldxyz.dev/2.2.4/connect.umd.min.js"></script>
    <link rel="stylesheet" href="https://connect.manifoldxyz.dev/2.2.4/connect.css">
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
      data-client-id="YOUR-CLINET-ID"
      style="margin-top: 10px; margin-bottom: 10px; display: flex; flex-direction: row; justify-content: center;"
    >
  </div>
  <div id="nfts"></div>
</body>
```
<br/>

![Wix component](./images/site-editor-embed-html-component.png)
