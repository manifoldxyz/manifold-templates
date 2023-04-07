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
  angle?: WidgetPropType;
  /** string array of colors for the media background */
  // string[]
  colors?: WidgetPropType;
  /** URI to the background image. takes precedence over the background color/gradient */
  // string
  image?: WidgetPropType;
  /** if two or more color values are provided, specifies the type of background */
  // enumeration of "linear" | "conic" | "radial"
  type?: WidgetPropType;
}

interface WidgetPropOptions {
  value: string;
  label: string;
}

export interface WidgetPropDefinition {
  name: string;
  type: WidgetPropType;
  value: string | boolean | number | MediaBackgroundConfig;
  defaultValue: string | boolean;
  options?: WidgetPropOptions[];
  required?: boolean;
  dependentProps?: string[];
}

export interface WidgetDefinition {
  name: string;
  props: { [key: string]: WidgetPropDefinition };
  dataWidget?: string;
  javascript: string;
  css: string;
}
