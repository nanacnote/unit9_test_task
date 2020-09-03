import gsap from "gsap";
/**
 * GSAP class to translate a HTMLElement from one position to another
 * Two targets can be translated and reversed asynchronously
 * There are extra options available in the options parameter
 * to tween other properties for a more cleaner translation
 *
 * @param {object} options1 - The options object containing the first target and amounts to tween variables by
 * @param {object} options2 - The options object containing the second target and amounts to tween variables by
 */
export class TranslateXY {
  constructor(options1, options2) {
    this.options1 = options1;
    this.options2 = options2;
    this.inst;
  }

  /**
   * apply this method to start an instance of the animation
   *
   * @param {string} action - defines what method the Tween should use ie gsap.to or gsap.from defaults to 'to'
   */
  start(action = "to") {
    // use GSAP 'to' animation
    if (action === "to") {
      if (this.options1 && this.options2) {
        // handles animation for two targets
        this.inst = gsap
          .timeline()
          .to(this.options1.target, {
            flexDirection: this.options1?.flexDirection
              ? this.options1.flexDirection
              : null,
            opacity: this.options1?.opacity
              ? this.options1.opacity.toString()
              : null,
            y: this.options1?.y,
            x: this.options1?.x,
          })
          .to(
            this.options2.target,
            {
              flexDirection: this.options2?.flexDirection
                ? this.options2.flexDirection
                : null,
              opacity: this.options2?.opacity ? this.options2.opacity : null,
              y: this.options2?.y,
              x: this.options2?.x,
            },
            "0"
          );
      } else {
        // handles animation for single targets
        this.inst = gsap.to(this.options1.target, {
          flexDirection: this.options1?.flexDirection
            ? this.options1.flexDirection
            : null,
          opacity: this.options1?.opacity
            ? this.options1.opacity.toString()
            : null,
          y: this.options1?.y,
          x: this.options1?.x,
        });
      }
    }

    // use GSAP 'fromTo' animation
    if (action === "fromTo") {
      if (this.options1 && this.options2) {
        // handles animation for two targets
        this.inst = gsap
          .timeline()
          .fromTo(
            this.options1.target,
            {
              opacity: this.options1?.opacity
                ? this.options1.opacity.toString()
                : null,
              y: this.options1?.y,
              x: this.options1?.x,
            },
            {
              opacity: 1,
              y: 0,
              x: 0,
            }
          )
          .fromTo(
            this.options2.target,
            {
              opacity: this.options2?.opacity
                ? this.options2.opacity.toString()
                : null,
              y: this.options2?.y,
              x: this.options2?.x,
            },
            {
              opacity: 1,
              y: 0,
              x: 0,
            },
            "0"
          );
      } else {
        // handles animation for single targets
        this.inst = gsap.fromTo(
          this.options1.target,
          {
            opacity: this.options1?.opacity
              ? this.options1.opacity.toString()
              : null,
            y: this.options1?.y,
            x: this.options1?.x,
          },
          {
            opacity: 1,
            y: 0,
            x: 0,
          }
        );
      }
    }
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
