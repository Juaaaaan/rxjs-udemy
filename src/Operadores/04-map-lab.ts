// laboratorio de barra de progreso
// basado en el scroll del usuario se requiere realizar una barra de progreso en posición horizontal arriba de la pantalla

import { from, fromEvent, map, of, tap } from "rxjs";

// que vaya cargando en función de que el usuario vaya leyendo el contenido de la web
const texto = document.createElement("div");

texto.innerHTML = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur interdum ullamcorper enim, aliquet bibendum diam placerat vel. Quisque leo orci, scelerisque sit amet massa quis, egestas bibendum nunc. Vivamus sit amet eleifend ligula, vitae sodales lectus. Donec orci tellus, dignissim vel interdum ut, maximus vitae mi. Sed rutrum congue tincidunt. Aenean tincidunt, nisi consectetur euismod volutpat, mi nulla malesuada sapien, et imperdiet justo lorem nec ligula. Proin ornare fringilla justo feugiat dictum. Sed in tellus faucibus, efficitur quam eget, tempus nulla. Duis vestibulum, dui et rutrum congue, neque nisl scelerisque leo, nec dapibus dolor ex eget diam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam erat volutpat. Sed feugiat dui non nisi dignissim aliquam.
<br/><br/>
Nullam sollicitudin neque in sodales consequat. Pellentesque facilisis, nunc eu auctor ornare, est felis tempus est, in posuere purus urna a sapien. Nullam lacinia pharetra purus, sit amet consequat elit scelerisque vitae. Pellentesque sapien orci, tristique sed enim sed, pretium rhoncus est. Suspendisse hendrerit magna eu odio ultricies tincidunt. Nullam luctus enim interdum, elementum orci at, suscipit urna. Fusce sed volutpat enim. Etiam congue odio in nibh tempor, eget malesuada lectus interdum. Sed et pellentesque mauris. In vitae iaculis arcu. Morbi at ornare tellus, non fringilla justo.
<br/><br/>
Etiam sagittis pellentesque augue, eget molestie urna molestie sed. Praesent in porttitor mauris. Nullam non libero metus. Etiam venenatis aliquet maximus. Fusce vulputate, turpis quis interdum viverra, dui augue dapibus lectus, fermentum sodales magna augue ac mauris. Cras eu mi lacinia, molestie sem et, tempus dolor. Quisque tortor ipsum, interdum eget accumsan sit amet, finibus eget elit. Proin ultrices ipsum est, id blandit risus sodales ac. Vivamus ac orci vitae turpis efficitur iaculis. Sed gravida consectetur felis ut consequat. Nunc feugiat ipsum placerat, scelerisque mauris at, vestibulum sem. Pellentesque scelerisque lorem lorem, eu aliquam justo hendrerit at. Suspendisse interdum tortor massa, non lobortis leo tincidunt vel. Vivamus gravida lectus ac nibh malesuada, et pharetra augue bibendum.
<br/><br/>
Cras at sodales elit, accumsan efficitur turpis. Curabitur gravida ligula at augue blandit rutrum rutrum nec diam. Sed ut ullamcorper metus. Sed convallis orci sed nunc ornare imperdiet. Aenean scelerisque nec purus at imperdiet. Fusce vestibulum tincidunt sodales. Mauris ac diam mauris.
<br/><br/>
Maecenas tellus massa, congue imperdiet nisl non, dictum pharetra urna. In semper, ex a porttitor tempus, magna lectus scelerisque tortor, vel commodo lectus massa ac quam. Integer suscipit id ipsum ut bibendum. Quisque a massa eu ligula sodales lobortis. Mauris id euismod quam. Mauris vitae ullamcorper odio. Morbi vel euismod ligula, sit amet hendrerit diam. Duis congue rutrum ex. Donec et sem ante.
<br/><br/>
`;

const body = document.querySelector("body");
body.append(texto);

const progressBar = document.createElement("div");
progressBar.setAttribute("class", "progress-bar");

body.append(progressBar);

// función que haga el cálculo

const calculateScrollPercentage = (event) => {
  // nos interesan el scrollTop, clientHeight y scrollHeight de mi target -> documentElement
  const { scrollHeight, scrollTop, clientHeight } =
    event.target.documentElement;
  // to -> x = scrollHeight - clientHeight -> scrollTop / x * 100 (para porcentaje) -> me queda un porcentaje.
  return (scrollTop / (scrollHeight - clientHeight)) * 100;
};

// 1. nos tenemos que suscribir al scroll de mi html

// streams
const scroll$ = fromEvent<Event>(document, "scroll");
// scroll$.subscribe((res) => console.log({ res }));

// 2. Después de suscribirnos tenemos que crearnos un procedimiento que me regrese cual es el % del progressbar

// clientHeight -> es el ancho de lo que somos capaces de desplegar en la pantalla sin necesidad de hacer scroll
// scrollHeight -> todo el contenido html de toda la página incluyendo lo que no se ve
// scrollTop -> distancia que se ha hecho scroll desde la parte superior de la página
// scrollTop + clientHeight = scrollHeight
// scrollHeight - clientHeight = píxeles que quedan por verse haciendo scroll
// jugando con el scrollTop que nos indica cuanto scroll hemos hecho y lo dividimos entre el scrollHeight - clientHeight
// sabemos cuanto nos queda y/o cuando llevamos
// por tanto -> x = scrollHeight - clientHeight -> scrollTop / x * 100 (para porcentaje) -> me queda un porcentaje.
// ese porcentaje nos indica por donde vamos en la pantalla
const progress$ = scroll$.pipe(
  map((event) => calculateScrollPercentage(event)),
  //   tap(console.log),
);

progress$.subscribe((per) => {
  progressBar.style.width = `${per}%`;
});
