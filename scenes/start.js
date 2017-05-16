const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 0, 60);
camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setClearColor(0x000000, 0.0)
renderer.setSize(window.innerWidth, window.innerHeight);

function createItems(items, length, geometry, material) {
    for (let i = 0; i < length; i++) {
        items.push(new THREE.Mesh(geometry, material))
    }
}
let textureLoader = new THREE.TextureLoader();

let spheres = [];
let sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
let sphereMaterial = new THREE.MeshBasicMaterial({color: 0x7777ff});
createItems(spheres, 2, sphereGeometry, sphereMaterial);

let headGeometry = new THREE.SphereGeometry(4, 12, 5, 10);
let headMaterial = new THREE.MeshBasicMaterial({color: 0x7777ff});
let head = new THREE.Mesh(headGeometry, headMaterial);
head.position.set(0, 13, 0);
scene.add(head);

let neckGeometry = new THREE.CylinderGeometry(2, 1, 2, 28);
let neckMaterial = new THREE.MeshBasicMaterial({color: 0x7777ff});
let neck = new THREE.Mesh(neckGeometry, neckMaterial);
neck.position.set(0, 9, 0);
scene.add(neck);

let bodyGeometry = new THREE.BoxGeometry(12, 16, 5, 8);
let bodyMaterial = new THREE.MeshBasicMaterial({color: 0x7777ff});
let body = new THREE.Mesh(bodyGeometry, bodyMaterial);
body.position.set(0, 0, 0);
scene.add(body);

let foots = [];
let footGeometry = new THREE.CylinderGeometry(2, 1, 20);
let footMaterial = new THREE.MeshBasicMaterial({color: 0x7777ff});
createItems(foots, 2, footGeometry, footMaterial);

function setFootPosition(ft) {
    let positionStart = window.innerWidth / 250;

    ft.map(foot => {
        foot.position.x = positionStart - positionStart / 3;
        foot.position.y = -13;
        foot.position.z = 0;
        positionStart = positionStart - 2 * positionStart;

        scene.add(foot)
    });
}
setFootPosition(foots);

let hands = [];
let handGeometry = new THREE.CylinderGeometry(1, 0.3, 12);
let handMaterial = new THREE.MeshBasicMaterial({color: 0x7777ff});
createItems(hands, 2, handGeometry, handMaterial);
function setHandsPosition(hd) {
    let positionStart = window.innerWidth / 250;

    hd.map(hand => {
        hand.position.x = 2 * positionStart - positionStart / 1.3;
        hand.position.y = 0;
        hand.position.z = 0;
        positionStart = positionStart - 2 * positionStart;

        scene.add(hand)
    });
}
setHandsPosition(hands);

function setSpherePosition(sp) {
    let positionStart = window.innerWidth / 100;
    sp.map(sphere => {
        sphere.position.set(positionStart, 0, 10);
        positionStart = positionStart - 2 * positionStart;
        scene.add(sphere)
    });
}
setSpherePosition(spheres);

function animateSpheres() {
    spheres.map((el, i) => {
        el.position.y = -20 + ( 20 * Math.abs(Math.sin(step + i)));
    })
}
let step = 0;
let controls = new THREE.OrbitControls(camera);
controls.addEventListener('change', render);
render();
function render() {
    step += 0.04;
    animateSpheres();
    document.body.appendChild(renderer.domElement);
    requestAnimationFrame(render);
    renderer.render(scene, camera)
}
