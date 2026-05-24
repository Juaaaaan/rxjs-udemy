import { first, fromEvent, map, tap } from "rxjs";

const click$ = fromEvent<MouseEvent>(document, "click");

click$
  .pipe(
    tap(() => console.log("tap")),
    map(({ clientX, clientY }) => ({
      clientY,
      clientX,
    })),
    first((ev) => ev.clientY >= 150),
  )
  .subscribe({
    next: (val) => console.log("val", val),
    complete: () => console.log("complete"),
  });
