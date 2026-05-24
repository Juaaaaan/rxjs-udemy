// el reduce es como una bola de nieve que sale desde lo alto de una montaña
// y que cuanto más va rodando, más grande se hace y no sabemos que tan grande va a ser hasta que llega al final

import { interval, reduce, take, tap } from "rxjs";

const number = [1, 2, 3, 4, 5];

const totalReducer = (accumulator: number, currentValue: number) =>
  accumulator + currentValue;

const totalNumber = number.reduce(totalReducer, 0);
// console.log("arr total", totalNumber);

interval(500)
  // el interval es un observable que emite valores cada cierto tiempo y el primer valor que emite es 0
  // el take completa el observable después de la cantidad de veces que especifiquemos dentro de el
  .pipe(take(6), tap(console.log), reduce(totalReducer))
  // solo hay 1 problema con mi operador reduce.
  // seguramente necesitemos el valor acomulado en el momento de la emisión, es decir,
  // cuando interval emite un valor en ese preciso instante yo necesite el valor acomulado y trabajar con el
  // si eso es así, el reduce no sirve
  .subscribe({
    next: (res) => console.log("next", res),
    complete: () => console.log("completado"),
  });
