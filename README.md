# ECE-NodeJS-Dashboard-Project 
[![Build Status](https://travis-ci.org/James88wang/Dashboard-Node-Js-Project.svg?branch=master)](https://travis-ci.org/James88wang/Dashboard-Node-Js-Project) [![GitHub watchers](https://img.shields.io/github/watchers/James88wang/Dashboard-Node-Js-Project.svg?style=plastic&label=Watch&maxAge=2592000)](https://github.com/James88wang/Dashboard-Node-Js-Project/watchers/) [![GitHub forks](https://img.shields.io/github/forks/James88wang/Dashboard-Node-Js-Project.svg?style=plastic&label=Fork&maxAge=2592000)](https://github.com/James88wang/Dashboard-Node-Js-Project/network/) [![GitHub tag](https://img.shields.io/github/tag/James88wang/Dashboard-Node-Js-Project.svg)](https://github.com/James88wang/Dashboard-Node-Js-Project/tags/) [![GitHub commits](https://img.shields.io/github/commits-since/James88wang/Dashboard-Node-Js-Project/v1.4.1.svg)](https://GitHub.com/James88wang/Dashboard-Node-Js-Project/commit/) [![GitHub contributors](https://img.shields.io/github/contributors/James88wang/Dashboard-Node-Js-Project.svg)](https://GitHub.com/James88wang/Dashboard-Node-Js-Project/contributors/) [![GitHub issues](https://img.shields.io/github/issues/James88wang/Dashboard-Node-Js-Project.svg)]((https://GitHub.com/James88wang/Dashboard-Node-Js-Project/issues/)




Dashboard allows:

  * API side
    - CRUD users 
    - CRUD your own metrics 
    - User authentication
  * Front side
    - Home page
    - Sign In / Sign Up / Sign Out
    - Insert / Update / Delete metrics once logged in
    - Retrieve the user’s metrics and display it in a graph
    - Only access the user’s metrics, not the other's
  * Utility
    - Pre-populate the database with at least two users and their own metrics


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



## Using dashboard project

### To launch the tests (with *Mocha* framework)

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

   2.  OR use `npm run pre-populate` to create 2 users automatically with these credentials:



   | Login | Password | email                 |
   | ----- | -------- | --------------------- |
   | james | pwd      | james.wang@edu.ece.fr |
   | henintsoa | pwd      | henintsoa.razafindrazaka@edu.ece.fr |
   
   
   
2. Sign in with your credentials

   
   
   
   ![2](/img/2.png)
   



3. Add metrics, specifying the name and the value in the `Group name` and `Value` input fields, and clicking on the `Post metric` button

   
   
   ![3](/img/3.png)




4. Display all the metrics in a table and a graph by clicking on the `Get All Metrics` button

   
   
   ![4](/img/4.png)




5. Display a specific group of metrics by specifying the name of it in the `Group name` input field and clicking on the `Search metrics` button

   
   
   ![5](/img/5.png)



6. Delete a group of metric by specifying the name of it in `Group name` and clicking on the `Delete Metric` button

   
   
   ![6](/img/6.png)



7. Logout from your account by clicking on the `Logout` button or delete the account by clicking on the `Delete` button

   
   
   ![7](/img/7.png)





## Test with Docker
To test our outside dependency, we have run our tests in **Docker**. To do so, we have followed these steps:

1. We have created a `Dockerfile` and a `.dockerignore` files to configure the Docker image 

2. We have built the Docker image of our dashboard application

   ![8](/img/docker-build.PNG)


3. We have run the Docker image

   ![9](/img/docker-run-ps.PNG)


4. We have displayed the result of the tests

   ![10](/img/docker-logs.PNG)




## Problems we have encountered

* Send HTTP **DELETE** and **PUT** requests from client side to the server

* Struggle to match the metrics data with the **graph** 

* Trouble in connecting and managing the **LevelDB** database due to the poor documentation related to it.

* Because it is the first time we truly used **Git**, it took us a while to get familiar with this tool. Now, thanks to this project, we have been able to better use **Git** and **Github**. 
  
  In particular, we can now: 
  
  * `push` the local repository to the remote
  * `pull`the remote repository
  * `commit` changes
  * `branch` : create, delete, merge branches
  * `merge`: resolving conflicts
  * `tag`: versioning our releases



## Contributors

* [@James88wang](https://github.com/James88wang) 💻🐛
* [@HenintsoaRaza](https://github.com/HenintsoaRaza) 💻🐛



## Contact

* james.wang@edu.ece.fr
* henintsoa.razafindrazaka@edu.ece.fr



# Licenses

[![Open Source Love svg1](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
