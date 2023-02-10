import {
  BaseError,
  HttpStatusCode,
} from "@/pages/api/utils/exceptions/base-error.exception";

export class NotFoundException extends BaseError {
  constructor(description = "Not Found") {
    super("NOT FOUND", HttpStatusCode.NOT_FOUND, description);
  }
}
