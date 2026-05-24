import { combineLatest, fromEvent, merge, pluck } from "rxjs";

// const keyUp$ = fromEvent(document, "keyup");
// const click$ = fromEvent(document, "click");

// combineLatest(keyUp$.pipe(pluck("type")), click$.pipe(pluck("type"))).subscribe(
//   (val) => console.log("val", val),
// );

const input1 = document.createElement("input");
const input2 = document.createElement("input");

input1.placeholder = "email@email.com";
input2.placeholder = "***";
input2.type = "password";

document.querySelector("body").append(input1, input2);

//helper

const getInputStream = (el: HTMLElement) =>
  fromEvent<KeyboardEvent>(el, "keyup").pipe(
    pluck<KeyboardEvent>("target", "value"),
  );

combineLatest(getInputStream(input1), getInputStream(input2)).subscribe(
  (val) => console.log("val", val),
  //   ([email, password]) => {
  //     console.log("email", email);
  //     console.log("password", password);
  //   },
);
