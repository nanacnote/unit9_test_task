import gsap from "gsap";

/**
 * GSAP Class to change background color of HTMLElement
 *
 * @param {object} options - The options object containing the target and amounts to tween variables by
 */
export class BgColor {
  constructor(options) {
    this.options = options;
    this.inst;
  }

  /**
   * apply this method to start an instance of the animation
   */
  start() {
    this.inst = gsap.to(this.options.target, {
      backgroundColor: this.options.backgroundColor,
      color: this.options.color,
    });
  }

  /**
   * apply this method to reverse an instance of the animation
   * @param {Function} callback triggers call back on animation complete
   */
  reverse(callback = null) {
    if (this.inst && callback) {
      this.inst.reverse().then(callback);
    }
    if (this.inst) {
      this.inst.reverse();
    }
  }
}
