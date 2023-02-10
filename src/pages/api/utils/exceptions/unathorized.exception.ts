import {
  BaseError,
  HttpStatusCode,
} from "@/pages/api/utils/exceptions/base-error.exception";

export class UnauthorizedException extends BaseError {
  constructor(description = "Unauthorized") {
    super("UNAUTHORIZED", HttpStatusCode.UNAUTHORIZED, description);
  }
}
