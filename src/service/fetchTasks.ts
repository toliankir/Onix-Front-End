import { Task, TaskStatus } from '@/types';
import { getUnixTimeStamp } from '@/service/helper';

const getRandomSentaces = ():Promise<string> => new Promise(async (resolve, reject) => {
  let jsonData;
  try {
    const response = await fetch('https://api.adviceslip.com/advice', {
      method: 'GET',
    });
    jsonData = await response.json();
    return resolve(jsonData.slip.advice);
  } catch (err) {
    console.log('Fetch:', err);
    return reject(err);
  }
});

const getRandomExpdate = (): string => {
  const addtionalTime = Math.trunc(Math.random() * 864000);
  const nowTime = parseInt(getUnixTimeStamp(), 10);
  const daysBefore = Math.trunc(Math.random() * 259200);
  return (nowTime + addtionalTime - daysBefore).toString();
};

const getRandomCreatingTime = (): string => {
  const nowTime = parseInt(getUnixTimeStamp(), 10);
  const daysBefore = Math.trunc(Math.random() * 5 * 24 * 60 * 60);
  return (nowTime - daysBefore).toString();
};

const getRandomWord = (wordArray: string[]): string => wordArray[
  Math.floor(Math.random() * wordArray.length)
].replace(/[.,]/, '');

const getRandomStatus = (expDate: string): TaskStatus => {
  let randMax = 3;
  if (parseInt(expDate, 10) - parseInt(getUnixTimeStamp(), 10) < 86400) {
    randMax = 2;
  }
  const rand = Math.trunc(Math.random() * randMax);
  switch (rand) {
    case 0:
      return TaskStatus.todo;
    case 1:
      return TaskStatus.inprogress;
    case 2:
      return TaskStatus.done;
    default:
      return TaskStatus.todo;
  }
};

const fetchRandomTasks = async (count = 10): Promise<Task[]> => new Promise(async (resolve) => {
  let randomSentaces = [];
  for (let i = 0; i < (count < 10 ? 10 : count); i += 1) {
    randomSentaces.push(getRandomSentaces());
  }
  randomSentaces = await Promise.all(randomSentaces);
  const tasks: Task[] = randomSentaces.map((el, ind) => {
    const words: string[] = el.split(' ');
    const expdate = getRandomExpdate();
    const task: Task = {
      id: ind.toString(),
      title: `${getRandomWord(words)} ${getRandomWord(words)}`,
      description: el,
      date: getRandomCreatingTime(),
      status: getRandomStatus(expdate),
      expdate,
    };
    return task;
  });
  return resolve(tasks);
});

export default fetchRandomTasks;
