type FormType = "NEW" | "VIEW" | "EDIT";

export interface IUserForm {
	type: FormType;
}

export interface IRegisterUser {
	name: string;
	email: string;
	password: string;
	userName: string;
	confirmPassword: string;
}

export interface IUpdateUser {
	name: string;
	email: string;
	userName: string;
}

export interface IProfile {
	name: string;
	email: string;
	userName: string;
}