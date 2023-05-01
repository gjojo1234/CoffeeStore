import { useRouter } from "next/router";
import { isEmpty, fetcher } from "../../../utils";
import { StoreContext } from "@/store/store-context";
import useSWR from "swr";

import Link from "next/link";
import Head from "next/head";
import { HiArrowLeft, HiOutlineHome, HiOutlineStar } from "react-icons/hi2";
import styles from "@/styles/CoffeeStoreItem.module.css";
import Image from "next/image";
import { useState, useContext, useEffect } from "react";
import { fetchCoffeeStores } from "../../../lib/coffee-stores";

export async function getStaticProps(staticProps) {
  const coffeeStores = await fetchCoffeeStores();
  const params = staticProps.params;
  const findCoffeeStoresById = coffeeStores.find((coffeeStore) => {
    return coffeeStore.id.toString() === params.id; //dynamicID
  });

  return {
    props: {
      coffeeStore: findCoffeeStoresById ? findCoffeeStoresById : {},
    },
  };
}

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores();
  const paths = coffeeStores.map((coffeeStore) => {
    return {
      params: {
        id: coffeeStore.id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
}

const CoffeeStoreItem = (initialProps) => {
  const [count, setCount] = useState(0);
  const router = useRouter();

  const id = router.query.id;

  const [coffeeStore, setCoffeeStore] = useState(
    initialProps.coffeeStore || {}
  );
  const {
    state: { coffeeStores },
  } = useContext(StoreContext);
  const handleCreateCoffeeStore = async (coffeeStore) => {
    try {
      const { id, name, voting, address, imgUrl } = coffeeStore;
      const response = await fetch("/api/createCoffeeStore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          name,
          voting: voting || 0,
          address: address || "",
          imgUrl,
        }),
      });
    } catch (err) {
      console.error("Error creating coffee store", err);
    }
  };
  useEffect(() => {
    if (isEmpty(initialProps.coffeeStore)) {
      if (coffeeStores.length > 0) {
        const findCoffeeStoreById = coffeeStores.find((coffeeStore) => {
          return coffeeStore.id.toString() === id; //dynamic id
        });
        setCoffeeStore(findCoffeeStoreById);
        handleCreateCoffeeStore(findCoffeeStoreById);
      }
    } else {
      handleCreateCoffeeStore(initialProps.coffeeStore);
    }
  }, [id, initialProps.coffeeStore, coffeeStores]);
  const {
    name = "",
    address = "",

    imgUrl = "",
  } = coffeeStore;
  const { data, error } = useSWR(`/api/getCoffeeStoreById?id=${id}`, fetcher);
  console.log(data);
  useEffect(() => {
    if (data) {
      setCoffeeStore(data.response[0]);
      setCount(data.response[0]?.voting || 0);
    }
  }, [data]);
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  const handleBtnUpvote = async () => {
    try {
      await fetch("/api/favouriteCoffeeStoreById", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      });
      setCount(count + 1);
    } catch (err) {
      console.error("Error upvoting coffee store", err);
    }
  };

  return (
    <div className={styles.coffeeStoreItem}>
      <Head>
        <title>{name}</title>
      </Head>
      <Link href="/" className={styles.backLink}>
        <HiArrowLeft /> Back to home
      </Link>
      <p className={styles.name}>{name}</p>
      <section className={styles.section}>
        <Image
          src={imgUrl || "/static/Coffee_Lover_Isometric.png"}
          width={300}
          height={240}
          className={styles.image}
          alt="hero image"
          priority
        />
        <div className={styles.container}>
          <p className={styles.address}>
            <HiOutlineHome /> {address}
          </p>

          <p className={styles.stars}>
            <HiOutlineStar />
            {count}
          </p>
          <button className={styles.btn} onClick={handleBtnUpvote}>
            Up vote!
          </button>
        </div>
      </section>
    </div>
  );
};

export default CoffeeStoreItem;
