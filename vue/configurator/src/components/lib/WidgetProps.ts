export enum WidgetPropType {
  STRING = "string",
  BOOLEAN = "boolean",
  ENUMERATION = "enumeration",
}

export interface WidgetPropDefinition {
  name: string;
  type: WidgetPropType;
  value: string | boolean;
  defaultValue: string | boolean;
  options?: WidgetPropOptions[];
}

interface WidgetPropOptions {
  value: string;
  label: string;
}
