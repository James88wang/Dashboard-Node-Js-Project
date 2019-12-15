# ECE-NodeJS-Dashboard-Project 
[![Build Status](https://travis-ci.org/James88wang/Dashboard-Node-Js-Project.svg?branch=master)](https://travis-ci.org/James88wang/Dashboard-Node-Js-Project)

Dashboard allows:

  * API side 
    - CRUD users 
    - Authenticate
    - CRUD your own metrics 
  * Front side
    - Home page
    - Sign In / Sign Up / Sign Out
    - Insert/update/delete metrics once logged in
    - Retrieve the user’s metrics and display it in a graph
    - Only access the user’s metrics, not the other ones
  * Utility
    - pre-populate the database with at least two users and their own metrics


## Prerequisites

Before you begin, ensure you have met the following requirement:
  * You have installed the latest version of `node JS`



## Installing dashboard project

To install the project, follow these steps:
1. Open your terminal
2. Go to the directory of your choice to clone the project
3. Clone the repository with git Bash:

```shell
> git clone https://github.com/James88wang/Dashboard-Node-Js-Project.git
```

4. Install the dependencies:

```shell
> npm install
```




## Pre-populate the database with two users and their own metrics

To pre-populate the database, follow these steps:
1. Go to the `<my_path>/Dashboard-Node-Js-Project` directory:

```shell
> cd <my_path>/Dashboard-Node-Js-Project
```
2. Run the pre-populating code:

```shell
> npm run pre-populate
```



## Using dashboard project

### To launch the tests (with the framework *Mocha*)

1. Go to the `<my_path>/Dashboard-Node-Js-Project` directory:

```shell
> cd <my_path>/Dashboard-Node-Js-Project
```

2. Run the project:

```shell
> npm test
```


### To launch the pre-populate script

1. Go to the `<my_path>/Dashboard-Node-Js-Project` directory:

```shell
> cd <my_path>/Dashboard-Node-Js-Project
```

2. Run the project:

```shell
> npm run pre-populate
```


### To launch the dashboard project

1. Go to the `<my_path>/Dashboard-Node-Js-Project` directory:

```shell
> cd <my_path>/Dashboard-Node-Js-Project
```

2. Run the project:

```shell
> npm run start
```


### To start using the project

1. 1. Create a user by signing up

   2.  Or use pre-populate user credentials to connect:

   | Login | Password | email                 |
| ----- | -------- | --------------------- |
   | james | pwd      | james.wang@edu.ece.fr |
   | henintsoa | pwd      | henintsoa.razafindrazaka@edu.ece.fr |
   
2. Sign in with your credentials
3. Add metrics, specifying the name and the value in the `Group name` and `Value` input fields, and clicking on the `Post metric` button
4. Display all the metrics in a table and a graph by clicking on the `Get All Metrics` button
5. Display a specific group of metrics by specifying the name of it in the `Group name` input field and clicking on the `Search metrics` button
6. Delete a group of metric by specifying the name of it in `Group name` and clicking on the `Delete Metric` button
7. Logout from your account by clicking on the `Logout` button or delete the account by clicking on the `Delete` button



## What problems have we encountered ?

* send http type `delete` and `put` requests from the client side 
* it was quite hard to match the metrics data with the `graph` 
* we have been in `trouble in connecting to the levelDB database because the documentation is really poor`.
* we did not know much about "github" and it took us a while to get familiar with this tool. Now, thanks to this project, we have been able to better use github. In particular by using: 
  * push the local repository
  * pull the local repository
  * commit
  * branch 
  * merge
  * resolving conflicts
  * tags 


## Contributors

* [@James88wang](https://github.com/James88wang) 💻🐛
* [@HenintsoaRaza](https://github.com/HenintsoaRaza) 💻🐛


## Contact

* james.wang@edu.ece.fr
* henintsoa.razafindrazaka@edu.ece.fr
