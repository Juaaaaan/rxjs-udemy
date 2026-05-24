import { endWith, of, startWith } from "rxjs";

// el of es síncrono y lo va a hacer antes de emitir el 1
const numbers$ = of(1, 2, 3).pipe(
  startWith("a", "b", "c"),
  endWith("x", "y", "z"),
);

numbers$.subscribe((val) => console.log("val", val));
