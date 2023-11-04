import React from "react";
import styles from "../../app/page.module.css";
import { useEffect, useState } from "react";
import Image from "next/image";
import Imgin from "../../asests/img/images.jpg";

type Personaje = {
  item: {};
  name: string;
  species: string;
  gender: string;
  status: string;
  image: string;

  location: {
    name: string;
  };
  origin: {
    name: string;
  };
};

const personaje = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [personajes, setPersonajes] = useState<Personaje[]>([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [pages, setPages] = useState(0);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [cargando, setCargando] = useState(false);
  const consultarApi = async () => {
    setCargando(true);
    const url = `https://rickandmortyapi.com/api/character/?page=${pages}`;
    const respuesta = await fetch(url);
    const resultado = await respuesta.json();
    const datosDelPersonaje = await resultado?.results;
    setPersonajes(datosDelPersonaje);
    //   console.log(datosDelPersonaje);
    setCargando(false);
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    consultarApi();
  }, []);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    consultarApi();
  }, [pages]);
  // console.log(personajes);
  const handleSiguient = () => {
    setPages(pages + 1);
  };
  const handleAtras = () => {
    setPages(pages - 1);
  };
  console.log(cargando);

  return (
    personajes && (
      <div className={styles.container}>
        <header className={styles.header}>
          <Image src={Imgin} alt="img" width="220" height="120" />

          <h1>Rick <span className={styles.title}>and </span>Morty</h1>

          <input type="text" />
        </header>
        <div className={styles.buttons}>
          <h5>Personajes:</h5>
          {pages >= 1 && <button onClick={handleAtras}>Anterior</button>}
          <button onClick={handleSiguient}>Siguients</button>
        </div>

        {cargando ? (
          <p>Cargando...</p>
        ) : (
          <div className={styles.contenido}>
            {personajes.map((item) => (
              <div className={styles.center} key={item.name}>
                <Image
                  className={styles.img}
                  src={item.image}
                  alt="img"
                  width="220"
                  height="220"
                />
                <div className={styles.informacion}>
                  <h1>{item.name}</h1>
                  <h4>
                    Gender: <span className={styles.info}>{item.gender}</span>{" "}
                  </h4>
                  <h4>
                    Species: <span className={styles.info}>{item.species}</span>{" "}
                  </h4>
                  <h4>
                    Status: <span className={styles.info}>{item.status}</span>{" "}
                  </h4>
                  <h4>
                    Location:{" "}
                    <span className={styles.info}>{item.location.name}</span>{" "}
                  </h4>
                  <h4>
                    Origen:{" "}
                    <span className={styles.info}>{item.origin.name}</span>{" "}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  );
};

export default personaje;
