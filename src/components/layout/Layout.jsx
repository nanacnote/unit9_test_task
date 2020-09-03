import React, { useState, useEffect } from "react";
import styles from "./Layout.module.css";
import cx from "classnames";
import { CgMenuGridO, CgEditUnmask } from "react-icons/cg";
import { Spinner, BgColor, TranslateXY } from "../../animation";

const Layout = (props) => {
  // instantiate all animations with a useState Hook
  const [spinRightMenu] = useState(
    new Spinner({
      target: "." + cx(styles.rightMenuCircle) + "> svg",
      degrees: 360,
    })
  );
  const [addBgColorRightMenu] = useState(
    new BgColor({
      target: "." + cx(styles.rightMenuCircle),
      backgroundColor: "white",
      color: "black",
    })
  );
  const [translateRightMenuAndLinks] = useState(
    new TranslateXY(
      {
        target: "." + cx(styles.rightMenuLinks),
        x: (index, target) => target.clientWidth,
        opacity: "0",
      },
      {
        target: "." + cx(styles.rightLabelAndMenuWraper),
        y: (index, target) => ~(target.parentNode.clientHeight - 115) + 1,
        flexDirection: "column-reverse",
      }
    )
  );
  const [translateMiddleHeaderAndBody] = useState(
    new TranslateXY(
      {
        target: "." + cx(styles.middleHeader),
        x: 50,
        opacity: "0",
      },
      {
        target: "." + cx(styles.middleBody),
        y: 100,
        opacity: "0",
      }
    )
  );
  const [translateLeftTopAndBottom] = useState(
    new TranslateXY(
      {
        target: "." + cx(styles.leftTop),
        y: 25,
        opacity: "0",
      },
      {
        target: "." + cx(styles.leftBottom),
        x: 25,
        opacity: "0",
      }
    )
  );

  // instatiate other conditional with a useState hooks
  const [isOpen, setIsOpen] = useState(false);
  const [rightSelection, setRightSelection] = useState(
    Object.values(props.data)[0].name
  );
  const [middleSelection, setMiddleSelection] = useState("about");

  useEffect(() => {
    // add all menu active state logic inside this if and vice versa in the else
    if (isOpen) {
      // animations logic
      addBgColorRightMenu.start(); //changes circle menu background to white on active
      translateRightMenuAndLinks.start(); //moves circle menu to top of page on active
      // other logic
      setRightSelection("Services");
    } else {
      // animations logic
      addBgColorRightMenu.reverse(); //changes circle menu background back to initial value on active
      translateRightMenuAndLinks.reverse(); //moves circle menu to bottom of page on inactive
      // other logic
      setRightSelection(Object.values(props.data)[0].name); // sets content to display on menu inactive to the fist link on the right
      setMiddleSelection(Object.values(props.data)[0].children[0].id); // sets value to display in left top and bottom sections based on logic above
      translateLeftTopAndBottom.start("fromTo"); // starts animation of content and number cast to left section top and bottom respectively
    }
  }, [isOpen]);

  return (
    <div className={cx(styles.container)}>
      {/* left section of page */}
      <div className={cx(styles.left)}>
        <div className={cx(styles.leftTop)}>
          {Object.values(props.data)
            .filter((e) => e.name === rightSelection)[0]
            .children.filter((e) => e.id === middleSelection)
            .map((e) =>
              e?.image ? (
                <div key={e.image}>
                  <img
                    src={"/images/" + e.image}
                    alt={e.image}
                    style={{
                      height: e.imageHeight ? e.imageHeight + "px" : "100px",
                    }}
                  />
                  {e?.details.map((e) => (
                    <div key={e}>
                      <div>{e}</div>
                    </div>
                  ))}
                </div>
              ) : (
                e?.details.map((e) => (
                  <div key={e}>
                    <div>{e}</div>
                  </div>
                ))
              )
            )}
        </div>
        <div className={cx(styles.leftBottom)}>
          {middleSelection.split("-")[1] || "01"}
        </div>
      </div>
      {/* middle section of page */}
      <div className={cx(styles.middle)}>
        <div className={cx(styles.middleHeader)}>{rightSelection}</div>
        <div className={cx(styles.middleBody)}>
          {Object.values(props.data)
            .filter((e) => e.name === rightSelection)[0]
            .children.map((e, i, arr) => (
              <div
                className={
                  arr.length > 1
                    ? cx(styles.middleBodyItems, styles[e.customClass])
                    : cx(styles[e.customClass])
                }
                key={e.id}
                dangerouslySetInnerHTML={{
                  __html: e.description.replace(/[\n]/gi, "<br/>"),
                }}
                data-id={e.id}
                tabIndex={0}
                onMouseEnter={(e) => {
                  setMiddleSelection(e.currentTarget.getAttribute("data-id")); // sets the values to display in the left top and bottom sections based on values from data-id attribute of element hovered
                  e.currentTarget.getAttribute("data-id").split("-").length >
                    1 && translateLeftTopAndBottom.start("fromTo"); // starts animation of content and number cast to left section top and bottom respectively
                }}
                onMouseLeave={
                  (e) =>
                    e.currentTarget.getAttribute("data-id").split("-").length >
                      1 && translateLeftTopAndBottom.reverse() // reverses animation of content and number cast to left section top and bottom respectively
                }
              ></div>
            ))}
        </div>
      </div>
      {/* right section of page */}
      <div className={cx(styles.right)}>
        <div className={cx(styles.rightWrapper)}>
          <div>
            <div className={cx(styles.rightMenuLinks)}>
              {Object.values(props.data).map((e) => (
                <div
                  className={cx(
                    styles.rightMenuLinksItem,
                    styles.verticalText,
                    e.name === rightSelection
                      ? styles.rightMenuLinksItemActive
                      : null
                  )}
                  key={e.name}
                  data-id-initial={e.children[0]?.id}
                  tabIndex={0}
                  onClick={(e) => {
                    translateMiddleHeaderAndBody.start("fromTo"); // animate the header and body of the middle section into view
                    setRightSelection(e.currentTarget.textContent); // assign the selection innerText to the rightSelection State
                    setMiddleSelection(
                      e.currentTarget.getAttribute("data-id-initial")
                    ); // sets the initial values to display in the left top and bottom sections based on values from data-id-initial attribute of element clicked
                    translateLeftTopAndBottom.start("fromTo"); // starts animation of content and number cast to left section top and bottom respectively
                  }}
                >
                  {e.name}
                </div>
              ))}
            </div>
          </div>
          <div className={cx(styles.rightLabelAndMenuWraper)}>
            {isOpen ? (
              <div className={cx(styles.rightMenuLabel, styles.verticalText)}>
                Close
              </div>
            ) : (
              <div className={cx(styles.rightMenuLabel, styles.verticalText)}>
                All Products
              </div>
            )}
            <div
              className={cx(styles.rightMenuCircle)}
              tabIndex={0}
              onClick={() => {
                setIsOpen(!isOpen); // toggles menu ative state and sets the content to display in the middle section
              }}
              onMouseEnter={
                () => spinRightMenu.start() // triggers svg icon spin animation on mouse in
              }
              onMouseLeave={
                () => spinRightMenu.reverse() // reverses svg icon spin animation on mouse out
              }
            >
              {isOpen ? <CgEditUnmask /> : <CgMenuGridO />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Layout;
