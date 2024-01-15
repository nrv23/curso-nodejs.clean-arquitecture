import heores from '../data/heroes';

export const findHeroById = (id: number) =>
    heores.find(heroe => heroe.id === id);