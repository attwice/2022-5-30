import {
    Scene,
    Color,
    PerspectiveCamera,
    BoxBufferGeometry,
    MeshStandardMaterial,
    Mesh,
    WebGLRenderer,
    DirectionalLight,
    HemisphereLight,
    AmbientLight,
    TextureLoader,
    sRGBEncoding
  } from "three";
  import OrbitControls from "three-orbitcontrols";
  import { getGPUTier } from "detect-gpu";
  
  const gpu = getGPUTier();
  console.log(gpu);
  
  let container;
  let camera;
  let renderer;
  let scene;
  let mesh;
  let controls;
  
  function init() {
    container = document.querySelector("#scene-container");
  
    // Creating the scene
    scene = new Scene();
    scene.background = new Color("skyblue");
  
    createCamera();
    createLights();
    createMeshes();
    createControls();
    createRenderer();
  
    renderer.setAnimationLoop(() => {
      update();
      render();
    });
  }
  
  function createCamera() {
    const fov = 35;
    const aspect = container.clientWidth / container.clientHeight;
    const near = 0.1;
    const far = 100;
    camera = new PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(-2, 2, 10);
  }
  
  function createLights() {
    const mainLight = new DirectionalLight(0xffffff, 5);
    mainLight.position.set(10, 10, 10);
  
    const hemisphereLight = new HemisphereLight(0xddeeff, 0x202020, 5);
    scene.add(mainLight, hemisphereLight);
  }
  
  function createMeshes() {
    const textureLoader = new TextureLoader();
    const texture = textureLoader.load("./src/uv_test_bw_1024.png");
    texture.encoding = sRGBEncoding;
    texture.anisotropy = 16;
  
    const geometry = new BoxBufferGeometry(2, 2, 2);
    const material = new MeshStandardMaterial({ map: texture });
    mesh = new Mesh(geometry, material);
    scene.add(mesh);
  }
  
  function createRenderer() {
    renderer = new WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.gammaFactor = 2.2;
    renderer.gammaOutput = true;
    renderer.physicallyCorrectLights = true;
  
    container.appendChild(renderer.domElement);
  }
  
  function createControls() {
    controls = new OrbitControls(camera, container);
  }
  
  function update() {
    // mesh.rotation.x += 0.01;
    // mesh.rotation.y += 0.01;
    // mesh.rotation.z += 0.01;
  }
  
  function render() {
    renderer.render(scene, camera);
  }
  
  init();
  
  function onWindowResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
  
    // Update camera frustum
    camera.updateProjectionMatrix();
  
    renderer.setSize(container.clientWidth, container.clientHeight);
  }
  window.addEventListener("resize", onWindowResize, false);
  