export class ServiceResponse {
  constructor(
    public status: boolean,
    public message: string,
    public data: any = null,
  ) {}

  static success(message: string, data: any = null): ServiceResponse {
    return new ServiceResponse(true, message, data);
  }

  static error(message: string, data: any = null): ServiceResponse {
    return new ServiceResponse(false, message, data);
  }
}
