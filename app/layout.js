import { Roboto } from "next/font/google";
import "./globals.css";
import {
    NavBar,
    NavLogo,
    NavLink,
    NavButton,
} from "../components/NavBar/NavBar";
import logo from "../images/logo.jpg";

const roboto = Roboto({
    subsets: ["latin"],
});

export const metadata = {
    title: "Web Dev Sandbox",
    description:
        "Web development sandbox, just for practice. Learning more about React and Next.js.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={roboto.className}>
                <NavBar>
                    <NavLogo image={logo} />
                    <NavLink name="Home" href="/">
                        <NavLink name="SubItem-1" href="#" />
                        <NavLink name="SubItem-2" href="#" />
                        <NavLink name="SubItem-3" href="#" />
                        <NavLink name="SubItem-4" href="#" />
                        <NavLink name="SubItem-5 Hello Hello" href="#" />
                    </NavLink>
                    <NavLink name="Item-2" href="#" />
                    <NavLink name="Item-3" href="#">
                        <NavLink name="SubItem-1" href="#" />
                        <NavLink name="SubItem-2" href="#" />
                        <NavLink name="SubItem-3" href="#" />
                    </NavLink>
                    <NavLink name="Item-4" href="#" />
                    <NavLink name="Test" href="/test" />
                    <NavButton name="Login" href="#" />
                    <NavButton name="Sign Up" href="#" primary={true} />
                </NavBar>
                {children}
            </body>
        </html>
    );
}
