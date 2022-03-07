# Referle

A companion app for the word game [Wordle](https://www.nytco.com/press/wordle-new-york-times-games/). Provides users a list of possible words to guess, ranked by their average tile score. When a user finds a word they like, they can add it to the Word Bank by double tapping the word card.

Deployed Application here: [Referle](https://referle-2110.herokuapp.com/home)

![REFERLE gif](https://media.giphy.com/media/eT3Xv2IOM1gN8DCg2R/giphy.gif)

# Table of Contents

1. [Overview](#overview)
2. [Installation Instructions](#installationInstructions)
3. [Project Goals](#projectGoals)
4. [Technologies Used](#techUsed)
5. [Testing](#testing)
6. [Project Wins](#projectWins)
7. [Future Iterations](#futureIterations)
8. [Authors](#authors)

## Overview <a name="overview"></a>

Referle is my Mod 3 final project for the Turing School of Software and Design that was built with `create-react-app` and tested using Cypress. I sourced the data for the backend from [this repo](https://github.com/sejaldua/wordle-analysis) I found. The project was completed over 6 days beginning with ideation and [wire framing](https://miro.com/app/board/uXjVOJbBisQ=/) and concluding with deployement on Heroku.

- Project Spec here: [Showcase](https://frontend.turing.edu/projects/module-3/showcase.html)
- Referle API:
    - GitHub: [Referle API](https://github.com/ectweitmann/referle-api)
    - Heroku: [Referle API](https://referle.herokuapp.com/)


## Installation Instructions <a name="installationInstructions"></a>

1. Clone down [this repository](https://github.com/ectweitmann/referle)
2. Run `npm install`
3. Run `npm start` in your terminal
4. Go to http://localhost:3000/ and you should see the website
5. Enter `control + c` in your terminal to stop the server at any time.

## Project Goals <a name="projectGoals"></a>

1. Use the technology I've been working with over the course of the module to demonstrate mastery of the following:
  - React
  - Router
  - Asynchronous JavaScript
  - End to end testing with Cypress
2. Create personas and user stories to describe your target audience.

3. Work within constraints to deliver a product for your niche audience, which helps solve a problem unique to them.

## Technologies Used <a name="techUsed"></a>
### Frontend Technologies
- React
- React Router
- Javascript
- CSS3
- HTML5
- Fetch API
- PropTypes
- NPM
- Cypress

### Backend Technologies

- Express
- Node.js
- Postman

## Testing <a name="testing"></a>

Cypress was used for E2E and integration testing. To test the application: run `npm run cypress` and you will have a window open that gives you the ability to click on each test and see whether they pass. Make sure you've run `npm start` in a separate terminal tab before you begin the testing.

## Project Wins <a name="projectWins"></a>

- Produce a fully functional MVP within the time scope of 6 days
- Successfully built a paginated API by self-teaching Express.
- Constructed a thorough project plan and wireframe, and then executed it.
- Implemented React Router for a multi-page UX
- Continued to gain competency with Cypress E2E testing framework
- Utilized type-checking with PropTypes

## Future Iterations <a name="futureIterations"></a>

- Searching functionality, so a user can search for words based on a specified criteria.
- Add functionality for different user profiles.
- A Light/Dark mode toggling.

## Authors

- [Ethan Tweitmann](https://github.com/ectweitmann)

- Project Manager: [Robbie Jaeger](https://github.com/robbiejaeger)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
