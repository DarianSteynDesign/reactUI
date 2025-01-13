import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import './Navbar.scss';
import useAuthStore from "../../store/authStore";
import Cart from "../Dashboard/Cart/Cart";

const activeProps = {
  className: 'active',
};

export function Navbar() {
  //Covered: Route hooks and route state management
  const routerState = useRouterState();
  const currentRoute = routerState.location.pathname;
  const { protectedData } = useAuthStore(); 
  const menuItems = [
    { to: "/home/" + protectedData?.user?.id, label: "Home" },
    { to: "/signup", label: "Sign Up" },
    { to: "/login", label: "Login" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/lazy", label: "Lazy" },
  ];
  const activeItem = menuItems.find(item => currentRoute == item.to);

  return (
    <>
    <nav className="navbar">
    <div className="menu-container">
        <div className="navbar-selected">
          <Link to={activeItem?.to || "/"} activeProps={activeProps}>
            {activeItem?.label || "Menu"}
          </Link>
        </div>
        <ul className="navbar-menu">
          {menuItems.map(item => (
            <li key={item.to}>
              <Link to={item.to} activeProps={activeProps}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <Cart />
    </nav>
    
    <div className="page-content-container">
      <Outlet />
    </div>
    </>
  );
}
