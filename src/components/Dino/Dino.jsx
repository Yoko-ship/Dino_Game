import React, { useEffect, useRef, useState } from "react";
import "./Dino.css";
import Modal from "../Modal";

function Dino() {
  const dinoRef = useRef();
  const cactusRef = useRef();
  const [score, setScore] = useState(0);
  const [modalScore, setModalScore] = useState(0);
  const [isOpened, setIsOpened] = useState(false);

  const jump = () => {
    if (!isOpened) {
      if (!!dinoRef.current && dinoRef.current.classList != "jump") {
        
        dinoRef.current.classList.add("jump");
        const audio = new Audio("src\\components\\Dino\\sound\\jump.wav")
        audio.play()

        setTimeout(function () {
          dinoRef.current.classList.remove("jump");

        }, 300);
      }
    }
  };

  useEffect(() => {
    const isAlive = setInterval(function () {
      // get current dino Y position
      if (!isOpened) {
        const dinoTop = parseInt(
          getComputedStyle(dinoRef.current).getPropertyValue("top")
        );


        // get current cactus X position
        let cactusLeft = parseInt(
          getComputedStyle(cactusRef.current).getPropertyValue("left")
        );
        // detect collision
        if (cactusLeft < 40 && cactusLeft > 0 && dinoTop >= 140) {
          // collision
          // alert("Game Over! Your Score : " + score);
          const deathAudio = new Audio("src\\components\\Dino\\sound\\die.wav")
          deathAudio.play()
          setIsOpened(true);
          setModalScore(score);
          clearInterval(isAlive);
          setScore(0);
        } else {
          setScore((prevValue) => prevValue + 1);
        }
      }
    }, 10);

    return () => clearInterval(isAlive);
  });

  useEffect(() => {
    document.addEventListener("keydown", function(event){
      if(["Space","ArrowUp"].includes(event.code)){
        jump()
      }
    });
    return () => document.removeEventListener("keydown", jump);
  }, []);

  return (
    <>
      {!isOpened ? (
        <div className="game">
          Score : {score}
          <div id="dino" ref={dinoRef}></div>
          <div id="cactus" ref={cactusRef}></div>
        </div>
      ) : (
        <Modal isOpened={isOpened} setIsOpened={setIsOpened}>
          <p>Game Over! Your score : {modalScore}</p>
        </Modal>
      )}
    </>
  );
}

export default Dino;
