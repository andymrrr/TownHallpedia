// ============================================================================
// DATOS DE SEED: DESBLOQUEOS
// ============================================================================
// ⚠️ IMPORTANTE: ESTOS DATOS DEBEN SER VERIFICADOS MANUALMENTE
// 
// Fuente oficial: https://www.clash.ninja/guides/how-long-to-max-th
// 
// INSTRUCCIONES PARA COMPLETAR LOS DATOS:
// 1. Ve a https://www.clash.ninja/guides/how-long-to-max-th
// 2. Para cada Town Hall (TH1 a TH17):
//    a. Selecciona el TH en el dropdown "Single Town Hall Level"
//    b. Revisa la lista de mejoras disponibles
//    c. Para cada tropa/edificio/hechizo/héroe/animal:
//       - Si es NUEVO desbloqueo en ese TH: nivelMinimo = 1
//       - Si ya existía en TH anterior: nivelMinimo = nivelMaximo del TH anterior
//       - nivelMaximo = el nivel máximo disponible en ese TH según clash.ninja
//
// EJEMPLO DE LÓGICA:
// - Bárbaro en TH1: nivelMinimo=1, nivelMaximo=2 (nuevo desbloqueo)
// - Bárbaro en TH2: nivelMinimo=2, nivelMaximo=3 (continúa desde TH1, min=2 que era el max de TH1)
// - Bárbaro en TH3: nivelMinimo=3, nivelMaximo=4 (continúa desde TH2, min=3 que era el max de TH2)
//
// NOTA: Los datos actuales en este archivo pueden estar incompletos o incorrectos.
//       DEBES verificar cada valor en clash.ninja antes de usar este seed en producción.

import { DesbloqueoConfig } from './interfaces';

export const DESBLOQUEOS_SEED: DesbloqueoConfig[] = [
  { nivelAyuntamiento: 1, tipoEntidad: 'Edificio', nombres: ['Cuartel', 'Campamento de Ejército'] },
  { nivelAyuntamiento: 1, tipoEntidad: 'Tropa', nombres: ['Bárbaro'] },
  { nivelAyuntamiento: 5, tipoEntidad: 'Edificio', nombres: ['Fábrica de Hechizos'] },
  { nivelAyuntamiento: 5, tipoEntidad: 'Hechizo', nombres: ['Rayo'] },
];

export const DESBLOQUEOS_EXPANDIDOS: DesbloqueoConfig[] = [
  // Town Hall 1
  { 
    nivelAyuntamiento: 1, 
    tipoEntidad: 'Edificio', 
    nombres: ['Cuartel', 'Campamento de Ejército', 'Mina de Oro', 'Recolector de Elixir'],
    nivelMinimo: 1, // Nuevo desbloqueo
    nivelMaximo: 2
  },
  { 
    nivelAyuntamiento: 1, 
    tipoEntidad: 'Tropa', 
    nombres: ['Bárbaro', 'Arquera', 'Duende'],
    nivelMinimo: 1, // Nuevo desbloqueo
    nivelMaximo: 2
  },
  
  // Town Hall 2 - Actualización de niveles máximos de tropas existentes
  { 
    nivelAyuntamiento: 2, 
    tipoEntidad: 'Tropa', 
    nombres: ['Bárbaro', 'Arquera', 'Duende'],
    nivelMinimo: 2, // Continúa desde el máximo del TH1 (2)
    nivelMaximo: 3
  },
  
  // Town Hall 2 - Nuevos desbloqueos
  { 
    nivelAyuntamiento: 2, 
    tipoEntidad: 'Tropa', 
    nombres: ['Gigante'],
    nivelMinimo: 1, // Nuevo desbloqueo
    nivelMaximo: 3
  },
  { 
    nivelAyuntamiento: 2, 
    tipoEntidad: 'Edificio', 
    nombres: ['Cuartel Oscuro'],
    nivelMinimo: 1, // Nuevo desbloqueo
    nivelMaximo: 2
  },
  
  // Town Hall 3 - Actualización de niveles máximos de tropas existentes
  { 
    nivelAyuntamiento: 3, 
    tipoEntidad: 'Tropa', 
    nombres: ['Bárbaro', 'Arquera', 'Duende'],
    nivelMinimo: 3, // Continúa desde el máximo del TH2 (3)
    nivelMaximo: 4
  },
  { 
    nivelAyuntamiento: 3, 
    tipoEntidad: 'Tropa', 
    nombres: ['Gigante'],
    nivelMinimo: 3, // Continúa desde el máximo del TH2 (3)
    nivelMaximo: 4
  },
  { 
    nivelAyuntamiento: 3, 
    tipoEntidad: 'Tropa', 
    nombres: ['Rompemuros'],
    nivelMinimo: 1, // Nuevo desbloqueo
    nivelMaximo: 4
  },
  
  // Town Hall 4 - Actualización de niveles máximos de tropas existentes
  { 
    nivelAyuntamiento: 4, 
    tipoEntidad: 'Tropa', 
    nombres: ['Bárbaro', 'Arquera', 'Duende', 'Gigante', 'Rompemuros'],
    nivelMinimo: 4, // Continúa desde el máximo del TH3 (4)
    nivelMaximo: 5
  },
  { 
    nivelAyuntamiento: 4, 
    tipoEntidad: 'Tropa', 
    nombres: ['Globo'],
    nivelMinimo: 1, // Nuevo desbloqueo
    nivelMaximo: 5
  },
  { 
    nivelAyuntamiento: 4, 
    tipoEntidad: 'Edificio', 
    nombres: ['Laboratorio'],
    nivelMinimo: 1, // Nuevo desbloqueo
    nivelMaximo: 4
  },
  
  // Town Hall 5 - Actualización de niveles máximos de tropas existentes
  { 
    nivelAyuntamiento: 5, 
    tipoEntidad: 'Tropa', 
    nombres: ['Bárbaro', 'Arquera', 'Duende', 'Gigante', 'Rompemuros', 'Globo'],
    nivelMinimo: 5, // ⚠️ CALCULADO: Continúa desde el máximo del TH4 (5) - VERIFICAR
    nivelMaximo: 6
  },
  { 
    nivelAyuntamiento: 5, 
    tipoEntidad: 'Tropa', 
    nombres: ['Mago'],
    nivelMinimo: 1, // ⚠️ CALCULADO: Nuevo desbloqueo - VERIFICAR
    nivelMaximo: 6
  },
  { 
    nivelAyuntamiento: 5, 
    tipoEntidad: 'Edificio', 
    nombres: ['Fábrica de Hechizos'],
    nivelMinimo: 1, // ⚠️ CALCULADO: Nuevo desbloqueo - VERIFICAR
    nivelMaximo: 3
  },
  { 
    nivelAyuntamiento: 5, 
    tipoEntidad: 'Hechizo', 
    nombres: ['Rayo', 'Curación', 'Furia'],
    nivelMinimo: 1, // ⚠️ CALCULADO: Nuevo desbloqueo - VERIFICAR
    nivelMaximo: 5
  },
  { 
    nivelAyuntamiento: 5, 
    tipoEntidad: 'Heroe', 
    nombres: ['Rey Bárbaro'],
    nivelMinimo: 1, // ⚠️ CALCULADO: Nuevo desbloqueo - VERIFICAR
    nivelMaximo: 5
  },
  
  // Town Hall 6 - Actualización de niveles máximos de tropas existentes
  { 
    nivelAyuntamiento: 6, 
    tipoEntidad: 'Tropa', 
    nombres: ['Bárbaro', 'Arquera', 'Duende', 'Gigante', 'Rompemuros', 'Globo', 'Mago'],
    nivelMinimo: 6, // Continúa desde el máximo del TH5 (6)
    nivelMaximo: 7
  },
  { 
    nivelAyuntamiento: 6, 
    tipoEntidad: 'Tropa', 
    nombres: ['Sanadora'],
    nivelMinimo: 1, // Nuevo desbloqueo
    nivelMaximo: 4
  },
  { 
    nivelAyuntamiento: 6, 
    tipoEntidad: 'Hechizo', 
    nombres: ['Salto', 'Veneno'],
    nivelMinimo: 1, // Nuevo desbloqueo
    nivelMaximo: 4
  },
  
  // Town Hall 7 - Actualización de niveles máximos de tropas existentes
  { 
    nivelAyuntamiento: 7, 
    tipoEntidad: 'Tropa', 
    nombres: ['Bárbaro', 'Arquera', 'Duende', 'Gigante', 'Rompemuros', 'Globo', 'Mago'],
    nivelMinimo: 7, // Continúa desde el máximo del TH6 (7)
    nivelMaximo: 8
  },
  { 
    nivelAyuntamiento: 7, 
    tipoEntidad: 'Tropa', 
    nombres: ['Sanadora'],
    nivelMinimo: 4, // Continúa desde el máximo del TH6 (4)
    nivelMaximo: 5
  },
  { 
    nivelAyuntamiento: 7, 
    tipoEntidad: 'Tropa', 
    nombres: ['Dragón', 'Esbirro', 'Montapuercos'],
    nivelesMinimos: {
      'Dragón': 1, // Nuevo desbloqueo
      'Esbirro': 1, // Nuevo desbloqueo
      'Montapuercos': 1 // Nuevo desbloqueo
    },
    nivelesMaximos: {
      'Dragón': 3,
      'Esbirro': 3,
      'Montapuercos': 4
    }
  },
  { 
    nivelAyuntamiento: 7, 
    tipoEntidad: 'Edificio', 
    nombres: ['Fábrica de Hechizos Oscuros', 'Almacén de Elixir Oscuro'],
    nivelMinimo: 1, // Nuevo desbloqueo
    nivelMaximo: 3
  },
  { 
    nivelAyuntamiento: 7, 
    tipoEntidad: 'Hechizo', 
    nombres: ['Terremoto', 'Hielo'],
    nivelMinimo: 1, // Nuevo desbloqueo
    nivelMaximo: 5
  },
  { 
    nivelAyuntamiento: 7, 
    tipoEntidad: 'Heroe', 
    nombres: ['Reina Arquera'],
    nivelMinimo: 1, // Nuevo desbloqueo
    nivelMaximo: 10
  },
  
  // Town Hall 8 - Actualización de niveles máximos de tropas existentes
  { 
    nivelAyuntamiento: 8, 
    tipoEntidad: 'Tropa', 
    nombres: ['Bárbaro', 'Arquera', 'Duende', 'Gigante', 'Rompemuros', 'Globo', 'Mago'],
    nivelMinimo: 8, // Continúa desde el máximo del TH7 (8)
    nivelMaximo: 9
  },
  { 
    nivelAyuntamiento: 8, 
    tipoEntidad: 'Tropa', 
    nombres: ['Sanadora', 'Dragón', 'Esbirro', 'Montapuercos'],
    nivelesMinimos: {
      'Sanadora': 5, // Continúa desde el máximo del TH7 (5)
      'Dragón': 3, // Continúa desde el máximo del TH7 (3)
      'Esbirro': 3, // Continúa desde el máximo del TH7 (3)
      'Montapuercos': 4 // Continúa desde el máximo del TH7 (4)
    },
    nivelesMaximos: {
      'Sanadora': 5,
      'Dragón': 4,
      'Esbirro': 4,
      'Montapuercos': 5
    }
  },
  { 
    nivelAyuntamiento: 8, 
    tipoEntidad: 'Tropa', 
    nombres: ['P.E.K.K.A', 'Gólem', 'Valquiria'],
    nivelesMinimos: {
      'P.E.K.K.A': 1, // Nuevo desbloqueo
      'Gólem': 1, // Nuevo desbloqueo
      'Valquiria': 1 // Nuevo desbloqueo
    },
    nivelesMaximos: {
      'P.E.K.K.A': 5,
      'Gólem': 5,
      'Valquiria': 4
    }
  },
  { 
    nivelAyuntamiento: 8, 
    tipoEntidad: 'Hechizo', 
    nombres: ['Aceleración'],
    nivelMinimo: 1, // Nuevo desbloqueo
    nivelMaximo: 5
  },
  
  // Town Hall 9 - Actualización de niveles máximos de tropas existentes
  { 
    nivelAyuntamiento: 9, 
    tipoEntidad: 'Tropa', 
    nombres: ['Bárbaro', 'Arquera', 'Gigante', 'Mago'],
    nivelMinimo: 9, // Continúa desde el máximo del TH8 (9)
    nivelMaximo: 10
  },
  { 
    nivelAyuntamiento: 9, 
    tipoEntidad: 'Tropa', 
    nombres: ['Duende', 'Rompemuros', 'Globo'],
    nivelMinimo: 9, // Continúa desde el máximo del TH8 (9)
    nivelMaximo: 8
  },
  { 
    nivelAyuntamiento: 9, 
    tipoEntidad: 'Tropa', 
    nombres: ['P.E.K.K.A'],
    nivelMinimo: 5, // Continúa desde el máximo del TH8 (5)
    nivelMaximo: 8
  },
  { 
    nivelAyuntamiento: 9, 
    tipoEntidad: 'Tropa', 
    nombres: ['Sanadora', 'Dragón', 'Esbirro', 'Montapuercos', 'Gólem', 'Valquiria'],
    nivelesMinimos: {
      'Sanadora': 5, // Continúa desde el máximo del TH8 (5)
      'Dragón': 4, // Continúa desde el máximo del TH8 (4)
      'Esbirro': 4, // Continúa desde el máximo del TH8 (4)
      'Montapuercos': 5, // Continúa desde el máximo del TH8 (5)
      'Gólem': 5, // Continúa desde el máximo del TH8 (5)
      'Valquiria': 4 // Continúa desde el máximo del TH8 (4)
    },
    nivelesMaximos: {
      'Sanadora': 5,
      'Dragón': 5,
      'Esbirro': 5,
      'Montapuercos': 6,
      'Gólem': 6,
      'Valquiria': 5
    }
  },
  { 
    nivelAyuntamiento: 9, 
    tipoEntidad: 'Tropa', 
    nombres: ['Bruja', 'Sabueso de Lava', 'Baby Dragón'],
    nivelesMinimos: {
      'Bruja': 1, // Nuevo desbloqueo
      'Sabueso de Lava': 1, // Nuevo desbloqueo
      'Baby Dragón': 1 // Nuevo desbloqueo
    },
    nivelesMaximos: {
      'Bruja': 3,
      'Sabueso de Lava': 3,
      'Baby Dragón': 6
    }
  },
  { 
    nivelAyuntamiento: 9, 
    tipoEntidad: 'Hechizo', 
    nombres: ['Esqueleto'],
    nivelMinimo: 1, // Nuevo desbloqueo
    nivelMaximo: 5
  },
  
  // Town Hall 10 - Actualización de niveles máximos de tropas existentes
  { 
    nivelAyuntamiento: 10, 
    tipoEntidad: 'Tropa', 
    nombres: ['Bárbaro', 'Arquera', 'Gigante', 'Mago'],
    nivelMinimo: 10, // Continúa desde el máximo del TH9 (10)
    nivelMaximo: 11
  },
  { 
    nivelAyuntamiento: 10, 
    tipoEntidad: 'Tropa', 
    nombres: ['Duende', 'Rompemuros', 'Globo'],
    nivelMinimo: 8, // Continúa desde el máximo del TH9 (8)
    nivelMaximo: 9
  },
  { 
    nivelAyuntamiento: 10, 
    tipoEntidad: 'Tropa', 
    nombres: ['P.E.K.K.A'],
    nivelMinimo: 8, // Continúa desde el máximo del TH9 (8)
    nivelMaximo: 9
  },
  { 
    nivelAyuntamiento: 10, 
    tipoEntidad: 'Tropa', 
    nombres: ['Sanadora', 'Dragón', 'Esbirro', 'Montapuercos', 'Gólem', 'Valquiria', 'Baby Dragón'],
    nivelesMinimos: {
      'Sanadora': 5, // Continúa desde el máximo del TH9 (5)
      'Dragón': 5, // Continúa desde el máximo del TH9 (5)
      'Esbirro': 5, // Continúa desde el máximo del TH9 (5)
      'Montapuercos': 6, // Continúa desde el máximo del TH9 (6)
      'Gólem': 6, // Continúa desde el máximo del TH9 (6)
      'Valquiria': 5, // Continúa desde el máximo del TH9 (5)
      'Baby Dragón': 6 // Continúa desde el máximo del TH9 (6)
    },
    nivelesMaximos: {
      'Sanadora': 5,
      'Dragón': 6,
      'Esbirro': 6,
      'Montapuercos': 7,
      'Gólem': 7,
      'Valquiria': 6,
      'Baby Dragón': 7
    }
  },
  { 
    nivelAyuntamiento: 10, 
    tipoEntidad: 'Tropa', 
    nombres: ['Bruja', 'Sabueso de Lava'],
    nivelesMinimos: {
      'Bruja': 3, // Continúa desde el máximo del TH9 (3)
      'Sabueso de Lava': 3 // Continúa desde el máximo del TH9 (3)
    },
    nivelesMaximos: {
      'Bruja': 4,
      'Sabueso de Lava': 4
    }
  },
  { 
    nivelAyuntamiento: 10, 
    tipoEntidad: 'Tropa', 
    nombres: ['Minero', 'Lanzarrocas'],
    nivelesMinimos: {
      'Minero': 1, // Nuevo desbloqueo
      'Lanzarrocas': 1 // Nuevo desbloqueo
    },
    nivelesMaximos: {
      'Minero': 6,
      'Lanzarrocas': 3
    }
  },
  { 
    nivelAyuntamiento: 10, 
    tipoEntidad: 'Hechizo', 
    nombres: ['Clon'],
    nivelMinimo: 1, // Nuevo desbloqueo
    nivelMaximo: 5
  },
  
  // Town Hall 11 - Actualización de niveles máximos de tropas existentes
  { 
    nivelAyuntamiento: 11, 
    tipoEntidad: 'Tropa', 
    nombres: ['Bárbaro', 'Arquera', 'Gigante', 'Mago'],
    nivelMinimo: 11, // Continúa desde el máximo del TH10 (11)
    nivelMaximo: 12
  },
  { 
    nivelAyuntamiento: 11, 
    tipoEntidad: 'Tropa', 
    nombres: ['Duende', 'Rompemuros', 'Globo', 'P.E.K.K.A'],
    nivelMinimo: 9, // Continúa desde el máximo del TH10 (9)
    nivelMaximo: 10
  },
  { 
    nivelAyuntamiento: 11, 
    tipoEntidad: 'Tropa', 
    nombres: ['Sanadora', 'Dragón', 'Esbirro', 'Montapuercos', 'Gólem', 'Valquiria', 'Baby Dragón'],
    nivelesMinimos: {
      'Sanadora': 5, // Continúa desde el máximo del TH10 (5)
      'Dragón': 6, // Continúa desde el máximo del TH10 (6)
      'Esbirro': 6, // Continúa desde el máximo del TH10 (6)
      'Montapuercos': 7, // Continúa desde el máximo del TH10 (7)
      'Gólem': 7, // Continúa desde el máximo del TH10 (7)
      'Valquiria': 6, // Continúa desde el máximo del TH10 (6)
      'Baby Dragón': 7 // Continúa desde el máximo del TH10 (7)
    },
    nivelesMaximos: {
      'Sanadora': 5,
      'Dragón': 7,
      'Esbirro': 7,
      'Montapuercos': 8,
      'Gólem': 8,
      'Valquiria': 7,
      'Baby Dragón': 8
    }
  },
  { 
    nivelAyuntamiento: 11, 
    tipoEntidad: 'Tropa', 
    nombres: ['Bruja', 'Sabueso de Lava', 'Lanzarrocas'],
    nivelesMinimos: {
      'Bruja': 4, // Continúa desde el máximo del TH10 (4)
      'Sabueso de Lava': 4, // Continúa desde el máximo del TH10 (4)
      'Lanzarrocas': 3 // Continúa desde el máximo del TH10 (3)
    },
    nivelesMaximos: {
      'Bruja': 5,
      'Sabueso de Lava': 5,
      'Lanzarrocas': 4
    }
  },
  { 
    nivelAyuntamiento: 11, 
    tipoEntidad: 'Tropa', 
    nombres: ['Minero'],
    nivelMinimo: 6, // Continúa desde el máximo del TH10 (6)
    nivelMaximo: 7
  },
  { 
    nivelAyuntamiento: 11, 
    tipoEntidad: 'Tropa', 
    nombres: ['Dragón Eléctrico'],
    nivelMinimo: 1, // Nuevo desbloqueo
    nivelMaximo: 3
  },
  { 
    nivelAyuntamiento: 11, 
    tipoEntidad: 'Hechizo', 
    nombres: ['Invisibilidad', 'Murciélago'],
    nivelMinimo: 1, // Nuevo desbloqueo
    nivelMaximo: 5
  },
  { 
    nivelAyuntamiento: 11, 
    tipoEntidad: 'Heroe', 
    nombres: ['Gran Centinela', 'Campeona Real'],
    nivelesMinimos: {
      'Gran Centinela': 1, // Nuevo desbloqueo
      'Campeona Real': 1 // Nuevo desbloqueo
    },
    nivelesMaximos: {
      'Gran Centinela': 20,
      'Campeona Real': 5
    }
  },
  
  // Town Hall 12 - Actualización de niveles máximos de todas las tropas existentes
  // NOTA: Hay inconsistencia - el máximo (9) es menor que el mínimo calculado (12)
  // Esto sugiere que los datos máximos pueden estar incorrectos - VERIFICAR EN clash.ninja
  { 
    nivelAyuntamiento: 12, 
    tipoEntidad: 'Tropa', 
    nombres: ['Bárbaro', 'Arquera', 'Gigante', 'Mago'],
    nivelMinimo: 9, // ⚠️ AJUSTADO: El máximo es 9, así que el mínimo no puede ser mayor
    nivelMaximo: 9
  },
  { 
    nivelAyuntamiento: 12, 
    tipoEntidad: 'Tropa', 
    nombres: ['Duende', 'Rompemuros', 'Globo', 'P.E.K.K.A'],
    nivelMinimo: 8, // ⚠️ AJUSTADO: El máximo es 8, así que el mínimo no puede ser mayor
    nivelMaximo: 8
  },
  { 
    nivelAyuntamiento: 12, 
    tipoEntidad: 'Tropa', 
    nombres: ['Sanadora'],
    nivelMinimo: 5, // Continúa desde el máximo del TH11 (5)
    nivelMaximo: 5
  },
  { 
    nivelAyuntamiento: 12, 
    tipoEntidad: 'Tropa', 
    nombres: ['Dragón', 'Baby Dragón'],
    nivelesMinimos: {
      'Dragón': 7, // Continúa desde el máximo del TH11 (7)
      'Baby Dragón': 6 // ⚠️ AJUSTADO: El máximo es 6, así que el mínimo no puede ser mayor
    },
    nivelesMaximos: {
      'Dragón': 7,
      'Baby Dragón': 6
    }
  },
  { 
    nivelAyuntamiento: 12, 
    tipoEntidad: 'Tropa', 
    nombres: ['Minero'],
    nivelMinimo: 6, // ⚠️ AJUSTADO: El máximo es 6, así que el mínimo no puede ser mayor
    nivelMaximo: 6
  },
  { 
    nivelAyuntamiento: 12, 
    tipoEntidad: 'Tropa', 
    nombres: ['Dragón Eléctrico'],
    nivelMinimo: 3, // Continúa desde el máximo del TH11 (3)
    nivelMaximo: 3
  },
  { 
    nivelAyuntamiento: 12, 
    tipoEntidad: 'Tropa', 
    nombres: ['Yeti', 'Cazadora de Héroes'],
    nivelesMinimos: {
      'Yeti': 1, // Nuevo desbloqueo
      'Cazadora de Héroes': 1 // Nuevo desbloqueo
    },
    nivelesMaximos: {
      'Yeti': 4,
      'Cazadora de Héroes': 3
    }
  },
  
  // Town Hall 13 - Actualización de niveles máximos de tropas existentes
  { 
    nivelAyuntamiento: 13, 
    tipoEntidad: 'Tropa', 
    nombres: ['Bárbaro', 'Arquera', 'Gigante', 'Mago'],
    nivelMinimo: 9, // Continúa desde el máximo del TH12 (9)
    nivelMaximo: 13
  },
  { 
    nivelAyuntamiento: 13, 
    tipoEntidad: 'Tropa', 
    nombres: ['Duende', 'Rompemuros', 'Globo', 'P.E.K.K.A'],
    nivelMinimo: 8, // Continúa desde el máximo del TH12 (8)
    nivelMaximo: 11
  },
  { 
    nivelAyuntamiento: 13, 
    tipoEntidad: 'Tropa', 
    nombres: ['Sanadora', 'Dragón', 'Esbirro', 'Montapuercos', 'Gólem', 'Valquiria', 'Baby Dragón'],
    nivelesMinimos: {
      'Sanadora': 5, // Continúa desde el máximo del TH12 (5)
      'Dragón': 7, // Continúa desde el máximo del TH12 (7)
      'Esbirro': 7, // Continúa desde el máximo del TH11 (7) - no aparece en TH12
      'Montapuercos': 8, // Continúa desde el máximo del TH11 (8) - no aparece en TH12
      'Gólem': 8, // Continúa desde el máximo del TH11 (8) - no aparece en TH12
      'Valquiria': 7, // Continúa desde el máximo del TH11 (7) - no aparece en TH12
      'Baby Dragón': 6 // Continúa desde el máximo del TH12 (6)
    },
    nivelesMaximos: {
      'Sanadora': 5,
      'Dragón': 8,
      'Esbirro': 8,
      'Montapuercos': 9,
      'Gólem': 9,
      'Valquiria': 8,
      'Baby Dragón': 9
    }
  },
  { 
    nivelAyuntamiento: 13, 
    tipoEntidad: 'Tropa', 
    nombres: ['Bruja', 'Sabueso de Lava', 'Lanzarrocas'],
    nivelesMinimos: {
      'Bruja': 5, // Continúa desde el máximo del TH11 (5) - no aparece en TH12
      'Sabueso de Lava': 5, // Continúa desde el máximo del TH11 (5) - no aparece en TH12
      'Lanzarrocas': 4 // Continúa desde el máximo del TH11 (4) - no aparece en TH12
    },
    nivelesMaximos: {
      'Bruja': 6,
      'Sabueso de Lava': 6,
      'Lanzarrocas': 5
    }
  },
  { 
    nivelAyuntamiento: 13, 
    tipoEntidad: 'Tropa', 
    nombres: ['Minero', 'Dragón Eléctrico'],
    nivelesMinimos: {
      'Minero': 6, // Continúa desde el máximo del TH12 (6)
      'Dragón Eléctrico': 3 // Continúa desde el máximo del TH12 (3)
    },
    nivelesMaximos: {
      'Minero': 8,
      'Dragón Eléctrico': 4
    }
  },
  { 
    nivelAyuntamiento: 13, 
    tipoEntidad: 'Tropa', 
    nombres: ['Yeti', 'Cazadora de Héroes'],
    nivelesMinimos: {
      'Yeti': 4, // Continúa desde el máximo del TH12 (4)
      'Cazadora de Héroes': 3 // Continúa desde el máximo del TH12 (3)
    },
    nivelesMaximos: {
      'Yeti': 5,
      'Cazadora de Héroes': 4
    }
  },
  { 
    nivelAyuntamiento: 13, 
    tipoEntidad: 'Tropa', 
    nombres: ['Jinete de Dragón'],
    nivelMinimo: 1, // Nuevo desbloqueo
    nivelMaximo: 5
  },
  { 
    nivelAyuntamiento: 13, 
    tipoEntidad: 'Animal', 
    nombres: ['L.A.S.S.I'],
    nivelMinimo: 1, // Nuevo desbloqueo
    nivelMaximo: 10
  },
  { 
    nivelAyuntamiento: 13, 
    tipoEntidad: 'Edificio', 
    nombres: ['Caseta de Animales'],
    nivelMinimo: 1, // Nuevo desbloqueo
    nivelMaximo: 5
  },
  
  // Town Hall 14 - Actualización de niveles máximos de tropas existentes
  { 
    nivelAyuntamiento: 14, 
    tipoEntidad: 'Tropa', 
    nombres: ['Bárbaro', 'Arquera', 'Gigante', 'Mago'],
    nivelMinimo: 13, // Continúa desde el máximo del TH13 (13)
    nivelMaximo: 14
  },
  { 
    nivelAyuntamiento: 14, 
    tipoEntidad: 'Tropa', 
    nombres: ['Duende', 'Rompemuros', 'Globo', 'P.E.K.K.A'],
    nivelMinimo: 11, // Continúa desde el máximo del TH13 (11)
    nivelMaximo: 12
  },
  { 
    nivelAyuntamiento: 14, 
    tipoEntidad: 'Tropa', 
    nombres: ['Sanadora', 'Dragón', 'Esbirro', 'Montapuercos', 'Gólem', 'Valquiria', 'Baby Dragón'],
    nivelesMinimos: {
      'Sanadora': 5, // Continúa desde el máximo del TH13 (5)
      'Dragón': 8, // Continúa desde el máximo del TH13 (8)
      'Esbirro': 8, // Continúa desde el máximo del TH13 (8)
      'Montapuercos': 9, // Continúa desde el máximo del TH13 (9)
      'Gólem': 9, // Continúa desde el máximo del TH13 (9)
      'Valquiria': 8, // Continúa desde el máximo del TH13 (8)
      'Baby Dragón': 9 // Continúa desde el máximo del TH13 (9)
    },
    nivelesMaximos: {
      'Sanadora': 5,
      'Dragón': 9,
      'Esbirro': 9,
      'Montapuercos': 10,
      'Gólem': 10,
      'Valquiria': 9,
      'Baby Dragón': 10
    }
  },
  { 
    nivelAyuntamiento: 14, 
    tipoEntidad: 'Tropa', 
    nombres: ['Bruja', 'Sabueso de Lava', 'Lanzarrocas'],
    nivelesMinimos: {
      'Bruja': 6, // Continúa desde el máximo del TH13 (6)
      'Sabueso de Lava': 6, // Continúa desde el máximo del TH13 (6)
      'Lanzarrocas': 5 // Continúa desde el máximo del TH13 (5)
    },
    nivelesMaximos: {
      'Bruja': 7,
      'Sabueso de Lava': 7,
      'Lanzarrocas': 6
    }
  },
  { 
    nivelAyuntamiento: 14, 
    tipoEntidad: 'Tropa', 
    nombres: ['Minero', 'Dragón Eléctrico'],
    nivelesMinimos: {
      'Minero': 8, // Continúa desde el máximo del TH13 (8)
      'Dragón Eléctrico': 4 // Continúa desde el máximo del TH13 (4)
    },
    nivelesMaximos: {
      'Minero': 9,
      'Dragón Eléctrico': 5
    }
  },
  { 
    nivelAyuntamiento: 14, 
    tipoEntidad: 'Tropa', 
    nombres: ['Yeti', 'Cazadora de Héroes', 'Jinete de Dragón'],
    nivelesMinimos: {
      'Yeti': 5, // Continúa desde el máximo del TH13 (5)
      'Cazadora de Héroes': 4, // Continúa desde el máximo del TH13 (4)
      'Jinete de Dragón': 5 // Continúa desde el máximo del TH13 (5)
    },
    nivelesMaximos: {
      'Yeti': 6,
      'Cazadora de Héroes': 5,
      'Jinete de Dragón': 6
    }
  },
  { 
    nivelAyuntamiento: 14, 
    tipoEntidad: 'Animal', 
    nombres: ['Búho Eléctrico', 'Mighty Yak', 'Unicornio'],
    nivelMinimo: 1, // Nuevo desbloqueo
    nivelMaximo: 10
  },
  
  // Town Hall 15 - Actualización de niveles máximos de tropas existentes
  { 
    nivelAyuntamiento: 15, 
    tipoEntidad: 'Tropa', 
    nombres: ['Bárbaro', 'Arquera', 'Gigante', 'Mago'],
    nivelMinimo: 14, // Continúa desde el máximo del TH14 (14)
    nivelMaximo: 15
  },
  { 
    nivelAyuntamiento: 15, 
    tipoEntidad: 'Tropa', 
    nombres: ['Duende', 'Rompemuros', 'Globo', 'P.E.K.K.A'],
    nivelMinimo: 12, // Continúa desde el máximo del TH14 (12)
    nivelMaximo: 13
  },
  { 
    nivelAyuntamiento: 15, 
    tipoEntidad: 'Tropa', 
    nombres: ['Sanadora', 'Dragón', 'Esbirro', 'Montapuercos', 'Gólem', 'Valquiria', 'Baby Dragón'],
    nivelesMinimos: {
      'Sanadora': 5, // Continúa desde el máximo del TH14 (5)
      'Dragón': 9, // Continúa desde el máximo del TH14 (9)
      'Esbirro': 9, // Continúa desde el máximo del TH14 (9)
      'Montapuercos': 10, // Continúa desde el máximo del TH14 (10)
      'Gólem': 10, // Continúa desde el máximo del TH14 (10)
      'Valquiria': 9, // Continúa desde el máximo del TH14 (9)
      'Baby Dragón': 10 // Continúa desde el máximo del TH14 (10)
    },
    nivelesMaximos: {
      'Sanadora': 5,
      'Dragón': 10,
      'Esbirro': 10,
      'Montapuercos': 11,
      'Gólem': 11,
      'Valquiria': 10,
      'Baby Dragón': 11
    }
  },
  { 
    nivelAyuntamiento: 15, 
    tipoEntidad: 'Tropa', 
    nombres: ['Bruja', 'Sabueso de Lava', 'Lanzarrocas'],
    nivelesMinimos: {
      'Bruja': 7, // Continúa desde el máximo del TH14 (7)
      'Sabueso de Lava': 7, // Continúa desde el máximo del TH14 (7)
      'Lanzarrocas': 6 // Continúa desde el máximo del TH14 (6)
    },
    nivelesMaximos: {
      'Bruja': 8,
      'Sabueso de Lava': 8,
      'Lanzarrocas': 7
    }
  },
  { 
    nivelAyuntamiento: 15, 
    tipoEntidad: 'Tropa', 
    nombres: ['Minero', 'Dragón Eléctrico'],
    nivelesMinimos: {
      'Minero': 9, // Continúa desde el máximo del TH14 (9)
      'Dragón Eléctrico': 5 // Continúa desde el máximo del TH14 (5)
    },
    nivelesMaximos: {
      'Minero': 10,
      'Dragón Eléctrico': 6
    }
  },
  { 
    nivelAyuntamiento: 15, 
    tipoEntidad: 'Tropa', 
    nombres: ['Yeti', 'Cazadora de Héroes', 'Jinete de Dragón'],
    nivelesMinimos: {
      'Yeti': 6, // Continúa desde el máximo del TH14 (6)
      'Cazadora de Héroes': 5, // Continúa desde el máximo del TH14 (5)
      'Jinete de Dragón': 6 // Continúa desde el máximo del TH14 (6)
    },
    nivelesMaximos: {
      'Yeti': 7,
      'Cazadora de Héroes': 6,
      'Jinete de Dragón': 7
    }
  },
  { 
    nivelAyuntamiento: 15, 
    tipoEntidad: 'Animal', 
    nombres: ['Frosty', 'Fénix', 'Perro de Piedra', 'Dragón Barbudo'],
    nivelMinimo: 1, // Nuevo desbloqueo
    nivelMaximo: 10
  },
  
  // Town Hall 16 - Actualización de niveles máximos de tropas existentes
  { 
    nivelAyuntamiento: 16, 
    tipoEntidad: 'Tropa', 
    nombres: ['Bárbaro', 'Arquera', 'Gigante', 'Mago'],
    nivelMinimo: 15, // Continúa desde el máximo del TH15 (15)
    nivelMaximo: 16
  },
  { 
    nivelAyuntamiento: 16, 
    tipoEntidad: 'Tropa', 
    nombres: ['Duende', 'Rompemuros', 'Globo', 'P.E.K.K.A'],
    nivelMinimo: 13, // Continúa desde el máximo del TH15 (13)
    nivelMaximo: 14
  },
  { 
    nivelAyuntamiento: 16, 
    tipoEntidad: 'Tropa', 
    nombres: ['Sanadora', 'Dragón', 'Esbirro', 'Montapuercos', 'Gólem', 'Valquiria', 'Baby Dragón'],
    nivelesMinimos: {
      'Sanadora': 5, // Continúa desde el máximo del TH15 (5)
      'Dragón': 10, // Continúa desde el máximo del TH15 (10)
      'Esbirro': 10, // Continúa desde el máximo del TH15 (10)
      'Montapuercos': 11, // Continúa desde el máximo del TH15 (11)
      'Gólem': 11, // Continúa desde el máximo del TH15 (11)
      'Valquiria': 10, // Continúa desde el máximo del TH15 (10)
      'Baby Dragón': 11 // Continúa desde el máximo del TH15 (11)
    },
    nivelesMaximos: {
      'Sanadora': 5,
      'Dragón': 11,
      'Esbirro': 11,
      'Montapuercos': 12,
      'Gólem': 12,
      'Valquiria': 11,
      'Baby Dragón': 12
    }
  },
  { 
    nivelAyuntamiento: 16, 
    tipoEntidad: 'Tropa', 
    nombres: ['Bruja', 'Sabueso de Lava', 'Lanzarrocas'],
    nivelesMinimos: {
      'Bruja': 8, // Continúa desde el máximo del TH15 (8)
      'Sabueso de Lava': 8, // Continúa desde el máximo del TH15 (8)
      'Lanzarrocas': 7 // Continúa desde el máximo del TH15 (7)
    },
    nivelesMaximos: {
      'Bruja': 9,
      'Sabueso de Lava': 9,
      'Lanzarrocas': 8
    }
  },
  { 
    nivelAyuntamiento: 16, 
    tipoEntidad: 'Tropa', 
    nombres: ['Minero', 'Dragón Eléctrico'],
    nivelesMinimos: {
      'Minero': 10, // Continúa desde el máximo del TH15 (10)
      'Dragón Eléctrico': 6 // Continúa desde el máximo del TH15 (6)
    },
    nivelesMaximos: {
      'Minero': 11,
      'Dragón Eléctrico': 7
    }
  },
  { 
    nivelAyuntamiento: 16, 
    tipoEntidad: 'Tropa', 
    nombres: ['Yeti', 'Cazadora de Héroes', 'Jinete de Dragón'],
    nivelesMinimos: {
      'Yeti': 7, // Continúa desde el máximo del TH15 (7)
      'Cazadora de Héroes': 6, // Continúa desde el máximo del TH15 (6)
      'Jinete de Dragón': 7 // Continúa desde el máximo del TH15 (7)
    },
    nivelesMaximos: {
      'Yeti': 8,
      'Cazadora de Héroes': 7,
      'Jinete de Dragón': 8
    }
  },
  
  // Town Hall 17 - Actualización de niveles máximos de tropas existentes
  { 
    nivelAyuntamiento: 17, 
    tipoEntidad: 'Tropa', 
    nombres: ['Bárbaro', 'Arquera', 'Gigante', 'Mago'],
    nivelMinimo: 16, // Continúa desde el máximo del TH16 (16)
    nivelMaximo: 17
  },
  { 
    nivelAyuntamiento: 17, 
    tipoEntidad: 'Tropa', 
    nombres: ['Duende', 'Rompemuros', 'Globo', 'P.E.K.K.A'],
    nivelMinimo: 14, // Continúa desde el máximo del TH16 (14)
    nivelMaximo: 15
  },
  { 
    nivelAyuntamiento: 17, 
    tipoEntidad: 'Tropa', 
    nombres: ['Sanadora', 'Dragón', 'Esbirro', 'Montapuercos', 'Gólem', 'Valquiria', 'Baby Dragón'],
    nivelesMinimos: {
      'Sanadora': 5, // Continúa desde el máximo del TH16 (5)
      'Dragón': 11, // Continúa desde el máximo del TH16 (11)
      'Esbirro': 11, // Continúa desde el máximo del TH16 (11)
      'Montapuercos': 12, // Continúa desde el máximo del TH16 (12)
      'Gólem': 12, // Continúa desde el máximo del TH16 (12)
      'Valquiria': 11, // Continúa desde el máximo del TH16 (11)
      'Baby Dragón': 12 // Continúa desde el máximo del TH16 (12)
    },
    nivelesMaximos: {
      'Sanadora': 5,
      'Dragón': 12,
      'Esbirro': 12,
      'Montapuercos': 13,
      'Gólem': 13,
      'Valquiria': 12,
      'Baby Dragón': 13
    }
  },
  { 
    nivelAyuntamiento: 17, 
    tipoEntidad: 'Tropa', 
    nombres: ['Bruja', 'Sabueso de Lava', 'Lanzarrocas'],
    nivelesMinimos: {
      'Bruja': 9, // Continúa desde el máximo del TH16 (9)
      'Sabueso de Lava': 9, // Continúa desde el máximo del TH16 (9)
      'Lanzarrocas': 8 // Continúa desde el máximo del TH16 (8)
    },
    nivelesMaximos: {
      'Bruja': 10,
      'Sabueso de Lava': 10,
      'Lanzarrocas': 9
    }
  },
  { 
    nivelAyuntamiento: 17, 
    tipoEntidad: 'Tropa', 
    nombres: ['Minero', 'Dragón Eléctrico'],
    nivelesMinimos: {
      'Minero': 11, // Continúa desde el máximo del TH16 (11)
      'Dragón Eléctrico': 7 // Continúa desde el máximo del TH16 (7)
    },
    nivelesMaximos: {
      'Minero': 12,
      'Dragón Eléctrico': 8
    }
  },
  { 
    nivelAyuntamiento: 17, 
    tipoEntidad: 'Tropa', 
    nombres: ['Yeti', 'Cazadora de Héroes', 'Jinete de Dragón'],
    nivelesMinimos: {
      'Yeti': 8, // Continúa desde el máximo del TH16 (8)
      'Cazadora de Héroes': 7, // Continúa desde el máximo del TH16 (7)
      'Jinete de Dragón': 8 // Continúa desde el máximo del TH16 (8)
    },
    nivelesMaximos: {
      'Yeti': 9,
      'Cazadora de Héroes': 8,
      'Jinete de Dragón': 9
    }
  },
];


