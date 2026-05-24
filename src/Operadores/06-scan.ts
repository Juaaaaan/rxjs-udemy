import { from, map, reduce, scan } from "rxjs";

const numeros = [1, 2, 3, 4, 5];

const totalAcc = (acc, curr) => acc + curr;

// reduce
from(numeros)
  .pipe(reduce(totalAcc, 0))
  .subscribe((res) => console.log(res));

// scan
from(numeros)
  .pipe(scan(totalAcc, 0))
  .subscribe((res) => console.log(res));

// redux -> manejar el estado global de mi aplicación en un único objeto
// vamos a hacer un ejemplo que simule que cada una de las peticiones se ejecutaron en momentos diferentes de tiempo
interface UserModel {
  id?: string;
  auth?: boolean;
  token?: string;
  age?: number;
}

const user: UserModel[] = [
  {
    id: "fer",
    auth: false,
    token: null,
  },
  {
    id: "fer",
    auth: true,
    token: "abc",
  },
  {
    id: "fer",
    auth: true,
    token: "acb123",
  },
];

// el state lo que quiero es que me mantenga todas las modificaciones que
// cambian el estado siendo el estado cada línea de user
const state$ = from(user).pipe(
  scan<UserModel, UserModel>(
    (acc, cur) => {
      return { ...acc, ...cur };
    },
    { age: 33 } as UserModel,
  ),
);

const id$ = state$.pipe(map((state) => state));

id$.subscribe(console.log);
