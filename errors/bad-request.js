import StatusCOdes from 'http-status-codes'
import {CustomAPIError} from './custom-api';

export class BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}


