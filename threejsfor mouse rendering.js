 type="module"
    import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.min.js';

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('threejs-canvas'), alpha: true });

    renderer.setSize(400, 400);
    document.body.appendChild(renderer.domElement);

    // Sphere Geometry
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshStandardMaterial({ 
        color: 0x00ffff, 
        emissive: 0x0077ff, 
        emissiveIntensity: 0.5, 
        roughness: 0.2 
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Lighting
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(2, 2, 2);
    scene.add(light);

    camera.position.z = 3;

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);
        sphere.rotation.y += 0.01;
        sphere.rotation.x += 0.005;
        renderer.render(scene, camera);
    }

    animate();

    // Mouse Interaction
    document.addEventListener("mousemove", (event) => {
        let x = (event.clientX / window.innerWidth) * 2 - 1;
        let y = -(event.clientY / window.innerHeight) * 2 + 1;
        sphere.position.x = x;
        sphere.position.y = y;
    });
