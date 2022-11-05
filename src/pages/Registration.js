import AuthForm from "../components/AuthForm";
import { register } from "../actions/auth";

const Registration = () => (
   <AuthForm actionName="Registration" link="/" linkText="Login" auth={register} />
);

export default Registration;