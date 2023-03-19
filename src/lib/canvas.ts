import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { OrbitControls } from 'three/examples/jsm//controls/OrbitControls'
const radius = 150
export const initiateCanvas = (canvas: HTMLCanvasElement) => {

  const scene = new THREE.Scene();


  scene.background = new THREE.Color('#002233');
  // scene.background = new THREE.CubeTexture()

  
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 5000);
  camera.position.set(0, 0, radius);
  let angle = 0

  // scene.add( new THREE.AxesHelper(500));

  const light = new THREE.SpotLight(0xffa95c, 4);
  light.position.set(-50, 50, 50);
  light.castShadow = true;
  light.shadow.bias = -0.0001;
  light.shadow.mapSize.width = 1024 * 4;
  light.shadow.mapSize.height = 1024 * 4;
  scene.add(light);

  const hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 4);
  scene.add(hemiLight);

  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.toneMapping = THREE.ReinhardToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;

  function animate() {
    renderer.render(scene, camera);
    camera.position.x = radius * Math.cos(angle);
    camera.position.z = radius * Math.sin(angle);
    const origin = new THREE.Vector3(0, 0, 0)
    camera.lookAt(origin)
    angle += 0.005;
    angle = angle % (Math.PI*2)
    requestAnimationFrame(animate);
  }
  new GLTFLoader().load(
    '/assets/models/old_computer/scene.gltf',
    result => {
      const model = result.scene.children[0];
      console.log(model.children)
      model.traverse(n => { if ( n ) {
        n.castShadow = true; 
        n.receiveShadow = true;
        // if(n?.material?.map) n.material.map.anisotropy = 1; 
      }});
      model.scale.multiplyScalar(0.1)
      model.position.set(-30, 0, 0)
      console.log({ model: model.children[0].position })
      // model.rotateZ(-Math.PI/2)
      scene.add(model);
      animate();
    });

  // renderer.setPixelRatio(window.devicePixelRatio);
  // renderer.setSize(window.innerWidth, window.innerHeight);
  // camera.position.setZ(30);
  // camera.position.setX(-3);

  // renderer.render(scene, camera);

  // // Torus

  // const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
  // const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
  // const torus = new THREE.Mesh(geometry, material);

  // scene.add(torus);

  // // Lights
  // // Helpers

  // // const lightHelper = new THREE.PointLightHelper(pointLight)
  // // const gridHelper = new THREE.GridHelper(200, 50);
  // // scene.add(lightHelper, gridHelper)

  // // const controls = new OrbitControls(camera, renderer.domElement);

  function addStar() {
    const geometry = new THREE.SphereGeometry(0.5, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3)
      .fill(1)
      .map(() => THREE.MathUtils.randFloatSpread(500));

    star.position.set(x, y, z);
    scene.add(star);
  }

  Array(500).fill(1).forEach(addStar);
  // window.addEventListener('keydown', (e) => {
  //   if (e.key == 'ArrowRight') {
  //     camera.position.x -= 0.4
  //   } else if (e.key == 'ArrowUp') {
  //     camera.position.y += 0.4
  //   } else if (e.key == 'ArrowLeft') {
  //     camera.position.x += 0.4
  //   } else if (e.key == 'ArrowDown') {
  //     camera.position.y -= 0.4
  //   } else if (e.key == 'w') {
  //     camera.position.z += 0.4
  //   } else if (e.key == 's') {
  //     camera.position.z -= 0.4
  //   }
  //   else {
  //     console.log(camera.position)
  //   }
  // })
}

