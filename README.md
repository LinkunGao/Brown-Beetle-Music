# The Ultimate One Music Portal

## Overview of this project
This is a web app built with MERN technology stack, provides a unified portal page to show results from several online music providers' API. To help users play and get info about songs in different languages or districts instead of irrelated feedbacks from single platform.

![Overview](/screenshots/Overview1.png)

## Quick start guide
### Install the dependencies
### For Frontend:
Using npm:
```
npm install
npm install @material-ui/core
npm install @material-ui/icons
npm install react-jinke-music-player --save
```

Using yarn:
```
yarn install
yarn add @material-ui/core
yarn add @material-ui/icons
yarn add react-jinke-music-player
```
### For Backend:
Using npm:
```
npm install
```
Using yarn:
```
yarn install
```

### Run the Music Portal

Using npm:
```
npm start
```
Using yarn:
```
yarn start
```
(You need to enter different directory to run the client and server side respectively)

The portal page will now run in your default browser at: http://localhost:3000/  

And a backend server will be listening port 3001 for communicating with the database. i.e.: http://localhost:3001/

## Project Features

Search and play music from Spotify/Netease Music, allow you to listen to Chinese and English songs within one website simultaneously.

Music content is retrieved from APIs for each platform, you can add songs to your own playlist and listen to them. 

![Overview](/screenshots/Overview3.png)

### Register and login

Register and login to the portal with your own credentials, can set personal avatar.

![Overview](/screenshots/Overview2.png)

### Enhanced search, switchable results display

Search music from the above two platforms at one time, results displayed by each platform, you can choose the one you like to the playlist. At the same time, this app not only searches for songs, but also displays the corresponding music list and mv.

![Overview](/screenshots/Overview4.png)<br>
![Overview](/screenshots/Overview5.png)

### Create and store, publish your playlists

After selecting and adding music to the playlist, you can store the list and load when you need. 

![Overview](/screenshots/Overview6.png)

## Tools used in this project

### React

Although none of us had studied react before, we learned the basics of react through this course. As a popular development tool, it was put to good use in this project and we were able to gain experience in using react through this program.

With its flexibility and performance-oriented approach, React can be used to build high-end single-page applications with an interactive interface. By using its powerful code base, developers can easily use the code's features on both the server and the browser.

### MongoDB

We use MongoDB as the database for storing user and affiliated information. It allows us to use JavaScript for both client-side and server-side code.

### GitHub

We have used GitHub as a free remote repository before, especially as we have teammates who have studied 719 and are already very familiar with its operation, so version control for this project is no problem at all to put on GitHub. In fact, GitHub is also an open source collaborative community, and through GitHub, it is possible to involve others in both your open source projects and in others' open source projects.

## Project Management

For project management, the agile development approach is our preferred choice. There are normally three roles in a Scrum agile team: the Product Owner, the team (development team) and the Scrum Master. 

Given the impact of the epidemic at the beginning of the school year, we decided to use mainly online tools for project management. The online Kanban program Trello therefore became our project management tool, as it was ideally suited to the agile development model.

As normal Agile Kanban, we use elements like Backlog, sprint, retrospective to fulfil the management process. Especially for the one who are not familiar with this methodology, it provides friendly UI that can make us quickly adapt to it.

![Mainpage of PM](/screenshots/pm1.png)

For each sprint, we can track different user stories, assign it for each teammate. The labels can help us with status of changes.

![Labels](/screenshots/pm2.png)

After each sprint, we will have retrospectives. We put our disscussion and debate on specific Trello board. This helps us to make better progress and improve development efficiency.

![Retrospective](/screenshots/pm4.png)<br>
![Retrospective](/screenshots/pm3.png)

## Acknowledgement
We would like to thank [@Binaryify](https://github.com/Binaryify/NeteaseCloudMusicApi) for the NetEase Music API, [@lijinke666](https://github.com/lijinke666/react-music-player) for the beautiful/powerful/customizable player and [Spotify](https://developer.spotify.com/documentation/web-api/) for providing the APIs that allow us to obtain music resources and info.

## API documentation
For detailed API documentation, please refer to [API Documentation](/APIDOC.md).