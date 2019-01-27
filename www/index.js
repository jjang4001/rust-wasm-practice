console.log('hello from index1');

const commandLineSelector = '.commandLine';
const consoleTextSelector = '.consoletext';
const div = 'div';
const commandLineIndicator = '> ';

document.addEventListener('keypress', (evt) => {
  const key = evt.which || evt.keyCode;
  if (key == 13) {
    event.preventDefault();
    const command = document.querySelector(commandLineSelector).value;
    addLine(command);
    // probs have to add async/await here.
    addLine(mockWasmPackage(command));
    document.querySelector(commandLineSelector).value = commandLineIndicator;
  }
})

const checkInput = () => {
  var event = window.event || event.which;

  if (event.keyCode == 13) {
    event.preventDefault();
    const command = document.querySelector(commandLineSelector).value;
    addLine(command);
    // probs have to add async/await here.
    addLine(mockWasmPackage(command));
    document.querySelector(commandLineSelector).value = commandLineIndicator;
  }
}

const addLine = (line) => {
  let p = document.createElement(div);
  let text = document.createTextNode(line);
  p.appendChild(text);
  document.querySelector(consoleTextSelector).appendChild(p);
}

const mockWasmPackage = (inputCommand) => {
  return 'result of: ' + inputCommand;
}
