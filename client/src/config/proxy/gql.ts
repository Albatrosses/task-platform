import { gql } from "apollo-boost";

export const proxyQuary = gql`
  proxy {
    used
    usedPercentage
    remain
    remainPercentage
    daily
    dailyPercentage
    node1
    node2
  }
`;
