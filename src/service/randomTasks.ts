import { Task, TaskStatus } from '@/types';
import getUnixTimeStamp from '@/service/helper';

class RandomTasks {
  private randomTasks!:Task[];

  getRandomTasks():Task[] {
    return this.randomTasks;
  }

  fetchRandomTasks(count = 3): Promise<Task[]> {
    return new Promise(async (resolve, reject) => {
      let randomSentaces = [];
      for (let i = 0; i < (count < 3 ? 3 : count); i += 1) {
        randomSentaces.push(this.getRandomSentaces());
      }
      randomSentaces = await Promise.all(randomSentaces);
      const tasks: Task[] = randomSentaces.map((el, ind) => {
        const words: string[] = el.split(' ');
        const task: Task = {
          id: ind.toString(),
          title: `${this.getRandomWord(words)} ${this.getRandomWord(words)}`,
          description: el,
          date: getUnixTimeStamp(),
          status: TaskStatus.todo,
        };
        return task;
      });
      this.randomTasks = tasks;
      return resolve(tasks);
    });
  }

  getRandomWord = (wordArray: string[]): string => wordArray[
    Math.floor(Math.random() * wordArray.length)
  ].replace(/[.,]/, '');

  getRandomSentaces = ():Promise<string> => new Promise(async (resolve, reject) => {
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
}

export default new RandomTasks();
