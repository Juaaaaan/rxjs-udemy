import { Observable, Observer } from "rxjs";

// const obs$ =  Observable.create()

//Es una interfaz que define la estructura de un observador
const observer: Observer<string> = {
  next: (value) => console.log("next [observer]", value),
  error: (err) => console.warn("err [observer]", err),
  complete: () => console.info("complete [observer]"),
};

const obs$: Observable<string> = new Observable<string>((subs) => {
  // si le tipamos le estamos diciendo que la información que va a fluir es de tipo string
  subs.next("Hola");
  subs.next("Mundo");

  //   subs.next(1); Aquí typescript nos dice que si le enviamos un number, es erróneo porque le tipamos string

  // forzar el error

  //   const a = undefined;
  //   a.nombre = "Juan";

  subs.complete();
  // tras esto, no se va notificar la emisión de nuevos valores a los subscriptores del observable

  subs.next("No llega a los subscriptores");
});

// obs$.subscribe((resp) => {
//   console.log(resp);
// });

// obs$.subscribe((value) => console.log("next", value));

// Comentamos para ver el observer
// obs$.subscribe({
//   // Podemos definir tres callbacks
//   next: (value) => console.log("next", value),
//   error: (err) => console.warn("error", err),
//   complete: () => console.info("complete"),
// });

obs$.subscribe(observer);
