import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as TWEEN from "@tweenjs/tween.js";

let loadingOverlayEl = document.querySelector(".loading-overlay");
let appEl = document.querySelector(".app");

export const dropOverlay = () => {
  console.log("drop overlay bitch!!");
  let pos = { y: 0 };
  new TWEEN.Tween(pos)
    .to({ y: 100 }, 3000)
    .start()
    .onUpdate(() => {
      loadingOverlayEl.style.transform = `translateY(${pos.y}%)`;
    })
    .onComplete(() => {
      console.log("present gallery!");
      appEl.removeChild(loadingOverlayEl);
    });
};

function animation() {
  TWEEN.update();

  requestAnimationFrame(animation);
}

animation();
