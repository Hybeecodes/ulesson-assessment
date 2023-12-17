import { Injectable, Logger } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import * as mysql from './ormconfig.mysql';

@Injectable()
export class TypeOrmOptionsService implements TypeOrmOptionsFactory {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    Logger.debug('Initializing Database', this.constructor.name);

    return mysql;
  }
}
