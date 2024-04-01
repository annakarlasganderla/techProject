export interface ILoginRequest {
	userName: string;
	password: string;
}
export interface ILoginResponse {
	access_token: string;
}