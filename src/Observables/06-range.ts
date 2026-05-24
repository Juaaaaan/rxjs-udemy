import { asyncScheduler, of, range } from "rxjs";

// const src$ = of(1, 2, 3, 4, 5);

// // ES SINCRONO
// console.log("inicio");
// src$.subscribe((val) => console.log(val));
// console.log("fin");

// ES SINCRONO (RANGE)
// const src$ = range(1, 5);
// // No va del 1 al 5 sino de la posición inicial a la final -1, es decir, 5 emisiones de los
// // valores consecutivos del 1 hasta la posición final
// console.log("inicio");
// src$.subscribe((val) => console.log("val"));
// console.log("fin");

// ES ASINCRONO (RANGE)
// Range tiene 3 parámetros: el valor inicial, el número de emisiones y el scheduler, en este
// caso asyncScheduler nos permitirá que el observer se ejecute en un futuro.
const src$ = range(1, 5, asyncScheduler);
// No va del 1 al 5 sino de la posición inicial a la final -1, es decir, 5 emisiones de los
// valores consecutivos del 1 hasta la posición final
console.log("inicio");
src$.subscribe((val) => console.log("val"));
console.log("fin");
