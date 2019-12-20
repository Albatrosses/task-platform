import { generateHashCode } from "src/helper/common";
import { thirdPartyFilter } from "./dataSource";

export const generateThirdPartyFilter = () => {
  const thirdPartyFilterList = thirdPartyFilter.slice(0);

  thirdPartyFilterList.unshift({
    key: generateHashCode(),
    name: "全部"
  });

  return thirdPartyFilterList;
};
