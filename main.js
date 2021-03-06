import './style.css';

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#app'),
});

renderer.setPixelRatio(window.devicePixelRatio);

renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);

// const material = new THREE.MeshBasicMaterial({color: 0XFF6347, wireframe: true});

const material = new THREE.MeshStandardMaterial({color: 0XFF6347});

const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);

pointLight.position.set(5,5,5);

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);

const gridHelper = new THREE.GridHelper(200, 50);

scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load('assets/space.jpg');
scene.background = spaceTexture;

// Profile photo
const meTexture = new THREE.TextureLoader().load('/assets/me.jpg');

const me = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({ map : meTexture})
);

scene.add(me);

// Java 

// Profile photo
const javaTexture = new THREE.TextureLoader().load('/assets/java.png');
const normalTexture = new THREE.TextureLoader().load('/assets/normal.jpg');

const java = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({ map : javaTexture, normalMap: normalTexture})
);

scene.add(java);

java.position.z = 30;
java.position.setX(-10);


function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  java.rotation.x += 0.05;
  java.rotation.y += 0.075;
  java.rotation.z += 0.05;

  me.rotation.y += 0.01;
  me.rotation.z += 0.01;

  camera.position.z = t *  -0.01;
  camera.position.x = t *  -0.0002;
  camera.position.x = t *  -0.0002;
}

document.body.onscroll = moveCamera;

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  torus.rotation.x += 0.01;

  torus.rotation.y += 0.005;

  torus.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

animate();
