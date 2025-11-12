import { NavBar, NavLink, NavLogo, NavButton } from "../components/NavBar";
import Carousel from "../components/Carousel";
import logo from "../images/logo.jpg";

export default function Home() {
    return (
        <>
            <NavBar>
                <NavLogo image={logo} />
                <NavLink name="Item-5" href="#" />
                <NavLink name="Item-2" href="#" />
                <NavLink name="Item-3" href="#" />
                <NavLink name="Item-4" href="#" />
                <NavButton name="Sign Up" href="#" />
                <NavButton name="Login" href="#" primary={false} />
            </NavBar>
            <Carousel />
        </>
    );
}
