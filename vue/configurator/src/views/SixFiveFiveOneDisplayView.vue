<template>
  <Configurator :configuration="configuration" />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Configurator, {
  ConfiguratorDefinition,
} from "@/components/Configurator.vue";
import { WidgetPropType } from "@/components/lib/WidgetProps";
import { Widgets } from "@/config/widgetLocations";

@Options({
  components: {
    Configurator,
  },
})
export default class SixFiveFiveOneDisplayView extends Vue {
  configuration?: ConfiguratorDefinition;

  data() {
    return {
      configuration: {
        widgets: [
          {
            ...Widgets.sixFiveFiveOneDisplay,
            name: "6551 Display Widget",
            dataWidget: "m-6551-display-widget",
            props: {
              "data-network": {
                name: "App Network",
                type: WidgetPropType.ENUMERATION,
                value: "5",
                options: [
                  {
                    value: "",
                    label: "None",
                  },
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
                dependentProps: ["data-network"],
              },
              "data-token-id": {
                name: "Token ID",
                type: WidgetPropType.STRING,
                value: "261",
                defaultValue: "",
              },
              "data-token-contract": {
                name: "Token Contract",
                type: WidgetPropType.STRING,
                value: "0x7a77F2cFB02546F217d39157471d5B5914DD7644",
                defaultValue: "",
              },
              "data-implementation": {
                name: "Implementation",
                type: WidgetPropType.STRING,
                value: "0x2d25602551487c3f3354dd80d76d54383a243358",
                defaultValue: "",
              },
              "data-salt": {
                name: "Salt",
                type: WidgetPropType.STRING,
                value: "0",
                defaultValue: "",
              },
              "data-transferrable": {
                name: "Transferrable",
                type: WidgetPropType.BOOLEAN,
                value: true,
                defaultValue: true,
              },
              "data-layout": {
                name: "Layout",
                type: WidgetPropType.ENUMERATION,
                value: "photoalbum",
                options: [
                  {
                    value: "photoalbum",
                    label: "photoalbum",
                  },
                  {
                    value: "backpack",
                    label: "backpack",
                  },
                ],
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
