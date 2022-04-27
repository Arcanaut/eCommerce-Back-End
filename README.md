-# eCommerce-Back-End

Designed and developed by Brendan Ahearn

![eCommerce](https://github.com/Arcanaut/eCommerce-Back-End/blob/main/assets/thumbnail.png)
## App Description
An inventory tracking app used to manage the stock of a store, including the type of item, the number, the category, the price, and more.

## App Components

Node.js,
Express,
MySQL2,
Sequelize,
dotenv

Git/GitHub
## Why did I build this project?
This app was developed as a way of learning about MySQL and Sequelize

## How to install this application
run `npm i` to install all required npm packages, and then manually create a `.env` file with the following three lines. Inside each of the quotes should have YOUR OWN mysql information 
`DB_NAME=''
DB_USER=''
DB_PW=''
`
## How to use this application
When all npm packages have been installed with 'npm start' navigate to the root of your project directory and enter the following commands
`mysql -u root -p
source db/schema.sql
npm start
npm run seed`

## license
MIT License

Copyright (c) [2022] [BrendanAhearn]

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## User Story
AS A manager at an internet retail company
I WANT a back end for my e-commerce website that uses the latest technologies
SO THAT my company can compete with other e-commerce companies

## Acceptance Criteria
GIVEN a functional Express.js API
WHEN I add my database name, MySQL username, and MySQL password to an environment variable file
THEN I am able to connect to a database using Sequelize
WHEN I enter schema and seed commands
THEN a development database is created and is seeded with test data
WHEN I enter the command to invoke the application
THEN my server is started and the Sequelize models are synced to the MySQL database
WHEN I open API GET routes in Insomnia for categories, products, or tags
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete data in my database
