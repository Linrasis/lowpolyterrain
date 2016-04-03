var res = 16;
var noise = 400;
var chunkNumber = 8;
var space = 700;
var canvasWidth = 800;
var canvasHeight = 400;

document.addEventListener("DOMContentLoaded", function(event) {
    var clock = new THREE.Clock();

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(50, canvasWidth * 0.8 / canvasHeight, 0.1, 100000);
    var controls = new FlyControls(camera, noise);

    scene.add(controls.getObject());

    var renderer = new THREE.WebGLRenderer({
        antialias: true
    });

    renderer.setSize(canvasWidth, canvasHeight);
    document.getElementById('simulation-container').appendChild(renderer.domElement);

    var skyBoxGeometry = new THREE.BoxGeometry(10000, 100000, 10000);
    var skyBoxMaterial = new THREE.MeshBasicMaterial({
        color: 0x7EC0EE,
        side: THREE.BackSide
    });

    var skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial);
    scene.add(skyBox);

    scene.fog = new THREE.Fog(0xBACCCA, 1000, 4000);

    var level;

    controls.setPosRot(new THREE.Vector3(0, 200, 0), -0.2);

    var generateLevel = function() {
        octres = chunkNumber * 2;
        level = new Level(res, space, chunkNumber, noise);
        scene.add(level.getObject());
    }

    generateLevel();

    var render = function() {
        requestAnimationFrame(render)
        var delta = clock.getDelta();
        controls.update();
        level.updateLoc(controls.getObject().position);

        skyBox.position.x = controls.getObject().position.x;
        skyBox.position.z = controls.getObject().position.z;
        skyBox.position.y = controls.getObject().position.y;
        skyBox.rotation.y = controls.getObject().rotation.y;

        renderer.render(scene, camera);
    };

    render();
});