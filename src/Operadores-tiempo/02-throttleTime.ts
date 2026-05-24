import {
  asyncScheduler,
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  throttleTime,
} from "rxjs";

const click$ = fromEvent<MouseEvent>(document, "click");

// puedo darle tantos clicks como quiera que solo va a emitir el click de los 3 seg (debounceTime(3000)) y sí
// en esos 3 segundos he hecho click otra vez, no va a emitir una mierda
click$.pipe(throttleTime(3000));
// .subscribe(({ x, y }) => {
//   console.log(x, y);
// });

// EL throttleTime es interesante si tenemos un buscador y queremos que nos vaya autocompletando o que nos
// vaya dando respuestas en función de lo que escribimos sin necesidad de estar mandando a la API todo lo
// que vaya escribiendo el usuario

const input = document.createElement("input");
document.querySelector("body").append(input);

const input$ = fromEvent<KeyboardEvent>(document, "keyup");
input$
  .pipe(
    map(({ target }) => target as HTMLInputElement),
    map(({ value }) => value),
    throttleTime(1000, asyncScheduler, {
      leading: true,
      trailing: true,
    }),
    distinctUntilChanged(),
  )
  .subscribe((val) => console.log(val));
