// mergeMap vs switchMap

import { fromEvent, interval, mergeMap, switchMap } from "rxjs";

const click$ = fromEvent(document, "click");
const interval$ = interval(1000);

// click$.pipe(mergeMap(() => interval$)).subscribe(console.log);
click$.pipe(switchMap(() => interval$)).subscribe(console.log);

// switchMap -> solo mantiene una suscripción interna activa
// mergeMap -> puede mantener todas las que nosotros necesitemos de manera simultánea
