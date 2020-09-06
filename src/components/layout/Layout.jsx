import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./Layout.module.css";
import cx from "classnames";
import { CgMenuGridO, CgEditUnmask } from "react-icons/cg";
import { Spinner, BgColor, TranslateXY } from "../../animation";
import hoverEffect from "hover-effect";

// import all images into images object and reference them in the componet when needed
// this allows for webpack to bundle the images when a static build is required
import about_barcode from "../../../public/images/about_barcode.png";
import pesico_image from "../../../public/images/pesico_image.png";
import nike_image from "../../../public/images/nike_image.png";
import services_01_image from "../../../public/images/services_01_image.jpeg";
import services_02_image from "../../../public/images/services_02_image.jpeg";
import services_03_image from "../../../public/images/services_03_image.jpeg";
import services_04_image from "../../../public/images/services_04_image.jpeg";
import services_05_image from "../../../public/images/services_05_image.jpeg";
import displacement_image from "../../../public/images/displacement_image.jpg";
const images = {
  about_barcode: about_barcode,
  pesico_image: pesico_image,
  nike_image: nike_image,
  services_01_image: services_01_image,
  services_02_image: services_02_image,
  services_03_image: services_03_image,
  services_04_image: services_04_image,
  services_05_image: services_05_image,
  displacement_image: displacement_image,
};

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
  const [translateMiddleHeaderAndBodyLinksClick] = useState(
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
  const [translateMiddleHeaderAndBodyIconClick] = useState(
    new TranslateXY(
      {
        target: "." + cx(styles.middleHeader),
        x: 50,
        opacity: "0",
      },
      {
        target: "." + cx(styles.middleBody),
        y: 500,
        opacity: "0",
      }
    )
  );

  // instatiate other conditional with a useState hooks
  const [isOpen, setIsOpen] = useState(false);
  const [rightSelection, setRightSelection] = useState(
    Object.values(props.data)[0].name
  );
  const [middleSelection, setMiddleSelection] = useState(
    Object.values(props.data)[0].children[0].id
  );
  const [hoverImage, setHoverImage] = useState();

  useEffect(() => {
    // add all menu active state logic inside this if and vice versa in the else
    if (isOpen) {
      // animations logic
      addBgColorRightMenu.start(); //changes circle menu background to white on active
      translateRightMenuAndLinks.start(); //moves circle menu to top of page on active
      // other logic
      setRightSelection("Services");
      translateMiddleHeaderAndBodyIconClick.start("fromTo"); // add slide-in from bottom animation to middle body text on open
    } else {
      // animations logic
      addBgColorRightMenu.reverse(); //changes circle menu background back to initial value on active
      translateRightMenuAndLinks.reverse(); //moves circle menu to bottom of page on inactive
      // async animation and element display logic
      translateMiddleHeaderAndBodyIconClick.reverse(() => {
        setRightSelection(Object.values(props.data)[0].name); // sets content to display on menu inactive to the fist link on the right
        setMiddleSelection(Object.values(props.data)[0].children[0].id); // sets value to display in left top and bottom sections based on logic above
        translateMiddleHeaderAndBodyLinksClick.start("fromTo");
        translateLeftTopAndBottom.start("fromTo"); // reset animation of content and number cast to left section top and bottom respectively to default
      }); // reverse slide-in from bottom animation previously applied to middle body text on open pass it a callback to reset normal middle body animation behaviour
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
              e?.leftImage ? (
                <div key={e.leftImage}>
                  <img
                    src={images[e.leftImage]}
                    alt={e.leftImage}
                    style={{
                      height: e.leftImageHeight
                        ? e.leftImageHeight + "px"
                        : "100px",
                    }}
                  />
                  {e?.leftDetails.map((e) => (
                    <div key={e}>
                      <div>{e}</div>
                    </div>
                  ))}
                </div>
              ) : (
                e?.leftDetails.map((e) => <div key={e}>{e}</div>)
              )
            )}
        </div>
        <div className={cx(styles.leftBottom)}>
          {Object.values(props.data).filter((e) => e.name === rightSelection)[0]
            .children.length > 1
            ? middleSelection.split("-")[1] || (
                <div style={{ color: "#515151" }}>00</div>
              )
            : "01"}
        </div>
      </div>
      {/* middle section of page */}
      <div className={cx(styles.middle)}>
        <div className={cx(styles.middleHeader)}>{rightSelection}</div>
        <div className={cx(styles.middleBody)}>
          <div className={cx(styles.middleBodyMultiItemsImage)}></div>
          {Object.values(props.data)
            .filter((e) => e.name === rightSelection)[0]
            .children.map((e, i, arr) => (
              <div
                className={
                  arr.length > 1
                    ? cx(styles.middleBodyMultiItems, styles[e.customClass])
                    : cx(styles.middleBodySingleItem, styles[e.customClass])
                }
                key={e.id}
                dangerouslySetInnerHTML={{
                  __html: e.description.replace(/[\n]/gi, "<br/>"),
                }}
                data-id={e.id}
                data-image-hover={e.hoverImage}
                tabIndex={0}
                onMouseMove={(e) => {
                  let condition = e.currentTarget.getAttribute(
                    "data-image-hover"
                  ); // returns true for multiple elements with data-image-hover attribute in middle body and false for single enlement
                  let parentPosition = e.currentTarget.parentNode.getBoundingClientRect();
                  let imageDimensions = [
                    e.currentTarget.parentNode.firstChild.clientWidth / 2,
                    e.currentTarget.parentNode.firstChild.clientHeight / 2,
                  ];
                  condition &&
                    e.currentTarget.parentNode.firstChild.setAttribute(
                      "style",
                      "transform: translate3d(" +
                        (e.clientX - parentPosition.left - imageDimensions[0]) +
                        "px," +
                        (e.clientY - parentPosition.top - imageDimensions[1]) +
                        "px,0px)"
                    ); // sets hover div xy coordinates to track mouse
                  condition &&
                    e.clientX - parentPosition.left >
                      e.currentTarget.clientWidth - 40 &&
                    hoverImage.next();
                  condition &&
                    e.clientX - parentPosition.left < 40 &&
                    hoverImage.previous();
                }}
                onMouseEnter={(e) => {
                  let conditionImageAvailable = e.currentTarget.getAttribute(
                    "data-image-hover"
                  );
                  let condition =
                    e.currentTarget.getAttribute("data-id").split("-").length >
                    1; // returns true for multiple elements in middle body and false for single enlement
                  let target = document.querySelector(
                    "." + cx(styles.middleBodyMultiItemsImage)
                  );
                  setMiddleSelection(e.currentTarget.getAttribute("data-id")); // sets the values to display in the left top and bottom sections based on values from data-id attribute of element hovered
                  target.innerHTML = ""; // clears hover image div of all html content
                  condition &&
                    conditionImageAvailable &&
                    setHoverImage(
                      new hoverEffect({
                        parent: target,
                        intensity: 1,
                        imagesRatio: 0.5,
                        speedIn: 5,
                        speedOut: 5,
                        hover: false,
                        image1:
                          images[
                            e.currentTarget.getAttribute("data-image-hover")
                          ],
                        image2:
                          images[
                            e.currentTarget.getAttribute("data-image-hover")
                          ],
                        displacementImage: images["displacement_image"],
                      })
                    ); // appends hover image to div
                  condition && translateLeftTopAndBottom.start("fromTo"); // starts animation of content and number cast to left section top and bottom
                  condition &&
                    e.currentTarget.parentNode.firstChild.setAttribute(
                      "style",
                      "visibility: visible"
                    ); // add image div (first sibling) to view by setting it to transparent
                }}
                onMouseLeave={(e) => {
                  let condition =
                    e.currentTarget.getAttribute("data-id").split("-").length >
                    1; // returns true for multiple elements in middle body and false for single enlement
                  condition && translateLeftTopAndBottom.reverse(); // reverses animation of content and number cast to left section top and bottom
                  e.currentTarget.parentNode.firstChild.setAttribute(
                    "style",
                    "visibility: hidden; opacity: 0"
                  ); // removes image div (first sibling) from view by setting it to transparent
                }}
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
                  data-id-initial={
                    e.children.length > 1 ? "" : e.children[0].id
                  }
                  tabIndex={0}
                  onClick={(e) => {
                    translateMiddleHeaderAndBodyLinksClick.start("fromTo"); // animate the header and body of the middle section into view
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

Layout.propTypes = {
  data: PropTypes.object,
};
