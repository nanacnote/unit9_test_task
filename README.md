# Unit9 - Test Task

This is a React App configured and setup up manually \***\*NOT\*\*** using Create React App.

- Transpiling with [Babel](https://babeljs.io/)
- Linting with [ESLint](https://eslint.org/)
- Formatting with [Prettier](https://prettier.io/)

---

## Demo

View Static Deployed Version:

[Deployed with Github Pages](https://nanacnote.github.io/unit9_test_task)

---

## Setup

Start a new local workspace in VScode or prefered editor and in the terminal

- git clone https://nanacnote@bitbucket.org/nanacnote/unit9_test_task.git
- cd unit9_test_task
- npm install

## Run

In the unit9_test_task directory

- npm start
- from local browser open http://localhost:3000/

## Build

In the unit9_test_task directory

- npm run build

  Bundle is available in the \***\*dist\*\*** folder

---

## Architecture

```
+-- public
| +-- images
| +-- index.html
| +-- main.css

+-- src
| +-- animation
| +-- components
| +-- data
```

- contains all images to bypass webpack loading when running in node
- main HTML file to run for static builds
- main CSS with global styles
- contains all Javascript animation modules composed as classes
- contains all react components with an exports index file for easy ES6 importing
- contain a JSON object which populate the App with all the text needed

The App is modularized to allow for easy maintenance.

There is a JSON file in the data folder which is passed as a prop to the Layout.jsx component.

This JSON object contains all the text injections for the app. It is dynamic and once its Prototyping rules are followed,
infinite amounts of data can be passed to the app to display.

---

## JSON prototype

**Smart defaults available leave empty string fields as "" and empty arrays as []**

```
{
  "item-01": {
    "name": "name of the item which will be displayed as a link on the right",
    "children": [
      {
        "id": "id for the item NB if multiple children suffix with '-01, -02, -03' as appropriate, if single child dont add any suffix",
        "customClass": "if the content requires custom styling name the class here and add it to the layout.module.css",
        "description": "the content to display in the middle of the screen when link is clicked goes here",
        "leftImage": "state the name of the image file in the public/images folder here minus the extension this will display it in the top left section",
        "leftImageHeight": "state the height in pixels wanted for the image displayed on the top left here defaults to 100px",
        "hoverImage": "state the name of the image to track the mouse on link hover here",
        "leftDetails": [ add a list of items to display on the left as details when item is hovered in the middle]
      }
    ]
  },
}
```

---

## JSON example

```
{
  "item-01": {
    "name": "About",
    "children": [
      {
        "id": "about",
        "customClass": "",
        "description": "Hello! \nI'm Owusu K \nFullstack Developer \n& Data Scientist",
        "leftImage": "about_barcode",
        "leftImageHeight": "75",
        "hoverImage": "",
        "leftDetails": []
      }
    ]
  },
  "item-02": {
    "name": "Work",
    "children": [
      {
        "id": "work-01",
        "customClass": "",
        "description": "PepsiCo",
        "leftImage": "pesico_image",
        "leftImageHeight": "200",
        "hoverImage": "",
        "leftDetails": []
      },
      {
        "id": "work-02",
        "customClass": "",
        "description": "Nike-Town",
        "leftImage": "nike_image",
        "leftImageHeight": "200",
        "hoverImage": "",
        "leftDetails": []
      }
    ]
  },
}
```

---

## Contact

adjeibohyen@hotmail.co.uk
