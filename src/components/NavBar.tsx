import links from "../shared/utils/links";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className='nav-links'>
      {links.map((link) => {
        return (
          <NavLink
            to={link.path}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            key={link.id}
          >
            <span className='icon'>{link.icon}</span>
            {link.text}
          </NavLink>
        );
      })}
    </div>
  );
};
export default NavBar;
