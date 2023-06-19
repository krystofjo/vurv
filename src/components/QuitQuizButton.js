import React, { Fragment } from 'react';
import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { QuizContext } from '../helpers/Context';
import Modal from './UI/Modal';
import Button from './UI/Button';

export default function QuitQuizButton() {

  const navigate = useNavigate();

  const [modalShown, setModalShown] = useState(false);

  const showModal = () => {
    setModalShown(true);
  }
  const cancelMadal = () => {
    setModalShown(false)
  }

  const backToMap = () => {
    navigate("/");
  }

  return (
    <Fragment>
      <div>
      {modalShown && (
        <Modal 
        title="Ukončit quiz"
        message={`Chcete předčasně ukončit quiz?`}
        onCancel={cancelMadal}
        onConfirm={backToMap}
        confirmText={"Ukončit"}
        cancelText={"Pokračovat"}
        />
      )}
      </div>
      <Button onClick={showModal}>Quit Quiz</Button>
      
    </Fragment>
  )
}
