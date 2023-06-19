import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import Button from '../UI/Button';

export default function PlaceIcon(props) {
  const navigate = useNavigate();
  const id = props.id;

  const onClickHandler = () => {
    navigate(`/place/${id}`)
  }

  return (
    <Button onClick={onClickHandler}>
        {props.title}
    </Button>
  )
}
