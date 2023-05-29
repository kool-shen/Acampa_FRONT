import { useRouter } from "next/router";
import styles from "@/styles/Product.module.css";
import { useEffect, useState } from "react";
import Head from "next/head";
import { useDispatch } from "react-redux";
import { clickMessage } from "@/reducers/message";
import Pic from "@/components/Pic";
import Cart from "@/components/Cart";
import Menu from "@/components/Menu";
import { addToBasket } from "../../reducers/basket";

function productPage() {
  /// produit cliqué + création de l'url ///
  const router = useRouter();
  const { collection, product } = router.query;

  /// Panier ///

  const [panier, setPanier] = useState({
    nom: "",
    photo: "",
    width: "",
    height: "",
    taille: "",
    variété: "",
    couleur: "",
    quantité: "",
    prix: "",
    mot: "",
    signature: "",
    montant_cadeau: "",
    durée: "",
    date: "",
  });

  /// options et index ///

  /// abonnement ///

  const [dureeIndex, setDureeIndex] = useState(0);
  const [dureeLength, setDureeLength] = useState();
  function nextDuree() {
    const isLastSlide = dureeIndex === dureeLength - 1;
    const newIndex = isLastSlide ? 0 : dureeIndex + 1;
    setDureeIndex(newIndex);
  }

  function previousDuree() {
    const isFirstSlide = dureeIndex === 0;
    const newIndex = isFirstSlide ? dureeLength - 1 : dureeIndex - 1;
    setDureeIndex(newIndex);
  }

  const [jour, setJour] = useState();
  const [mois, setMois] = useState();
  const [année, setAnnée] = useState();
  /// Carte cadeau ///

  const [cadeauIndex, setCadeauIndex] = useState(0);
  const [cadeauLength, setCadeauLength] = useState();

  function nextCadeau() {
    const isLastSlide = cadeauIndex === cadeauLength - 1;
    const newIndex = isLastSlide ? 0 : cadeauIndex + 1;
    setCadeauIndex(newIndex);
  }

  function previousCadeau() {
    const isFirstSlide = cadeauIndex === 0;
    const newIndex = isFirstSlide ? cadeauLength - 1 : cadeauIndex - 1;
    setCadeauIndex(newIndex);
  }

  /// Couleur

  const [couleurIndex, setCouleurIndex] = useState(0);

  const [couleurLength, setCouleurLength] = useState();

  function nextCouleur() {
    const isLastSlide = couleurIndex === couleurLength - 1;
    const newIndex = isLastSlide ? 0 : couleurIndex + 1;
    setCouleurIndex(newIndex);
  }

  function previousCouleur() {
    const isFirstSlide = couleurIndex === 0;
    const newIndex = isFirstSlide ? couleurLength - 1 : couleurIndex - 1;
    setCouleurIndex(newIndex);
  }
  /// Variété

  const [varietesIndex, setVarietesIndex] = useState(0);

  const [varietesLength, setVarietesLength] = useState();

  function nextVarietes() {
    const isLastSlide = varietesIndex === varietesLength - 1;
    const newIndex = isLastSlide ? 0 : varietesIndex + 1;
    setVarietesIndex(newIndex);
  }

  function previousVarietes() {
    const isFirstSlide = varietesIndex === 0;
    const newIndex = isFirstSlide ? varietesLength - 1 : varietesIndex - 1;
    setVarietesIndex(newIndex);
  }

  /// Taille

  const [sizeIndex, setSizeIndex] = useState(0);

  const [sizeLength, setSizeLength] = useState();

  function nextSize() {
    const isLastSlide = sizeIndex === sizeLength - 1;
    const newIndex = isLastSlide ? 0 : sizeIndex + 1;
    setSizeIndex(newIndex);
  }

  function previousSize() {
    const isFirstSlide = sizeIndex === 0;
    const newIndex = isFirstSlide ? sizeLength - 1 : sizeIndex - 1;
    setSizeIndex(newIndex);
  }

  /// Quantité

  const [quantity, setQuantity] = useState(1);

  const removeQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const addQuantity = () => {
    setQuantity(quantity + 1);
  };

  /// Prix

  const [initialPrice, setInitialPrice] = useState();
  const [price, setPrice] = useState();

  function calculatePrice(index, montantIndex) {
    const multiplier = index + 1;
    const selectedMontant =
      montantIndex !== undefined
        ? data[0].metadata?.montant_carte_cadeau.map((str) => parseInt(str))[
            montantIndex
          ]
        : undefined;

    if (selectedMontant !== undefined) {
      return selectedMontant * quantity * multiplier;
    } else {
      const livraison = 40 * (dureeIndex + 1);
      return data[0].metadata
        ?.duree /* affiche le prix de la formule la moins chère dans l'album si c'est un abonnement */
        ? initialPrice * quantity * multiplier * (dureeIndex + 1) * 6 +
            livraison
        : initialPrice * quantity * multiplier;
    }
  }

  const handlePrice = (amount) => {
    setInitialPrice(amount);
  };

  /// Config Panier ///

  const [cartClicked, setCartClicked] = useState(false);

  const [messageClicked, setMessageClicked] = useState(false);

  const displayCart = !cartClicked
    ? { transform: "translateX(0)", transition: "transform 1s" }
    : { transition: "transform 1s" };

  const dispatch = useDispatch();

  const messageIsFalse = () => {
    dispatch(clickMessage(false));
  };

  /// fetch DATA / fetch sous catégories shop & useEffect ///

  const [indexCategories, setIndexCategories] = useState([]);

  const loadSubCategories = async () => {
    try {
      const response = await fetch(
        "https://acampa-back.vercel.app/cloudinary/folders"
      );
      const indexlist = await response.json();

      if (indexlist.length > 0) {
        setIndexCategories(indexlist);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (collection && product) {
          const response = await fetch(
            `https://acampa-back.vercel.app/cloudinary/product?product=${product}`
          );
          const jsonData = await response.json();

          if (jsonData) {
            setData(jsonData);
            setSizeLength(jsonData[0].metadata.tailles?.length ?? 0);
            setCouleurLength(jsonData[0].metadata.couleur?.length ?? 0);
            setVarietesLength(jsonData[0].metadata.Varietes?.length ?? 0);
            setCadeauLength(
              jsonData[0].metadata.montant_carte_cadeau?.length ?? 0
            );
            setDureeLength(jsonData[0].metadata.duree?.length ?? 0);
            setInitialPrice(jsonData[0].metadata.prix);
            if (data[0].metadata?.montant_carte_cadeau) {
              const newPrice = calculatePrice(
                sizeIndex ? sizeIndex : 0,
                cadeauIndex
              );
              setPrice(newPrice);
            } else {
              const newPrice = calculatePrice(sizeIndex ? sizeIndex : 0);
              setPrice(newPrice);
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    loadSubCategories();
  }, [
    collection,
    product,
    initialPrice,
    sizeIndex,
    quantity,
    cadeauIndex,
    dureeIndex,
  ]);

  //// ahouter au panier ///

  const addProduct = () => {
    const newPanier = {
      nom: data[0].metadata?.nom_du_produit,
      photo: data[0].src,
      height: data[0].height,
      width: data[0].width,
      taille: data[0]?.metadata?.tailles?.[sizeIndex],
      variété: data[0]?.metadata?.Varietes?.[varietesIndex],
      couleur: data[0]?.metadata?.couleur?.[couleurIndex],
      quantité: quantity,
      montant_cadeau: data[0]?.metadata?.montant_carte_cadeau
        ? data[0]?.metadata?.montant_carte_cadeau[cadeauIndex]
        : "",

      prix: price,
      mot: " ",
      durée: data[0]?.metadata?.duree
        ? data[0]?.metadata?.duree[dureeIndex]
        : "",
      dateDébut: data[0]?.metadata?.duree ? `${jour}/${mois}/${année}` : "",
    };
    dispatch(addToBasket(newPanier));
  };

  return (
    <>
      <Head>
        <title> {`Acampa - ${product}`}</title>
        <link rel="icon" href="/assets/Logo-icon.png" />
        <meta name="yo" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      {data && (
        <div className={styles.mainContainer}>
          <Cart
            style={displayCart}
            isClicked={messageClicked}
            onClick={() => {
              setCartClicked(false);
              setMessageClicked(false);
              messageIsFalse();
            }}
          />

          <div className={styles.textContainer}>
            <Menu
              clickCart={() => {
                setCartClicked(true);
              }}
              indexCategories={indexCategories}
            />
          </div>
          <div className={styles.galleryContainer}>
            <div className={styles.focusContainer}>
              <div className={styles.picContainer}>
                <Pic
                  src={data[0].src}
                  width={data[0].width}
                  height={data[0].height}
                  alt={data[0].context?.alt}
                  onClick={() => {
                    console.log(jour, mois, année);
                  }}
                />
              </div>
              <div className={styles.productFocusContainer}>
                <div className={styles.textProductContainer}>
                  <div className={styles.productTitle}>
                    {data[0].metadata?.nom_du_produit?.toUpperCase()}
                  </div>
                  <div
                    className={styles.productDescription}
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {data[0].context?.alt}
                  </div>
                  <div className={styles.productDescription}>_</div>
                </div>
                <div className={styles.numbersProductContainer}>
                  {!data[0].metadata.tailles &&
                    !data[0].metadata.Varietes &&
                    !data[0].metadata.montant_carte_cadeau &&
                    !data[0].metadata.couleur && (
                      <div className={styles.choiceContainer}>
                        <div className={styles.productDescription}>
                          PRIX UNIQUE
                        </div>
                      </div>
                    )}

                  <div className={styles.choiceContainer}>
                    <div
                      className={styles.productDescription}
                    >{`${price},00€`}</div>
                  </div>

                  {data[0].metadata?.tailles ? (
                    <div className={styles.propriétésContainer}>
                      <div className={styles.choiceContainer}>
                        <div className={styles.productDescription}>TAILLE</div>
                      </div>
                      <div className={styles.choiceContainer}>
                        <div
                          className={styles.productDescription}
                          onClick={previousSize}
                        >
                          &lt;
                        </div>
                        <div className={styles.valueContainer}>
                          <div className={styles.productDescription}>
                            {data[0].metadata?.tailles[sizeIndex].toUpperCase()}
                          </div>
                        </div>
                        <div
                          className={styles.productDescription}
                          onClick={nextSize}
                        >
                          &gt;
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {data[0].metadata?.couleur ? (
                    <div className={styles.propriétésContainer}>
                      <div className={styles.choiceContainer}>
                        <div className={styles.productDescription}>COULEUR</div>
                        <div
                          className={styles.productDescription}
                          onClick={previousCouleur}
                        >
                          &lt;
                        </div>
                        <div className={styles.valueContainer}>
                          <div className={styles.productDescription}>
                            {data[0].metadata?.couleur[couleurIndex]}
                          </div>
                        </div>
                        <div
                          className={styles.productDescription}
                          onClick={nextCouleur}
                        >
                          &gt;
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {data[0].metadata?.Varietes ? (
                    <div className={styles.propriétésContainer}>
                      <div className={styles.choiceContainer}>
                        <div className={styles.productDescription}>VARIÉTÉ</div>
                      </div>
                      <div className={styles.choiceContainer}>
                        <div
                          className={styles.symbol}
                          onClick={previousVarietes}
                        >
                          &lt;
                        </div>
                        <div className={styles.valueContainer}>
                          <div className={styles.productDescription}>
                            {data[0].metadata?.Varietes[varietesIndex]}
                          </div>
                        </div>
                        <div className={styles.symbol} onClick={nextVarietes}>
                          &gt;
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {data[0].metadata?.montant_carte_cadeau ? (
                    <div className={styles.propriétésContainer}>
                      <div className={styles.choiceContainer}>
                        <div className={styles.productDescription}>MONTANT</div>
                      </div>
                      <div className={styles.choiceContainer}>
                        <div className={styles.symbol} onClick={previousCadeau}>
                          &lt;
                        </div>
                        <div className={styles.valueContainer}>
                          <div className={styles.productDescription}>
                            {`${data[0].metadata?.montant_carte_cadeau[cadeauIndex]},00€`}
                          </div>
                        </div>
                        <div className={styles.symbol} onClick={nextCadeau}>
                          &gt;
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {data[0].metadata?.duree ? (
                    <>
                      <div className={styles.propriétésContainer}>
                        <div className={styles.choiceContainer}>
                          <div className={styles.productDescription}>DURÉE</div>
                        </div>
                        <div className={styles.choiceContainer}>
                          <div
                            className={styles.symbol}
                            onClick={previousDuree}
                          >
                            &lt;
                          </div>
                          <div className={styles.valueContainer}>
                            <div className={styles.productDescription}>
                              {`${data[0].metadata?.duree[dureeIndex]} mois`}
                            </div>
                          </div>
                          <div className={styles.symbol} onClick={nextDuree}>
                            &gt;
                          </div>
                        </div>
                      </div>
                      <div className={styles.propriétésContainer}>
                        <div className={styles.choiceContainer}>
                          <div className={styles.productDescription}>
                            À PARTIR DU
                          </div>
                        </div>
                        <div className={styles.choiceContainer}>
                          <div className={styles.inputContainer}>
                            <textarea
                              value={jour}
                              onChange={(e) => {
                                const inputValue = e.target.value;
                                const filteredValue = inputValue
                                  .slice(0, 2)
                                  .replace(/[^a-zA-Z0-9]/g, "");
                                setJour(filteredValue);
                              }}
                              className={styles.dateInput}
                              style={{ width: "2vw" }}
                            />

                            <textarea
                              value={mois}
                              onChange={(e) => {
                                const inputValue = e.target.value;
                                const filteredValue = inputValue
                                  .slice(0, 2)
                                  .replace(/[^a-zA-Z0-9]/g, "");
                                setMois(filteredValue);
                              }}
                              className={styles.dateInput}
                              style={{ width: "2vw" }}
                            />

                            <textarea
                              value={année}
                              onChange={(e) => {
                                const inputValue = e.target.value;
                                const filteredValue = inputValue
                                  .slice(0, 4)
                                  .replace(/[^a-zA-Z0-9]/g, "");
                                setAnnée(filteredValue);
                              }}
                              className={styles.dateInput}
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div className={styles.panierContainer}>
                  <div className={styles.quantityContainer}>
                    <div
                      className={styles.productDescription}
                      onClick={removeQuantity}
                    >
                      -
                    </div>
                    <div className={styles.valueContainer}>
                      <div className={styles.productDescription}>
                        {quantity}
                      </div>
                    </div>
                    <div
                      className={styles.productDescription}
                      onClick={addQuantity}
                    >
                      +
                    </div>
                  </div>
                  <div
                    className={styles.panierText}
                    onClick={() => {
                      addProduct();
                    }}
                  >
                    AJOUTER AU PANIER +
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}{" "}
    </>
  );
}

export default productPage;
