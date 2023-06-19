import React, { Fragment, useState } from "react";
import PlaceIcon from "../components/Place/PlaceIcon";
import Button from "../components/UI/Button";
import Modal from "../components/UI/Modal";
import { useQuery, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import Label from "../components/Map/Label";
import classes from "./MapPage.module.css";

const MAP = gql`
  query GetMapData {
    places {
      data {
        id
        attributes {
          title
          hex_color
          map_position_top
          map_position_left
          show
        }
      }
    }
    general {
      data {
        id
        attributes {
          url
          map {
            data {
              id
              attributes {
                formats
                url
              }
            }
          }
          clouds {
            data {
              id
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;

export default function MapPage() {
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(MAP);
  const [modalShown, setModalShown] = useState(false);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  //TODO: CHANGE ROOT
  // const root_url = "http://localhost:1337";
  const url = data.general.data.attributes.url;
  const img_url = data.general.data.attributes.map.data.attributes.url;

  const cloud1_url = data.general.data.attributes.clouds.data[0].attributes.url;
  const cloud2_url = data.general.data.attributes.clouds.data[1].attributes.url;
  const cloud3_url = data.general.data.attributes.clouds.data[2].attributes.url;
  const cloud4_url = data.general.data.attributes.clouds.data[3].attributes.url;

  const showModal = () => {
    setModalShown(true);
  };

  const leaveSite = () => {
    window.location.href = url;
  };

  const cancelMadal = () => {
    setModalShown(false);
  };

  const onClickHandler = (id) => {
    navigate(`/place/${id}`);
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
          {data.places.data.map((place) => (
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
          <img
            className={classes.cloud1}
            src={cloud1_url}
          ></img>
          <img
            className={classes.cloud2}
            src={cloud2_url}
          ></img>
          <img
            className={classes.cloud3}
            src={cloud3_url}
          ></img>
          <img
            className={classes.cloud4}
            src={cloud4_url}
          ></img>
        </div>
        <img className={classes.map} src={img_url}></img>
      </div>
      <Button className={classes.logoButton} onClick={showModal}>
        VURV.cz
      </Button>
      <div></div>
    </div>
  );
}
