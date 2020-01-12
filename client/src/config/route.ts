import PageNotFound from "src/components/common/page-not-found/PageNotFound";
import { Entry } from "src/components/entry/Entry";
import Login from "src/components/login/Login";
import Profile from "src/components/profile/Profile";
import Signin from "src/components/signin/Signin";
import TaskListing from "src/components/task-listing/TaskListing";
import Task from "src/components/task/Task";
import { ROUTE_NAME, ROUTE_PATH } from "src/enum/route";

export const consumerRoutes = [
  {
    name: ROUTE_NAME.ENTRY,
    path: ROUTE_PATH.ENTRY,
    component: Entry,
    exact: true,
    showFooter: true
  },
  {
    name: ROUTE_NAME.SIGNIN,
    path: ROUTE_PATH.SIGNIN,
    component: Signin,
    exact: true,
    showFooter: false
  },
  {
    name: ROUTE_NAME.LOGIN,
    path: ROUTE_PATH.LOGIN,
    component: Login,
    exact: true,
    showFooter: false
  },
  {
    name: ROUTE_NAME.HEPLER,
    path: ROUTE_PATH.HEPLER,
    component: Signin,
    exact: true,
    showFooter: false
  },
  {
    name: ROUTE_NAME.TASK,
    path: ROUTE_PATH.TASK,
    component: Task,
    exact: true,
    showFooter: false
  },
  {
    name: ROUTE_NAME.TASK_LISTING,
    path: ROUTE_PATH.TASK_LISTING,
    component: TaskListing,
    exact: true,
    showFooter: true
  },
  {
    name: ROUTE_NAME.PROFILE,
    path: ROUTE_PATH.PROFILE,
    component: Profile,
    exact: true,
    showFooter: true
  },
  {
    name: ROUTE_NAME.TRANSACTION,
    path: ROUTE_PATH.TRANSACTION,
    component: PageNotFound,
    exact: true,
    showFooter: false
  },
  {
    name: ROUTE_NAME.TRANSACTION_LISTING,
    path: ROUTE_PATH.TRANSACTION_LISTING,
    component: PageNotFound,
    exact: true,
    showFooter: true
  },
  {
    name: ROUTE_NAME.DEFRAY,
    path: ROUTE_PATH.DEFRAY,
    component: PageNotFound,
    exact: true,
    showFooter: false
  }
];

export const customerRoutes = [
  {
    name: ROUTE_NAME.MANAGEMENT_ENTRY,
    path: ROUTE_PATH.MANAGEMENT_ENTRY,
    component: PageNotFound,
    exact: true,
    showFooter: false
  },
  {
    name: ROUTE_NAME.MANAGEMENT_SIGNIN,
    path: ROUTE_PATH.MANAGEMENT_SIGNIN,
    component: PageNotFound,
    exact: true,
    showFooter: false
  },
  {
    name: ROUTE_NAME.MANAGEMENT_LOGIN,
    path: ROUTE_PATH.MANAGEMENT_LOGIN,
    component: PageNotFound,
    exact: true,
    showFooter: false
  },
  {
    name: ROUTE_NAME.MANAGEMENT_PROFILE,
    path: ROUTE_PATH.MANAGEMENT_PROFILE,
    component: PageNotFound,
    exact: true,
    showFooter: false
  },
  {
    name: ROUTE_NAME.MANAGEMENT_TASK_LISTING,
    path: ROUTE_PATH.MANAGEMENT_TASK_LISTING,
    component: PageNotFound,
    exact: true,
    showFooter: false
  },
  {
    name: ROUTE_NAME.MANAGEMENT_TASK,
    path: ROUTE_PATH.MANAGEMENT_TASK,
    component: PageNotFound,
    exact: true,
    showFooter: false
  },
  {
    name: ROUTE_NAME.MANAGEMENT_USER_TASK_LISTING,
    path: ROUTE_PATH.MANAGEMENT_USER_TASK_LISTING,
    component: PageNotFound,
    exact: true,
    showFooter: false
  },
  {
    name: ROUTE_NAME.MANAGEMENT_USER_TASK,
    path: ROUTE_PATH.MANAGEMENT_USER_TASK,
    component: PageNotFound,
    exact: true,
    showFooter: false
  },
  {
    name: ROUTE_NAME.MANAGEMENT_TRANSACTION_LISTING,
    path: ROUTE_PATH.MANAGEMENT_TRANSACTION_LISTING,
    component: PageNotFound,
    exact: true,
    showFooter: false
  },
  {
    name: ROUTE_NAME.MANAGEMENT_TRANSACTION,
    path: ROUTE_PATH.MANAGEMENT_TRANSACTION,
    component: PageNotFound,
    exact: true,
    showFooter: false
  },
  {
    name: ROUTE_NAME.MANAGEMENT_USER_LISTING,
    path: ROUTE_PATH.MANAGEMENT_USER_LISTING,
    component: PageNotFound,
    exact: true,
    showFooter: false
  },
  {
    name: ROUTE_NAME.MANAGEMENT_USER,
    path: ROUTE_PATH.MANAGEMENT_USER,
    component: PageNotFound,
    exact: true,
    showFooter: false
  }
];

export const routesConfig = [
  ...consumerRoutes,
  ...customerRoutes,
  {
    name: ROUTE_NAME.PAGE_NOT_FOUND,
    path: ROUTE_PATH.PAGE_NOT_FOUND,
    component: PageNotFound,
    exact: false,
    showFooter: false
  }
];
