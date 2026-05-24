import { of, take } from "rxjs";

const numbers$ = of(1, 2, 3, 4, 5);

// siempre esta bien poner el take(1) por si llamamos a un endpoint y que se complete solo
// también se suele usar first(); que es similar a take(1) pero con un condicional
// funciona bien por ejemplo cuando en un componente tenemos que coger
// algo de los parametros de la ruta de URL (en angular)

// para este caso, vamos a enviarle al observable 5 valores con el of
// si le ponemos un take(2) nos cogerá los dos primeros valores y se completará el observable
numbers$.pipe(take(2)).subscribe({
  next: (val) => console.log("val", val),
  complete: () => console.log("complete"),
});
