import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext, useEffect } from "react";

// CONTEXT
import { AuthContext } from "../context/AuthContext";

// COMPONENTS
import Button from "../components/Button";
import Card from "../components/Card";
import Title from "../components/Title";
import ErrorP from "../components/ErrorP";
import BoxErrors from "../components/BoxErrors";
import TextInput from "../components/TextInput";
import EmailInput from "../components/EmailInput";
import PasswordInput from "../components/PasswordInput";
import Paragraph from "../components/Paragraph";
import DynamicLink from "../components/DynamicLink";

function register() {
    let {
        signup,
        errors: signUpErrors,
        isAuthenticated,
    } = useContext(AuthContext);

    let navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated]);

    let {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    let onSubmit = async (data) => {
        signup(data);
    };

    return (
        <Card page="form">
            <Title titleName={"Registrate"} />
            {signUpErrors &&
                signUpErrors.map((error) => (
                    <BoxErrors key={error} text={error} />
                ))}
            <form
                className="mt-4 flex flex-col"
                onSubmit={handleSubmit(onSubmit)}
            >
                <TextInput
                    name={"username"}
                    register={register}
                    required={true}
                    placeholder={"Username"}
                />
                {errors.username && <ErrorP text={"Username es requerido"} />}
                <EmailInput
                    name={"email"}
                    register={register}
                    required={true}
                    placeholder={"Email"}
                />
                {errors.email && <ErrorP text={"Email es requerido"} />}
                <PasswordInput
                    name={"password"}
                    register={register}
                    required={true}
                    placeholder={"Contraseña"}
                />
                {errors.password && <ErrorP text={"Contraseña es requerida"} />}
                <Button type="submit" nameButton={"Registrate"} />
            </form>
            <div className="flex flex-col items-center mt-4 sm:flex-row">
                <Paragraph text={"Ya tienes una cuenta?"} />
                <span className="mx-1"></span>
                <DynamicLink to="/login" name="Iniciar Sesion" />
            </div>
        </Card>
    );
}

export default register;
