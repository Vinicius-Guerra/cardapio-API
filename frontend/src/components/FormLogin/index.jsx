import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./formSchema";
import { useRestaurantContext } from "../../providers/RestaurantContext";
import style from "./style.module.scss";
import { Input } from "../Input";
import { Link } from "react-router-dom";


export const FormLogin = () => {
    const { restaurantLogin } = useRestaurantContext();
    
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = (payload) => {
        restaurantLogin(payload);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={style.loginForm}>
            <Input label="Email" type="email" placeholder="E-mail do seu estabelecimento" error={errors.email} {...register("email")} />
            <Input label="Senha" type="password" placeholder="Digite aqui sua senha" error={errors.password} {...register("password")} />
            <button type="submit">Entrar</button>
            <Link to="/restaurants" className={style.register}>
                <p>Cadastre-se agora</p>
            </Link>
        </form>
    )
}