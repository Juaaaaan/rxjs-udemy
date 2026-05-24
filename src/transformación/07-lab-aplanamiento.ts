// creando un formulario

import {
  catchError,
  exhaustMap,
  fromEvent,
  map,
  mergeMap,
  of,
  pluck,
  switchMap,
  tap,
} from "rxjs";
import { ajax } from "rxjs/ajax";

// helper

const httpRequestLogin = (userPassword) =>
  ajax
    .post("https://reqres.in/api/login?delay=1", userPassword, {
      "x-api-key": "free_user_3EAJ6nciq8X9YzKk6WT1wqlabRY",
    })
    .pipe(
      pluck("response", "token"),
      catchError((err) => {
        console.warn("error", err);
        return of("xxx");
      }),
    );

const form = document.createElement("form");
const inputEmail = document.createElement("input");
const inputPass = document.createElement("input");
const submitBtn = document.createElement("button");

// config
inputEmail.type = "email";
inputEmail.placeholder = "Email";
inputEmail.value = "eve.holt@reqres.in";

inputPass.type = "password";
inputPass.placeholder = "password";
inputPass.value = "cityslicka";

submitBtn.innerHTML = "Submit";

form.append(inputEmail, inputPass, submitBtn);

document.querySelector("body").append(form);

// streams
const submitForm$ = fromEvent<Event>(form, "submit").pipe(
  tap((ev) => ev.preventDefault()),
  map((ev) => ({
    email: ev.target[0].value,
    password: ev.target[1].value,
  })),
  // los siguientes casos de aplanamiento son a la hora de hacer click al botón submit veces repetidas, es decir,
  // dando varios clicks:
  //   mergeMap(httpRequestLogin), // cualquier cantidad de suscripciones internas activas simultáneamente
  //   switchMap(httpRequestLogin), // va a cancelar cualquier otro observable que esté pendiente dentro del switchMap
  // y solo regresa la última
  exhaustMap(httpRequestLogin), // solo una petición se ha lanzado aunque presionemos 5 veces el botón.
  // cuando llegó al exhaustMap(observable), ahí empezó a ignorar todas las peticiones después de la primera. Cuando
  // tenemos la respuesta, ya si nos va a lanzar la petición ya que no hay ninguna suscripción interna pendiente
);

submitForm$.subscribe((resp: any) => {
  console.log(resp);
});
