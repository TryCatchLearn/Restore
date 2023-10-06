import { LockOutlined } from '@mui/icons-material';
import { Container, Paper, Avatar, Typography, Box, TextField, Grid } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch } from '../../app/store/configureStore';
import { signInUser } from './accountSlice';

export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const { register, handleSubmit, formState: { isSubmitting, errors, isValid } } = useForm({
        mode: 'onTouched'
    });

    async function submitForm(data: FieldValues) {
        try {
            await dispatch(signInUser(data));
            navigate(location.state?.from || '/catalog');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container
            component={Paper}
            maxWidth='sm'
            sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlined />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <Box component="form"
                onSubmit={handleSubmit(submitForm)}
                noValidate sx={{ mt: 1 }}
            >
                <TextField
                    margin="normal"
                    fullWidth
                    label="Username"
                    autoComplete="username"
                    autoFocus
                    {...register('username', { required: 'Username is required' })}
                    error={!!errors.username}
                    helperText={errors?.username?.message as string}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    {...register('password', { required: 'Password is required' })}
                    error={!!errors.password}
                    helperText={errors.password?.message as string}
                />
                <LoadingButton 
                    loading={isSubmitting} 
                    disabled={!isValid }
                    type="submit" 
                    fullWidth 
                    variant="contained" sx={{ mt: 3, mb: 2 }}
                >
                    Sign In
                </LoadingButton>
                <Grid container>
                    <Grid item>
                        <Link to='/register' style={{ textDecoration: 'none' }}>
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}