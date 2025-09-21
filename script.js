import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { GUI } from "lil-gui"
import gsap from "gsap"

/**
 * Debug UI
 */
const gui = new GUI({ width: 340 })
gui.close()

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl")

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x1a1a1a)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
directionalLight.position.set(2, 2, 2)
scene.add(directionalLight)

/**
 * Objects
 */
const objects = {}

// Cube
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
const cubeMaterial = new THREE.MeshLambertMaterial({ color: "#ff6b6b" })
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
cube.position.set(-2, 0, 0)
scene.add(cube)
objects.cube = cube

// Sphere
const sphereGeometry = new THREE.SphereGeometry(0.7, 32, 32)
const sphereMaterial = new THREE.MeshLambertMaterial({ color: "#4ecdc4" })
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
sphere.position.set(0, 0, 0)
scene.add(sphere)
objects.sphere = sphere

// Torus
const torusGeometry = new THREE.TorusGeometry(0.6, 0.3, 16, 100)
const torusMaterial = new THREE.MeshLambertMaterial({ color: "#45b7d1" })
const torus = new THREE.Mesh(torusGeometry, torusMaterial)
torus.position.set(2, 0, 0)
scene.add(torus)
objects.torus = torus

// Cone
const coneGeometry = new THREE.ConeGeometry(0.6, 1.5, 8)
const coneMaterial = new THREE.MeshLambertMaterial({ color: "#f9ca24" })
const cone = new THREE.Mesh(coneGeometry, coneMaterial)
cone.position.set(0, 2, 0)
scene.add(cone)
objects.cone = cone

/**
 * Debug UI Controls
 */
// Scene controls
const sceneFolder = gui.addFolder("Scene")
sceneFolder.add(ambientLight, "intensity").min(0).max(2).step(0.01).name("Ambient Light")
sceneFolder.add(directionalLight, "intensity").min(0).max(3).step(0.01).name("Directional Light")
sceneFolder.addColor(scene, "background").name("Background Color")

// Cube controls
const cubeFolder = gui.addFolder("Cube")
cubeFolder.add(cube.position, "x").min(-5).max(5).step(0.01).name("Position X")
cubeFolder.add(cube.position, "y").min(-5).max(5).step(0.01).name("Position Y")
cubeFolder.add(cube.position, "z").min(-5).max(5).step(0.01).name("Position Z")
cubeFolder.add(cube.rotation, "x").min(-Math.PI).max(Math.PI).step(0.01).name("Rotation X")
cubeFolder.add(cube.rotation, "y").min(-Math.PI).max(Math.PI).step(0.01).name("Rotation Y")
cubeFolder.add(cube.rotation, "z").min(-Math.PI).max(Math.PI).step(0.01).name("Rotation Z")
cubeFolder.add(cube.scale, "x").min(0.1).max(3).step(0.01).name("Scale X")
cubeFolder.add(cube.scale, "y").min(0.1).max(3).step(0.01).name("Scale Y")
cubeFolder.add(cube.scale, "z").min(0.1).max(3).step(0.01).name("Scale Z")
cubeFolder.addColor(cubeMaterial, "color").name("Color")
cubeFolder.add(cube, "visible").name("Visible")

// Sphere controls
const sphereFolder = gui.addFolder("Sphere")
sphereFolder.add(sphere.position, "x").min(-5).max(5).step(0.01).name("Position X")
sphereFolder.add(sphere.position, "y").min(-5).max(5).step(0.01).name("Position Y")
sphereFolder.add(sphere.position, "z").min(-5).max(5).step(0.01).name("Position Z")
sphereFolder.add(sphere.rotation, "x").min(-Math.PI).max(Math.PI).step(0.01).name("Rotation X")
sphereFolder.add(sphere.rotation, "y").min(-Math.PI).max(Math.PI).step(0.01).name("Rotation Y")
sphereFolder.add(sphere.rotation, "z").min(-Math.PI).max(Math.PI).step(0.01).name("Rotation Z")
sphereFolder.add(sphere.scale, "x").min(0.1).max(3).step(0.01).name("Scale X")
sphereFolder.add(sphere.scale, "y").min(0.1).max(3).step(0.01).name("Scale Y")
sphereFolder.add(sphere.scale, "z").min(0.1).max(3).step(0.01).name("Scale Z")
sphereFolder.addColor(sphereMaterial, "color").name("Color")
sphereFolder.add(sphere, "visible").name("Visible")

// Torus controls
const torusFolder = gui.addFolder("Torus")
torusFolder.add(torus.position, "x").min(-5).max(5).step(0.01).name("Position X")
torusFolder.add(torus.position, "y").min(-5).max(5).step(0.01).name("Position Y")
torusFolder.add(torus.position, "z").min(-5).max(5).step(0.01).name("Position Z")
torusFolder.add(torus.rotation, "x").min(-Math.PI).max(Math.PI).step(0.01).name("Rotation X")
torusFolder.add(torus.rotation, "y").min(-Math.PI).max(Math.PI).step(0.01).name("Rotation Y")
torusFolder.add(torus.rotation, "z").min(-Math.PI).max(Math.PI).step(0.01).name("Rotation Z")
torusFolder.add(torus.scale, "x").min(0.1).max(3).step(0.01).name("Scale X")
torusFolder.add(torus.scale, "y").min(0.1).max(3).step(0.01).name("Scale Y")
torusFolder.add(torus.scale, "z").min(0.1).max(3).step(0.01).name("Scale Z")
torusFolder.addColor(torusMaterial, "color").name("Color")
torusFolder.add(torus, "visible").name("Visible")

// Cone controls
const coneFolder = gui.addFolder("Cone")
coneFolder.add(cone.position, "x").min(-5).max(5).step(0.01).name("Position X")
coneFolder.add(cone.position, "y").min(-5).max(5).step(0.01).name("Position Y")
coneFolder.add(cone.position, "z").min(-5).max(5).step(0.01).name("Position Z")
coneFolder.add(cone.rotation, "x").min(-Math.PI).max(Math.PI).step(0.01).name("Rotation X")
coneFolder.add(cone.rotation, "y").min(-Math.PI).max(Math.PI).step(0.01).name("Rotation Y")
coneFolder.add(cone.rotation, "z").min(-Math.PI).max(Math.PI).step(0.01).name("Rotation Z")
coneFolder.add(cone.scale, "x").min(0.1).max(3).step(0.01).name("Scale X")
coneFolder.add(cone.scale, "y").min(0.1).max(3).step(0.01).name("Scale Y")
coneFolder.add(cone.scale, "z").min(0.1).max(3).step(0.01).name("Scale Z")
coneFolder.addColor(coneMaterial, "color").name("Color")
coneFolder.add(cone, "visible").name("Visible")

// Animation controls
const animationFolder = gui.addFolder("Animation")
const animationParams = {
  autoRotate: false,
  rotationSpeed: 1,
  bounce: false,
  resetPositions: () => {
    gsap.to(cube.position, { duration: 1, x: -2, y: 0, z: 0 })
    gsap.to(sphere.position, { duration: 1, x: 0, y: 0, z: 0 })
    gsap.to(torus.position, { duration: 1, x: 2, y: 0, z: 0 })
    gsap.to(cone.position, { duration: 1, x: 0, y: 2, z: 0 })
  },
  resetRotations: () => {
    gsap.to(cube.rotation, { duration: 1, x: 0, y: 0, z: 0 })
    gsap.to(sphere.rotation, { duration: 1, x: 0, y: 0, z: 0 })
    gsap.to(torus.rotation, { duration: 1, x: 0, y: 0, z: 0 })
    gsap.to(cone.rotation, { duration: 1, x: 0, y: 0, z: 0 })
  },
  resetScales: () => {
    gsap.to(cube.scale, { duration: 1, x: 1, y: 1, z: 1 })
    gsap.to(sphere.scale, { duration: 1, x: 1, y: 1, z: 1 })
    gsap.to(torus.scale, { duration: 1, x: 1, y: 1, z: 1 })
    gsap.to(cone.scale, { duration: 1, x: 1, y: 1, z: 1 })
  },
}

animationFolder.add(animationParams, "autoRotate").name("Auto Rotate")
animationFolder.add(animationParams, "rotationSpeed").min(0.1).max(5).step(0.1).name("Rotation Speed")
animationFolder.add(animationParams, "bounce").name("Bounce Animation")
animationFolder.add(animationParams, "resetPositions").name("Reset Positions")
animationFolder.add(animationParams, "resetRotations").name("Reset Rotations")
animationFolder.add(animationParams, "resetScales").name("Reset Scales")

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 3
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.dampingFactor = 0.05

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Auto rotation
  if (animationParams.autoRotate) {
    cube.rotation.y = elapsedTime * animationParams.rotationSpeed * 0.5
    sphere.rotation.x = elapsedTime * animationParams.rotationSpeed * 0.3
    torus.rotation.y = elapsedTime * animationParams.rotationSpeed * 0.7
    cone.rotation.z = elapsedTime * animationParams.rotationSpeed * 0.4
  }

  // Bounce animation
  if (animationParams.bounce) {
    cube.position.y = Math.sin(elapsedTime * 2) * 0.5
    sphere.position.y = Math.sin(elapsedTime * 2 + Math.PI * 0.5) * 0.5
    torus.position.y = Math.sin(elapsedTime * 2 + Math.PI) * 0.5
    cone.position.y = 2 + Math.sin(elapsedTime * 2 + Math.PI * 1.5) * 0.5
  }

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
