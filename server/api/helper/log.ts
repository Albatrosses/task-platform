export type TMessage = {
  status: number,
  message: string
}

export const timeLog = ({ status, message }: TMessage): void => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1 % 12;
  const days = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  console.log(`${year}-${month}-${days} ${hours}:${minutes}:${seconds}`, `status: ${status}`, `message: ${message}`);
}

export const timeErrorLog = (error: Error): void => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1 % 12;
  const days = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  console.error(`${year}-${month}-${days} ${hours}:${minutes}:${seconds}`, error);
}