import { debounceTime, fromEvent, map, mergeAll, Observable } from "rxjs";
import { ajax } from "rxjs/ajax";
import {
  GithubUser,
  GithubUsersResponse,
} from "../interfaces/github-users.interface";

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

input$
  .pipe(
    // usamos debounceTime para esperar al usuario a que termine de escribir
    debounceTime<KeyboardEvent>(500),
    // mapeamos la respuesta para obtener el valor del imput que hemos creado
    map<KeyboardEvent, string>((event) => event.target["value"]),
    // con ese valor hacemos una llamada a github para obtener los usuarios que nos han llegado
    map<string, Observable<GithubUsersResponse>>((text) =>
      ajax.getJSON<any>(`https://api.github.com/search/users?q=${text}`),
    ),
    // este merge all se suscribirá en caso de tener otro observable y emitirá los valores del último observable
    // cuando se complete, también se completará
    mergeAll(),
    // mapeamos los items ya que solo queremos los items
    map<GithubUsersResponse, GithubUser[]>((val) => val.items),
  )
  // lo único uqe no sabemos es el tipo de dato que estamos recibiendo.
  // sabiendo el tipo de dato, en vez de el any del getJSON, si tuviesemos el modelo, sería mejor
  .subscribe((users) => showUsers(users));
