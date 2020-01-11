import "reflect-metadata";
import { createConnection, getConnection } from "typeorm";
import { generateErrorLog, generateResolver } from "../helper/log";
import { MESSAGE_WORD } from "../types/common/message";

export const queryDB = async queryCallback => {
  let connection;
  try {
    connection = await createConnection();
  } catch (error) {
    if (error.name === "AlreadyHasActiveConnectionError") {
      connection = getConnection();
    }
    generateErrorLog(error);
  }
  try {
    const result = await queryCallback(connection);
    await connection.close();
    return result;
  } catch (error) {
    await connection.close();
    generateErrorLog(error);
    return generateResolver(false, MESSAGE_WORD.UNKONW_ERROR);
  }
};
