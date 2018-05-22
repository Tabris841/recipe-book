export class TrySignup {
  static readonly type = '[Auth] Try SignUp';

  constructor(public payload: { username: string; password: string }) {}
}

export class TrySignin {
  static readonly type = '[Auth] Try SignIn';

  constructor(public payload: { username: string; password: string }) {}
}

export class Signup {
  static readonly type = '[Auth] SignUp';
}

export class Signin {
  static readonly type = '[Auth] SignIn';
}

export class Logout {
  static readonly type = '[Auth] Logout';
}

export class SetToken {
  static readonly type = '[Auth] Set Token';

  constructor(public payload: string) {}
}
