import { distinctUntilChanged, distinctUntilKeyChanged, from } from "rxjs";

interface Character {
  name: string;
}

const characters: Character[] = [
  {
    name: "megaman",
  },
  {
    name: "megaman",
  },
  {
    name: "Zero",
  },
  {
    name: "Dr. Willy",
  },
  {
    name: "X",
  },
  {
    name: "X",
  },
  {
    name: "Zero",
  },
];

// para un objeto u otra cosa que no sea primitivo, necesitas indicarle alguna propiedad de ese objeto o cosa distinto
// primitivo
// from(characters).pipe(distinct((character) => character.name)).subscribe(console.log);

// Ahora si uso el distinctUnitlChanged() vacío no va a hacer nada porque estoy apuntando a diferentes
// espacios de memoria al tratar con un objecto
from(characters).pipe(distinctUntilKeyChanged("name")).subscribe(console.log);
