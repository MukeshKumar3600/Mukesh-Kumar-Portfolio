 type="module"
        import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.min.js';
    
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('threejs-canvas'), alpha: true });
        
        renderer.setSize(400, 400);
        document.body.appendChild(renderer.domElement);
    
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshStandardMaterial({ color: 0xff5722 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
    
        const light = new THREE.PointLight(0xffffff, 1, 100);
        light.position.set(5, 5, 5);
        scene.add(light);
    
        camera.position.z = 3;
    
        function animate() {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
        }
    
        animate();