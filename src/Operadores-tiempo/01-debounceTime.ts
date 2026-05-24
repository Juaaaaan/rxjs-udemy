import { debounceTime, distinctUntilChanged, fromEvent, map } from "rxjs";

const click$ = fromEvent<MouseEvent>(document, "click");

// puedo darle tantos clicks como quiera que solo va a emitir el click de los 3 seg (debounceTime(3000)) y sí
// en esos 3 segundos he hecho click otra vez, no va a emitir una mierda
click$.pipe(debounceTime(3000)).subscribe(({ x, y }) => {
  console.log(x, y);
});

const input = document.createElement("input");
document.querySelector("body").append(input);

const input$ = fromEvent<KeyboardEvent>(document, "keyup");
input$
  .pipe(
    map(({ target }) => target as HTMLInputElement),
    map(({ value }) => value),
    debounceTime(1000),
    distinctUntilChanged(),
  )
  .subscribe((val) => console.log(val));
