import * as THREE from 'three';
import './animate.css';
import bg1 from '../img/nebula.jpg'

const container = document.querySelector('.three_bg');
const loader = new THREE.TextureLoader()
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement)

const geometry = new THREE.PlaneGeometry(14, 8, 1, 2)
const material = new THREE.MeshBasicMaterial({
    // color: 0xd7dcde,
    map: loader.load(bg1)
})

const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh);
camera.position.z = 5;

const { count } = geometry.attributes.position;
const clock = new THREE.Clock();

function animate(){
    const time = clock.getElapsedTime()
    for(let i = 0; i < count ; i++){
        const x = geometry.attributes.position.getX(i)

        const animation = 0.15 * Math.sin(x + 15 + time * 0.5);
        
        geometry.attributes.position.setZ(i,  animation);
        geometry.computeVertexNormals();
        geometry.attributes.position.needsUpdate = true
    }
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
}
animate()