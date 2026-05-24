import { debounceTime, fromEvent, map } from "rxjs";
import { ajax } from "rxjs/ajax";

// Este archivo contiene el proceso de obtener respuesta de un observable dentro de otro observable
// se hace complicado manejar observables y por eso aparecen los operadores de transformación (APLANAMIENTO)

// referencias
const body = document.querySelector("body");

const textInput = document.createElement("input");
const orderList = document.createElement("ol");

body.append(textInput, orderList);

// streams
const input$ = fromEvent<KeyboardEvent>(document, "keyup");

// una forma de extraer el value de un keyboardEvent en un input
// input$
//   .pipe(
//     map(({ target }) => target as HTMLInputElement),
//     map(({ value }) => value),
//     debounceTime(500),
//   )
//   .subscribe(console.log);

// input$
//   .pipe(
//     debounceTime(500),
//     map((event) => {
//       const text = event.target["value"];
//         // en este momento estoy retornando un observable que en el subscribe lo recibiré pero no la respuesta
//         // que yo quiero de los usuarios
//       return ajax.getJSON(`https://api.github.com/users/${text}`);
//     }),
//   )
//   // el objetivo es hacer una petición ajax con todos los usuarios de github que coinciden con lo que he puesto
//   // en el input
//   .subscribe(console.log);

input$
  .pipe(
    debounceTime(500),
    map((event) => {
      const text = event.target["value"];
      // en este momento estoy retornando un observable que en el subscribe lo recibiré pero no la respuesta
      // que yo quiero de los usuarios
      return ajax.getJSON(`https://api.github.com/users/${text}`);
    }),
  )
  // el objetivo es hacer una petición ajax con todos los usuarios de github que coinciden con lo que he puesto
  // en el input
  .subscribe((res) => {
    // en este caso si yo quiero obtener la url de este usuario va a ser algo más tedioso
    res
      .pipe(map((val: any) => val.url))
      .subscribe((val) => console.log("users", val));
  });
