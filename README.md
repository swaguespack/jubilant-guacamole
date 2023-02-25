# musical-enigma

## Description

jubilant-guacamole is a CMS-style blog site that follows the Model-View-Controller(MVC) paradigm and can be used by developers as a space to publish their blog posts and comment on other developers' posts.


## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Application Demo ](#application-demo)

## Installation

To create your own CMS-style blog site, `git clone` the repo so you have the project on your local development environemnt.

Install the following dependencies using `npm install`:  
`bcrypt`  
`MySQL2`  
`sequelize`  
`express-handlebars`  
`express-session`  
`connect-session-sequelize`  
`dotenv`  


## Usage

Once the dependencies are installed and the .env file is set up, follow this commands:

1. `mysql -u root -p` - logs into MySQL
2. `source db/schema.sql` - sources the schema
3. `quit` - quits MySQL database
4. `npm run seed` - runs the seed script
5. `npm start` - starts the server

## Application Demo

The following image captures the CMS-style Tech Blog Application:

![cms tech blog application.](/images/mvc-demo.png)

Use the following link to find the deployed application on Heroku:





