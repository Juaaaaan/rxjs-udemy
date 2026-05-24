import { ajax } from "rxjs/ajax";

const url = "https://httpbin.org/delay/1";

// ajax.get(url, {});
// ajax
//   .post(
//     url,
//     {
//       id: 1,
//       name: "pepe",
//     },
//     {
//       "mi-token": "abc123",
//     },
//   )
//   .subscribe((data) => console.log("data", data));

// ajax
//   .put(
//     url,
//     {
//       id: 1,
//       name: "pepe",
//     },
//     {
//       "mi-token": "abc123",
//     },
//   )
//   .subscribe((data) => console.log("data", data));

// ajax
//   .delete(url, {
//     "mi-token": "abc123",
//   })
//   .subscribe((data) => console.log("data", data));

// esto esta bien pero en algunos casos se necesita más dínamismo para determinar si es un post, put...

ajax({
  url,
  method: "GET", // 'GET', 'POST', 'PUT', 'DELETE',
  headers: {
    "mi-token": "abc123",
  },
  body: {
    id: 1,
    name: "pepe",
  },
}).subscribe((data) => console.log("data", data));
