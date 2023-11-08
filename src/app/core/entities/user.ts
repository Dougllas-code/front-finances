import { TAuthResponse } from "../../shared/types/auth/TAuthResponse";

export class User {
  email: string;
  id: number;
  name: string;

  constructor(values: TAuthResponse) {
    this.email = values.email;
    this.id = values.id;
    this.name = values.name;
  }
}
