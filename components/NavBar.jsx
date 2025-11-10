import styles from "./NavBar.module.css";
import logo from "../images/logo.jpg";
import Image from "next/image";

export default function NavBar() {
    return (
        <div className={styles.nav}>
            <div className={`${styles.container} container`}>
                <Image className={styles.logo} src={logo} alt="" />
                <ul>
                    <li>
                        <a href="#">Item-1</a>
                    </li>
                    <li>
                        <a href="#">Item-2</a>
                    </li>
                    <li>
                        <a href="#">Item-3</a>
                    </li>
                    <li>
                        <a href="#">Item-4</a>
                    </li>
                    <li>
                        <a href="#">Item-5</a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
