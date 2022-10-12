import * as THREE from "../../threeJS/three.module.js";

import { FlyControls } from "./jsm/controls/FlyControls.js";

let container;

let camera, scene, renderer;
let controls;

//var runFooterAnimation = "true";
const clock = new THREE.Clock();

init();
animate();

function init() {
  container = document.createElement("div");
  document.querySelector(".footer-animation").appendChild(container);

  // camera

  camera = new THREE.PerspectiveCamera(
    1000,
    window.innerWidth / window.innerHeight,
    1,
    4500
  );
  camera.position.z = 100;

  // scene

  scene = new THREE.Scene();
  scene.background = new THREE.Color().setHSL(0.51, 0.4, 0.01);
  scene.fog = new THREE.Fog(scene.background, 50, 4500);

  // light

  const lightFromTop = new THREE.DirectionalLight(0xffffff, 1);
  scene.add(lightFromTop);
  const lightFromBottom = new THREE.DirectionalLight(0xffffff, 0.9);
  lightFromBottom.position.set(0, -1, 0);
  scene.add(lightFromBottom);

  // world

  const s = 100;

  const geometry = new THREE.BoxBufferGeometry(s, s, s);
  const material = new THREE.MeshLambertMaterial({
    color: 0xffffff,
  });

  for (let i = 0; i < 350; i++) {
    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.x = 2000 * (2.0 * Math.random() - 1.0);
    mesh.position.y = 2000 * (2.0 * Math.random() - 1.0);
    mesh.position.z = 2000 * (2.0 * Math.random() - 1.0);

    mesh.rotation.x = Math.random() * Math.PI;
    mesh.rotation.y = Math.random() * Math.PI;
    mesh.rotation.z = Math.random() * Math.PI;

    mesh.matrixAutoUpdate = false;
    mesh.updateMatrix();

    scene.add(mesh);
  }

  // renderer

  renderer = new THREE.WebGLRenderer({
    antialias: false,
    //powerPreference: "high-performance",
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  //renderer.outputEncoding = THREE.LinearEncoding;
  container.appendChild(renderer.domElement);
  var containerForMouseHandler = document.querySelector(".footer-section");

  // camera default controls
  controls = new FlyControls(camera, containerForMouseHandler);

  controls.movementSpeed = 20;
  controls.domElement = container;
  controls.rollSpeed = Math.PI / 300;
  controls.autoForward = false;
  controls.dragToLook = true;

  // events

  window.addEventListener("resize", onWindowResize);
}

//

function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

// animation function

// for some reason returning to element stutters with observer
/*const footerObserverOptions = {
  root: null,
  threshold: 0,
  rootMargin: "0px 0px 0px 0px",
};

const animationObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      runFooterAnimation = true;
    } else {
      runFooterAnimation = false;
    }
  });
}, footerObserverOptions);
window.addEventListener("DOMContentLoaded", (event) => {
  const sections = Array.from(document.getElementsByClassName("footer-section"));

  for (let section of sections) {
    animationObserver.observe(section);
  }
});*/

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  const delta = clock.getDelta();
  controls.update(delta);
  renderer.render(scene, camera);
}
