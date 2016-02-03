# Portfolio App

This is a portfolio app which displays different portfolios and their details like the service, their clients,etc.

The admin can **add, edit or and delete portfolios**. They can also **attach images** for each portfolio. _But there is a limitation for this that only already saved images can be selected for each portfolio. The user cannot upload and save a new image. This fix is pending._

The visitors of this website can go through different portfolios to know in detail. they only have the choice to view the page.

Inorder to use the app, install the dependencies specified in package.json by running the command
> npm install

Th database used is mysql here. So install mysql server  
[Mysql Server Download](http://dev.mysql.com/downloads/installer/)
Then save the script myscript.sql in your local computer and run the script in the mysql command line using the command
> source <"/localpath/myscript.sql">

This is to create the database & tables which are needed for the portfolio app. Also, to insert the rows into the tables which are created.

After successfully executing all the mysql commands in the myscript sql file , start the server using the command
> nodemon app.js

Finally start using the website by invoking at **port 3000**.


### Issues to be fixed

* After adding or editing the portfolio by the admin, browser is throwing an error from the dateFormat js file
Error is
_TypeError: Cannot read property 'getFullYear' of undefined(..)_

* The user should be able to upload and save a new image for the portfolio.
