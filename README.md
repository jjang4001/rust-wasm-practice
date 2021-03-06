# rust-wasm-practice

This is a playground for me to get my feet wet with rust and webassembly

# Getting Started

1. Build the package. From the root directory, run
```
wasm-pack build
```

2. Link for local development - this lib will not be published. From ./pkg, run
```
npm link
```
Then, from ./www, run
```
npm link rust-wasm-practice
```

3. Start the server. From ./www, run
```
npm run start
```

# Optimizing file size
```
wasm-opt -Os add_bg.wasm -o add.wasm
```
And for even smaller sizes when releasing, add
```
[profile.release]
lto = true
```

# Testing
To test, run
```
wasm-pack test --chrome --headless
```

# Benchmarks
Comment out all `#[wasm_bindgen]` and switch to nightly compiler. Then, run
```
cargo +nightly bench | tee before.txt
```