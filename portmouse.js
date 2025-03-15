import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Background Color
renderer.setClearColor(0x0d0d0d);

// Geometry for floating nodes
const nodes = [];
const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff });

for (let i = 0; i < 100; i++) {
    const geometry = new THREE.SphereGeometry(0.05, 8, 8);
    const node = new THREE.Mesh(geometry, nodeMaterial);
    node.position.set((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10);
    scene.add(node);
    nodes.push(node);
}

// Lines connecting nodes
const lineMaterial = new THREE.LineBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.5 });
const lines = new THREE.Group();

nodes.forEach((node, index) => {
    nodes.forEach((otherNode, otherIndex) => {
        if (index !== otherIndex && node.position.distanceTo(otherNode.position) < 2) {
            const points = [node.position, otherNode.position];
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const line = new THREE.Line(geometry, lineMaterial);
            lines.add(line);
        }
    });
});
scene.add(lines);

// Mouse Movement Effect
const mouse = { x: 0, y: 0 };
document.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    camera.position.x += (mouse.x * 2 - camera.position.x) * 0.05;
    camera.position.y += (mouse.y * 2 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
}
animate();

// Responsive Resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});