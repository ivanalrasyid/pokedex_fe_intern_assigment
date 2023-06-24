import React, { useContext, useState } from "react";
import FavoriteContext from "../contexts/favoritesContext";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ProgressBar from "react-bootstrap/ProgressBar";
import PokeballImage from "../assets/pokeball.png";
import { searchIcon } from "../utils/icons";

const Pokemon = (props) => {
  const { favoritePokemons, updateFavoritePokemons } =
    useContext(FavoriteContext);

  const { pokemon } = props;

  const onHeartClick = () => {
    updateFavoritePokemons(pokemon.name);
  };

  const onDetailClick = () => {
    updateFavoritePokemons(pokemon.id);
  };

  const heart = favoritePokemons.includes(pokemon.name) ? "❤️" : "🖤";

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const colors = [
    "#FC6B6E",
    "#2196F3",
    "#094BE8",
    "#2196F3",
    "#3ED1E0",
    "#CF9B48",
  ];

  const [lgShow, setLgShow] = useState(false);

  return (
    <>
      <div className="pokemon-card">
        <div className="pokemon-image-container">
          <img
            alt={pokemon.name}
            src={pokemon.sprites.front_default}
            className="pokemon-image"
          />
        </div>
        <div className="card-body">
          <div className="card-top">
            <h3> {pokemon.name}</h3>
            <div>
              #{pokemon.id}{" "}
              <img className="card__title-img" src={PokeballImage} alt="" />
            </div>
          </div>
          <div className="card-bottom">
            <div className="pokemon-type">
              {pokemon.types.map((type, index) => {
                return (
                  <div key={index} className="pokemon-type-text">
                    {type.type.name}
                  </div>
                );
              })}
            </div>
          </div>
          <button
            className="pokemon-detail-btn"
            onClick={() => setLgShow(true)}
          >
            Detail
          </button>
          <Modal
            size="md"
            show={lgShow}
            onHide={() => setLgShow(false)}
            aria-="example-modal-sizes-title-lg"
          >
            <Modal.Body>
              <div
                className="modal__content-features"
                style={{
                  backgroundColor: `var(--bg-poke-color-dark-${pokemon.types[0].type.name})`,
                }}
              >
                <div className="modal__content-featuresRight">
                  <span className="modal__content-featuresHabitat">
                    <img
                      className="modal__content-featuresImage"
                      src={searchIcon(pokemon.types[0].type.name)}
                      alt=""
                    />
                  </span>
                  {pokemon["past_types"].length > 0 && (
                    <span className="modal__content-featuresGeneration"></span>
                  )}
                </div>
                <div className="modal__content-featuresLeft">
                  <span className="modal__content-featuresHeight">
                    Height: {pokemon.height}
                  </span>
                  <span className="modal__content-featuresWeight">
                    weight : {pokemon.weight}
                  </span>
                  <button className="pokemon-heart-btn" onClick={onHeartClick}>
                    {heart}
                  </button>
                </div>
              </div>
              <div className="modal__content-description">
                <img
                  className="modal__content-descriptionImage"
                  src={pokemon.sprites["front_default"]}
                  alt=""
                />
                <h3 className="modal__content-descriptionTitle">
                  {pokemon.name}
                </h3>
                <p className="modal__content-descriptionParagraph">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex
                  quaerat eligendi{" "}
                </p>
                <h4 className="modal__type">Type</h4>
                {pokemon.types.map((type, index) => {
                  return (
                    <div key={index}>
                      <span className="modal__content-featuresWeight">
                        {type.type.name}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="modal__content-other">
                <div className="modal__content-otherBreadcrumb">
                  <h4 className="modal__content-otherBreadcrumbAbilities">
                    Abilities
                  </h4>
                  {pokemon.abilities.map(({ ability }) => (
                    <span
                      key={ability.name}
                      className="modal__content-otherBreadcrumbAbility"
                    >
                      {ability.name}
                    </span>
                  ))}
                </div>
                <div className="modal__content-otherStats">
                  <h4 className="modal__content-otherStatsTitle">Stats</h4>
                  {pokemon.stats.map((stat, index) => (
                    <div
                      className="modal__content-otherStat"
                      key={stat.stat.name}
                    >
                      <div className="modal__content-otherStatContent">
                        <span className="modal__content-otherStatContentPower">
                          {stat.stat.name}
                        </span>
                        <span className="modal__content-otherStatContentValue">
                          {stat.base_stat}
                        </span>
                      </div>
                      <div className="modal__content-otherStatTimeLine">
                        {stat.base_stat >= 100 ? (
                          <div
                            className="modal__content-otherStatTimeLineStat"
                            style={{
                              width: "100%",
                              backgroundColor: `${colors[index]}`,
                            }}
                          ></div>
                        ) : (
                          <div
                            className="modal__content-otherStatTimeLineStat"
                            style={{
                              width: `${stat.base_stat}%`,
                              backgroundColor: `${colors[index]}`,
                            }}
                          ></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* {pokemon.moves.map((move, index) => {
                return (
                  <div key={index}>
                    <span className="modal__content-featuresWeight">
                      {move.move.name}
                    </span>
                  </div>
                );
              })} */}
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default Pokemon;
