export const getUnixTimeStamp = (): string => Math.trunc(Date.now() / 1000).toString();

export const timestampToDate = (timestamp: string):string => {
  const date = new Date(parseInt(timestamp, 10) * 1000);
  const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${minutes}`;
};
