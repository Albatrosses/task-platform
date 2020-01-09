import "reflect-metadata";
import { createConnection } from "typeorm";
import { MESSAGE_WORD } from "../api/enum";
import { generateErrorLog, generateResolver } from "../helper/log";

export const queryDB = async queryCallback => {
  const connection = await createConnection();
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
