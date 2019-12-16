import { ModuleName } from '../../../config';
import { get } from "lodash";

const helperMap = {}

class HelperMaps {
  constructor() {}

  public getModule(moduleName: ModuleName) {
    return get(helperMap, `${moduleName}`, null);
  }
}

export default new HelperMaps();