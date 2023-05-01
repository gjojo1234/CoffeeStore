import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/Card.module.css";

const Card = (props) => {
  return (
    <Link href={props.href} className={styles.cardLink}>
      <div className={styles.container}>
        <h2 className={styles.cardHeader}>{props.name}</h2>
        <Image
          src={props.imgUrl}
          width={240}
          height={200}
          className={styles.cardImg}
          alt={props.name}
          priority={true}
        />
      </div>
    </Link>
  );
};

export default Card;
