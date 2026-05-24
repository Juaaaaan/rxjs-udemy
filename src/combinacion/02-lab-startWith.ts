import { endWith, startWith } from "rxjs";
import { ajax } from "rxjs/ajax";

// referencias
const loadingDiv = document.createElement("div");
loadingDiv.classList.add("loading");
loadingDiv.innerHTML = "Loading...";
const body = document.querySelector("body");

// streams

ajax
  .getJSON("https://reqres.in/api/users?delay=3", {
    "x-api-key": "free_user_3EAJ6nciq8X9YzKk6WT1wqlabRY",
  })
  .pipe(startWith(true), endWith(false))
  .subscribe((val) => {
    if (val === true) {
      body.append(loadingDiv);
    } else {
      document.querySelector(".loading").remove();
    }
  });
