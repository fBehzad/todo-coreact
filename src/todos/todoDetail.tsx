
import React, { PureComponent } from 'react';
import { AutoWired, Observer } from 'coreact';
import { TodoService } from './TodoService';

@Observer([TodoService])
export class TodoDetail extends PureComponent{
  todoService = AutoWired(TodoService, this);

  render(){
    return <div>
      {this.todoService.selectedDetail ? <h1>{this.todoService.selectedDetail.message}</h1> : <h1>not found</h1>}
    </div>
  }
}

