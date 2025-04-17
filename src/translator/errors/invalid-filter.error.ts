import { HttpStatus } from '@nestjs/common';

export class InvalidFilterError extends Error {
  readonly status = HttpStatus.BAD_REQUEST;
  constructor(filter: any) {
    super(`Invalid filter: ${filter}`);
    this.message = `Invalid filter: ${filter}`;
  }
}
