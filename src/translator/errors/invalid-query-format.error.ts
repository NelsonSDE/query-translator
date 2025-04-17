import { HttpStatus } from '@nestjs/common';

export class InvalidQueryFormatError extends Error {
  readonly status = HttpStatus.BAD_REQUEST;
  constructor(message = 'Invalid query format') {
    super(message);
    this.message = message;
  }
}
