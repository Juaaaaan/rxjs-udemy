// async scheduler no crea un observable, sino que nos permite planificar ejecuciones de
// tareas y observables en el futuro, es decir, una suscripción

// una suscripción es el producto de un subscribe, es decir, .subscribe()

import { asyncScheduler } from "rxjs";

// las siguientes instrucciones no son observables, solo son operaciones que
// necesitamos ejecutar en un futuro
// setTimeout(() => {}, 5000);
// setInterval(() => {}, 5000);

// estas dos funciones las podemos hacer con el asyncScheduler:
// asyncScheduler.schedule(() => {}, 5000); // setTimeout
// asyncScheduler.schedule(() => {}, 5000, () => {}); // setInterval

// asyncScheduler tiene 2 parámetros: la función a ejecutar y el tiempo de ejecución

const saludar = () => console.log("hola mundo");
const saludar2 = (name: string) => console.log(`Hola ${name}`);

// asyncScheduler.schedule(saludar, 5000);
// para mandar algun valor a la función debemos agregarlo como 3er parámetro
// ese tercer parámetro es el state. State es la información que se comparte
// con la función, por lo tanto, si se requiere un parámetro debe enviarse
// como 3er parámetro
// asyncScheduler.schedule(saludar2, 5000, "Juan");

// el primer parámetro donde se informa la función no puede ser una función de flecha (lambda function)
// la siguiente función por algún casual no va ejecutarse después de los 3 segundos...
// asyncScheduler.schedule(
//   function (state) {
//     console.log(state);

//   },
//   3000, // cada cuánto se va a ejecutar
//   0, // estado inicial
// );

// vamos a resolver la parte de que solo se llame 1 vez

const subs = asyncScheduler.schedule(
  function (state: number) {
    console.log("state", state);

    // tengo que mandar el nuevo estado, por lo tanto el 3er parámetro no es necesario
    // tengo que llamar a la función de esta forma, this.schedule()...
    this.schedule(state + 1, 1000);
  },
  3000, // cada cuánto se va a ejecutar
  0, // estado inicial
);

// hay que desuscribirse para que no se ejecute en el infinito
// 1ª forma usando un settimeout

// setTimeout(() => {
//   subs.unsubscribe();
// }, 6000);

// 2ª forma

asyncScheduler.schedule(() => subs.unsubscribe(), 6000);

// 3ª forma: usando el operador pipe y take

// import { take } from "rxjs";

// asyncScheduler
//   .schedule(
//     function (state: number) {
//       console.log("state", state);

//       this.schedule(state + 1, 1000);
//     },
//     3000, // cada cuánto se va a ejecutar
//     0, // estado inicial
//   )
//   .pipe(take(4)) // solo se van a ejecutar las primeras 4 emisiones
//   .subscribe((val) => console.log(val));
