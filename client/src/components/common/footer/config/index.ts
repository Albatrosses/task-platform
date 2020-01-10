import { ROUTE_NAME, ROUTE_PATH, ROUTE_TITLE } from "src/enum/route";

export const navBarConfig = [
  {
    key: ROUTE_NAME.ENTRY,
    title: ROUTE_TITLE.ENTRY,
    path: ROUTE_PATH.ENTRY,
    icon: {
      type: "home"
    },
    selectedIcon: {
      type: "home",
      theme: "filled"
    }
  },
  {
    key: ROUTE_NAME.TASK_LISTING,
    title: ROUTE_TITLE.TASK_LISTING,
    path: ROUTE_PATH.TASK_LISTING,
    icon: {
      type: "profile"
    },
    selectedIcon: {
      type: "profile",
      theme: "filled"
    }
  },
  {
    key: ROUTE_NAME.TRANSACTION_LISTING,
    title: ROUTE_TITLE.TRANSACTION_LISTING,
    path: ROUTE_PATH.TRANSACTION_LISTING,
    icon: {
      type: "wallet"
    },
    selectedIcon: {
      type: "wallet",
      theme: "filled"
    }
  },
  {
    key: ROUTE_NAME.PROFILE,
    title: ROUTE_TITLE.PROFILE,
    path: ROUTE_PATH.PROFILE,
    icon: {
      type: "skin"
    },
    selectedIcon: {
      type: "skin",
      theme: "filled"
    }
  }
];
