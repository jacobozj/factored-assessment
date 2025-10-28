import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Login from './pages/Login';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

const theme = createTheme({
	palette: {
		primary: {
			main: '#6a1fe5',
		},
		secondary: {
			main: '#dc004e',
		},
	},
});

function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Router>
				<Routes>
					<Route path="/" element={<Navigate to="/login" replace />} />
					<Route path="/login" element={<Login />} />
					<Route path="/profile/:id" element={<Profile />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Router>
		</ThemeProvider>
	);
}

export default App;
