import { Injectable, OnModuleInit } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import { Readable } from 'typeorm/platform/PlatformTools';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class MinioFileService implements OnModuleInit {
  constructor(private readonly minioService: MinioService) {}

  async listAllBuckets() {
    return this.minioService.client.listBuckets();
  }

  async makeBucket(bucketName: string) {
    return this.minioService.client.makeBucket(bucketName);
  }

  async uploadStreamFile(input: {
    bucketName: string;
    fileName: string;
    stream: Readable;
    mimetype: string;
  }) {
    const { bucketName, stream, mimetype, fileName } = input;
    const minioFileName = uuidv4();
    console.log('Starting file upload:', fileName);
    await this.minioService.client.putObject(
      bucketName,
      minioFileName,
      stream,
      { 'Content-Type': mimetype },
    );
    console.log('file uploaded');
  }

  async deleteFile(bucketName: string, fileName: string) {
    return this.minioService.client.removeObject(bucketName, fileName);
  }

  async onModuleInit() {
    await this.makeBucket('all');
  }
}
