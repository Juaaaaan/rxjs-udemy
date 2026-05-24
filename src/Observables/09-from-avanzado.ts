import { of, from } from "rxjs";
// of -> toma argumentos y genera una secuencia
// from -> crea un observable en base a un array, obj, promise, iterable, observable...

const observer = {
  next: (val) => console.log("next", val),
  complete: () => console.log("complete"),
};

// iterable -> concepto para obtener valores de forma secuencial

// esta función me devuelve un generador, es un tipo de iterable
// para diferenciarlo de una función normal, se pone un * al inicio
// dentro del generador se usa yield para emitir valores
const miGenerador = function* () {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
};

const miIterable = miGenerador();

// tradicionalmente lo puedo hacer con un for
// for (let i of miIterable) {
//   console.log(i);
// }

// puede ser algo más tedioso usar from con generadores, pero al convertirlo a un observable obtenemos beneficios
// como la posibilidad de usar los operadores de rxjs.

from(miIterable).subscribe(observer);

// const sourceFrom$ = from([1, 2, 3, 4, 5]);
// const sourceOf$ = of([1, 2, 3, 4, 5]);

// sourceFrom$.subscribe(observer);
// con el of, me va a mostrar la secuencia del tiron. Si no quiero mostrar la secuencia del tirón tengo
// que usar el spread (...);
//
// al usar el spread con Of tenemos el mismo comporamiento que usando From

// const sourceOf$ = of(...[1, 2, 3, 4, 5]);
// sourceOf$.subscribe(observer);

// Ahora vamos a probar enviando un string, algo que no sea iterable

// const sourceFrom$ = from("fernando");
// sourceFrom$.subscribe(observer);

// lo que va a hacer es mostrar tantos next como length tenga el string

// por el contrario, si uso of, me va a devolver un único next con los valores
// const sourceOf$ = of("fernando");
// sourceOf$.subscribe(observer);

// ---------------

// vamos a hacerlo con una promise
const source$ = from(fetch("https://api.github.com/users/klerith"));

// source$.subscribe(async (resp) => {
//   console.log(resp.ok);

//   const data: Promise<any> = await resp.json();
//   console.log({ data });
// });

// source$.subscribe(observer);
