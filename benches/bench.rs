#![feature(test)]

extern crate test;
extern crate rust_wasm_practice;

#[bench]
fn universe_ticks(b: &mut test::Bencher) {
    let mut universe = rust_wasm_practice::Universe::new();

    b.iter(|| {
        universe.tick();
    });
}