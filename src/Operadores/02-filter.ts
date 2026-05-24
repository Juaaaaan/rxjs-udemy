import { filter, from, fromEvent, map, of, range } from "rxjs";

interface characterModel {
  tipo: string;
  nombre: string;
}

// range(1, 10)
//   .pipe(filter((value) => value % 2 === 1))
//   .subscribe(console.log);

range(20, 30).pipe(
  filter((value, i) => {
    console.log("index", i);
    if (value % 2 === 1) {
      return true;
    }
    return false;
  }),
);
//   .subscribe(console.log);

const personajes: characterModel[] = [
  {
    tipo: "heroe",
    nombre: "Batman",
  },
  {
    tipo: "heroe",
    nombre: "Robin",
  },
  {
    tipo: "villano",
    nombre: "Joker",
  },
];

// dos tipos de filtrar usando observables

// from(personajes)
//   .pipe(filter((res) => res.tipo === "heroe"))
//   .subscribe((res) => console.log(res));

// const character$ = of(personajes);

// character$
//   .pipe(map((value) => value.filter((res) => res.tipo === 'heroe')))
//   .subscribe((res) => console.log(res));

const keyUp$ = fromEvent<KeyboardEvent>(document, "keyup")
  .pipe(
    // los operadores se ejecutan de arriba hacía abajo, la idea es filtrar lo menos posible en los primeros operadores
    map((event) => event.code),
    filter((valueKey) => valueKey === "Enter"),
  )
  .subscribe((res) => console.log(res));
