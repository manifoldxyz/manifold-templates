<template>
  <div class="profile">
    <div
      id="manifold-connect"
      data-widget="m-connect"
      :data-app-name="appName"
      :data-client-id="clientId"
      :data-network="network"
    >
    </div>
    <h2 v-if="authenticated">Your NFTs</h2>
    <div id="nfts">
      <img v-for="nft in nfts" v-bind:key="`${nft.tokenId}-${nft.contractAddress}`" :src="nft.image" height="200" width="200"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfilePage',
  props: {
  },
  data: function() {
    return {
      nfts: [],
      authenticated: false,
      appName: process.env.VUE_APP_MANIFOLD_APP_NAME,
      clientId: process.env.VUE_APP_MANIFOLD_CLIENT_ID,
      network: process.env.VUE_APP_NETWORK,
    };
  },
  created: function() {
    window.addEventListener('m-authenticated', async (event) => {
      // Get the data client instance
      const client = event.detail.client;

      // Get the NFTs owned by the currently connected wallet
      // Data client API's can be found here: https://docs.manifold.xyz/v/manifold-for-developers/client-widgets/connect-widget/data-client-apis
      this.nfts = (await client.getNFTsOfOwner());
      this.authenticated = true;
    })
    window.addEventListener('m-unauthenticated', async () => {
      this.nfts = [];
      this.authenticated = false;
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#manifold-connect {
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
