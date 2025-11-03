// ============================================================================
// DATOS DE SEED: DESBLOQUEOS
// ============================================================================
// Basado en información oficial de Clash of Clans sobre qué se desbloquea en cada TH

import { DesbloqueoConfig } from './interfaces';

export const DESBLOQUEOS_SEED: DesbloqueoConfig[] = [
  { nivelAyuntamiento: 1, tipoEntidad: 'Edificio', nombres: ['Cuartel', 'Campamento de Ejército'] },
  { nivelAyuntamiento: 1, tipoEntidad: 'Tropa', nombres: ['Bárbaro'] },
  { nivelAyuntamiento: 5, tipoEntidad: 'Edificio', nombres: ['Fábrica de Hechizos'] },
  { nivelAyuntamiento: 5, tipoEntidad: 'Hechizo', nombres: ['Rayo'] },
];

export const DESBLOQUEOS_EXPANDIDOS: DesbloqueoConfig[] = [
  // Town Hall 1
  { nivelAyuntamiento: 1, tipoEntidad: 'Edificio', nombres: ['Cuartel', 'Campamento de Ejército', 'Mina de Oro', 'Recolector de Elixir'] },
  { nivelAyuntamiento: 1, tipoEntidad: 'Tropa', nombres: ['Bárbaro'] },
  
  // Town Hall 2
  { nivelAyuntamiento: 2, tipoEntidad: 'Tropa', nombres: ['Arquera', 'Gigante'] },
  { nivelAyuntamiento: 2, tipoEntidad: 'Edificio', nombres: ['Cuartel Oscuro'] },
  
  // Town Hall 3
  { nivelAyuntamiento: 3, tipoEntidad: 'Tropa', nombres: ['Duende', 'Rompemuros'] },
  
  // Town Hall 4
  { nivelAyuntamiento: 4, tipoEntidad: 'Tropa', nombres: ['Globo'] },
  { nivelAyuntamiento: 4, tipoEntidad: 'Edificio', nombres: ['Laboratorio'] },
  
  // Town Hall 5
  { nivelAyuntamiento: 5, tipoEntidad: 'Tropa', nombres: ['Mago', 'Sanadora'] },
  { nivelAyuntamiento: 5, tipoEntidad: 'Edificio', nombres: ['Fábrica de Hechizos'] },
  { nivelAyuntamiento: 5, tipoEntidad: 'Hechizo', nombres: ['Rayo', 'Curación', 'Furia'] },
  { nivelAyuntamiento: 5, tipoEntidad: 'Heroe', nombres: ['Rey Bárbaro'] },
  
  // Town Hall 6
  { nivelAyuntamiento: 6, tipoEntidad: 'Tropa', nombres: ['Esbirro', 'Montapuercos'] },
  { nivelAyuntamiento: 6, tipoEntidad: 'Hechizo', nombres: ['Salto', 'Veneno'] },
  
  // Town Hall 7
  { nivelAyuntamiento: 7, tipoEntidad: 'Tropa', nombres: ['Dragón', 'Valquiria'] },
  { nivelAyuntamiento: 7, tipoEntidad: 'Edificio', nombres: ['Fábrica de Hechizos Oscuros', 'Almacén de Elixir Oscuro'] },
  { nivelAyuntamiento: 7, tipoEntidad: 'Hechizo', nombres: ['Terremoto', 'Hielo'] },
  { nivelAyuntamiento: 7, tipoEntidad: 'Heroe', nombres: ['Reina Arquera'] },
  
  // Town Hall 8
  { nivelAyuntamiento: 8, tipoEntidad: 'Tropa', nombres: ['P.E.K.K.A', 'Gólem'] },
  { nivelAyuntamiento: 8, tipoEntidad: 'Hechizo', nombres: ['Aceleración'] },
  
  // Town Hall 9
  { nivelAyuntamiento: 9, tipoEntidad: 'Tropa', nombres: ['Bruja', 'Sabueso de Lava'] },
  { nivelAyuntamiento: 9, tipoEntidad: 'Hechizo', nombres: ['Esqueleto'] },
  { nivelAyuntamiento: 9, tipoEntidad: 'Heroe', nombres: ['Gran Centinela'] },
  
  // Town Hall 10
  { nivelAyuntamiento: 10, tipoEntidad: 'Tropa', nombres: ['Baby Dragón', 'Minero'] },
  { nivelAyuntamiento: 10, tipoEntidad: 'Hechizo', nombres: ['Clon'] },
  
  // Town Hall 11
  { nivelAyuntamiento: 11, tipoEntidad: 'Tropa', nombres: ['Dragón Eléctrico'] },
  { nivelAyuntamiento: 11, tipoEntidad: 'Hechizo', nombres: ['Invisibilidad', 'Murciélago'] },
  { nivelAyuntamiento: 11, tipoEntidad: 'Heroe', nombres: ['Campeona Real'] },
  
  // Town Hall 12
  { nivelAyuntamiento: 12, tipoEntidad: 'Tropa', nombres: ['Yeti', 'Lanzarrocas'] },
  
  // Town Hall 13
  { nivelAyuntamiento: 13, tipoEntidad: 'Tropa', nombres: ['Jinete de Dragón', 'Cazadora de Héroes'] },
  { nivelAyuntamiento: 13, tipoEntidad: 'Animal', nombres: ['L.A.S.S.I'] },
  { nivelAyuntamiento: 13, tipoEntidad: 'Edificio', nombres: ['Caseta de Animales'] },
  
  // Town Hall 14
  { nivelAyuntamiento: 14, tipoEntidad: 'Animal', nombres: ['Búho Eléctrico', 'Mighty Yak', 'Unicornio'] },
  
  // Town Hall 15
  { nivelAyuntamiento: 15, tipoEntidad: 'Animal', nombres: ['Frosty', 'Fénix', 'Perro de Piedra', 'Dragón Barbudo'] },
];


