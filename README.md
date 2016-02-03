# Portfolio App

This is a portfolio app which displays different portfolios and their details like the service, their clients,etc.

The admin can **add, edit or and delete portfolios**. They can also **attach images** for each portfolio. _But there is a limitation for this that only already saved images can be selected for each portfolio. The user cannot upload and save a new image. This fix is pending._

The visitors of this website can go through different portfolios to know in detail. they only have the choice to view the page.

Inorder to use the app, install the dependencies specified in package.json by running the command
> npm install

Then save the script myscript.sql and run in the mysql server using the command
> source <"path/myscript.sql">

This is to create the database and tables and to insert the rows.

After that, start the server using the command
> nodemon app.js

Finally start using the website by invoking at **port 3000**.


### Issues to be fixed

* After adding or editing the portfolio by the admin, browser is throwing an error from the dateFormat js file
Error is
_TypeError: Cannot read property 'getFullYear' of undefined(..)_

* The user should be able to upload and save a new image for the portfolio.
