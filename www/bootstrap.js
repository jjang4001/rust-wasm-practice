// A dependency graph that contains any wasm must all be imported
// asynchronously. This `bootstrap.js` file does the single async import, so
// that no one else needs to worry about it again.

import("./index.js")
  .catch(e => console.error("Error importing `index.js`:", e));

import("./game-of-life.js")
  .catch(e => console.error("Error importing `index2.js`:", e));

import("./wasm-bindgen-examples.js")
  .catch(e => console.error("Error importing `wasm-bindgen-examples`:", e));
