import { exhaustMap, fromEvent, interval, take } from "rxjs";

const interval$ = interval(500).pipe(take(3));

const click$ = fromEvent(document, "click");

// click$
//   .pipe(switchMap(() => interval$))
//   .subscribe((val) => console.log("val", val));

// click$
//   // los observables se van a poner a la cola, cuando uno termina, empieza el siguiente
//   // ¿Cuando termina en este ejemplo? tenemos un take(3), por tanto se van a emitir 3 veces el intervalo de 1 segundo
//   // pasadas las 3 veces, si hemos pulsado el click dos veces, se emitira el primer interval 3 veces y luego el segundo click
//   // con el interval 3 veces
//   .pipe(concatMap(() => interval$))
//   .subscribe((val) => console.log("val", val));

// la diferencia del concatMap al exahustMap es que el exhaustMap no se va a poner a la cola,
// si el click se pulsa mientras se esta emitiendo el intervalo, el click se va a ignorar,
// por tanto solo se va a emitir el primer intervalo de 3 veces y los siguientes clicks no van a hacer nada

// si ya existe una suscripción, con eshaustMap, no se va a crear una nueva suscripción,
// por tanto el click se va a ignorar

// esto puede venir bien si tenemos un carrito de compra o algo transaccional afectando a la información
// porque podemos obtener si se ha hecho click, cuantas veces y solo quedarnos con la primera para
// evitar que se llame otra vez al endpoint de pagar

click$
  .pipe(exhaustMap(() => interval$))
  .subscribe((val) => console.log("val", val));
