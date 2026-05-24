import { fromEvent, interval, sample } from "rxjs";

const interval$ = interval(500);
const click$ = fromEvent(document, "click");

// Sample es como decir: obtengo la muestra una vez ocurra algo, es decir, como está el primer observable
// en el momento que yo hago click

interval$.pipe(sample(click$)).subscribe((val) => console.log("interval", val));
