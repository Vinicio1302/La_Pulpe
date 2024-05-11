import Image from "next/image";
import styles from "../styles/index.module.css";

export default function Home() {
    return (
        <main className={styles.main}>
            <div className={styles.leftColumn}>
                <div className={styles.title}>
                    <p>
                        Welcome to La Pulpe. <br/>
                        <code className={styles.code}></code>
                    </p>
                </div>
                <div className={styles.subtitle}>
                    <p>
                        Please sign up or login if you already have an account.<br/>
                        <code className={styles.code}></code>
                    </p>
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
                        Sponsored by LightForce Orthodontics. <br/>
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
                                    src="/lapulpe.png"
                                    alt="La Pulpe"
                                    width={500}
                                    height={500}
                                    priority
                                />
                        </div>
                        <div className={styles.back}>
                            <div className={styles.front}>
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


                <div className={styles.cardsContainer}>
                    <a href="/login" className={styles.card}>
                        <h2>
                            Login <span>-&gt;</span>
                        </h2>
                        <p>Go to login page</p>
                    </a>

                    <a href="/signUp" className={styles.card}>
                    <h2>
                            Sign up <span>-&gt;</span>
                        </h2>
                        <p>Go to sign up page</p>
                    </a>
                </div>
            </div>
        </main>
    );
}