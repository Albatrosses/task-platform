import { Entry } from "src/components/entry/Entry";
import TaskDetail from "src/components/task-detail/TaskDetail";
import TaskListing from "src/components/task-listing/TaskListing";

export const routesConfig = [
  {
    path: "/",
    component: Entry,
    exact: true,
    showHeader: true,
    showFooter: true
  },
  {
    path: "/task-listing",
    component: TaskListing,
    exact: true,
    showHeader: false,
    showFooter: false
  },
  {
    path: "/task-listing/detail",
    component: TaskDetail,
    exact: true,
    showHeader: false,
    showFooter: false
  }
];
