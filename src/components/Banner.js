import styles from "@/styles/Banner.module.css";
import Image from "next/image";
const Banner = (props) => {
  return (
    <div className={styles.banner}>
      <article className={styles.article}>
        <h1 className={styles.title}>
          <span>Coffee</span> Stores
        </h1>
        <p className={styles.subtitle}>Discover your local coffee shops!</p>
        <button className={styles.button} onClick={props.btnChangeText}>
          {props.btnText}
        </button>
      </article>
      <Image
        src="/static/Coffee_Lover_Isometric.png"
        width={300}
        height={260}
        alt=""
        priority={true}
      />
    </div>
  );
};

export default Banner;
