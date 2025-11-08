import { Repository, FindOptionsWhere, FindManyOptions, DeepPartial } from 'typeorm';
import { BaseEntity } from '../../infrastructure/persistence/entities/base.entity';

export abstract class BaseService<T extends BaseEntity> {
  constructor(protected readonly repository: Repository<T>) {}

  async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(options);
  }

  async findOne(id: number): Promise<T | null> {
    return this.repository.findOne({ where: { id } as FindOptionsWhere<T> });
  }

  async findOneBy(where: FindOptionsWhere<T>): Promise<T | null> {
    return this.repository.findOne({ where });
  }

  async create(entity: DeepPartial<T>): Promise<T> {
    const newEntity = this.repository.create(entity as DeepPartial<T>);
    const saved = await this.repository.save(newEntity);
    return Array.isArray(saved) ? saved[0] : saved;
  }

  async update(id: number, entity: DeepPartial<T>): Promise<T | null> {
    await this.repository.update(id, entity as any);
    return this.findOne(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }

  async count(where?: FindOptionsWhere<T>): Promise<number> {
    return this.repository.count({ where });
  }

  async exists(id: number): Promise<boolean> {
    const count = await this.repository.count({ where: { id } as FindOptionsWhere<T> });
    return count > 0;
  }
}
