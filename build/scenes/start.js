'use strict';

System.register([], function (_export, _context) {
    "use strict";

    var scene, camera, renderer, textureLoader, spheres, sphereGeometry, sphereMaterial, headGeometry, headMaterial, head, neckGeometry, neckMaterial, neck, bodyGeometry, bodyMaterial, body, foots, footGeometry, footMaterial, hands, handGeometry, handMaterial, step, controls;


    function createItems(items, length, geometry, material) {
        for (var i = 0; i < length; i++) {
            items.push(new THREE.Mesh(geometry, material));
        }
    }


    function setFootPosition(ft) {
        var positionStart = window.innerWidth / 250;

        ft.map(function (foot) {
            foot.position.x = positionStart - positionStart / 3;
            foot.position.y = -13;
            foot.position.z = 0;
            positionStart = positionStart - 2 * positionStart;

            scene.add(foot);
        });
    }

    function setHandsPosition(hd) {
        var positionStart = window.innerWidth / 250;

        hd.map(function (hand) {
            hand.position.x = 2 * positionStart - positionStart / 1.3;
            hand.position.y = 0;
            hand.position.z = 0;
            positionStart = positionStart - 2 * positionStart;

            scene.add(hand);
        });
    }


    function setSpherePosition(sp) {
        var positionStart = window.innerWidth / 100;
        sp.map(function (sphere) {
            sphere.position.set(positionStart, 0, 10);
            positionStart = positionStart - 2 * positionStart;
            scene.add(sphere);
        });
    }


    function animateSpheres() {
        spheres.map(function (el, i) {
            el.position.y = -20 + 20 * Math.abs(Math.sin(step + i));
        });
    }

    function render() {
        step += 0.04;
        animateSpheres();
        document.body.appendChild(renderer.domElement);
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }
    return {
        setters: [],
        execute: function () {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);

            camera.position.set(0, 0, 60);
            camera.lookAt(scene.position);

            renderer = new THREE.WebGLRenderer({ alpha: true });

            renderer.setClearColor(0x000000, 0.0);
            renderer.setSize(window.innerWidth, window.innerHeight);textureLoader = new THREE.TextureLoader();
            spheres = [];
            sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
            sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x7777ff });

            createItems(spheres, 2, sphereGeometry, sphereMaterial);

            headGeometry = new THREE.SphereGeometry(4, 12, 5, 10);
            headMaterial = new THREE.MeshBasicMaterial({ color: 0x7777ff });
            head = new THREE.Mesh(headGeometry, headMaterial);

            head.position.set(0, 13, 0);
            scene.add(head);

            neckGeometry = new THREE.CylinderGeometry(2, 1, 2, 28);
            neckMaterial = new THREE.MeshBasicMaterial({ color: 0x7777ff });
            neck = new THREE.Mesh(neckGeometry, neckMaterial);

            neck.position.set(0, 9, 0);
            scene.add(neck);

            bodyGeometry = new THREE.BoxGeometry(12, 16, 5, 8);
            bodyMaterial = new THREE.MeshBasicMaterial({ color: 0x7777ff });
            body = new THREE.Mesh(bodyGeometry, bodyMaterial);

            body.position.set(0, 0, 0);
            scene.add(body);

            foots = [];
            footGeometry = new THREE.CylinderGeometry(2, 1, 20);
            footMaterial = new THREE.MeshBasicMaterial({ color: 0x7777ff });

            createItems(foots, 2, footGeometry, footMaterial);setFootPosition(foots);

            hands = [];
            handGeometry = new THREE.CylinderGeometry(1, 0.3, 12);
            handMaterial = new THREE.MeshBasicMaterial({ color: 0x7777ff });

            createItems(hands, 2, handGeometry, handMaterial);setHandsPosition(hands);setSpherePosition(spheres);step = 0;
            controls = new THREE.OrbitControls(camera);

            controls.addEventListener('change', render);
            render();
        }
    };
});