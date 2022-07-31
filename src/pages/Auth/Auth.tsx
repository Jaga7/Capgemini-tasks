import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../shared/utils/hooks";
import style from "./Auth.module.css";
const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentUser, isWrongLogin } = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  const [loginName, setLoginName] = useState("");
  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUser(loginName));
  };
  return (
    <div className={style["login-component"]}>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='name: admin or user'
          onChange={(e) => setLoginName(e.target.value)}
        />
        <button>Login</button>
      </form>
      {isWrongLogin && <p className={style["invalid-login"]}>Invalid login</p>}
    </div>
  );
};
export default Auth;
