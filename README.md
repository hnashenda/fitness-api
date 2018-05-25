# PHP Test

A PHP Example /test allowing workout plans to be added to users. "Days" can be added to "Plans". "Exercises" can be added to "Days". Test demonstrates relational databases and email functionality upon changes to workouts

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

- WAMP for Windows Systems or LAMP for Linux systems

### Installing

Step 1: Extract folder "api" into the /www directory of the WAMP installation
Step 2: Inside dev folder located in "api/app/dev" is the database called "workout-builder.csv" or "workout-builder.sql" . Upload this database to phpmyadmin

----Alternatively----

Inside dev folder located in "api/app/dev" is a file called querries.txt. It contains all querries to setup the tables and contains dummy data

Step 3: With WAMP /LAMP server running navigate to "localhost/api" in your browser

Step 4: Email functionality: 
 - to send emails when "Plans" are changedd, ensure that smtp is activated on your server.Uncomment lines 42 to 48 in file "update.php" located in "api/plan/update.php". This will send updates on changes to plans
 - to send emails when "Days" are changed ensure that smtp is activated on your server.Uncomment lines 45 to 49 in file "update.php" located in "api/day/update.php". This will send updates on changes to plans

## Built With

* [Bootstrap 3) - The web framework used
* [php) -
* [mysql)

## Versioning

Version 1.0

## Authors

* **Hubert Nashenda** - *

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc

