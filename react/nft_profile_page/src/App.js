import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [nfts, setNfts] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);

  window.addEventListener('m-authenticated', async (event) => {
    // Get the data client instance
    const client = event.detail.client;

    // Get the NFTs owned by the currently connected wallet filtered by
    // the Forgotten Runes NFT contract address
    setNfts(await client.getNFTsOfOwner());
    setAuthenticated(true);
  })
  window.addEventListener('m-unauthenticated', async (event) => {
    setNfts([]);
    setAuthenticated(false);
  })
  return (
    <div className="App">
      <div>
        <div
          data-widget="m-connect"
          data-app-name={process.env.REACT_APP_MANIFOLD_APP_NAME}
          data-client-id={process.env.REACT_APP_MANIFOLD_CLIENT_ID}
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
    </div>
  );
}

export default App;
