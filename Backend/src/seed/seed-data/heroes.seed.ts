// ============================================================================
// DATOS DE SEED: HÉROES
// ============================================================================

import { HeroeSeed } from './interfaces';

export const HEROES_SEED: HeroeSeed[] = [
  { 
    nombre: 'Rey Bárbaro', 
    tipoRecurso: 'Elixir Oscuro', 
    portada: 'https://clashofclans.fandom.com/wiki/Barbarian_King',
    nivelMaximo: 95,
    nivelAyuntamientoDesbloqueo: 7,
    vida: 5000,
    habilidades: [
      {
        nombre: 'Furia del Rey',
        descripcion: 'Aumenta el daño y velocidad de ataque del Rey Bárbaro',
      },
    ],
  },
  { 
    nombre: 'Reina Arquera', 
    tipoRecurso: 'Elixir Oscuro', 
    portada: 'https://clashofclans.fandom.com/wiki/Archer_Queen',
    nivelMaximo: 95,
    nivelAyuntamientoDesbloqueo: 9,
    vida: 3000,
    habilidades: [
      {
        nombre: 'Manto Real',
        descripcion: 'La Reina Arquera se vuelve invisible y se cura',
      },
    ],
  },
  { 
    nombre: 'Gran Centinela', 
    tipoRecurso: 'Elixir', 
    portada: 'https://clashofclans.fandom.com/wiki/Grand_Warden',
    nivelMaximo: 60,
    nivelAyuntamientoDesbloqueo: 11,
    vida: 4000,
    habilidades: [
      {
        nombre: 'Aura Eterna',
        descripcion: 'Protege a las tropas cercanas con un escudo',
      },
    ],
  },
  { 
    nombre: 'Campeona Real', 
    tipoRecurso: 'Elixir Oscuro', 
    portada: 'https://clashofclans.fandom.com/wiki/Royal_Champion',
    nivelMaximo: 30,
    nivelAyuntamientoDesbloqueo: 13,
    vida: 4500,
    habilidades: [
      {
        nombre: 'Escudo Real',
        descripcion: 'Lanza su escudo que rebota entre enemigos',
      },
    ],
  },
];


