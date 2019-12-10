import './styles.sass';
import React, { PureComponent } from 'react';
import { Todo, TodoService } from './TodoService';
import { AutoWired, Consumer, Observer } from 'coreact';
import { TodoList } from './todoList';
import { HelloService } from './HelloService';



interface StateType {
  message: string,
}

@Consumer
export class TodoView extends PureComponent<{}, StateType> {

  todoService = AutoWired(TodoService, this);
  helloService = AutoWired(HelloService, this);

  state: StateType = {
    message: '',
  };

  changeText = (message: string) => this.setState({ message });

  render() {

    const { message } = this.state;
    return <div className="todo-page-container">

      <h1>{this.todoService.message}</h1>
      <div className="todo-wrapper">
        <div className="todo-input-container">
          <input type="text" placeholder="Write something..." value={message}
                 onChange={e => this.changeText(e.target.value)}/>
          <button className="add-todo-button" onClick={()=>this.todoService.addTodo(message)}>Add</button>
        </div>

        <TodoList/>
      </div>
    </div>;
  }
}