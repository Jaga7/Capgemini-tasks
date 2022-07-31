import NavLinks from "./NavLinks";
import styles from "./NavBar.module.css";
import { useAppSelector } from "../../shared/utils/hooks";
import NavBarCurrentNameAndRole from "./NavBarCurrentNameAndRole";
import LogoutButton from "../LogoutButton";
const NavBar = () => {
  const { currentUser } = useAppSelector((state) => state.auth);
  return (
    <div className={styles["navbar"]}>
      <NavLinks />
      {currentUser && (
        <NavBarCurrentNameAndRole
          currentUserName={currentUser.name}
          currentUserRole={currentUser.role}
        />
      )}
      <LogoutButton />
    </div>
  );
};
export default NavBar;
