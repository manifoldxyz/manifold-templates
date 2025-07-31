export enum WidgetPropType {
  STRING = "string",
  BOOLEAN = "boolean",
  ENUMERATION = "enumeration",
  INTERFACE = "interface",
  ARRAY = "array",
}

export interface MediaBackgroundConfig {
  /** angle in degrees representing from which direction the gradient (linear/conic) flows */
  // Number
  angle?: WidgetPropDefinition;
  /** string array of colors for the media background */
  // string[]
  colors?: WidgetPropDefinition;
  /** URI to the background image. takes precedence over the background color/gradient */
  // string
  image?: WidgetPropDefinition;
  /** if two or more color values are provided, specifies the type of background */
  // enumeration of "linear" | "conic" | "radial"
  type?: WidgetPropDefinition;
}

interface WidgetPropOptions {
  value: string;
  label: string;
}

interface WidgetThemeDefinition {
  value: string;
  options: WidgetPropOptions[];
}

export interface WidgetPropDefinition {
  name: string;
  type: WidgetPropType;
  value: string | boolean | MediaBackgroundConfig;
  defaultValue: string | boolean | MediaBackgroundConfig;
  options?: WidgetPropOptions[];
  required?: boolean;
  dependentProps?: string[];
}

export interface WidgetDefinition {
  name: string;
  props: { [key: string]: WidgetPropDefinition };
  dataWidget?: string;
  widgetTheme?: WidgetThemeDefinition;
  javascript: string[];
  css: string[];
}
