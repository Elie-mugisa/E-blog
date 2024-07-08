import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const NavItemCollapse = ({
  title,
  content,
  icon,
  name,
  activeNavName,
  setActiveNavName,
}) => {
  const [isCheck, setIsCheck] = useState(true);

  useEffect(() => {
    if (activeNavName !== name) {
      setIsCheck(false);
    }
  }, [activeNavName, name]);

  return (
    <div className="collapse collapse-arrow bg-base-200 min-h-0 rounded-none py-2  ">
      <input
        type="checkbox"
        className="min-h-0 py-0"
        checked={name === activeNavName}
        onChange={() => {
          setActiveNavName(name);
          setIsCheck(!isCheck);
        }}
      />
      <div
        className={`collapse-title text-lg min-h-0 py-0 pl-0 flex gap-x-2 items-center text-gray-500 font-semibold ${
          name == activeNavName
            ? "font-bold text-prim"
            : "font-semibold text-gray-500"
        } `}
      >
        {icon}
        {title}
      </div>
      <div className="collapse-content">
        <div className="mt-2 flex flex-col gap-y-2 ">
          {content.map((item) => (
            <Link key={item.index} to={item.link}>
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavItemCollapse;
