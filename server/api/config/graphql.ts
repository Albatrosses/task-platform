import {
  addHeroImage,
  removeHeroImage,
  updateHeroImage
} from "../heroImage/mutation";
import { heroImageListing } from "../heroImage/query";
import { addTask, removeTask, updateTask } from "../task/mutation";
import { task, taskListing } from "../task/query";
import {
  addTransaction,
  removeTransaction,
  updateTransaction
} from "../transactions/mutation";
import { transaction, transactionListing } from "../transactions/query";
import {
  addUser,
  loginUser,
  logoutUser,
  removeUser,
  signInUser,
  updateUser,
  updateUserSelf,
  verifyMessage
} from "../user/mutation";
import { user, userListing } from "../user/query";
import {
  acceptUserTask,
  quitUserTask,
  submitUserTask
} from "../user_task/mutation";
import { userTask, userTaskListing } from "../user_task/query";

export const queryCollect = {
  // heroImage
  heroImageListing,
  // task
  task,
  taskListing,
  // transaction
  transaction,
  transactionListing,
  // user
  user,
  userListing,
  // userTask
  userTask,
  userTaskListing
};

export const mutationCollect = {
  // heroImage
  addHeroImage,
  removeHeroImage,
  updateHeroImage,
  // task
  addTask,
  removeTask,
  updateTask,
  // transaction
  addTransaction,
  removeTransaction,
  updateTransaction,
  // user
  addUser,
  removeUser,
  updateUser,
  signInUser,
  loginUser,
  logoutUser,
  updateUserSelf,
  verifyMessage,
  // userTask
  acceptUserTask,
  submitUserTask,
  quitUserTask
};
