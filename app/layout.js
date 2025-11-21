import { Roboto } from "next/font/google";
import "./globals.css";
import { NavBar } from "../components/NavBar/NavBar";
import Link from "next/link";
import Image from "next/image";
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
                    <Image
                        className={NavBar.getLogoClassName()}
                        src={logo}
                        alt=""
                    />
                    <NavBar.Links>
                        <Link href="/">Home</Link>
                        <NavBar.DropdownMenu name="Projects">
                            <Link href="#">Project A</Link>
                            <Link href="#">Project B</Link>
                            <Link href="#">Project C</Link>
                            <Link href="#">Project D</Link>
                        </NavBar.DropdownMenu>
                        <NavBar.DropdownMenu name="About Us">
                            <Link href="#">
                                Our Mission Our Mission Our Mission
                            </Link>
                            <Link href="#">Our Team</Link>
                            <Link href="#">Our Values</Link>
                        </NavBar.DropdownMenu>
                        <Link href="#">Item-4</Link>
                        <Link href="/test">Test</Link>
                    </NavBar.Links>
                    <NavBar.Actions>
                        <Link href="#">Login</Link>
                        <Link
                            href="#"
                            className={NavBar.getButtonPrimaryClassName()}
                        >
                            Sign Up
                        </Link>
                    </NavBar.Actions>
                </NavBar>
                {children}
            </body>
        </html>
    );
}
