import { Ayuntamiento } from '../../infrastructure/persistence/entities/ayuntamiento.entity';
import { Edificio } from '../../infrastructure/persistence/entities/edificio.entity';
import { Heroe } from '../../infrastructure/persistence/entities/heroe.entity';
import { Tropa } from '../../infrastructure/persistence/entities/tropa.entity';
import { Hechizo } from '../../infrastructure/persistence/entities/hechizo.entity';
import { DesbloqueosAyuntamientoHeroe } from '../../infrastructure/persistence/entities/desbloqueos-ayuntamiento-heroe.entity';
import { DesbloqueosAyuntamientoTropa } from '../../infrastructure/persistence/entities/desbloqueos-ayuntamiento-tropa.entity';
import { DesbloqueosAyuntamientoHechizo } from '../../infrastructure/persistence/entities/desbloqueos-ayuntamiento-hechizo.entity';
import { DesbloqueosAyuntamientoEdificio } from '../../infrastructure/persistence/entities/desbloqueos-ayuntamiento-edificio.entity';
import { DesbloqueosAyuntamientoAnimal } from '../../infrastructure/persistence/entities/desbloqueos-ayuntamiento-animal.entity';

export interface DesbloqueosResult {
  heroes: DesbloqueosAyuntamientoHeroe[];
  tropas: DesbloqueosAyuntamientoTropa[];
  hechizos: DesbloqueosAyuntamientoHechizo[];
  edificios: DesbloqueosAyuntamientoEdificio[];
  animales: DesbloqueosAyuntamientoAnimal[];
}

export type AyuntamientoConDesbloqueos = Ayuntamiento & {
  desbloqueos: DesbloqueosResult;
};

export type EdificioConDesbloqueos = Edificio & {
  desbloqueos: DesbloqueosAyuntamientoEdificio[];
};

export type HeroeConDesbloqueos = Heroe & {
  desbloqueos: DesbloqueosAyuntamientoHeroe[];
};

export type TropaConDesbloqueos = Tropa & {
  desbloqueos: DesbloqueosAyuntamientoTropa[];
};

export type HechizoConDesbloqueos = Hechizo & {
  desbloqueos: DesbloqueosAyuntamientoHechizo[];
};

