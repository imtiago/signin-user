import { MouseEvent, useState } from 'react'
import { object, string, InferType } from 'yup'
import { useForm } from 'react-hook-form'
import {
    Typography,
    Box,
    TextField,
    Button,
    Stack,
    IconButton,
    Snackbar,
    AlertColor,
} from '@mui/material'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { yupResolver } from '@hookform/resolvers/yup'
import AlertCustom from './components/Alert'
import FormHelperText from '@mui/material/FormHelperText'

const loginUserSchema = object({
    email: string().email('E-mail inválido').required('O e-mail é obrigatório'),
    password: string()
        .required('A senhe é obrigatório')
        .min(8, 'Minimo 8 digitos'),
})

type loginUser = InferType<typeof loginUserSchema>

function App() {
    const [showPassword, setShowPassword] = useState(false)
    const [alert, setAlert] = useState(false)
    const [severity, setSeverity] = useState<AlertColor>('success')
    const [message, setMessage] = useState('')

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<loginUser>({
        resolver: yupResolver(loginUserSchema),
    })

    const handleAlert = (message: string, severity: AlertColor) => {
        setSeverity(severity)
        setMessage(message)
        setAlert(true)
    }
    const handleCloseAlert = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === 'clickaway') {
            return
        }

        setAlert(false)
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show)

    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }
    const handlerLogin = (data: loginUser) => {
        handleAlert('Login realizado com sucesso', 'success')
        reset()
    }
    return (
        <Box
            width={'500px'}
            gap={2}
            alignItems={'center'}
            justifyItems={'center'}
        >
            <Box flex={1} gap={2}>
                <form onSubmit={handleSubmit(handlerLogin)}>
                    <Typography variant="h3" color="initial">
                        Login
                    </Typography>
                    <Stack direction="column" spacing={2}>
                        <TextField
                            error={!!errors.email}
                            type="text"
                            label="Email"
                            {...register('email')}
                            helperText={errors.email?.message}
                        />
                        <FormControl
                            variant="outlined"
                            error={!!errors.password}
                        >
                            <InputLabel htmlFor="password">Senha</InputLabel>
                            <OutlinedInput
                                {...register('password')}
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={
                                                handleMouseDownPassword
                                            }
                                            edge="end"
                                        >
                                            {showPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                            <FormHelperText id="component-error-text">
                                {errors.password?.message}
                            </FormHelperText>
                        </FormControl>

                        <Button variant="contained" type="submit">
                            Login
                        </Button>
                    </Stack>
                </form>
            </Box>
            <Snackbar
                open={alert}
                autoHideDuration={3000}
                onClose={handleCloseAlert}
            >
                <AlertCustom severity={severity} message={message} />
            </Snackbar>
        </Box>
    )
}

export default App
