import { of } from "rxjs";

// const obs$ = of<number>(1, 2, 3, 4, 5, 6);
// Cada uno de los valores que se envían el en of tiene que estar separados por comas
// Si lo enviamos entre corchetes ([1, 2, 3, 4, 5, 6]) se convierte en un observable que emite un array
// si continuamos así, emitirá un array con los valores de dentro del array

// operador spread: "..." dentro del array [...obs$]: descompone el array en valores individuales
// si queremos que emita los valores del array, tenemos que usar el operador spread
// (const obs$ = of<number>(...[ 1, 2, 3, 4, 5, 6];))

// ahora podemos complicar las cosas enviando diferentes cosas en el of y por eso entra el <any> porque
// puedo enviar tantos tipos como quiera
const obs$ = of<any>(
  1,
  2,
  3,
  4,
  5,
  6,
  { a: 1 },
  [1, 2, 3],
  function () {},
  Promise.resolve(true),
);

console.log("inicio obs$");

obs$.subscribe(
  (next) => console.log({ next }),
  (err) => console.error({ err }),
  () => console.log("terminamos la secuencia"),
);

console.log("fin obs$");

// si el observable fuese asíncrono, el console.log('fin obs$') se ejecutaría antes que el console.log('next: 1')
// si el observable fuese síncrono, el console.log('fin obs$') se ejecutaría después que el console.log('next: 1')

// Ahora mismo muestra todo de golpe porque el observable es síncrono
