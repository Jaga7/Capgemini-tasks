import styles from "./NavBarCurrentNameAndRole.module.css";

const NavBarCurrentNameAndRole = ({
  currentUserName,
  currentUserRole,
}: {
  currentUserName: string;
  currentUserRole: string;
}) => {
  return (
    <div className={styles["current-user-name-and-role"]}>
      <p> name: {currentUserName}</p>
      <p>role:{currentUserRole}</p>
    </div>
  );
};
export default NavBarCurrentNameAndRole;
