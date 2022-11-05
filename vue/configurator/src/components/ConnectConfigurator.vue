<template>
  <el-container>
    <el-aside width="20%">
      <el-row v-for="(prop, key) in widgetProps" :key="key">
        <el-col :span="6">{{ prop.name }}</el-col>
        <el-col :span="12">
          <el-input
            v-if="prop.type === WidgetPropType.STRING"
            v-model="prop.value"
            class="w-50 m-2"
            :placeholder="prop.name"
          />
          <el-select
            v-else-if="prop.type === WidgetPropType.ENUMERATION"
            v-model="prop.value"
            class="m-2"
            placeholder="None"
            size="small"
          >
            <el-option
              v-for="item in prop.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-checkbox
            v-else-if="prop.type === WidgetPropType.BOOLEAN"
            v-model="prop.value"
            size="large"
          />
        </el-col>
      </el-row>
      <div id="div-output"></div>
    </el-aside>
    <el-main>
      <div id="manifold-connect" data-widget="m-connect"></div>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { WidgetPropType, WidgetPropDefinition } from "./lib/WidgetProps";
import _ from "lodash";

interface ConfiguratorData {
  WidgetPropType: any;
  widgetDiv: string;
  widgetProps: { [key: string]: WidgetPropDefinition };
}

@Options({
  props: {},
  watch: {
    widgetProps: {
      handler: _.debounce(function (newData: {
        [key: string]: WidgetPropDefinition;
      }) {
        // Clear current connect widget
        const element = document.getElementById("manifold-connect")!;
        // Clear ManifoldEthereumProvider network value directly otherwise it cannot be reinitialized
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.ManifoldEthereumProvider._network = undefined;
        element.innerHTML = "";
        // Set v-node to undefined so it reloads
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        element._vnode = undefined;
        for (const propKey in newData) {
          const prop = newData[propKey];
          let value = prop.value;
          if (prop.type === WidgetPropType.STRING) {
            value = value.toString().trim();
          }
          if (value !== prop.defaultValue) {
            element.setAttribute(propKey, value.toString());
          } else {
            element.removeAttribute(propKey);
          }
        }
        document.getElementById("div-output")!.innerText = element.outerHTML
          .replace(/id="[a-zA-Z0-9-]*" ?/, "")
          .replaceAll(/data-v-[a-z0-9]*="" ?/g, "");
        window.dispatchEvent(new Event("m-refresh-widgets"));
      },
      500),
      deep: true,
    },
  },
})
export default class ConnectConfigurator extends Vue {
  data(): ConfiguratorData {
    return {
      WidgetPropType,
      widgetDiv: '<div data-widget="m-connect">',
      widgetProps: {
        "data-app-name": {
          name: "App Name",
          type: WidgetPropType.STRING,
          value: "",
          defaultValue: "",
        },
        "data-client-id": {
          name: "App Client Id",
          type: WidgetPropType.STRING,
          value: "",
          defaultValue: "",
        },
        "data-network": {
          name: "App Network",
          type: WidgetPropType.ENUMERATION,
          value: "",
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
        },
        "data-multi": {
          name: "Wallet Connect",
          type: WidgetPropType.BOOLEAN,
          value: false,
          defaultValue: false,
        },
        "data-delay-auth": {
          name: "Delay Authentication",
          type: WidgetPropType.BOOLEAN,
          value: false,
          defaultValue: false,
        },
        "data-show-chain": {
          name: "Show Chain",
          type: WidgetPropType.BOOLEAN,
          value: false,
          defaultValue: false,
        },
        "data-show-balance": {
          name: "Show Balance",
          type: WidgetPropType.BOOLEAN,
          value: false,
          defaultValue: false,
        },
        "data-grant-type": {
          name: "Grant Type",
          type: WidgetPropType.ENUMERATION,
          value: "",
          options: [
            {
              value: "",
              label: "Signature",
            },
            {
              value: "token",
              label: "Token",
            },
          ],
          defaultValue: "",
        },
        "data-avatar": {
          name: "Show Avatar",
          type: WidgetPropType.BOOLEAN,
          value: false,
          defaultValue: false,
        },
        "data-minimal": {
          name: "Minimal Widget",
          type: WidgetPropType.BOOLEAN,
          value: false,
          defaultValue: false,
        },
        "data-override-connect-text": {
          name: "Button Text",
          type: WidgetPropType.STRING,
          value: "",
          defaultValue: "",
        },
        "data-connect-wallet-image": {
          name: "Button Image",
          type: WidgetPropType.STRING,
          value: "",
          defaultValue: "",
        },
      },
    };
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-row {
  margin-right: 100px;
}
</style>
