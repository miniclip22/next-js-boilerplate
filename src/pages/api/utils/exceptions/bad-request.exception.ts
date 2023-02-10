import {
  BaseError,
  HttpStatusCode,
} from "@/pages/api/utils/exceptions/base-error.exception";

export class BadRequestException extends BaseError {
  constructor(description = "Bad request") {
    super("BAD REQUEST", HttpStatusCode.BAD_REQUEST, description);
  }
}
