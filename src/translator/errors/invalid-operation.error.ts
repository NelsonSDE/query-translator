import { HttpStatus } from '@nestjs/common';

export class InvalidOperationError extends Error {
  readonly status = HttpStatus.BAD_REQUEST;
  constructor(operation: string) {
    super(`Invalid operation: ${operation}`);
    this.message = `Invalid operation: ${operation}`;
  }
}
