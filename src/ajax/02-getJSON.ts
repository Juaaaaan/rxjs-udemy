import { ajax } from "rxjs/ajax";

// API para realizar pruebas
const url = "https://httpbin.org/delay/1";

// delay 1 va a hacer un delay de 1

const obs$ = ajax.getJSON(url, {
  "content-type": "application/json",
  token: "123456",
});

obs$.subscribe((value) => console.log("val", value));
