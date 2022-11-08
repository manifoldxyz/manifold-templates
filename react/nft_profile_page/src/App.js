import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [nfts, setNfts] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);

  window.addEventListener('m-authenticated', async (event) => {
    // Get the data client instance
    const client = event.detail.client;

    // Get the NFTs owned by the currently connected wallet
    // Data client API's can be found here: https://docs.manifold.xyz/v/manifold-for-developers/client-widgets/connect-widget/data-client-apis
    setNfts(await client.getNFTsOfOwner());
    setAuthenticated(true);
  })
  window.addEventListener('m-unauthenticated', async (event) => {
    setNfts([]);
    setAuthenticated(false);
  })
  return (
    <div className="App">
      <div
        data-widget="m-connect"
        data-app-name={process.env.REACT_APP_MANIFOLD_APP_NAME}
        data-client-id={process.env.REACT_APP_MANIFOLD_CLIENT_ID}
        data-network={process.env.REACT_APP_NETWORK}
        data-grant-type={process.env.REACT_APP_GRANT_TYPE}
        style={{
          marginTop: "10px",
          marginBottom: "10px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center"
        }}
      >
      </div>
      {authenticated && <h2>Your NFTs</h2>}
      <div id="nfts">
        {nfts.map((nft) => {
          return (
            <img key={`${nft.tokenId}-${nft.contractAddress}`} src={nft.image} height={200} width={200}></img>
          )
        })}
      </div>
    </div>
  );
}

export default App;
