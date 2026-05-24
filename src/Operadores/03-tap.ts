import { map, range, tap } from "rxjs";

const numeros$ = range(1, 5);

// que hace el puto TAP que lo veo en muchos sitios
// bastante útil para depurar. Mirar documentación de la guía que tengo en claude para entrevistas

numeros$
  .pipe(
    tap((x) => {
      console.log("antes", x);
      //   return 100; // este 100 no hace nada ya que aunque esté explícito no cambia el flujo de información
    }),
    map((value) => (value * 10).toString()),
    // Ahora en el tap vamos a crear un partial observer
    tap({
      // el next se va a ejecutar cada vez que reciba el siguiente valor
      next: (val) => console.log("despues", val),
      // el complete se va a ejecutar cuando el observable se complete
      complete: () => console.log("se terminó todo"),
    }),
  )
  .subscribe((val) => console.log("subs", val));
