/* eslint-disable react/prop-types */

import { NavLink } from "react-router-dom";

const NavItem = ({
  link,
  title,
  icon,
  name,
  activeNavName,
  setActiveNavName,
}) => {
  return (
    <NavLink
      to={link}
      className={`${ name == activeNavName
          ? "font-bold text-prim"
          : "font-semibold text-gray-500"
      } flex items-center gap-x-2 py-2 text-lg `}
      onClick={() => setActiveNavName(name)}
    >
      {icon}
      {title}
    </NavLink>
  );
};

export default NavItem;
