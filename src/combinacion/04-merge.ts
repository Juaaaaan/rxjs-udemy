import { fromEvent, merge, pluck } from "rxjs";

const keyUp$ = fromEvent(document, "keyup");
const click$ = fromEvent(document, "click");

merge(keyUp$.pipe(pluck("type")), click$.pipe(pluck("type"))).subscribe((val) =>
  console.log("val", val),
);
