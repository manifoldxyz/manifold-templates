# How to install connect-widget in Wix

## Prerequisites
1. Create a Site on Wix. Then upgrade it to a paid plan & connect a domain.
2. Make sure you have completed the install for connect-widget onto your wix site. If you have not done so please follow the instructions [here](https://github.com/manifoldxyz/manifold-templates/tree/main/connect-widget/wix)

## Steps
1. Start at the site editor for your website (editor.wix.com) then in the menu click "Add Elements" => "Embeded Code" => "Custom element"
![Wix add custom element](./images/site-editor-embed-code-menu.png)
2. A component with a grey inner box will appear on your page. Click the grey box select "Choose Source" in the Element Settings menu. Select **"Server URL"** and paste this URL into the box:
```
https://marketplace.manifoldxyz.dev/wix/wix-marketplace.js
```
also make sure to set the **"Tag Name"** to 
```
manifold-marketplace-widget
```
It should look like this: <br />
![source](./images/marketplace-widget-source.png) <br />

3. On the custom element click "Set Attributes" => "Set Attributes". For Attribute Name enter in the 3 following attributes:
```
data-widget  :  m-layout-complete-listing
data-id  :  {whatever listingId you want to display}
data-network  :  {1 for Ethereum Mainnet or 5 for Goerli}
```
then click "Set". It should look like this: <br />
![attributes](./images/marketplace-widget-attribute.png) <br />
4. Now on your site click "Save" and then "Publish" to make your changes live. Congratulations you should have a mareketplace-widget installed that allows users to bid on a listing directly within your site! <br />
![connect-widget](./images/success.png)