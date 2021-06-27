import { sayHello } from '../../../src/models/hello';

describe('Model: Hello', () => {
  it('sayHello should return text', () => {
    expect(sayHello()).toEqual('Hello World!');
  });
});
