<template>
  <Configurator :widgetProps="widgetProps" :addConnectWidget="true" />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Configurator from "@/components/Configurator.vue"; // @ is an alias to /src
import {
  WidgetPropType,
  WidgetPropDefinition,
} from "@/components/lib/WidgetProps";

interface ConfiguratorData {
  widgetProps: { [key: string]: WidgetPropDefinition };
}

@Options({
  components: {
    Configurator,
  },
})
export default class MarketplaceView extends Vue {
  data(): ConfiguratorData {
    return {
      widgetProps: {
        "data-widget": {
          name: "Widget Type",
          type: WidgetPropType.ENUMERATION,
          value: "",
          options: [
            {
              value: "m-layout-complete-listing",
              label: "Full Listing",
            },
          ],
          defaultValue: "",
        },
        "data-id": {
          name: "Listing Id",
          type: WidgetPropType.STRING,
          value: "",
          defaultValue: "",
        },
        "data-network": {
          name: "Network",
          type: WidgetPropType.ENUMERATION,
          value: "1",
          options: [
            {
              value: "1",
              label: "Ethereum Mainnet",
            },
            {
              value: "5",
              label: "Goerli",
            },
            {
              value: "137",
              label: "Matic",
            },
          ],
          defaultValue: "",
          shared: true,
        },
        "data-fallback-provider": {
          name: "Fallback Provider",
          type: WidgetPropType.STRING,
          value: "",
          defaultValue: "",
          shared: true,
        },
      },
    };
  }
}
</script>
