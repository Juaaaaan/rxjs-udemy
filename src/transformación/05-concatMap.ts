import { concatMap, fromEvent, interval, switchMap, take } from "rxjs";

const interval$ = interval(500).pipe(take(3));

const click$ = fromEvent(document, "click");

// click$
//   .pipe(switchMap(() => interval$))
//   .subscribe((val) => console.log("val", val));

click$
  // los observables se van a poner a la cola, cuando uno termina, empieza el siguiente
  // ¿Cuando termina en este ejemplo? tenemos un take(3), por tanto se van a emitir 3 veces el intervalo de 1 segundo
  // pasadas las 3 veces, si hemos pulsado el click dos veces, se emitira el primer interval 3 veces y luego el segundo click
  // con el interval 3 veces
  .pipe(concatMap(() => interval$))
  .subscribe((val) => console.log("val", val));
