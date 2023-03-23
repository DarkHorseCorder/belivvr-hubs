import { paths } from "../systems/userinput/paths";

export const ANIMATIONS = {
  IDLE: "Idle",
  WALKING: "Walking",
  WALKING_BACKWARD: "WalkingBackwards",
  WALKING_LEFT: "LeftStrafeWalk",
  WALKING_RIGHT: "RightStrafeWalk",
  RUNNING: "Running",
  RUNNING_BACKWARD: "RunningBackward",
  RUNNING_LEFT: "LeftStrafe",
  RUNNING_RIGHT: "RightStrafe",
  FLYING: "Flying"
};

// @ts-ignore
AFRAME.registerComponent("avatar-animation", {
  animations: null,

  clock: null,
  mixer: null,
  isMe: false,

  schema: {
    front: { default: 0 },
    right: { default: 0 }
  },

  init() {
    document.addEventListener("nipple-move", (e: any) => {
      const { front, right } = e.detail;
      this.el.setAttribute("avatar-animation", { front, right });
    })

    this.animations = new Map();
    this.mixer = new THREE.AnimationMixer(this.el.object3D?.parent || this.el.object3D);
    this.clock = new THREE.Clock();
    this.userinput = AFRAME.scenes[0].systems.userinput;
    this.isMe = this.el.closest("#avatar-rig") != null;

    this.setAnimations(this.el.object3D);
  },

  tick() {
    this.mixer.update(this.clock.getDelta());
    if (this.isMe) {
      const position = this.userinput.get(paths.actions.characterAcceleration);

      if (position) {
        const [right, front] = position;
        this.el.setAttribute("avatar-animation", { front, right });
      }

    }
  },

  update() {
    if (this.isIdle()) return this.idle();
    this.walking();
  },

  idle() {
    this.resetAll(ANIMATIONS.IDLE);
    this.setEffectiveWeight(ANIMATIONS.IDLE, 1);
  },

  resetAll(...ignore: string[]) {
    this.animations.forEach((animation: THREE.AnimationAction) => {
      if (ignore.includes(animation.getClip().name)) return;
      animation.setEffectiveWeight(0);
    });
  },

  isIdle() {
    return this.data.front === 0 && this.data.right === 0;
  },

  walking() {
    [
      [ANIMATIONS.WALKING, this.data.front],
      [ANIMATIONS.WALKING_BACKWARD, -this.data.front],
      [ANIMATIONS.WALKING_LEFT, -this.data.right],
      [ANIMATIONS.WALKING_RIGHT, this.data.right],
    ].forEach(([animationName, value]) => this.setEffectiveWeight(animationName, value));
  },

  setAnimations(object3D: THREE.Object3D) {
    if (object3D.parent == null) return;
    if (object3D.animations.length === 0)
      return this.setAnimations(object3D.parent);

    object3D.animations.forEach((animation: THREE.AnimationClip) => {
      this.animations.set(animation.name, this.mixer.clipAction(animation));
      this.animations.get(animation.name).play();
      this.setEffectiveWeight(animation.name, 0);
    });
    this.setEffectiveWeight(ANIMATIONS.IDLE, 1);
  },

  setEffectiveWeight(animationName: string, weight: number) {
    this.animations.get(animationName)?.setEffectiveWeight(weight);
  },
});
