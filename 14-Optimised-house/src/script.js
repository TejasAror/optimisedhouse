import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { Color } from "three";
import gsap from "gsap";

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

const wallColorTexture = textureLoader.load("/textures/bricks/color.jpg");
const wallNormalTexture = textureLoader.load("/textures/bricks/normal.jpg");
const wallAmbientOcculationTexture = textureLoader.load(
  "/textures/bricks/ambientOcclusion.jpg"
);
const wallRoughnessTexture = textureLoader.load(
  "/textures/bricks/roughness.jpg"
);

const roadTexture = textureLoader.load("/textures/road.jpeg");

const grassColor = textureLoader.load("/textures/grass/color.jpg");
const grassAmbientOcculation = textureLoader.load(
  "/textures/grass/ambientOcclusion.jpg"
);
const grassNormal = textureLoader.load("/textures/grass/normal.jpg");
const grassRoughness = textureLoader.load("/textures/grass/roughness.jpg");

const doorColorTexture = textureLoader.load("/textures/door/color.jpg");
const doorAlphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
);
const doorHeightTexture = textureLoader.load("/textures/door/height.jpg");
const doorNormalTexture = textureLoader.load("/textures/door/normal.jpg");
const doorMetalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const doorRoughnessTexture = textureLoader.load("/textures/door/roughness.jpg");

// colorSpace
doorColorTexture.colorSpace = THREE.SRGBColorSpace;
wallColorTexture.colorSpace = THREE.SRGBColorSpace;
roadTexture.colorSpace = THREE.SRGBColorSpace;
grassColor.colorSpace = THREE.SRGBColorSpace;

grassColor.repeat.set(10,10);
grassColor.wrapS =  THREE.RepeatWrapping;
grassColor.wrapT = THREE.RepeatWrapping;
/**
 * House
 */
const groupHouse = new THREE.Group();
scene.add(groupHouse);

const wall = new THREE.Mesh(
  new THREE.BoxGeometry(4, 2.5, 4),
  new THREE.MeshStandardMaterial({
    map: wallColorTexture,
    aoMap: wallAmbientOcculationTexture,
    normalMap: wallNormalTexture,
    roughnessMap: wallRoughnessTexture,
  })
);
wall.position.y = 1.25;
groupHouse.add(wall);

const roof = new THREE.Mesh(
  new THREE.ConeGeometry(4, 2, 4),
  new THREE.MeshStandardMaterial()
);
roof.position.y = 3.5;
roof.rotation.y = Math.PI / 4;
groupHouse.add(roof);

// door
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2, 2, 32, 32),
  new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    aoMap: doorAmbientOcclusionTexture,
    alphaMap: doorAlphaTexture,
    transparent: true,
    displacementMap: doorHeightTexture,
    displacementScale: 0.1,
    roughnessMap: doorRoughnessTexture,
    metalnessMap: doorMetalnessTexture,
    normalMap: doorNormalTexture,
  })
);
door.position.z = 2.01;
door.position.y = 1;
groupHouse.add(door);
// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({ map: grassColor, normalMap: grassNormal,  roughnessMap: grassRoughness })
);
floor.rotation.x = -Math.PI * 0.5;
floor.position.y = 0;
scene.add(floor);

const road = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 4),
  new THREE.MeshStandardMaterial({ map: roadTexture })
);

road.receiveShadow = true;
road.rotation.x = -Math.PI / 2;
road.position.y = 0.01;
road.position.z = 7;

scene.add(road);

// car
const groupCar = new THREE.Group();
scene.add(groupCar);
groupCar.position.z = 7;
groupCar.position.x = -8;

const wheelBack = new THREE.Mesh(
  new THREE.BoxGeometry(2, 0.5, 0.5),
  new THREE.MeshBasicMaterial({ color: "black" })
);
wheelBack.position.y = 0.25;

wheelBack.rotation.y = Math.PI / 2;
groupCar.add(wheelBack);

const wheelFront = new THREE.Mesh(
  new THREE.BoxGeometry(2, 0.5, 0.5),
  new THREE.MeshBasicMaterial({ color: "black" })
);
wheelFront.position.x = 2;
wheelFront.rotation.y = Math.PI / 2;
wheelFront.position.y = 0.25;
groupCar.add(wheelFront);

const main = new THREE.Mesh(
  new THREE.BoxGeometry(1.8, 1.5, 3.5),
  new THREE.MeshStandardMaterial({ color: "red" })
);

main.castShadow = true;
main.position.y = 1;
main.rotation.y = Math.PI / 2;
main.position.x = 1;
groupCar.add(main);

const cabin = new THREE.Mesh(
  new THREE.BoxGeometry(1.3, 1, 2),
  new THREE.MeshStandardMaterial()
);
cabin.castShadow = true;

cabin.position.y = 2;
cabin.position.x = 1;
cabin.rotation.y = Math.PI / 2;
groupCar.add(cabin);

gsap.to(groupCar.position, { x: 8, duration: 5, repeat: -1 });

const groupTree = new THREE.Group();
groupTree.position.set(-6, 0, 3);
scene.add(groupTree);

const wood = new THREE.Mesh(
  new THREE.BoxGeometry(0.2, 3, 0.2),
  new THREE.MeshStandardMaterial({ color: "brown" })
);
wood.position.y = 1.5;
groupTree.add(wood);

const branch1 = new THREE.Mesh(
  new THREE.ConeGeometry(2, 1, 5),
  new THREE.MeshStandardMaterial({ color: "green" })
);
branch1.position.y = 2;
groupTree.add(branch1);

const branch2 = new THREE.Mesh(
  new THREE.ConeGeometry(1.5, 1.3, 5),
  new THREE.MeshStandardMaterial({ color: "green" })
);
branch2.position.y = 3; 
groupTree.add(branch2);

const branch3 = new THREE.Mesh(
  new THREE.ConeGeometry(1, 1.3, 9),
  new THREE.MeshStandardMaterial({ color: "green" })
);
branch3.position.y = 4;
groupTree.add(branch3);
/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight("#ffffff", 0.5);
gui.add(ambientLight, "intensity").min(0).max(1).step(0.001);
scene.add(ambientLight);

// Directional light
const moonLight = new THREE.DirectionalLight("#ffffff", 3.5);
moonLight.position.set(4, 5, 6);
gui.add(moonLight, "intensity").min(0).max(1).step(0.001);
gui.add(moonLight.position, "x").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "y").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "z").min(-5).max(5).step(0.001);
scene.add(moonLight);

moonLight.castShadow = true;

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 5;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
