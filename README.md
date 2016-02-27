# Portfolio App

Example app done as part of learning **MySQL**.

A web application to display details of various portfolios to users.

The admin can **add, edit** or **delete** portfolios.

### Installation

1.  Install  [MySQL Server](http://dev.mysql.com/downloads/installer/).

2.  Install the dependencies

    ```
    npm install
    ```

3.  Run `myscript.sql`
      ```
      # To save database, tables and records in MySQL

      source "/filepath/myscript.sql"
      ```


3.  Start the server
    ```
    nodemon app.js
    ```

4.  Open [http://localhost:3000](http://localhost:3000)


### Known Issues

* Getting error when admin add/edit portfolio:
    ```
    TypeError: Cannot read property 'getFullYear' of undefined(..)
    ```

* Cannot upload new image for portfolio.
