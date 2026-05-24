# ReactiveX - RxJS: De cero hasta los detalles

> Apuntes y proyecto de práctica del curso de [Fernando Herrera](https://www.udemy.com/user/fernando-herrera/) en Udemy.
> Repositorio: [rxjs-udemy](https://github.com/Juaaaaan/rxjs-udemy)

---

## Índice

1. [¿Qué es RxJS?](#qué-es-rxjs)
2. [Fundamentos](#fundamentos)
3. [Observables](#observables)
4. [Subscribers](#subscribers)
5. [Operadores de creación](#operadores-de-creación)
6. [Operadores de transformación](#operadores-de-transformación)
7. [Operadores de filtrado](#operadores-de-filtrado)
8. [Operadores de tiempo](#operadores-de-tiempo)
9. [Operadores de aplanamiento](#operadores-de-aplanamiento)
10. [Operadores de combinación](#operadores-de-combinación)
11. [Operadores de utilidad](#operadores-de-utilidad)
12. [Manejo de errores](#manejo-de-errores)
13. [Ejecución del proyecto](#ejecución-del-proyecto)

---

## ¿Qué es RxJS?

RxJS (Reactive Extensions for JavaScript) es una librería para programación reactiva basada en tres patrones principales:

| Patrón | Descripción |
|---|---|
| **Observer Pattern** | Define una dependencia uno-a-muchos entre objetos, de forma que cuando uno cambia su estado, notifica ese cambio a todos sus dependientes |
| **Iterator Pattern** | En POO, define una interfaz con los métodos necesarios para acceder secuencialmente a un grupo de objetos de una colección (`primero()`, `siguiente()`, `hayMas()`, `elementoActual()`) |
| **Programación funcional** | Funciones con tareas específicas que reciben argumentos y no mutan la información |

### Beneficios de la programación reactiva

1. Evitar el "Callback Hell"
2. Trabajar de forma simple tareas síncronas y asíncronas
3. Uso de operadores para reducir y simplificar el trabajo
4. Es fácil transformar los flujos (streams) de información
5. Código más limpio y fácil de leer
6. Fácil de implementar
7. Fácil anexar procedimientos sin alterar el producto final

### Tipos de operadores

Los operadores en RxJS sirven para:
- **Transformar** Observables (`map`, `group`, `scan`...)
- **Filtrar** Observables (`filter`, `distinct`, `skip`, `debounce`...)
- **Combinar** Observables
- **Crear** nuevos Observables

---

## Fundamentos

### Cold Observable vs Hot Observable

- **Cold Observable**: la data es producida **dentro** del observable en sí mismo
- **Hot Observable**: la data es producida **fuera** del observable (ej: eventos del DOM, WebSockets)

---

## Observables

Son la **fuente de información** en RxJS. Sus características:

- Pueden emitir múltiples valores, solo uno o ninguno
- Pueden emitir errores
- Pueden ser infinitos o finitos (completarse)
- Pueden ser síncronos o asíncronos

---

## Subscribers

Los subscribers (observadores) son quienes consumen los datos de un Observable:

- Se subscriben a un observable, estando pendientes de lo que este realiza
- Consumen / observan la data del observable
- Pueden recibir los errores y eventos del observable
- Desconocen todo lo que se encuentra detrás del observable

---

## Operadores de creación

Crean nuevos Observables a partir de datos o eventos.

### `of`

Convierte los argumentos en una secuencia observable.

```typescript
of(1, 2, 3, 4, 5, 6)
// Emite: 1 → 2 → 3 → 4 → 5 → 6 → completa
```

### `from`

Crea un Observable a partir de un array, promesa, iterable o string.

### `fromEvent`

Crea un Observable a partir de eventos del DOM (o Node.js EventEmitter).

```typescript
fromEvent<Event>(document, 'scroll');
// Emite un Event cada vez que se hace scroll
```

### `interval`

Crea un Observable que emite números secuenciales cada cierto intervalo de tiempo.

```typescript
interval(1000);
// Emite: 0 → 1 → 2 → 3 → 4 → 5... (cada 1 segundo)
```

### `timer`

Crea un Observable que empieza a emitir después de un `dueTime` y luego emite números crecientes en cada `period`.

```typescript
timer(2000);
// Espera 2 segundos, luego emite 0
```

### `range`

Crea un Observable que emite una secuencia de números dentro de un rango especificado.

```typescript
range(1, 5);
// Emite: 1 → 2 → 3 → 4 → 5
```

---

## Operadores de transformación

Transforman los valores emitidos por un Observable.

### `map`

Aplica una función a cada valor emitido y retorna el resultado.

```typescript
map(x => x * 10)
// Entrada: 1 → 2 → 3
// Salida:  10 → 20 → 30
```

### `mapTo` *(deprecated en RxJS 7+, usar `map(() => value)`)*

Emite un valor constante dado cada vez que el Observable fuente emite.

```typescript
mapTo('a')
// Entrada: 1 → 2 → 3
// Salida:  'a' → 'a' → 'a'
```

### `pluck`

Extrae una propiedad específica de cada objeto emitido.

```typescript
pluck('v')
// Entrada: {v:1} → {v:2} → {v:3}
// Salida:  1 → 2 → 3
```

### `reduce`

Acumula valores y emite el resultado **solo cuando el Observable se completa** (similar al `Array.reduce`).

```typescript
reduce((acc, curr) => acc + curr, 0)
// Entrada: 1 → 3 → 5 → |
// Salida:  9 → |
```

### `scan`

Como `reduce`, pero emite el valor acumulado **en cada emisión** (no espera a que el Observable complete).

```typescript
scan((acc, cur) => acc + cur, 0)
// Entrada: 1 → 3 → 5
// Salida:  1 → 4 → 9
```

---

## Operadores de filtrado

Filtran los valores emitidos según una condición.

### `filter`

Emite solo los valores que pasan una función predicado.

```typescript
filter(value => value % 2 === 1)
// Entrada: 0 → 1 → 2 → 3 → 4
// Salida:  1 → 3
```

### `first`

Emite solo el primer valor (o el primer valor que cumpla una condición).

```typescript
first()                    // Emite el primer valor y completa
first(x => x >= 10)        // Emite el primer valor >= 10
```

### `take`

Emite solo los primeros N valores y luego completa.

```typescript
take(2)
// Entrada: a → b → c → d → e
// Salida:  a → b → |
```

### `takeUntil`

Emite valores hasta que otro Observable emite un valor.

```typescript
takeUntil(clickBtn$)
// Emite: a → b → c → d → | (al hacer click)
```

### `takeWhile`

Emite valores mientras la condición sea verdadera, luego completa.

```typescript
takeWhile(x => x < 4)
// Entrada: 2 → 3 → 4 → 5 → 6
// Salida:  2 → 3 → |
```

### `skip`

Ignora los primeros N valores emitidos.

```typescript
skip(3)
// Entrada: a → b → c → d → e
// Salida:  d → e
```

### `distinct`

Emite solo valores distintos comparados con **todos los valores anteriores** (nunca repite).

```typescript
distinct()
// Entrada: 1 → 1 → 2 → 3 → 3 → 4 → 1
// Salida:  1 → 2 → 3 → 4
```

### `distinctUntilChanged`

Emite solo cuando el valor es distinto al **inmediatamente anterior**.

```typescript
distinctUntilChanged()
// Entrada: 1 → 2 → 2 → 1 → 3 → 2
// Salida:  1 → 2 → 1 → 3 → 2
```

### `distinctUntilKeyChanged`

Como `distinctUntilChanged`, pero compara por una propiedad específica del objeto.

```typescript
distinctUntilKeyChanged('k')
// Entrada: {k:1} → {k:2} → {k:2} → {k:1} → {k:3}
// Salida:  {k:1} → {k:2} → {k:1} → {k:3}
```

---

## Operadores de tiempo

Controlan el ritmo de emisión basándose en el tiempo.

### `debounceTime`

Emite un valor solo si no han llegado nuevos valores durante el tiempo indicado. Ideal para campos de búsqueda.

```typescript
debounceTime(1000)
// Solo emite si pasa 1 segundo sin nuevas emisiones
// Entrada: a → b → c → ... → d
// Salida:  a (tras 1s) → c (tras 1s) → d (tras 1s)
```

### `throttleTime`

Emite el primer valor y luego ignora los siguientes durante el tiempo indicado. A diferencia de `debounceTime`, emite el **primero** de cada ventana.

```typescript
throttleTime(1000)
// Entrada: a → x → y → ... → b → ... → c → ...
// Salida:  a → b → c (uno cada segundo)
```

### `auditTime`

Ignora los valores emitidos durante el tiempo indicado y emite el **último** valor al final de cada ventana.

```typescript
auditTime(2000)
// Entrada: a → x → y → ... → b → x → ... → c → x
// Salida:  y (tras 2s) → x (tras 2s)
```

### `sampleTime`

Emite el último valor emitido en intervalos de tiempo regulares (muestreo periódico).

```typescript
sampleTime(1000)
// Emite el último valor disponible cada segundo
```

### `sample`

Como `sampleTime`, pero el muestreo lo controla otro Observable (en lugar de un tiempo fijo).

```typescript
sample(click$)
// Emite el último valor del fuente cada vez que click$ emite
```

---

## Operadores de aplanamiento

Transforman valores en Observables y gestionan las suscripciones internas.

### `mergeAll`

Aplana un Observable de Observables, suscribiéndose a todos simultáneamente (sin orden garantizado).

```typescript
mergeAll()
// Operador de aplanamiento (Flattening Operator)
// Suscribe a todos los Observables internos a la vez
```

### `switchMap`

Proyecta cada valor en un Observable y **cancela el anterior** cuando llega uno nuevo. El más usado en Angular para peticiones HTTP.

```typescript
switchMap(() => interval())
// Al llegar x, cancela el Observable de a y empieza el de x
```

### `mergeMap`

Proyecta cada valor en un Observable y los **fusiona todos** sin cancelar los anteriores (concurrencia ilimitada).

```typescript
mergeMap((val) => interval(1000))
// Mantiene todos los Observables internos activos simultáneamente
```

### `concatMap`

Proyecta cada valor en un Observable pero los ejecuta **en secuencia**, esperando a que cada uno complete antes de empezar el siguiente.

```typescript
concatMap(() => interval$.pipe(take(3)))
// Entrada: a → x → r
// Ejecuta: a completo → x completo → r
```

### `exhaustMap`

Proyecta el primer valor en un Observable y **descarta** los nuevos valores mientras el Observable interno esté activo.

```typescript
exhaustMap(() => interval$.pipe(take(3)))
// Entrada: a → x (ignorado) → r
// Solo procesa a, ignora x mientras a no complete
```

---

## Operadores de combinación

Combinan múltiples Observables en uno.

### `forkJoin`

Espera a que **todos** los Observables completen y emite un array con el **último valor** de cada uno. Equivalente a `Promise.all`.

```typescript
forkJoin(obs1$, obs2$, obs3$)
// Espera a que los 3 completen
// Emite: [últimoDeObs1, últimoDeObs2, últimoDeObs3]
```

### `combineLatest`

Combina múltiples Observables y emite cada vez que **cualquiera** de ellos emite, usando el último valor de cada uno.

```typescript
combineLatest(obs1$, obs2$)
// Emite: [últimoObs1, últimoObs2] en cada nueva emisión de cualquiera
```

### `merge`

Fusiona múltiples Observables en uno, emitiendo los valores de todos **en el orden en que llegan** (intercalados por tiempo).

```typescript
merge(obs1$, obs2$)
// Entrada obs1$: a → b → c
// Entrada obs2$: d → e → f
// Salida: a → d → b → e → c → f
```

### `concat`

Concatena Observables **en secuencia**: emite todos los valores del primero, luego del segundo, etc.

```typescript
concat(obs1$, obs2$, obs3$)
// Entrada obs1$: a → b |
// Entrada obs2$: x → y |
// Entrada obs3$: z |
// Salida: a → b → x → y → z
```

### `startWith`

Emite un valor inicial **antes** de que el Observable fuente empiece a emitir.

```typescript
startWith('a')
// Entrada: 1 → 2 → 3
// Salida:  'a' → 1 → 2 → 3
```

### `endWith`

Emite un valor final **después** de que el Observable fuente complete.

```typescript
endWith('s')
// Entrada: 1 → 2 → 3 |
// Salida:  1 → 2 → 3 → 's' |
```

---

## Operadores de utilidad

### `tap`

Permite ejecutar efectos secundarios (side effects) sin alterar los valores del flujo. Muy útil para debugging.

```typescript
tap(x => console.log(x))
// No modifica los valores, solo los "espía"
// Entrada:  0 → 1 → 2 → 3 → 4
// Salida:   0 → 1 → 2 → 3 → 4 (sin cambios)
```

---

## Manejo de errores

### `catchError`

Captura errores en el flujo y permite continuar con un Observable de reemplazo.

```typescript
catchError(atrapaError)
// Fuente: a → b → X (error)
// Con reemplazo: a → b → 1 → 2 → 3
```

---

## Ejecución del proyecto

### Instalación

```bash
npm install
```

### Desarrollo

```bash
npm start
```

El servidor se levanta por defecto en el puerto `8081`. Para cambiarlo, edita el `package.json`:

```json
"start": "webpack serve --mode development --open --port=8081"
```

### Stack

- **TypeScript** — lenguaje principal del proyecto
- **RxJS** — librería de programación reactiva
- **Webpack** — bundler y servidor de desarrollo

---

## Recursos adicionales

- [Documentación oficial de RxJS](https://rxjs.dev)
- [RxMarbles — visualización de operadores](https://rxmarbles.com)
- [Curso en Udemy — Fernando Herrera](https://www.udemy.com/course/rxjs-de-cero-hasta-los-detalles/)
