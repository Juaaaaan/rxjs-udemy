import { delay, forkJoin, interval, of, take } from "rxjs";

const numbers$ = of(1, 2, 3, 4);
const interval$ = interval(1000).pipe(take(3)); // 0...1...2
const letters$ = of("a", "b", "c").pipe(delay(3500));

// forkJoin(numbers$, interval$, letters$).subscribe((value) =>
//   console.log("val", value),
// );

// forkJoin(numbers$, interval$, letters$).subscribe((res) => {
//   console.log("numbers", res[0]);
//   console.log("interval", res[1]);
//   console.log("letters", res[2]);
// });

forkJoin({ num: numbers$, int: interval$, letter: letters$ }).subscribe(
  (res) => {
    console.log("res", res);
    // console.log('res', letters$)
  },
);
