import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
    Typography,
    Stack,
    Container,
    Button,
    CircularProgress,
} from "@mui/material";

import { InputController } from '@/shared/ui';;
import { useLoginMutation } from '@/shared/api';

import { LoginPageRoot } from "./LoginPage.styles";

export interface TLoginParams {
    username: string;
    password: string;
}

const LoginPage = () => {
    const navigate = useNavigate();

    const defaultValue = {
        username: "",
        password: "",
    };

    const [loginService, { isLoading: isLoginLoading }] = useLoginMutation();

    const {
        handleSubmit,
        formState: { errors },
        control
    } = useForm<TLoginParams>({ defaultValues: defaultValue });

    const onSubmit: SubmitHandler<TLoginParams> = (data) => {
        loginService(data)
            .then((res: any) => {
                localStorage.setItem('accessToken', res.data.token);
                navigate('/trucks');
            })
            .catch((err) => console.log(err));
    };

    return (
        <LoginPageRoot>
            <Container maxWidth="xl">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={1} mb={4} sx={{
                        gap: "16px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "center",
                    }}>
                        <Typography variant="h3">Авторизация</Typography>
                        <InputController
                            type='text'
                            placeholder='Имя пользователя'
                            inputControl={control}
                            error={errors?.username}
                            inputName='username'
                            rules={{
                                required: "Имя пользователя is required",
                            }}
                        />

                        <InputController
                            type='password'
                            placeholder='Пароль'
                            inputControl={control}
                            error={errors?.password}
                            inputName='password'
                            rules={{
                                required: "Пароль is required",
                            }}
                        />

                        <Button
                            type='submit'
                            variant="contained"
                            disabled={isLoginLoading}
                        >
                            {isLoginLoading ? <CircularProgress size={24} color='inherit' /> : 'Войти'}
                        </Button>
                    </Stack>
                </form>
            </Container>
        </LoginPageRoot >
    )
};

export default LoginPage;