FlyControls = function (camera, height) {
    var pitchObject = new THREE.Object3D();
    pitchObject.add(camera);

    var yawObject = new THREE.Object3D();

    yawObject.add(pitchObject);

    yawObject.position.y = 20;
    yawObject.position.z = 10;

    var moveForward = false;
    var moveBackward = false;
    var moveLeft = false;
    var moveRight = false;
    var moveUp = false;
    var moveDown = false;
    var pitchUp = false;
    var pitchDown = false;
    var speed = 2000;
    var pitchAngleLimit = Math.PI / 5;

    var prevTime = performance.now();
    var velocity = new THREE.Vector3();

    var PI_2 = Math.PI / 2;

    var onKeyDown = function(event) {
        switch (event.keyCode) {
            case 38: moveForward  = true; break; // up
            case 40: moveBackward = true; break; // down
            case 37: moveLeft     = true; break; // left
            case 39: moveRight    = true; break; // right
            case 69: moveUp       = true; break; // e
            case 68: moveDown     = true; break; // d
            case 87: pitchDown    = true; break; // w
            case 83: pitchUp      = true; break; // w
        }
    };

    var onKeyUp = function(event) {
        switch (event.keyCode) {
            case 38: moveForward  = false; break; // up
            case 40: moveBackward = false; break; // down
            case 37: moveLeft     = false; break; // left
            case 39: moveRight    = false; break; // right
            case 69: moveUp       = false; break; // e
            case 68: moveDown     = false; break; // d
            case 87: pitchDown    = false; break; // w
            case 83: pitchUp      = false; break; // w
        }
    };

    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);

    this.getObject = function () {
		return yawObject;
	};

    this.update = function () {
        var time = performance.now();
        var delta = (time - prevTime) / 1000;

        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;
        velocity.y -= velocity.y * 10.0 * delta;

        if (moveForward) {
            velocity.z -= speed * delta;
        }

        if (moveBackward) {
            velocity.z += (speed/2) * delta;
        }

        if (moveLeft) {
            yawObject.rotation.y += (Math.PI / 400);
        }

        if (moveRight) {
            yawObject.rotation.y -= (Math.PI / 400);
        }

        if (pitchDown && pitchObject.rotation.x > -pitchAngleLimit) {
            pitchObject.rotation.x -= 0.2 * delta;
        }

        if (pitchUp && pitchObject.rotation.x < pitchAngleLimit/1.5) {
            pitchObject.rotation.x += 0.2 * delta;
        }

        if (moveUp && yawObject.position.y < height * 2) {
            velocity.y += (speed / 2) * delta;
        }

        if (moveDown && yawObject.position.y > 50) {
            velocity.y -= (speed / 2) * delta;
        }

        yawObject.translateX(velocity.x * delta);
        yawObject.translateY(velocity.y * delta);
        yawObject.translateZ(velocity.z * delta);

        prevTime = time;
    };

    this.setPosRot = function(pos, rot) {
        yawObject.position.x = pos.x;
        yawObject.position.y = pos.y;
        yawObject.position.z = pos.z;
        pitchObject.rotation.x = rot;
    }
};