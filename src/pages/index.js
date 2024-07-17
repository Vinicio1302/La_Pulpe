import { useEffect } from "react";
import Image from "next/image";
import styles from "../styles/index.module.css";

export default function Home() {
    useEffect(() => {
        const leftColumn = document.querySelector(`.${styles.leftColumn}`);
        const rightColumn = document.querySelector(`.${styles.rightColumn}`);

        function setEqualHeight() {
            const leftHeight = leftColumn.offsetHeight;
            rightColumn.style.height = `${leftHeight}px`;
        }

        // Set the height initially
        setEqualHeight();

        // Adjust the height on window resize
        window.addEventListener('resize', setEqualHeight);

        return () => {
            window.removeEventListener('resize', setEqualHeight);
        };
    }, []);

    return (
        <main className={styles.main}>
            <div className={styles.leftColumn}>
                <div className={styles.title}>
                    <p>
                        Welcome to<br/>
                        <code className={styles.code}></code>
                    </p>
                </div>
                <div className={styles.titlename}>
                    <p>
                        La Pulpe<br/>
                        <code className={styles.code}></code>
                    </p>
                </div>
                <div className={styles.subtitle}>
                    <p>
                        Please login with your account to access the catalog<br/>
                        <code className={styles.code}></code>
                    </p>
                </div>
                <div className={styles.cardsContainer}>
                    <a href="/login" className={styles.card}>
                        <h2>
                            Log in
                        </h2>
                        <p>Go to log in page</p>
                    </a>
                </div>
                <div className={styles.logoLFContainer}>
                    <Image
                        className={styles.logoLF}
                        src="/logoLF.png"
                        alt="LoGO LF"
                        width={200}
                        height={200}
                        priority
                    />
                </div>
                <div className={styles.sublowertitle}>
                    <p>
                        Sponsored by LightForce Costa Rica <br/>
                        <code className={styles.code}></code>
                    </p>
                </div>
            </div>
            <div className={styles.rightColumn}>
                <div className={styles.flipContainer}>
                    <div className={styles.flipper}>
                        <div className={styles.front}>
                            <Image
                                className={styles.logoContainer}
                                src="/lapulpe2.webp"
                                alt="La Pulpe"
                                width={500}
                                height={500}
                                priority
                            />
                        </div>
                        <div className={styles.back}>
                            <Image
                                className={styles.logoContainer}
                                src="/lapulpe.png"
                                alt="La Pulpe"
                                width={500}
                                height={500}
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
