"use client";
import Personaje from "@/pages/personajes/personaje";
import styles from "./page.module.css";

export default function Page() {
  return (
    <main className={styles.main}>
      <Personaje />
    </main>
  );
}
