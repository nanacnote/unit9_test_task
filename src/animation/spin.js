import gsap from "gsap";

/**
 * GSAP Class to spin a HTMLElement
 *
 * @param {object} options - The options object containing the target and amounts to tween variables by
 */
export class Spinner {
  constructor(options) {
    this.options = options;
    this.inst;
  }

  /**
   * apply this method to start an instance of the animation
   */
  start() {
    this.inst = gsap.fromTo(
      this.options.target,
      { rotation: 0 },
      { rotation: this.options.degrees }
    );
  }

  /**
   * apply this method to reverse an instance of the animation
   */
  reverse() {
    if (this.inst) {
      this.inst.reverse();
    }
  }
}
