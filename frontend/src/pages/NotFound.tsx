import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button, Paper } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function NotFound() {
	const navigate = useNavigate();

	return (
		<Container maxWidth="sm">
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Paper
					elevation={3}
					sx={{ padding: 6, width: '100%', textAlign: 'center' }}
				>
					<ErrorOutlineIcon
						sx={{ fontSize: 100, color: 'error.main', mb: 2 }}
					/>
					<Typography
						variant="h1"
						component="h1"
						gutterBottom
						sx={{ fontWeight: 'bold', fontSize: '4rem' }}
					>
						404
					</Typography>
					<Typography variant="h5" component="h2" gutterBottom>
						Page Not Found
					</Typography>
					<Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
						Oops! The page you're looking for doesn't exist.
					</Typography>
					<Button
						variant="contained"
						size="large"
						onClick={() => navigate('/login')}
					>
						Go to Login
					</Button>
				</Paper>
			</Box>
		</Container>
	);
}
