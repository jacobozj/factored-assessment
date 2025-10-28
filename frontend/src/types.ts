export interface Employee {
	id: number;
	name: string;
	email: string;
	position: string;
	avatar: string;
	skills: string[];
}

export interface LoginRequest {
	email: string;
	password: string;
}

export interface LoginResponse {
	id: number;
	name: string;
	email: string;
	message: string;
}
