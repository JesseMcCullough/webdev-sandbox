import { Roboto } from "next/font/google";
import "./globals.css";
import {
    NavBar,
    NavLogo,
    NavLink,
    NavLinks,
    NavButton,
    NavDropdownMenu,
    NavActions,
} from "../components/NavBar/NavBar";
import Link from "next/link";
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
                    <NavLinks>
                        <NavLink name="Home" href="/" />
                        <NavDropdownMenu name="Projects">
                            <NavLink name="Project A" href="#" />
                            <NavLink name="Project B" href="#" />
                            <NavLink name="Project C" href="#" />
                        </NavDropdownMenu>
                        <NavDropdownMenu name="About Us">
                            <NavLink
                                name="Our Mission Our Mission Our Mission"
                                href="#"
                            />
                            <NavLink name="Our Team" href="#" />
                            <NavLink name="Our Values" href="#" />
                        </NavDropdownMenu>
                        <NavLink name="Item-4" href="#" />
                        <NavLink name="Test" href="/test" />
                    </NavLinks>
                    <NavActions>
                        <Link href="#">Login</Link>
                        <NavButton name="Sign Up" href="#" primary={true} />
                    </NavActions>
                </NavBar>
                {children}
            </body>
        </html>
    );
}
