import { useNavigate } from "react-router-dom";
import { logoutUser } from "../features/auth/authSlice";
import { useAppDispatch } from "../shared/utils/hooks";

const LogoutButton = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onClick = async () => {
    await dispatch(logoutUser());

    navigate("/login");
  };
  return <button onClick={onClick}>Logout</button>;
};
export default LogoutButton;
