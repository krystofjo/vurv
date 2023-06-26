import React, { Fragment, useState, useContext } from "react";
import { AppContext } from "../helpers/Context";
import PlaceIcon from "../components/Place/PlaceIcon";
import Button from "../components/UI/Button";
import Modal from "../components/UI/Modal";
import { useQuery, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import Label from "../components/Map/Label";
import classes from "./MapPage.module.css";
import { root_url } from "../helpers/root";

export default function MapPage(props) {
  // const navigate = useNavigate();

  const [modalShown, setModalShown] = useState(false);

  const data = props.data;
  const places = data.places.data;
  const url = data.general.data.attributes.url;

  const img_url = root_url.concat(data.general.data.attributes.map.data.attributes.url);
  
  const cloud1_url = root_url.concat(data.general.data.attributes.clouds.data[0].attributes.url);
  const cloud2_url = root_url.concat(data.general.data.attributes.clouds.data[1].attributes.url);
  const cloud3_url = root_url.concat(data.general.data.attributes.clouds.data[2].attributes.url);
  const cloud4_url = root_url.concat(data.general.data.attributes.clouds.data[3].attributes.url);

  const showModal = () => {
    setModalShown(true);
  };

  const leaveSite = () => {
    window.location.href = url;
  };

  const cancelMadal = () => {
    setModalShown(false);
  };

    const { setAppState, setPlaceId } = useContext(AppContext);

  const onClickHandler = (id) => {
    // navigate(`/place/${id}`);
    setPlaceId(id)
    setAppState('place')
  };

  return (
    <div className={classes.window}>
      {modalShown && (
        <Modal
          title="Opustit stránku"
          message={`Chcete odejít na stránku ${url}?`}
          onCancel={cancelMadal}
          onConfirm={leaveSite}
          confirmText={"Odejít"}
          cancelText={"Zůstat"}
        />
      )}
      <div className={classes.container}>
        <div className={classes.labels}>
          {places.map((place) => (
            <Fragment key={place.id}>
            {place.attributes.show && 
              <div
                key={place.id}
                className={classes.label}
                style={{
                  top: `${place.attributes.map_position_top}%`,
                  left: `${place.attributes.map_position_left}%`,
                }}
              >
              <Label key={place.id} onClick={() => onClickHandler(place.id)}>
                <div className={classes.labelText} style={{ color: place.attributes.hex_color }}>
                  {place.attributes.title}
                </div>
              </Label>
              </div>
            }
            </Fragment>
          ))}
        </div>
        <div className={classes.clouds}>
          <img className={classes.cloud1} src={cloud1_url}/>
          <img className={classes.cloud2} src={cloud2_url}/>
          <img className={classes.cloud3} src={cloud3_url}/>
          <img className={classes.cloud4} src={cloud4_url}/>
        </div>
        <img className={classes.map} src={img_url}/>
      </div>
      <Button className={classes.logoButton} onClick={showModal}>
        <h5>
          VURV.cz
        </h5>
      </Button>
      <div></div>
    </div>
  );
}
