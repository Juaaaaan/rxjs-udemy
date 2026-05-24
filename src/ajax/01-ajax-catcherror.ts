import { catchError, map, of, throwError } from "rxjs";
import { ajax, AjaxError } from "rxjs/ajax";

const url = "https://api.github.com/users?per_page=5";

const manageErrors = (response: Response) => {
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response;
};

const manageErr = (err: AjaxError) => {
  console.warn("error:", err);
  return of([]);
};

const fetchPromise = fetch(url);

// esto va a devolver el body como ReadableStream
// fetchPromise.then((val) => console.log(val)).catch((err) => console.error(err));

// fetchPromise
//   .then((val) => val.json())
//   .then((val) => console.log(val))
//   .catch((err) => console.error(err));

// fetchPromise
//   .then(manageErrors)
//   .then((val) => val.json())
//   .then((val) => console.log(val))
//   .catch((err) => console.error(err));

ajax(url)
  .pipe(
    map((res) => res.response),
    catchError(manageErr),
  )
  .subscribe((users) => console.log("users:", users));
