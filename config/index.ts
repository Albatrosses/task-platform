import { get } from "lodash";

export enum ModuleName {}

const ConfigMap = {};

const getConfig = (moduleName: ModuleName): any => get(ConfigMap, `${moduleName}`, null);

export default getConfig;
