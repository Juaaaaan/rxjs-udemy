import { fromEvent, map, takeWhile } from "rxjs";

const click$ = fromEvent<MouseEvent>(document, "click");

click$
  .pipe(
    map(({ x, y }) => ({
      x,
      y,
    })),
    takeWhile(({ y }) => y <= 150, true),
  )
  .subscribe({
    next: (val) => console.log("val", val),
    complete: () => console.log("complete"),
  });
