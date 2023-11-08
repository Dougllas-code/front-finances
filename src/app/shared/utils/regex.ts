export class Regex {
  private static regex_email: RegExp =
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}(?:\.[A-Z]{2,})?$/i;
  private static regex_password: RegExp =
    /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;

  public static get email(): RegExp {
    return this.regex_email;
  }

  public static get password(): RegExp {
    return this.regex_password;
  }
}
