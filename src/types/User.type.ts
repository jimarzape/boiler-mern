export interface userCreate {
  name: string;
  email: string;
  password: string;
}

export interface userLogin {
  email: string;
  password: string;
}

export interface userUpdate {
  id: any;
  name: string;
  email: string;
  update_password: boolean;
  password: string | null;
}
