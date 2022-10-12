import { EventDispatcher, Quaternion, Vector3 } from "../../../../threeJS/three.module.js"

const _changeEvent = { type: "change" };

class FlyControls extends EventDispatcher {
  constructor(object, domElement) {
    super();

    this.object = object;
    this.domElement = domElement;
    // API
    this.rollSpeed = 0.005;

    this.dragToLook = false;
    this.autoForward = false;

    // disable default target object behavior

    // internals

    const scope = this;

    const lastQuaternion = new Quaternion();

    this.tmpQuaternion = new Quaternion();

    this.mouseStatus = 1;

    this.moveState = {
      up: 0,
      down: 0,
      left: 0,
      right: 0,
      forward: 0,
      back: 0,
      pitchUp: 0,
      pitchDown: 0,
      yawLeft: 0,
      yawRight: 0,
      rollLeft: 0,
      rollRight: 0,
    };
    this.moveVector = new Vector3(0, 0, 0);
    this.rotationVector = new Vector3(0, 0, 0);

    this.mousemove = function (event) {
      const container = this.getContainerDimensions();

      const halfWidth = container.size[0] / 2;
      const halfHeight = container.size[1] / 2;
 
      this.moveState.yawLeft =
        -(event.pageX - container.offset[0] - halfWidth) / halfWidth;

      this.moveState.pitchDown =
        (event.pageY - container.offset[1] - halfHeight) / halfHeight;

      this.updateRotationVector();
    };

    this.update = function (delta) {
      const rotMult = delta * scope.rollSpeed;

      scope.tmpQuaternion
        .set(
          scope.rotationVector.x * rotMult,
          scope.rotationVector.y * rotMult,
          scope.rotationVector.z * rotMult,
          1
        )
        .normalize();
      scope.object.quaternion.multiply(scope.tmpQuaternion);

      {
        scope.dispatchEvent(_changeEvent);
        lastQuaternion.copy(scope.object.quaternion);
      }
    };

    this.updateRotationVector = function () {
      this.rotationVector.x =
        (-this.moveState.pitchDown + this.moveState.pitchUp) * 2;
      this.rotationVector.y =
        (-this.moveState.yawRight + this.moveState.yawLeft) * 4;
      this.rotationVector.z =
        -this.moveState.rollRight + this.moveState.rollLeft;

      //console.log( 'rotate:', [ this.rotationVector.x, this.rotationVector.y, this.rotationVector.z ] );
    };

    this.getContainerDimensions = function () {
      if (this.domElement != document) {
        return {
          size: [this.domElement.offsetWidth, this.domElement.offsetHeight],
          offset: [this.domElement.offsetLeft, this.domElement.offsetTop],
        };
      } else {
        return {
          size: [window.innerWidth, window.innerHeight],
          offset: [0, 0],
        };
      }
    };

    this.dispose = function () {
      this.domElement.removeEventListener("mousemove", _mousemove);
    };

    const _mousemove = this.mousemove.bind(this);

    this.domElement.addEventListener("contextmenu", contextmenu);
    this.domElement.addEventListener("mousemove", _mousemove);

    this.updateRotationVector();
  }
}

function contextmenu(event) {
  event.preventDefault();
}

export { FlyControls };
