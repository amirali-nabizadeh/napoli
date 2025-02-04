import { TypeormRepositoryService } from 'src/libs/ORM/typeorm/typeorm-repository.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MinioFile } from './minio-file.entity';

export class MinioFileRepositoryService extends TypeormRepositoryService<MinioFile> {
  constructor(
    @InjectRepository(MinioFile) private readonly repos: Repository<MinioFile>,
  ) {
    super(repos);
  }
}
