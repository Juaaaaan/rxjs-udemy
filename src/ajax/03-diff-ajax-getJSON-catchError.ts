import { catchError, of } from "rxjs";
import { ajax, AjaxError } from "rxjs/ajax";

// API para realizar pruebas
const url = "https://httpbin.org/delayoo/1";
// const url = "https://httpbin.org/delay/1";

const errManager = (err: AjaxError) => {
  console.warn("error", err.message);
  return of({
    ok: false,
    usuarios: [],
  });
};

// delay 1 va a hacer un delay de 1

// const obs$ = ajax
//   .getJSON(url, {
//     "content-type": "application/json",
//     token: "123456",
//   })
//   .pipe(catchError(errManager));

// const obs2$ = ajax(url).pipe(catchError(errManager));

// ¿Cual es la diferencia entre getJSON y ajax?

// - getJSON tenemos la información propiamente de la respuesta
// - ajax tenemos tenemos más información de la response, request, evento, statuscode... etc.
// RxJS nos ofrece diferentes formas para usar tantos métodos diferentes como queramos

const obs$ = ajax.getJSON(url, {
  "content-type": "application/json",
  token: "123456",
});

const obs2$ = ajax(url);

// si yo no hago el catchError no va a completar el observable en caso de fallar
// si implementamos catchError se dispara el next y se completa

obs$.pipe(catchError(errManager)).subscribe({
  next: (val) => console.log("obs$", val),
  error: (err) => console.warn(err),
  complete: () => console.log("completado obs$"),
});
obs2$.subscribe((val) => console.log("obs2$", val));
