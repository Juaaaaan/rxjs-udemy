import { fromEvent, interval, map, mergeMap, of, take, takeUntil } from "rxjs";

const letters$ = of("a, b, c");

letters$.pipe(
  // aquí tenemos 3 observables internos emitiendo valores
  mergeMap((letter) =>
    interval(1000).pipe(
      map((i) => letter + i),
      take(3),
    ),
  ),
);
//   .subscribe({
//     next: (val) => console.log("next", val),
//     complete: () => console.log("complete"),
//   });

// ej: cuanto tiempo el usuario presiona el mouse

const mouseDown$ = fromEvent(document, "mousedown");
const mouseUp$ = fromEvent(document, "mouseup");
// cuando ponemos el interval vacío es casi como ponerle un 1. Instantáneo (lo más rápido que pueda)
const interval$ = interval();

// nos interesa cuando hace click y suelta el click

mouseDown$
  .pipe(
    mergeMap(() =>
      // aquí emitimos un nuevo observable, no tenemos un observable como salida
      // sino que tenemos el producto de la suscripción del mismo
      interval$.pipe(takeUntil(mouseUp$)),
    ),
  )
  .subscribe((val) => console.log("click", val));
