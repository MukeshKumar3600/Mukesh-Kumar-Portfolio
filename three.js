import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Particle geometry
const particleGeometry = new THREE.BufferGeometry();
const particlesCount = 5000;
const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 10;
}

particleGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particleMaterial = new THREE.PointsMaterial({
    color: 0xff9900,
    size: 0.02,
    transparent: true,
    blending: THREE.AdditiveBlending
});

const particleMesh = new THREE.Points(particleGeometry, particleMaterial);
scene.add(particleMesh);

// Mouse move effect
const mouse = {
    x: 0,
    y: 0
};
document.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Animation loop
const animate = () => {
    requestAnimationFrame(animate);
    
    particleMesh.rotation.y += 0.001;
    camera.position.x += (mouse.x * 0.05 - camera.position.x) * 0.05;
    camera.position.y += (mouse.y * 0.05 - camera.position.y) * 0.05;
    
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
};
animate();

// Resize handling
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

