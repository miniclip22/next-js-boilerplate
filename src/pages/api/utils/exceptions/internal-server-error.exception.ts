import {
  BaseError,
  HttpStatusCode,
} from "@/pages/api/utils/exceptions/base-error.exception";

export class InternalServerErrorException extends BaseError {
  constructor(description = "Internal Server Error") {
    super("INTERNAL SERVER ERROR", HttpStatusCode.INTERNAL_SERVER, description);
  }
}
