import { BindgenExamples } from '../pkg/rust_wasm_practice';

const bindgenExamples = BindgenExamples.new(1);

const consoleLogButton = document.querySelector('#console-log');
const alertButton = document.querySelector('#alert');
const jsClassButton = document.querySelector('#js-bindings-test');
const createHelloElementButton = document.querySelector('#wasm-dom');
const wasmFibonacciButton = document.querySelector('#wasm-fibonacci');
const jsFibonacciButton = document.querySelector('#js-fibonacci');

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

wasmFibonacciButton.addEventListener('click', evt => {
  const val = document.getElementById('fibonacci-input').value;
  bindgenExamples.time_fibonacci(val);
});

jsFibonacciButton.addEventListener('click', evt => {
  time_fibonacci();
});

const fibonacci = (n) => {
  if (n < 0) {
    alert('Invalid input');
    return;
  } else if (n == 0) {
    return 0;
  } else if (n == 1) {
    return 1;
  } else {
    return fibonacci(n - 1) + fibonacci(n - 2);
  }
}

const time_fibonacci = () => {
  const val = document.getElementById('fibonacci-input').value;
  let t0 = performance.now();
  let res = fibonacci(val);
  let t1 = performance.now();
  let duration = t1 - t0;
  displayFibonacciTime(duration, res);
}

const displayFibonacciTime = (duration, result) => {
  const resElement = document.createElement("p");
  resElement.innerHTML = `JS duration: ${duration} ms, result: ${result}`;

  document.getElementById('fibonacci-time').appendChild(resElement);
}

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
