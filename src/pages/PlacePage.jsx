import React, { useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

import BackToMapButton from "../components/UI/BackToMapButton";
import PlaceMenu from "../components/Place/PlaceMenu";
import PlaceQA from "../components/Place/PlaceQA";
import PlaceQuiz from "../components/Place/PlaceQuiz";
import classes from "./PlacePage.module.css";
import { root_url } from "../helpers/root";

export default function PlacePage(props) {

  const id = props.id;

  // const { id } = useParams();
  const [displayed, setDisplayed] = useState("main");

  const data = props.data;
  const place = data.places.data.find(place => place.id===id);

  const ats = place.attributes;
  const title = ats.title;
  const perex = ats.perex;
  const about = ats.about;
  const quiz_intro = ats.quiz_intro;
  const img_main_url = root_url.concat(ats.illus_main.data.attributes.url);
  const img_left_url = root_url.concat(ats.illus_left.data.attributes.url);
  const img_right_url = root_url.concat(ats.illus_right.data.attributes.url);
  const facts_q = [ats.fact_1Q, ats.fact_2Q, ats.fact_3Q];
  const facts_a = [ats.fact_1A, ats.fact_2A, ats.fact_3A];
  
  const color = ats.hex_color;
  const lighten = ats.hex_color.concat('11');

  const clickHandler = (data) => {
    setDisplayed(data);
  };

  return (
    <div className={classes.layout} style={{backgroundColor: lighten}}>
      <div className={classes.header}>
        <div className={classes.left}></div>
          {(displayed == "main" || displayed == "more") && (
            <div className={classes.title}>
                <h1 style={{color: color}}>{title}</h1>
                <h3 className={classes.perex}>{perex}</h3>
            </div>
          )}
          {displayed == "facts" && (
            <div className={classes.title}>
              <h1 style={{color: color}}>Věděli jste, že?</h1>
            </div>
          )}
          {displayed == "quiz" && (
            <div className={classes.title}>
              <h1 style={{color: color}}>Quiz</h1>
              <h3 className={classes.perex}>{quiz_intro}</h3>
            </div>
          )}
        <div className={classes.right}>
          <div className={classes.btn}>
            <BackToMapButton color={color}/>
          </div>
        </div>
      </div>
      <div className={classes.main}>
        {displayed == "main" && (
          <Fragment>
            <img className={classes.image} src={img_main_url}></img>
            <div className={classes.leftmain}></div>
            <div className={classes.center}>
              <div className={classes.menu}>
                <PlaceMenu displayed={displayed} color={color} onClick={clickHandler} />
              </div>
            </div>
            <div className={classes.rightmain}></div>
          </Fragment>
        )}
        {displayed == "more" && (
          <Fragment>
            <div className={classes.leftmain}>
              <img className={classes.cornerImage} src={img_left_url}></img>
            </div>
            <div className={classes.centermain}>
              <div className={classes.content}>
                <p>{about}</p>
              </div>
              <div className={classes.menu}>
                <PlaceMenu displayed={displayed} color={color} onClick={clickHandler} />
              </div>
            </div>
            <div className={classes.rightmain}>
              <img className={classes.cornerImage} src={img_right_url}></img>
            </div>
          </Fragment>
        )}
        {displayed == "facts" && (
          <Fragment>
            <div className={classes.leftmain}>
              <img className={classes.cornerImage} src={img_left_url}></img>
            </div>
            <div className={classes.centermain}>
              <div className={classes.contentQA}>
                <PlaceQA color={color} value={1} questions={facts_q} answers={facts_a} />
              </div>
              <div className={classes.menu}>
                <PlaceMenu displayed={displayed} color={color} onClick={clickHandler} />
              </div>
            </div>
            <div className={classes.rightmain}>
              <img className={classes.cornerImage} src={img_right_url}></img>
            </div>
          </Fragment>
        )}
        {displayed == "quiz" && (
          <Fragment>
            <div className={classes.leftmain}>
              <img className={classes.cornerImage} src={img_left_url}></img>
            </div>
            <div className={classes.centermain}>
              <div className={classes.content}>
                <PlaceQuiz color={color}/>
              </div>
              <div className={classes.menu}>
                <PlaceMenu displayed={displayed} color={color} onClick={clickHandler} />
              </div>
            </div>
            <div className={classes.rightmain}>
              <img className={classes.cornerImage} src={img_right_url}></img>
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
}
