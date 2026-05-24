import { fromEvent, map, switchMap } from "rxjs";
import { ajax } from "rxjs/ajax";
import { GithubUser } from "../interfaces/github-users.interface";

// referencias
const body = document.querySelector("body");
const textInput = document.createElement("input");
const orderList = document.createElement("ol");

body.append(textInput, orderList);

// helpers - para colocar info en el html

const showUsers = (githubUsers: GithubUser[]) => {
  orderList.innerHTML = "";
  console.log(githubUsers);

  for (const users of githubUsers) {
    const li = document.createElement("li");
    const img = document.createElement("img");
    img.src = users.avatar_url;

    const anchor = document.createElement("a");
    anchor.href = users.html_url;
    anchor.text = "Show page";
    anchor.target = "_blank";

    li.append(img, users.login, " ", anchor);

    orderList.append(li);
  }
};

body.append(orderList);

// streams
const input$ = fromEvent<KeyboardEvent>(document, "keyup");

// input$.pipe(
//   debounceTime<KeyboardEvent>(500),

//   map<KeyboardEvent, string>((event) => event.target["value"]),

//   mergeMap<string, Observable<GithubUsersResponse>>((text) =>
//     ajax.getJSON<any>(`https://api.github.com/search/users?q=${text}`),
//   ),
//   map<GithubUsersResponse, GithubUser[]>((val) => val.items),
// );

//   .subscribe((users) => showUsers(users));

const url = "https://httpbin.org/delay/1?arg=";

// input$
//   .pipe(
//     // debounceTime(500),
//     map(
//       (val) => val.target["value"],
//       // si vamos a tener muchas llamadas no es bueno usar mergeMap ya que este
//       // se suscribe a cuantos observables reciba / emita
//       // para este caso sin el debounceTime, es mejor usar switchMap
//       mergeMap((text) => ajax.getJSON(url + text)),
//     ),
//   )
//   .subscribe(console.log);

input$
  .pipe(
    // debounceTime(500),
    map(
      (val) => val.target["value"],
      // si vamos a tener muchas llamadas no es bueno usar mergeMap ya que este
      // se suscribe a cuantos observables reciba / emita
      // para este caso sin el debounceTime, es mejor usar switchMap

      // switchMap cancela la suscripción anterior y se suscribe a la nueva,
      // por lo que solo tendremos una suscripción activa en todo momento

      // si tenemos que pintar algo en el html, solo lo haríamos una vez
      switchMap((text) => ajax.getJSON(url + text)),
    ),
  )
  .subscribe(console.log);
