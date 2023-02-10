export enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CREATED = 201,
  CONFLICT = 409,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER = 500,
}

export class BaseError extends Error {
  public readonly name: string;
  public readonly status: HttpStatusCode;

  constructor(name: string, httpCode: HttpStatusCode, description: string) {
    super(description);

    this.name = name;
    this.status = httpCode;
  }
}
