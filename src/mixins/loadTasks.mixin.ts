import { Vue, Component } from 'vue-property-decorator';
import { Task } from '@/types';
@Component
export default class TestMixin extends Vue {
    tasks: Task[] = [];

    test = () => {
      console.log(123);
    }
}
