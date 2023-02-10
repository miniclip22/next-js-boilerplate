import {
  BaseError,
  HttpStatusCode,
} from "@/pages/api/utils/exceptions/base-error.exception";

export class TooManyRequestsException extends BaseError {
  constructor(description = "Too many requests") {
    super("TOO MANY REQUESTS", HttpStatusCode.TOO_MANY_REQUESTS, description);
  }
}
