# Painikepeli
This game is an online multiplayer game where points are lost and gained by clicking a button. This button increases a shared counter, and rewards are given to players who advance the counter to values that are divisible by 500, 100 and 10. These values give rewards of 100, 40 and 5 points respectively. Players start with 20 points and clicking the button costs a point. A player who runs out of points can reset themselves to 20 points. In addition, clicking the button reveals to thep layer how many clicks are required for the next reward at the current time.

The game is available at https://my-painikepeli.herokuapp.com/

This project was made for the Koodarijahti 2020 competition. Details at https://koodarijahti.fi/

## Implementation
The frontend has been done with React and utilizes conditional rendering. The application has bee developed with both desktops and mobile devices in mind. The backend has been implemented with Express.js. Information about users is stored in a text file as JSON. Users are identified with a cookie. The user data is anonymous and the cookie can be considered "strictly necessary", and the user is informed about it, so the site complies with current EU law. The application has been deployed using Heroku, and is available at https://my-painikepeli.herokuapp.com/ . The free version of Heroku is used, so the server can take some time to wake up if it has not been used for a while.

## Running the game locally
  - Install Git and Node.js
  - Open your preferred installation location with the Git terminal and input the following command
    - git clone https://github.com/vkarhu/painikepeli.git
  - Input npm install in both the root location and in /painikepeli-frontend to install required dependencies
  - Now the game can be started locally by inputting the command 'npm start' to both of the location in the previous step
  - The game should automatically open. If not, navigate to http://localhost:3000/ with a web browser to view it
