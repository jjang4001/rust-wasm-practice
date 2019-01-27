#![macro_use]
macro_rules! console_log {
    ($($t:tt)*) => (log(&format_args!($($t)*).to_string()))
}

use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
use web_sys::HtmlElement;

// js -> rust

fn macro_console_log(txt: String) {
    console_log!("Hello {}!", txt);
}

#[wasm_bindgen]
extern "C" {
    // Use `js_namespace` here to bind `console.log(..)` instead of just
    // `log(..)`
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);

    // The `console.log` is quite polymorphic, so we can bind it with multiple
    // signatures. Note that we need to use `js_name` to ensure we always call
    // `log` in JS.
    #[wasm_bindgen(js_namespace = console, js_name = log)]
    fn log_u32(a: u32);

    // Multiple arguments too!
    #[wasm_bindgen(js_namespace = console, js_name = log)]
    fn log_many(a: &str, b: &str);

    fn alert(s: &str);
}

#[wasm_bindgen(module = "../www/wasm-bindgen-examples")]
extern "C" {
    fn name() -> String;

    type MyClass;

    #[wasm_bindgen(constructor)]
    fn new() -> MyClass;

    #[wasm_bindgen(method, getter)]
    fn number(this: &MyClass) -> u32;
    #[wasm_bindgen(method, setter)]
    fn set_number(this: &MyClass, number: u32) -> MyClass;
    #[wasm_bindgen(method)]
    fn render(this: &MyClass) -> String;
}

// rust -> js

#[wasm_bindgen]
pub struct BindgenExamples {
    int_value: u32,
}

#[wasm_bindgen]
impl BindgenExamples {
    pub fn console_log(&self, txt: String) {
        macro_console_log(txt);
    }

    pub fn print_my_int_value(&self) {
        macro_console_log(self.int_value.to_string());
    }

    pub fn alert(&self, txt: &str) {
        alert(&format!("Hello, {}!", txt));
    }

    pub fn use_js_function_and_class(&self) {
        // js function
        log(&format!("Hello, {}!", name()));

        // js class
        let my_js_class = MyClass::new();
        log(&my_js_class.render());
        my_js_class.set_number(10);
        log(&my_js_class.render());
    }

    pub fn create_hello_dom_element(&self) -> Result<(), JsValue> {
        // Use `web_sys`'s global `window` function to get a handle on the global
        // window object.
        let window = web_sys::window().expect("no global `window` exists");
        let document = window.document().expect("should have a document on window");

        // Manufacture the element we're gonna append
        let val = document.create_element("p")?;
        val.set_inner_html("Hello from Rust!");

        let wasm_dom_area = document
            .get_element_by_id("wasm-area")
            .expect("document should have #wasm-dom on DOM")
            .dyn_ref::<HtmlElement>()
            .expect("#wasm-dom should be on HtmlElement")
            .append_child(&val)
            .expect("Hello element should have been added");

        Ok(())
    }

    pub fn new(val: u32) -> BindgenExamples {
        let int_value = val;
        BindgenExamples { int_value }
    }
}
