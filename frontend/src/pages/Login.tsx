import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Container,
	Box,
	TextField,
	Button,
	Typography,
	Paper,
	Alert,
	Avatar,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { api } from '../api';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');
		setLoading(true);

		try {
			const response = await api.login({ email, password });
			//Store user info in localStorage
			localStorage.setItem('userId', response.id.toString());
			localStorage.setItem('userName', response.name);
			//Redirect to profile page
			navigate(`/profile/${response.id}`);
		} catch (err: unknown) {
			console.log(err as Error);
			setError('Login failed. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<Container component="main" maxWidth="xs">
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Paper elevation={3} sx={{ padding: 4, width: '100%' }}>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<Avatar sx={{ m: 1, bgcolor: 'primary.main' }} variant="square">
							<LockOutlinedIcon />
						</Avatar>
						<Typography component="h1" variant="h5" gutterBottom>
							Employee Sign In
						</Typography>
					</Box>

					{error && <Alert severity="error">{error}</Alert>}

					<Box component="form" onSubmit={handleSubmit} noValidate>
						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 2, mb: 1 }}
							disabled={loading}
						>
							{loading ? 'Signing In...' : 'Sign In'}
						</Button>
					</Box>

					<Box sx={{ mt: 3, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
						<Typography variant="caption" color="text.secondary">
							<strong>Demo Credentials 1:</strong>
							<br />
							Email: sara123@factored.com
							<br />
							Password: password123
						</Typography>
						<br />
						<Typography variant="caption" color="text.secondary">
							<strong>Demo Credentials 2:</strong>
							<br />
							Email: mariana123@factored.com
							<br />
							Password: password123
						</Typography>
						<br />
						<Typography variant="caption" color="text.secondary">
							<strong>Demo Credentials 3:</strong>
							<br />
							Email: juana123@factored.com
							<br />
							Password: password123
						</Typography>
						<br />
					</Box>
				</Paper>
			</Box>
		</Container>
	);
}
