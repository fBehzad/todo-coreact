import React, { PureComponent } from 'react';
import { TodoView } from './todos/todoView';
import { Route, Switch } from 'react-router';
import { routes } from './routes';
import { TodoDetail } from './todos/todoDetail';

export class App extends PureComponent {
  render() {
    return <>
      <Switch>
        <Route path={routes.todoList} component={TodoView} exact/>
        <Route path={routes.todoDetail()} component={TodoDetail} exact/>
      </Switch>
    </>
  }
}
