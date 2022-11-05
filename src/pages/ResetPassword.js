import AuthForm from "../components/AuthForm";
import { reset } from "../actions/auth";

const ResetPassword = () => (
    <AuthForm 
        actionName="Reset Password" 
        link="" 
        linkText="" 
        auth={reset} 
        redirect={true} 
        reset={true}
    />
);

export default ResetPassword;