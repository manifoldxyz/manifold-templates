<template>
  <ConnectConfigurator />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ConnectConfigurator from "@/components/ConnectConfigurator.vue"; // @ is an alias to /src

@Options({
  components: {
    ConnectConfigurator,
  },
})
export default class ConnectView extends Vue {}
</script>
