import React from "react";
import styles from "../styles/Home.module.css";
import friseStylesfrom from "../styles/Frise2.module.css";
import { useState, useEffect } from "react";
import Pic from "./Pic";
import Link from "next/link";
import menuStyles from "@/styles/subMenu.module.css";

export default function Home() {
  //// Load Cloudinary ////

  const [fetchData, setFetchData] = useState([]);

  const loadImage = async () => {
    try {
      const response = await fetch(
        "https://acampa-back.vercel.app/cloudinary/homepage"
      );
      const resource = await response.json();

      if (resource.length > 0) {
        setFetchData(resource);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadImage();

    const mouseWheel = document.querySelector(".scrollContainer");
    console.log(mouseWheel);
    mouseWheel.addEventListener("wheel", handleScroll);
  }, []);

  /// Scroll horizontal ///

  function handleScroll(e) {
    e.preventDefault();
    console.log("test");
    const race = 40; // How many pixels to scroll

    if (e.deltaY > 0)
      // Scroll right
      document.querySelector(".scrollContainer").scrollLeft += race;
    // Scroll left
    else document.querySelector(".scrollContainer").scrollLeft -= race;
  }

  //// déroulement du menu ////

  const [menuClicked, setMenuClicked] = useState(false);

  const displayMenu = !menuClicked
    ? { opacity: 0, transition: "transform 2s" }
    : { transition: "transform 2s" };

  const burgerStyle = !menuClicked
    ? { zIndex: 1, transition: "transform 1s" }
    : { zIndex: -1, opacity: 0, transition: "transform 1s" };

  /// Virer le style du link ///

  const removeLinkStyle = {
    textDecoration: "none",
    color: "inherit",
  };
  //////////

  return (
    <div className={`${styles.mainContainer} scrollContainer`}>
      <div className={styles.firstContainer}>
        <div className={styles.presentationContainer}>
          <div className={styles.acampaContainer}>
            <div className={styles.acampaBold}>
              Acampá*
              <div /> <div className={styles.acampaBold}></div>est un atelier
              floral
            </div>{" "}
            <div className={styles.acampaRegular}>basé à Marseille.</div>
            <div className={styles.acampaDescription}>
              * "Porter une chose du champ à la maison" dit l’étymologie
              provençale, une bien jolie manière de définir cette envie de
              fleurir vos "intérieurs" que ce soit dans vos doux salons d’hiver,
              vos tablées printanières ou simplement vos envies du coeur.
            </div>
          </div>
        </div>
        <div className={styles.logoContainer}>
          <Pic
            className={styles.logo}
            width={542}
            height={956}
            src={"/assets/Logo-fleur.png"}
          />
        </div>
        <div className={styles.friseContainer}>
          <div className={styles.scrollContainerTop}>
            <div className={styles.pic1Container}>
              {fetchData.length > 0 && (
                <Pic
                  src={fetchData[0].src}
                  width={fetchData[0].width}
                  height={fetchData[0].height}
                  alt={fetchData[0].collection}
                />
              )}
            </div>
            <div className={styles.pic2Container}>
              {fetchData.length > 0 && (
                <Pic
                  src={fetchData[1].src}
                  width={fetchData[1].width}
                  height={fetchData[1].height}
                  alt={fetchData[1].collection}
                />
              )}
            </div>
          </div>
          <div className={styles.scrollContainerBottom}>
            <div className={styles.leftPicContainer}>
              <div className={styles.pic3Container}>
                {fetchData.length > 0 && (
                  <Pic
                    src={fetchData[2].src}
                    width={fetchData[2].width}
                    height={fetchData[2].height}
                    alt={fetchData[2].collection}
                  />
                )}
              </div>

              <div className={styles.pic4Container}>
                {fetchData.length > 0 && (
                  <Pic
                    src={fetchData[3].src}
                    width={fetchData[3].width}
                    height={fetchData[3].height}
                    alt={fetchData[3].collection}
                  />
                )}
              </div>
            </div>
            <div className={styles.pic5Container}>
              {fetchData.length > 0 && (
                <Pic
                  src={fetchData[4].src}
                  width={fetchData[4].width}
                  height={fetchData[4].height}
                  alt={fetchData[4].collection}
                />
              )}
            </div>
          </div>
        </div>
        <div
          className={styles.burgerContainer}
          onClick={() => {
            setMenuClicked(true);
            console.log(menuClicked);
          }}
          style={burgerStyle}
        >
          <Pic
            width={45}
            height={45}
            src={"/assets/burgerMenu.png"}
            alt={"burger menu logo"}
          />
        </div>
        <div className={styles.menuContainer} style={displayMenu}>
          <Pic
            width={45}
            height={45}
            src={"/assets/cross.png"}
            alt={"cross"}
            onClick={() => {
              setMenuClicked(false);
              console.log(menuClicked);
            }}
            style={{ paddingTop: 15, paddingLeft: 30 }}
          />
          <div className={menuStyles.menu}>
            <div className={menuStyles.titleContainer}>
              <Link
                href="/shop"
                style={removeLinkStyle}
                className={menuStyles.title}
              >
                Boutique
              </Link>
            </div>

            <div className={menuStyles.titleContainer}>
              <Link
                href="/prestations"
                style={removeLinkStyle}
                className={menuStyles.title}
              >
                Prestations
              </Link>
            </div>
            <div className={menuStyles.titleContainer}>
              <div className={menuStyles.title}>À propos</div>
            </div>
          </div>
        </div>
      </div>
      <div className={friseStylesfrom.container}>
        <div className={friseStylesfrom.scrollContainerTop2}>
          <div className={friseStylesfrom.pic1Container}>
            {fetchData.length > 0 && (
              <Pic
                src={fetchData[5].src}
                width={fetchData[5].width}
                height={fetchData[5].height}
                alt={fetchData[5].collection}
              />
            )}
          </div>
          <div className={friseStylesfrom.pic2Container}>
            {fetchData.length > 0 && (
              <Pic
                src={fetchData[6].src}
                width={fetchData[6].width}
                height={fetchData[6].height}
                alt={fetchData[6].collection}
              />
            )}
          </div>
        </div>
        <div className={friseStylesfrom.scrollContainerBottom2}>
          <div className={friseStylesfrom.leftPicContainer2}>
            <div className={friseStylesfrom.pic3Container}>
              {fetchData.length > 0 && (
                <Pic
                  src={fetchData[7].src}
                  width={fetchData[7].width}
                  height={fetchData[7].height}
                  alt={fetchData[7].collection}
                />
              )}
            </div>

            <div className={friseStylesfrom.pic4Container}>
              {fetchData.length > 0 && (
                <Pic
                  src={fetchData[8].src}
                  width={fetchData[8].width}
                  height={fetchData[8].height}
                  alt={fetchData[8].collection}
                />
              )}
            </div>
          </div>
          <div className={friseStylesfrom.pic5Container}>
            {fetchData.length > 0 && (
              <Pic
                src={fetchData[9].src}
                width={fetchData[9].width}
                height={fetchData[9].height}
                alt={fetchData[9].collection}
              />
            )}
          </div>
        </div>
      </div>
      <div className={friseStylesfrom.container}>
        <div className={friseStylesfrom.scrollContainerTop2}>
          <div className={friseStylesfrom.pic1Container}>
            {fetchData.length > 0 && (
              <Pic
                src={fetchData[10].src}
                width={fetchData[10].width}
                height={fetchData[10].height}
                alt={fetchData[10].collection}
              />
            )}
          </div>
          <div className={friseStylesfrom.pic2Container}>
            {fetchData.length > 0 && (
              <Pic
                src={fetchData[11].src}
                width={fetchData[11].width}
                height={fetchData[11].height}
                alt={fetchData[11].collection}
              />
            )}
          </div>
        </div>
        <div className={friseStylesfrom.scrollContainerBottom2}>
          <div className={friseStylesfrom.leftPicContainer2}>
            <div className={friseStylesfrom.pic3Container}>
              {fetchData.length > 0 && (
                <Pic
                  src={fetchData[12].src}
                  width={fetchData[12].width}
                  height={fetchData[12].height}
                  alt={fetchData[12].collection}
                />
              )}
            </div>

            <div className={friseStylesfrom.pic4Container}>
              {fetchData.length > 0 && (
                <Pic
                  src={fetchData[13].src}
                  width={fetchData[13].width}
                  height={fetchData[13].height}
                  alt={fetchData[13].collection}
                />
              )}
            </div>
          </div>
          <div className={friseStylesfrom.pic5Container}>
            {fetchData.length > 0 && (
              <Pic
                src={fetchData[14].src}
                width={fetchData[14].width}
                height={fetchData[14].height}
                alt={fetchData[14].collection}
              />
            )}
          </div>
        </div>
      </div>
      <div className={friseStylesfrom.container}>
        <div className={friseStylesfrom.scrollContainerTop2}>
          <div className={friseStylesfrom.pic1Container}>
            {fetchData.length > 0 && (
              <Pic
                src={fetchData[15].src}
                width={fetchData[15].width}
                height={fetchData[15].height}
                alt={fetchData[15].collection}
              />
            )}
          </div>
          <div className={friseStylesfrom.pic2Container}>
            {fetchData.length > 0 && (
              <Pic
                src={fetchData[16].src}
                width={fetchData[16].width}
                height={fetchData[16].height}
                alt={fetchData[16].collection}
              />
            )}
          </div>
        </div>
        <div className={friseStylesfrom.scrollContainerBottom2}>
          <div className={friseStylesfrom.leftPicContainer2}>
            <div className={friseStylesfrom.pic3Container}>
              {fetchData.length > 0 && (
                <Pic
                  src={fetchData[17].src}
                  width={fetchData[17].width}
                  height={fetchData[17].height}
                  alt={fetchData[17].collection}
                />
              )}
            </div>

            <div className={friseStylesfrom.pic4Container}>
              {fetchData.length > 0 && (
                <Pic
                  src={fetchData[18].src}
                  width={fetchData[18].width}
                  height={fetchData[18].height}
                  alt={fetchData[18].collection}
                />
              )}
            </div>
          </div>
          <div className={friseStylesfrom.pic5Container}>
            {fetchData.length > 0 && (
              <Pic
                src={fetchData[19].src}
                width={fetchData[19].width}
                height={fetchData[19].height}
                alt={fetchData[19].collection}
              />
            )}
          </div>
        </div>
      </div>
      <div className={friseStylesfrom.container}>
        <div className={friseStylesfrom.scrollContainerTop2}>
          <div className={friseStylesfrom.pic1Container}>
            {fetchData.length > 0 && (
              <Pic
                src={fetchData[20].src}
                width={fetchData[20].width}
                height={fetchData[20].height}
                alt={fetchData[20].collection}
              />
            )}
          </div>
          <div className={friseStylesfrom.pic2Container}>
            {fetchData.length > 0 && (
              <Pic
                src={fetchData[21].src}
                width={fetchData[21].width}
                height={fetchData[21].height}
                alt={fetchData[21].collection}
              />
            )}
          </div>
        </div>
        <div className={friseStylesfrom.scrollContainerBottom2}>
          <div className={friseStylesfrom.leftPicContainer2}>
            <div className={friseStylesfrom.pic3Container}>
              {fetchData.length > 0 && (
                <Pic
                  src={fetchData[22].src}
                  width={fetchData[22].width}
                  height={fetchData[22].height}
                  alt={fetchData[22].collection}
                />
              )}
            </div>

            <div className={friseStylesfrom.pic4Container}>
              {fetchData.length > 0 && (
                <Pic
                  src={fetchData[23].src}
                  width={fetchData[23].width}
                  height={fetchData[23].height}
                  alt={fetchData[23].collection}
                />
              )}
            </div>
          </div>
          <div className={friseStylesfrom.pic5Container}>
            {fetchData.length > 0 && (
              <Pic
                src={fetchData[24].src}
                width={fetchData[24].width}
                height={fetchData[24].height}
                alt={fetchData[24].collection}
              />
            )}
          </div>
        </div>
      </div>
      <div className={friseStylesfrom.container}>
        <div className={friseStylesfrom.scrollContainerTop2}>
          <div className={friseStylesfrom.pic1Container}>
            {fetchData.length > 0 && (
              <Pic
                src={fetchData[25].src}
                width={fetchData[25].width}
                height={fetchData[25].height}
                alt={fetchData[25].collection}
              />
            )}
          </div>
          <div className={friseStylesfrom.pic2Container}>
            {fetchData.length > 0 && (
              <Pic
                src={fetchData[26].src}
                width={fetchData[26].width}
                height={fetchData[26].height}
                alt={fetchData[26].collection}
              />
            )}
          </div>
        </div>
        <div className={friseStylesfrom.scrollContainerBottom2}>
          <div className={friseStylesfrom.leftPicContainer2}>
            <div className={friseStylesfrom.pic3Container}>
              {fetchData.length > 0 && (
                <Pic
                  src={fetchData[27].src}
                  width={fetchData[27].width}
                  height={fetchData[27].height}
                  alt={fetchData[27].collection}
                />
              )}
            </div>

            <div className={friseStylesfrom.pic4Container}>
              {fetchData.length > 0 && (
                <Pic
                  src={fetchData[28].src}
                  width={fetchData[28].width}
                  height={fetchData[28].height}
                  alt={fetchData[28].collection}
                />
              )}
            </div>
          </div>
          <div className={friseStylesfrom.pic5Container}>
            {fetchData.length > 0 && (
              <Pic
                src={fetchData[29].src}
                width={fetchData[29].width}
                height={fetchData[29].height}
                alt={fetchData[29].collection}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
