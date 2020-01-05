import {
  addHeroImage,
  removeHeroImage,
  updateHeroImage
} from "../heroImage/mutation";
import { heroImages } from "../heroImage/query";
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
  logoutUser,
  removeUser,
  signInUser,
  signUpUser,
  updateUser,
  updateUserSelf,
  verifyMessage,
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
  heroImages,
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
  signUpUser,
  logoutUser,
  updateUserSelf,
  verifyMessage,
  // userTask
  acceptUserTask,
  submitUserTask,
  quitUserTask
};
