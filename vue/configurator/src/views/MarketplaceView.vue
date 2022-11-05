<template>
  <Configurator :configuration="configuration" />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Configurator, {
  ConfiguratorDefinition,
} from "@/components/Configurator.vue";
import { WidgetPropType } from "@/components/lib/WidgetProps";

interface MarketplaceConfiguration {
  configuration: ConfiguratorDefinition;
}

@Options({
  components: {
    Configurator,
  },
})
export default class MarketplaceView extends Vue {
  data(): MarketplaceConfiguration {
    return {
      configuration: {
        sharedProps: {
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
          },
          "data-fallback-provider": {
            name: "Fallback Provider",
            type: WidgetPropType.STRING,
            value: "",
            defaultValue: "",
          },
        },
        widgets: [
          {
            name: "Connect Widget",
            dataWidget: "m-connect",
            javascript: "https://connect.manifoldxyz.dev/latest/connect.umd.js",
            css: "https://connect.manifoldxyz.dev/latest/connect.css",
            props: {
              "data-delay-auth": {
                name: "Delay Authentication",
                type: WidgetPropType.BOOLEAN,
                value: true,
                defaultValue: false,
              },
            },
          },
          {
            name: "Marketplace Widget",
            javascript:
              "https://marketplace.manifoldxyz.dev/latest/marketplace.umd.js",
            css: "https://marketplace.manifoldxyz.dev/latest/marketplace.css",
            props: {
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
            },
          },
        ],
      },
    };
  }
}
</script>
