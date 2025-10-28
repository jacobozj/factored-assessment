import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
	Container,
	Box,
	Paper,
	Typography,
	Avatar,
	Chip,
	Button,
	CircularProgress,
	Alert,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import {
	Radar,
	RadarChart,
	PolarGrid,
	PolarAngleAxis,
	PolarRadiusAxis,
	ResponsiveContainer,
} from 'recharts';
import { api } from '../api';
import type { Employee } from '../types';

export default function Profile() {
	const { id } = useParams<{ id: string }>(); //Get the employee ID from the URL
	const navigate = useNavigate(); //Navigate to the login page
	const [employee, setEmployee] = useState<Employee | null>(null);
	const [loading, setLoading] = useState(true); //Loading state
	const [error, setError] = useState(''); //Error state

	useEffect(() => {
		const fetchEmployee = async () => {
			//Fetch the employee data from the API
			if (!id) {
				setError('No employee ID provided');
				setLoading(false);
				return;
			}

			try {
				//Try to fetch the employee data from the API
				const data = await api.getEmployee(parseInt(id)); //Parse the employee ID from the URL
				setEmployee(data); //Set the employee data to the state
			} catch (err: unknown) {
				//If the API call fails, set the error state
				console.log(err as Error);
				setError('Failed to load employee data');
			} finally {
				setLoading(false);
			}
		};

		fetchEmployee(); //Fetch the employee data from the API
	}, [id]);

	const handleLogout = () => {
		localStorage.removeItem('userId');
		localStorage.removeItem('userName');
		navigate('/login');
	};

	if (loading) {
		return (
			<Container>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						minHeight: '100vh',
					}}
				>
					<CircularProgress />
				</Box>
			</Container>
		);
	}

	if (error || !employee) {
		return (
			<Container maxWidth="sm">
				<Box sx={{ mt: 8 }}>
					<Alert severity="error">{error || 'Employee not found'}</Alert>
					<Button onClick={() => navigate('/login')} sx={{ mt: 2 }}>
						Back to Login
					</Button>
				</Box>
			</Container>
		);
	}

	const chartData = employee.skills.map((skill) => ({
		skill,
		value: 50 + Math.random() * 50, //Random proficiency between 50-100
	}));

	return (
		<Container maxWidth="lg">
			<Box sx={{ mt: 4, mb: 4 }}>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						mb: 4,
					}}
				>
					<Typography variant="h4" component="h1">
						Employee Profile
					</Typography>
					<Button
						variant="outlined"
						startIcon={<LogoutIcon />}
						onClick={handleLogout}
					>
						Logout
					</Button>
				</Box>

				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
						gap: 3,
					}}
				>
					{/* Profile Information Card */}
					<Paper elevation={3} sx={{ p: 4 }}>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								mb: 3,
							}}
						>
							<Avatar
								src={employee.avatar}
								alt={employee.name}
								sx={{ width: 120, height: 120, mb: 2 }}
								variant="square"
							/>
							<Typography variant="h5" component="h2" gutterBottom>
								{employee.name}
							</Typography>
							<Typography
								variant="subtitle1"
								color="text.secondary"
								gutterBottom
							>
								{employee.position}
							</Typography>
							<Typography variant="body2" color="text.secondary">
								{employee.email}
							</Typography>
						</Box>

						<Box sx={{ mt: 4 }}>
							<Typography variant="h6" gutterBottom>
								Skills
							</Typography>
							<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
								{employee.skills.map((skill, index) => (
									<Chip
										key={index}
										label={skill}
										color="primary"
										variant="outlined"
									/>
								))}
							</Box>
						</Box>
					</Paper>

					{/* Skills Radar Chart Card */}
					<Paper elevation={3} sx={{ p: 4 }}>
						<Typography variant="h6" gutterBottom align="center">
							Skills Proficiency
						</Typography>
						<ResponsiveContainer width="100%" height={400}>
							<RadarChart data={chartData}>
								<PolarGrid />
								<PolarAngleAxis dataKey="skill" />
								<PolarRadiusAxis angle={90} domain={[0, 100]} />
								<Radar
									name="Proficiency"
									dataKey="value"
									stroke="#1976d2"
									fill="#1976d2"
									fillOpacity={0.6}
								/>
							</RadarChart>
						</ResponsiveContainer>
						<Typography
							variant="caption"
							color="text.secondary"
							align="center"
							display="block"
							sx={{ mt: 2 }}
						>
							Skill proficiency levels (0-100)
						</Typography>
					</Paper>
				</Box>
			</Box>
		</Container>
	);
}
