import {
  BaseError,
  HttpStatusCode,
} from "@/pages/api/utils/exceptions/base-error.exception";

export class ConflictRequestException extends BaseError {
  constructor(description = "Conflict") {
    super("Conflict", HttpStatusCode.CONFLICT, description);
  }
}
