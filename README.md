# music-quiz-game

## Description
A quiz game website, where the user can play random quizes generated by the app to determine whether the user knows which songs have the most views on youtube. The player can also make and play custom quizes. On top of that the user can play with friends to determine who knows the best. The user can also checkout their own profile page to see their stats, and saved quizzes.

## User Story
```md
AS A user who likes music
I WANT to play simple, but fun games where I choose which song is more popular
SO THAT I can discover new songs that I have not heard before.
```

## Acceptance Criteria
```md
GIVEN I enter the webpage
THEN I can see options to login, sign up, and a option to play game.
WHEN I sign in
THEN I can see my profile page, have access to creating a quiz, and the option to log out.
WHEN I click on "Play Now" on the "Play Alone!" card
THEN I am prompted to choose which gamemode I want to play.
WHEN I select "Random Quiz"
THEN I am prompted with randomly generated songs from YouTube.
WHEN I click "HIGHER"
THEN I am told if my choice was right or wrong, and a new question pops up.
WHEN I finish the quiz.
THEN I see a page with my score, and a option to go home, or play again.'
WHEN I click "home"
THEN I am taken back to the homepage.
WHEN I click "Create Now!"
THEN I am prompted with a form to enter a quiz name and URLs.
WHEN I click "Add Link"
THEN I can click on the "Create Quiz" button.
WHEN I have an even amount of URLs
THEN I can successfully create a quiz.
WHEN I create a quiz
THEN I can access the quiz in my profile, or in custom gamemode.
WHEN I click "Take me home"
THEN I am taken back to the homepage.
WHEN I click on "Profile"
THEN I can see my username, profile picture, level, experience bar, other statistics, and my created quizzes.
WHEN I play Custom Quiz alone
THEN I get to choose which of my custom quizzes to play.
WHEN I select "Play With Friends"
THEN I am put in a lobby showing all the players.
WHEN I click "Start Random Game"
THEN I and all the players take the same random generated quiz.
WHEN I select a custom quiz
THEN I and all the plays will play the custom quiz that I made.
WHEN I click "About"
THEN I am shown a modal explaining what this webpage is about.
WHEN I click "Logout"
THEN I become a guest viewing the page.
```
## Installation
```md
bcrypt
connect-session-sequelize
dotenv
express
express-handlebars
express-session
handlebars
mysql2
sequelize
socket.io
uuid
```

## Usage


## App Screenshot 
<img src="./public/assets/images/2022-11-14 14-11-47.gif">

## Credits
This project was created by Jordan Johnson, Sangmi Yun, and David Kovalchuk.

The APIs that we used are:
- [Kareoke] (https://rapidapi.com/lbarcl/api/kareoke/)
- [Simple YouTube Search] (https://rapidapi.com/Snowflake107/api/simple-youtube-search/details)

## Deployed Application
https://musicguava.herokuapp.com/

## License
[MIT](https://choosealicense.com/licenses/mit/)
