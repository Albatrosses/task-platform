import "reflect-metadata";
import { createConnection } from "typeorm";
import { generateErrorLog, generateMessage } from "../helper/log";

export const queryDB = async queryCallback => {
  try {
    const connection = await createConnection();
    const result = await queryCallback(connection);
    await connection.close();
    return result;
  } catch (error) {
    generateErrorLog(error);
    return generateMessage(false, "未知原因，请稍后再试");
  }
};
