import { Task, TaskStatus } from '@/types';
import { getUnixTimeStamp } from '@/service/helper';

class RandomTasks {
  private randomTasks!:Task[];

  private fetching:boolean = false;;

  getRandomTasks():Promise<Task[]> {
    return new Promise(async (resolve, reject) => {
      if (this.randomTasks) {
        return resolve(this.randomTasks);
      }
      this.fetching = true;
      await this.fetchRandomTasks(Math.trunc(Math.random() * 20));
      this.fetching = false;
      return resolve(this.randomTasks);
    });
  }

  get getFetching():boolean {
    return this.fetching;
  }

  getRandomStatus = (expDate: string): TaskStatus => {
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
  }

  fetchRandomTasks(count = 10): Promise<Task[]> {
    return new Promise(async (resolve, reject) => {
      let randomSentaces = [];
      for (let i = 0; i < (count < 10 ? 10 : count); i += 1) {
        randomSentaces.push(this.getRandomSentaces());
      }
      randomSentaces = await Promise.all(randomSentaces);
      const tasks: Task[] = randomSentaces.map((el, ind) => {
        const words: string[] = el.split(' ');
        const expdate = this.getRandomExpdate();
        const task: Task = {
          id: ind.toString(),
          title: `${this.getRandomWord(words)} ${this.getRandomWord(words)}`,
          description: el,
          date: this.getRandomCreatingTime(),
          status: this.getRandomStatus(expdate),
          expdate,
        };
        return task;
      });
      this.randomTasks = tasks;
      return resolve(tasks);
    });
  }

  getRandomCreatingTime = (): string => {
    const nowTime = parseInt(getUnixTimeStamp(), 10);
    const daysBefore = Math.trunc(Math.random() * 259200);
    return (nowTime - daysBefore).toString();
  }

  getRandomExpdate = (): string => {
    const addtionalTime = Math.trunc(Math.random() * 864000);
    const nowTime = parseInt(getUnixTimeStamp(), 10);
    const daysBefore = Math.trunc(Math.random() * 259200);
    return (nowTime + addtionalTime - daysBefore).toString();
  };

  getLastTaskId(): string {
    return this.randomTasks[this.randomTasks.length - 1].id;
  }

  addTask(title: string, description: string) {
    const task: Task = {
      id: (parseInt(this.getLastTaskId(), 10) + 1).toString(),
      title,
      description,
      date: getUnixTimeStamp(),
      status: TaskStatus.todo,
      expdate: '123',
    };
    this.randomTasks.push(task);
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
