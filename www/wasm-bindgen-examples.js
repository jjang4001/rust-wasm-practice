import { BindgenExamples } from '../pkg/rust_wasm_practice';

const bindgenExamples = BindgenExamples.new(1);

const consoleLogButton = document.querySelector('#console-log');
const alertButton = document.querySelector('#alert');
const jsClassButton = document.querySelector('#js-bindings-test');
const createHelloElementButton = document.querySelector('#wasm-dom');

consoleLogButton.addEventListener('click', evt => {
  bindgenExamples.console_log('from rust class');
  bindgenExamples.print_my_int_value();
});

alertButton.addEventListener('click', evt => {
  bindgenExamples.alert('this is alert from rust');
});

jsClassButton.addEventListener('click', evt => {
  bindgenExamples.use_js_function_and_class();
});

createHelloElementButton.addEventListener('click', evt => {
  bindgenExamples.create_hello_dom_element();
});

// functions to be imported in rust
export function name() {
  return 'World';
}

export class MyClass {
  constructor() {
    this._number = 42;
  }

  get number() {
    return this._number;
  }

  set number(n) {
    return this._number = n;
  }

  render() {
    return `My number is: ${this.number}`;
  }
}
