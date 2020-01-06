import "reflect-metadata";
import { createConnection } from "typeorm";
import { generateErrorLog, generateMessage } from "../helper/log";

export const queryDB = async queryCallback => {
  const connection = await createConnection();
  try {
    const result = await queryCallback(connection);
    await connection.close();
    return result;
  } catch (error) {
    await connection.close();
    generateErrorLog(error);
    return generateMessage(false, "未知原因，请稍后再试");
  }
};
