import { interval, timer } from "rxjs";

const observer = {
  next: (val) => console.log("next", val),
  complete: () => console.log("complete"),
};

// ¿Para qué sirve esto?
// EJ: si trabajamos con android / ios y necesitamos notificaciones locales (NO PUSH)
// podemos especificar en qué momento queremos que se muestre esa notificación porque también timer admite fechas
// Al final está el ejemplo

// SON ASINCRONOS => SIEMPRE SE EJECUTAN EN EL FUTURO

const interval$ = interval(1000);
const timer$ = timer(2000);

// const timerZero$ = timer(0);
// const timerZero$ = timer();
// se va a ejecutar el timer(0) || timer() en cuanto javascript y su stack estén disponibles

// podemos crear un interval con el timer:
// inicia cada segundo pero pasados cada 2 segundos
const timerTwo$ = timer(2000, 1000);

// si fuese síncrono tendríamos primero el console log inicio, los valores y finalmente el console log fin
console.log("inicio");
// interval$.subscribe(observer);
// timer$.subscribe(observer);
console.log("fin");

const hoyEn5 = new Date(); // ahora

hoyEn5.setSeconds(hoyEn5.getSeconds() + 5);

// creamos la variable con la fecha actual y le sumamos 5 segundos

// ahora creamos el timer
const timerFecha$ = timer(hoyEn5);

timerFecha$.subscribe(observer);
