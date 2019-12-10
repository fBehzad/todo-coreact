import React, { PureComponent } from 'react';
import { AutoWired, Observer, RoutingService } from 'coreact';
import { TodoService } from './TodoService';
import { routes } from '../routes';

@Observer([TodoService])
export class TodoList extends PureComponent {
  todoService = AutoWired(TodoService, this);
  router = AutoWired(RoutingService, this);

  render() {
    return <div className="todo-list">
      {this.todoService.todoList.map(t => {
        return <div key={t.id} className={`todo-item ${t.completed ? 'completed' : ''}`}>
          <div className="todo-content">
            <a href="#" className="title" onClick={(e) => {
              e.preventDefault();
              this.todoService.completeTodo(t);
            }}>{t.message}</a>
            <a href="#" className="subtitle" onClick={(e) => {
              e.preventDefault();
              this.router.goto(routes.todoDetail(t.id));
            }}>{t.dueDate}</a>
          </div>
          <div className="todo-actions">
            <div className="close" onClick={() => this.todoService.deleteTodo(t)}><span/><span/>
            </div>
          </div>
        </div>;
      })}
    </div>;
  }
}