import { HttpException } from '@nestjs/common';

export class CustomError extends HttpException {
  responseObject: any;
  constructor(statusCode: number, responseObject) {
    super(responseObject.message, statusCode);
    this.responseObject = responseObject;
  }

}
