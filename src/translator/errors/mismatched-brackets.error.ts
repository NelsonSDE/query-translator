import { HttpStatus } from '@nestjs/common';

export class MismatchedBracketsError extends Error {
  readonly status = HttpStatus.BAD_REQUEST;
  constructor(message = 'Mismatched brackets') {
    super(message);
    this.message = message;
  }
}
