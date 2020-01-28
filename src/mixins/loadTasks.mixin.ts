import { Vue, Component } from 'vue-property-decorator';
import { Task } from '@/types';
import randomTasks from '@/service/randomTasks';

@Component
export default class TestMixin extends Vue {
    tasks: Task[] = [];

    test = () => {
      console.log(123);
    }

    async created() {
      this.tasks = await randomTasks.getRandomTasks();
    }
}
