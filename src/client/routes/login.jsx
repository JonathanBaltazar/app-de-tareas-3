import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";

import { AuthContext } from "../context/AuthContext";

// COMPONENTS
import Button from "../components/Button";
import Card from "../components/Card";
import Title from "../components/Title";
import ErrorP from "../components/ErrorP";
import BoxErrors from "../components/BoxErrors";
import Paragraph from "../components/Paragraph";
import TextInput from "../components/TextInput";
import PasswordInput from "../components/PasswordInput";
import EmailInput from "../components/EmailInput";
import DynamicLink from "../components/DynamicLink";

function Login() {
    let navigate = useNavigate();

    let {
        login,
        isAuthenticated,
        errors: logInErrors,
    } = useContext(AuthContext);
    let {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated]);

    const [byUsername, setByUsername] = useState(true);

    let onSubmit = (data) => {
        login(data);
    };

    return (
        <Card page={"form"}>
            <Title titleName={"Iniciar Sesion"} />

            {logInErrors &&
                logInErrors.map((error) => (
                    <BoxErrors key={error} text={error} />
                ))}

            <div className="px-2">
                <button
                    className={`${
                        byUsername ? "underline" : ""
                    } font-medium mr-4`}
                    onClick={() => {
                        setByUsername(true);
                    }}
                >
                    Username
                </button>
                <button
                    className={`${
                        !byUsername ? "underline" : ""
                    } font-medium mr-4`}
                    onClick={() => {
                        setByUsername(false);
                    }}
                >
                    Email
                </button>
            </div>
            <form
                className="mt-2 flex flex-col"
                onSubmit={handleSubmit(onSubmit)}
            >
                {byUsername && (
                    <TextInput
                        name={"username"}
                        placeholder={"Username"}
                        register={register}
                        required={true}
                    />
                )}
                {errors.username && byUsername && (
                    <ErrorP text="Username es requerido" />
                )}
                {!byUsername && (
                    <EmailInput
                        name={"email"}
                        placeholder={"Email"}
                        register={register}
                        required={true}
                    />
                )}
                {errors.email && !byUsername && (
                    <ErrorP text="Email es requerido" />
                )}
                <PasswordInput
                    name={"password"}
                    placeholder={"Contraseña"}
                    register={register}
                    required={true}
                />
                {errors.password && <ErrorP text="Contraseña es requerida" />}
                <Button type="submit" nameButton={"Iniciar Sesion"} />
            </form>
            <div className="flex flex-col items-center mt-4 sm:flex-row">
                <Paragraph text={"Aún no tienes una cuenta?"} />
                <span className="mx-1"></span>
                <DynamicLink to="/register" name="Registrate aqui" />
            </div>
        </Card>
    );
}

export default Login;
