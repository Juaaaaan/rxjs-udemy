import { fromEvent, map, mapTo, pluck, range } from "rxjs";

// range(1, 5)
//   .pipe(map<number, string>((res) => (res * 10).toString()))
//   .subscribe(console.log);

const keyUp$ = fromEvent<KeyboardEvent>(document, "keyup");

const keyUpCode$ = keyUp$.pipe(map((key) => key.code));

// PLUCK está deprecado pero esta bien saberlo
// const keyUpPluck$ = keyUp$.pipe(pluck("key"));
const keyUpPluck$ = keyUp$.pipe(pluck("target", "baseURI"));

// MapTo está deprecado pero está bien saberlo
const keyUpMapTo$ = keyUp$.pipe(mapTo("tecla presionada"));

keyUpCode$.subscribe((code) => console.log("map", code));
keyUpPluck$.subscribe((code) => console.log("pluck", code));
keyUpMapTo$.subscribe((code) => console.log("mapTo", code));
