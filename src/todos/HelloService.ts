import { Events, RequestContext, Service } from 'coreact';


@Service
export class HelloService implements Events {
  async serviceWillLoad(context: RequestContext) {
    console.log(context.environment, 'service hello will load');
  }
  async serviceDidLoad(context: RequestContext) {
    console.log(context.environment, 'service hello did load');
  }
}