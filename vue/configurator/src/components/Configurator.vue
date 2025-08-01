<template>
  <el-container>
    <el-aside width="30%">
      <div v-if="configuration?.sharedProps" class="widget-configuration">
        <h1>Shared Options</h1>
        <el-row v-for="(prop, key) in configuration.sharedProps" :key="key">
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
      </div>
      <div
        class="widget-configuration"
        v-for="(widget, widgetIndex) in configuration?.widgets"
        :key="widgetIndex"
      >
        <h1>{{ widget.name }} Options</h1>
        <el-row>
          <el-col :span="6">Widget Theme</el-col>
          <el-col :span="12">
            <el-select
              v-if="widget.widgetTheme"
              v-model="widget.widgetTheme.value"
              class="m-2"
              placeholder="None"
              size="small"
            >
              <el-option
                v-for="item in widget.widgetTheme.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>
        </el-row>
        <el-row v-for="(prop, key) in widget.props" :key="key">
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
            <!-- data-media-background has a type of JSON string -->
            <el-row
              v-else-if="prop.type === WidgetPropType.INTERFACE"
              class="prop-groupings"
            >
              <el-row v-for="(config, key) in prop.value" :key="key">
                <!-- config needs to be confirmed as an object for it to have properties like 'type' since
                    it can be a string or boolean as defined in WidgetProps.ts -->
                <!-- Placeholder uses "key" instead of config.name because config can be string | boolean | WidgetPropDefiniton -->
                <el-input
                  v-if="
                    typeof config === 'object' &&
                    config?.type === WidgetPropType.STRING
                  "
                  v-model="config.value"
                  class="w-50 m-2"
                  :placeholder="key"
                />
                <div
                  v-else-if="
                    typeof config === 'object' &&
                    config?.type === WidgetPropType.ARRAY
                  "
                >
                  <label> colors example: red, blue </label>
                  <el-input
                    v-model="config.value"
                    class="w-50 m-2"
                    :placeholder="key"
                  />
                </div>
                <el-select
                  v-else-if="
                    typeof config === 'object' &&
                    config?.type === WidgetPropType.ENUMERATION
                  "
                  v-model="config.value"
                  class="m-2"
                  placeholder="None"
                  size="small"
                >
                  <el-option
                    v-for="item in config.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
                <el-checkbox
                  v-else-if="
                    typeof config === 'object' &&
                    config?.type === WidgetPropType.BOOLEAN
                  "
                  v-model="config.value"
                  size="large"
                />
              </el-row>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <div class="code-blocks">
        <h1>Code</h1>
        <h2>Header</h2>
        <div class="div-code">
          <div
            v-for="(widget, widgetIndex) in configuration?.widgets"
            :key="widgetIndex"
          >
            <template v-for="js in widget.javascript">
              {{`
              <script src="${js}"></script>
              ` }}
            </template>
          </div>
          <div
            v-for="(widget, widgetIndex) in configuration?.widgets"
            :key="widgetIndex"
          >
            <template v-for="css in widget.css">
              {{`
              <link ref="stylesheet" href="${css}" />
              ` }}
            </template>
          </div>
        </div>
        <h2>Body</h2>
        <div class="div-code">
          <div
            v-for="(widget, widgetIndex) in configuration?.widgets"
            :key="widgetIndex"
            :id="`div-output-${widgetIndex}`"
          ></div>
        </div>
      </div>
    </el-aside>
    <el-main>
      <div
        v-for="(widget, widgetIndex) in configuration?.widgets"
        :key="widgetIndex"
        :id="`widget-parent-${widgetIndex}`"
      >
        <div
          v-if="widget.dataWidget"
          :id="`widget-${widgetIndex}`"
          :data-widget="widget.dataWidget"
          :class="widget.widgetTheme ? widget.widgetTheme.value : ''"
        ></div>
        <!-- NOTE: don't load the other widgets since we're assuming mutation observer pattern -->
      </div>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import {
  WidgetPropType,
  WidgetDefinition,
  WidgetPropDefinition,
} from "./lib/WidgetProps";
import _ from "lodash";

interface ConfiguratorData {
  WidgetPropType: any;
}

export interface ConfiguratorDefinition {
  widgets: WidgetDefinition[];
  sharedProps?: { [key: string]: WidgetPropDefinition };
}

@Options({
  props: {
    configuration: Object as () => ConfiguratorDefinition,
  },
  watch: {
    configuration: {
      handler: _.debounce(function (newData: ConfiguratorDefinition) {
        let networkProp;
        let propsMissing = false;
        for (let index = 0; index < newData.widgets.length; index++) {
          const widget = newData.widgets[index];
          // Clear current widget
          const parentElement = document.getElementById(
            `widget-parent-${index}`
          );
          if (!parentElement) {
            continue;
          }
          const element =
            parentElement.firstElementChild || document.createElement("div");
          element.id = `widget-${index}`;
          if (
            widget.dataWidget &&
            (element as HTMLElement).dataset?.widget !== widget.dataWidget
          ) {
            element.setAttribute("data-widget", widget.dataWidget);
          }

          // Validate props
          for (const propKey in widget.props) {
            const prop = widget.props[propKey];
            if (propKey === "data-network") networkProp = prop;
            // Check required props
            if (prop.required && !prop.value) {
              propsMissing = true;
              continue;
            }
            // Check dependent props
            if (prop.value && prop.dependentProps) {
              for (const dependentPropKey of prop.dependentProps) {
                if (!widget.props[dependentPropKey].value) {
                  propsMissing = true;
                  continue;
                }
              }
            }
          }
          // If no props missing, populate attributes
          if (!propsMissing) {
            for (const propKey in widget.props) {
              const prop = widget.props[propKey];
              let value = prop.value;
              if (prop.type === WidgetPropType.STRING) {
                value = value.toString().trim();
              }
              // If prop is an JSON object, extact the value to use to populate the attribute.
              // Convert the object to a JSON string object as defined
              // https://docs.manifold.xyz/v/manifold-for-developers/resources/widgets/marketplace-widgets/widgets/data-attributes#data-media-background
              if (prop.type === WidgetPropType.INTERFACE) {
                const propObjectValue = Object.fromEntries(
                  Object.entries(value).map(([k, v]) => {
                    if (v.type === WidgetPropType.ARRAY) {
                      // Splitting colors given into an array of colors. If user ends string with a "," the empty element is removed
                      // Make sure to not split by commas that are contained in RGB(A)/HSL(A) CSS values.
                      return [
                        k,
                        v.value.includes("rgb") || v.value.includes("hsl")
                          ? v.value.split(/,(?![^()]*\))/)
                          : v.value.endsWith(",")
                          ? v.value.slice(0, -1).split(",")
                          : v.value.split(","),
                      ];
                    }
                    return [k, v.value];
                  })
                );
                value = JSON.stringify(propObjectValue);
              }
              if (value !== prop.defaultValue) {
                // only change if it's different
                if (value !== element.getAttribute(propKey)) {
                  element.setAttribute(propKey, value.toString());
                }
              } else {
                element.removeAttribute(propKey);
              }
            }
            // Update shared props
            for (const propKey in newData.sharedProps) {
              const prop = newData.sharedProps[propKey];
              if (propKey === "data-network") networkProp = prop;
              let value = prop.value;
              if (prop.type === WidgetPropType.STRING) {
                value = value.toString().trim();
              }
              if (value !== prop.defaultValue) {
                // only change if it's different
                if (value !== element.getAttribute(propKey)) {
                  element.setAttribute(propKey, value.toString());
                }
              } else {
                element.removeAttribute(propKey);
              }
            }
            // NOTE: using mutation observers; mount element only after data-widget is set so that attribute observer
            // correctly picks up on the node
            if (!parentElement.firstElementChild) {
              parentElement.appendChild(element);
            }
          }

          // Set div output text
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          this.updateDivOutput();
        }

        // Clear ManifoldEthereumProvider network value directly otherwise it cannot be reinitialized
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.ManifoldEthereumProvider._network = networkProp?.value
          ? parseInt(networkProp.value.toString())
          : undefined;

        // Trigger widget refresh if no props missing
        window.dispatchEvent(new Event("m-refresh-widgets"));
      }, 500),
      deep: true,
    },
  },
})
export default class Configurator extends Vue {
  configuration?: ConfiguratorDefinition;
  WidgetPropType = WidgetPropType;

  mounted(): void {
    // Add script an link
    for (const widget of this.configuration!.widgets) {
      // for each string in widget.javascript array
      for (let i = 0; i < widget.javascript.length; i++) {
        const js = widget.javascript[i];
        const script = document.createElement("script");
        script.setAttribute("src", js);
        document.head.appendChild(script);
      }

      for (let i = 0; i < widget.css.length; i++) {
        const css = widget.css[i];
        const link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", css);
        document.head.append(link);
      }
    }
    this.updateDivOutput();
  }

  /**
   * updates the text of the output div
   */
  updateDivOutput(): void {
    if (!this.configuration) return;
    for (let index = 0; index < this.configuration.widgets.length; index++) {
      const parentElement = document.getElementById(`widget-parent-${index}`);
      const outputDiv = document.getElementById(`div-output-${index}`);
      if (!parentElement || !outputDiv) {
        continue;
      }
      let element = parentElement.firstElementChild;
      if (element) {
        // clone the element to only get the tag HTML without the children
        element = element.cloneNode(false) as HTMLElement;
        // Set div output text
        outputDiv.innerText =
          element.outerHTML
            .replace(/id="[a-zA-Z0-9-]*" ?/, "")
            .replaceAll(/data-v-[a-z0-9]*="" ?/g, "")
            .replace(" >", ">")
            .replaceAll("  ", " ") ?? "";
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-container h1 {
  margin-top: 20px;
  margin-bottom: 10px;
}
.prop-groupings {
  align-items: center;
  border-color: lightgrey;
  border-style: solid;
  border-width: thin;
  border-radius: 5px;
  height: 150px;
  width: 250px;
}
.code-blocks {
  text-align: left;
}
.code-blocks h1 {
  margin-top: 20px;
  margin-bottom: 10px;
}
.code-blocks h2 {
  margin-top: 5px;
}
.widget-configuration {
  text-align: left;
}
.div-code {
  background-color: #eee;
  border: 1px solid #999;
  display: block;
  padding: 10px;
  text-align: left;
  word-wrap: break-word;
  overflow: auto;
}
label {
  font-size: 12px;
  margin-bottom: 20px;
  color: rgba(97, 91, 91, 0.521);
}
</style>
