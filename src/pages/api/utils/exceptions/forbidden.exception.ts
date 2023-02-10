import {
  BaseError,
  HttpStatusCode,
} from "@/pages/api/utils/exceptions/base-error.exception";

export class ForbiddenException extends BaseError {
  constructor(description = "Forbidden") {
    super("FORBIDDEN", HttpStatusCode.FORBIDDEN, description);
  }
}
