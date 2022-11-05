import AuthForm from "../components/AuthForm";
import { login } from "../actions/auth";

const Login = () => (
   <AuthForm actionName="Login" link="/register" linkText="Registration" auth={login} redirect={true} />
);

export default Login;