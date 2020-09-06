# Unit9 - Test Task

This is a React App configured and setup up manually \***\*NOT\*\*** using Create React App.

- Transpiling with [Babel](https://babeljs.io/)
- Linting with [ESLint](https://eslint.org/)
- Formatting with [Prettier](https://prettier.io/)

---

## Demo

View Deployed Version:

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

+-- public
| +-- images
| +-- index.html
| +-- main.css

+-- src
| +-- animation
| +-- components
| +-- data

- contains all images to bypass webpack loading when running in node
- main HTML file to run for static builds
- main CSS with global styles
- contains or Javascript animation modules composed as classes
- contains all react components with an exports index file for easy ES6 importing
- contain a JSON object which populate the App with all the text needed
