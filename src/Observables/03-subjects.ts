import { Observable, Observer, Subject, Subscriber } from "rxjs";

// const obs$ =  Observable.create()

//Es una interfaz que define la estructura de un observador
const observer: Observer<number> = {
  next: (value) => console.log("next:", value),
  error: (err) => console.warn("err:", err),
  complete: () => console.info("complete:"),
};

const interval$ = new Observable<number>((subs) => {
  // emitir números random

  const intervalId = setInterval(() => {
    subs.next(Math.random());
  }, 1000);

  return () => {
    clearInterval(intervalId);
    // No se está destruyendo el intervalo porque el subject$ está suscrito a él.
    // Para destruir el intervalo, necesito destruir la suscripción al subject$.
    // subscription.unsubscribe();
    console.log("intervalo destruido");
  };
});

// características del Subject
// 1. Casteo múltiple: Muchas subscripciones van a estar sujetas a este subject, es decir, observable y va a servir para
// distribuir la misma información a todos los lugares donde esten suscritos o a todos los lugares que lees interese ese
// valor
//
// 2. es un Observer: por lo tanto, tiene los métodos next, error y complete

const subject$ = new Subject<number>();

// interval$.subscribe(Observer);

const subscription = interval$.subscribe(subject$);
// Ahora está con el subject$ enlazado.

// const subs1 = interval$.subscribe((rnd) => console.log("subs1", rnd));
// const subs2 = interval$.subscribe((rnd) => console.log("subs2", rnd));

// Al estar enlazado el interval$ al subject$, puedo suscribirme al subject$ y obtener los valores que emita el interval$.

const subs1 = subject$.subscribe(observer);
const subs2 = subject$.subscribe(observer);

setTimeout(() => {
  subject$.next(10);
  subject$.complete();

  subscription.unsubscribe();
}, 5000);
