import styles from "./Carousel.module.css";
import Image from "next/image";
import apple from "../images/apple.png";

export default function Carousel(props) {
    return (
        <div className={styles.carousel} styles={{}}>
            <div className={`${styles.container} container`}>
                <div className={styles.content}>
                    <div className={styles.text}>
                        <h1>My Title Goes Here</h1>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Placeat illum expedita vel neque animi,
                            eveniet repellendus error explicabo dicta alias
                            dignissimos excepturi asperiores a? Atque impedit
                            magni mollitia nesciunt id.
                        </p>
                        <a href="#" className={`${styles.button} button`}>
                            Learn more
                        </a>
                        <a
                            href="#"
                            className={`${styles.button} button secondary`}
                        >
                            Buy now
                        </a>
                    </div>
                    <Image className={styles.hero} src={apple} alt="" />
                </div>
                <div className={styles.dots}>
                    <div className={`${styles.dot} ${styles.active}`}></div>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                </div>
            </div>
        </div>
    );
}
