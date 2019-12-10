import {
  Events,
  FromUrl,
  Observable,
  Persisted,
  Piped,
  RequestContext,
  Route,
  Service
} from 'coreact';
import { routes } from '../routes';

export interface Todo {
  id: number,
  message: string;
  dueDate: string;
  completed: boolean;
}

@Service
export class TodoService implements Events {
  @Persisted private counter: number = 0;
  @Persisted @Observable todoList: Todo[] = [];
  @Piped message: string = '';
  @FromUrl(routes.todoDetail()) id: any = null;

  selectedDetail: Todo = null;

  addTodo = (message: string) => {
    this.todoList = [...this.todoList, {
      id: this.counter++,
      message: message,
      completed: false,
      dueDate: new Date().toISOString(),
    }];
  };

  deleteTodo = (t: Todo) => {
    this.todoList = this.todoList.filter(a => a.id != t.id);
  };


  completeTodo = (t: Todo) => {
    const copy = Array.from(this.todoList);
    for(let i =0;i < copy.length;i ++){
      if(copy[i].id == t.id){
        copy[i].completed = !copy[i].completed;
      }
    }
    this.todoList = copy;
  };

  @Route(routes.todoDetail())
  async fetchDetail(context: RequestContext){
    this.selectedDetail = this.todoList.find(a=>a.id == this.id)
  }

  async serviceWillLoad(context: RequestContext) {
    console.log(context.environment, 'service todo will load');
    if(context.environment == 'server') {
      this.message = process.env.API_ADDR;
    }
  }
  async serviceDidLoad(context: RequestContext) {
    console.log(context.environment, 'service todo did load');
  }
}