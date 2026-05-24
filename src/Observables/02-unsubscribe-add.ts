import { Observable, Observer, Subscriber } from "rxjs";

// const obs$ =  Observable.create()

//Es una interfaz que define la estructura de un observador
const observer: Observer<number> = {
  next: (value) => console.log("next:", value),
  error: (err) => console.warn("err:", err),
  complete: () => console.info("complete:"),
};

const interval$ = new Observable<number>((subs) => {
  let startCount = 0;

  const interval = setInterval(() => {
    subs.next(startCount);
    startCount++;
    console.log(startCount);
  }, 1000);

  setTimeout(() => {
    subs.complete();
  }, 2500);

  return () => {
    clearInterval(interval);
    console.log("intervalo destruido");
  };
});

// const subscription = interval$.subscribe((numCount) => console.log(numCount));
// const subscription_1 = interval$.subscribe((numCount) => console.log(numCount));
// const subscription_2 = interval$.subscribe((numCount) => console.log(numCount));

const subscription = interval$.subscribe(observer);
const subscription_1 = interval$.subscribe(observer);
const subscription_2 = interval$.subscribe(observer);

subscription.add(subscription_1.add(subscription_2));
// se hace así pero se hace mejor con operadores

setTimeout(() => {
  // Método clasico para ir subscripcion a subscripción desuscribiendonos pero podemos modificarlo
  // subscription.unsubscribe();
  // subscription_1.unsubscribe();
  // subscription_2.unsubscribe();

  // usando add() en las subscripciones puedo desuscribirme de todas las subscripciones con una sola llamada
  subscription.unsubscribe();

  console.log("terminó");
}, 3000);
