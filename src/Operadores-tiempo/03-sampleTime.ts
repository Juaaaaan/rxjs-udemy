import { fromEvent, map, sampleTime } from "rxjs";

const click$ = fromEvent<MouseEvent>(document, "click");

click$
  .pipe(
    sampleTime(2000),
    map(({ clientX, clientY }) => ({ clientX, clientY })),
  )
  .subscribe((val) => console.log(val));

// click$
//   .pipe(
//     map(({ clientX, clientY }) => ({ clientX, clientY })),
//     sampleTime(2000),
//   )
//   .subscribe((val) => console.log(val));

// ¿Cúal es la diferencia de poner el sampleTime antes o después del map?
//
// El resultado es el mismo pero hay un mayor consumo de memoría
// Cada vez que se hace click se emite el evento al mapa, el mapa extrae las propiedades y esas propiedades
// son recibidas en el sampleTime.
// El sampleTime es el que dice que todavía no han pasado los dos segundos, voy a dejar esa información
// hasta que sea el momento de emitirlas y para entonces, ya hemos procesado esa información
//
// Es más eficiente ponerlo arriba del map para que los cálculos y procedimientos se hagan cuando se quiera emitir
