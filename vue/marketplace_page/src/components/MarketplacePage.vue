<template>
  <div class="listing">
    <div
      id="manifold-connect"
      data-widget="m-connect"
      data-delay-auth="true"
      :data-network="network"
    />
    <div
      id="marketplace-listing"
      data-widget="m-layout-complete-listing"
      :data-id="listingId"
      :data-network="network"
    />
  </div>
</template>

<script>
export default {
  name: 'MarketplacePage',
  props: {
  },
  data: function() {
    return {
      listingId: process.env.VUE_APP_MARKETPLACE_LISTING_ID,
      network: process.env.VUE_APP_NETWORK,
    };
  },
}
</script>

<style scoped>
#manifold-connect {
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

#marketplace-listing {
  grid-template-rows: 40vh auto;
}
</style>
