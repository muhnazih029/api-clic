export class LoginRequest {
  identifier: string;
  password: string;
}
export class RegisterRequest {
  fullname: string;
  nim: string;
  username?: string;
  password: string;
}

export class SuccessResponse {
  at: string;
  rt: string;
}
