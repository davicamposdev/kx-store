import { Link } from "react-router-dom";
import LargeButton from "../components/LargeButton";
import LoginInputs from "../components/LoginInputs";
import LoginTitle from "../components/LoginTitle";
import Logo from "../components/Logo";

const Login = () => (
  <div className="flex items-center justify-evenly">
    <div className="flex flex-col gap-10">
      <LoginTitle />
      <LoginInputs />
      <div className="flex justify-center w-96 mt-5">
        <Link to="/home" className="w-full">
          <LargeButton text="Sing in" />
        </Link>
      </div>
    </div>
    <Logo />
  </div>
);

export default Login;
