# Kitchaid
### kitchen web app for help professional kitchens in Sweden to reduce food waste

##### This app is mean to help professional community school kitchens.
![logo](https://github.com/Josef-cody/kitchaid/assets/85129283/d84efb30-9320-4ab4-a73e-18fe2b33675a)

### Features
- App is in order to help kichen staff to keep log to all ordning and have good control of all ording under period of time
- App is in order to keep tracking every daily lunch consume in school, primscholl etc...
App provide function for product kitchen observe receive kitchen's lunch statstics.<br/>
- App have function of registe daily food wastes.
- App have function of weekly work plan to make staff working station's plan.
- App have function like Lunch assessment, so there will be fade back from guests.
- For more functions and ability, please read manuel in after loggin app.
- App have Admin site to create new user, justify user information function and so on. Admin roll is based on different sections in defferent community.

Visit https://kitchaid.se 

Test as production kitchen *(Tillagningskök)

kommun: Tierp 
username: TestP 
password: testp2023 

Test as receive kitchen  *(Mottagningskök)

kommun: Tierp 
username: TestM
password: testm2023

![mobile (2)](https://github.com/Josef-cody/kitchaid/assets/85129283/31ecc762-264b-485c-aea2-303dbdf227ce)


## Tech

Kitchaid is a ---MERN fullstack web application:
#### Front-end
- [React] 
- - react-query - as CRUD hooks associated with axios
- - react-hook-form  -for collecting of user data
- - react-router-dom - for frontend URI route control
- - react-bootstrap - for UI design, combine with my own CSS style
- - react-datepicker - for date picking
- [Axios] - for CRUD at frontend, using axios instance for every HTTP request
- [dotenv] - for secure api-keys and uri
- [HTML5] 
- [CSS3]
- [SASS]

##### Frontend website hosted on netlify

#### Back-end
- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework
- [bcryptjs] - the encrpt package
- [helmet] - for more secure headers
- [jsonwebtoken] - securely transmitting information between parties
- [dotenv] - for secure api-keys and uri
- [mongoose] - MongoDB as database

##### Backend server hosted on heroku

#### Table of contents
![Screenshot 2023-05-31 at 8 14 41 PM](https://github.com/Josef-cody/kitchaid/assets/85129283/dd2f6089-ba99-4207-8ebe-f410e94ca3b5) <br/>
![Screenshot 2023-05-31 at 8 16 18 PM](https://github.com/Josef-cody/kitchaid/assets/85129283/584f2bcc-b422-4481-9e2e-7e095a7adf0f)

## Installation

Kitchaid requires [Node.js](https://nodejs.org/) v16+ to run.

Install the dependencies and devDependencies and start the server.

clone project https://github.com/Josef-cody/kitchaid.git

##### Backend
install dependencies run
- npm install

for database connection, change your own mongo_uri at .env file
- npx nodemon - index.js

##### Frontend
- npm install

for backend connection, change your API_url at .env file

- npm start

Create user or admin at backend with postman 
After create admin, you can logging as admin at https://kitchaid.se/admin
then create new user as you needed.
