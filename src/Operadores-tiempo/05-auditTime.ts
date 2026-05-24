import { auditTime, fromEvent, map, tap } from "rxjs";

const click$ = fromEvent<MouseEvent>(document, "click");

click$
  .pipe(
    map(({ clientX, clientY }) => ({ clientX, clientY })),
    tap((el) => console.log("tap", el)),
    auditTime(2000),
  )
  .subscribe((val) => console.log("click", val));
