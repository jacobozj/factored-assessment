import axios from 'axios';
import type { LoginRequest, LoginResponse, Employee } from './types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const api = {
	login: async (credentials: LoginRequest): Promise<LoginResponse> => {
		const response = await axios.post<LoginResponse>(
			`${API_BASE_URL}/api/login`,
			credentials
		);
		return response.data;
	},

	getEmployee: async (id: number): Promise<Employee> => {
		const response = await axios.get<Employee>(
			`${API_BASE_URL}/api/employee/${id}`
		);
		return response.data;
	},

	getAllEmployees: async (): Promise<Employee[]> => {
		const response = await axios.get<Employee[]>(
			`${API_BASE_URL}/api/employees`
		);
		return response.data;
	},
};
