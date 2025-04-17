import { HttpStatus } from '@nestjs/common';

export class NotSupportedOperationError extends Error {
  readonly status = HttpStatus.UNPROCESSABLE_ENTITY;
  constructor(operation: string) {
    super(`Not supported operation: ${operation}`);
    this.message = `Not supported operation: ${operation}`;
  }
}
