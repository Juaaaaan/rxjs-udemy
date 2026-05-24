import { endWith, interval, map, startWith, take, tap } from "rxjs";

/**
 * Ejercicio: Realizar una cuenta regresiva
 * empezando de 7
 */

// Salida esperada ===
// 7
// 6
// 5
// 4
// 3
// 2
// 1
// 0

(() => {
  const inicio = 7;
  const countdown$ = interval(700).pipe(
    // 0...1...2...3...4...5...6...7
    // Usar los operadores necesarios
    // para realizar la cuenta regresiva
    map((val) => {
      return inicio - val;
    }),
    take(inicio + 1),
  );

  // No tocar esta línea ==================
  countdown$.subscribe(console.log); // =
  // ======================================
})();
