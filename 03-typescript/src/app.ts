import { findHeroById } from './services/heroe.service';

const hero = findHeroById(1);
console.log(hero?.name || 'No encontrado!!1234');