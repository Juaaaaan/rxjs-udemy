import { fromEvent, interval, skip, takeUntil, tap } from "rxjs";

const button = document.createElement("button");
button.innerHTML = "detener timer";

document.querySelector("body").append(button);

const counter$ = interval(1000);

// const clickBtn$ = fromEvent(button, "click");
const clickBtn$ = fromEvent(button, "click").pipe(
  tap(() => console.log("tap antes de skip")),
  skip(1),
  tap(() => console.log("tap después del skip")),
);

counter$.pipe(takeUntil(clickBtn$)).subscribe({
  next: (val) => console.log("val", val),
  complete: () => console.log("complete"),
});
