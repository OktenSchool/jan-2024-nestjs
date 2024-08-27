import { HttpStatus } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

export class DbQueryFailedFilter {
  static filter(exception: QueryFailedError) {
    let status = HttpStatus.UNPROCESSABLE_ENTITY;
    let message = (exception as QueryFailedError).message;
    const code = (exception as any).code;

    if ((exception as any).code === '23505') {
      const detail = (exception as any).detail;
      const key = detail
        .match(/(?<=\().+?(?=\)=)/g)[0]
        .split(',')[0]
        .replace(/[^a-z ]/gim, '');
      const value = detail.match(/(?<==\().+?(?=\))/g)[0].split(',')[0];

      status = HttpStatus.CONFLICT;
      message = `${key} ${value} already exists`;
    }

    return { status, message, code };
  }
}
