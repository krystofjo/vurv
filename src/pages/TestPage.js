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
    general {
      data{
        id
        attributes {
          url
        }
      }
    }
  }
`;

export default function TestPage() {

  const { loading, error, data } = useQuery(MAP);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  console.log(data.general);

  return (
    <h1>
      TEST
    </h1>
  );
}
