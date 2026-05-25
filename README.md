# Lundeborg-Saunagus-project
This project is an exam project. It is a fullstack project developed to help the **Lundeborg Saunagus** management, administrate the association **Lundeborg Saunagus**.

The projects current state is a prototype of a solution, that could help automate and simplify the **Lundeborg Saunagus** administrators work. 

This project is a webpage prototype. It consists of a frontend written with html/css/javascript, and a backend api developed using the spring boot framework. The webpage is served by nginx, and serves as the entrypoint for the frontend and the backend.
### How to get the prototype
The repository for this project is public. To access the prototype, clone or fork directly from Github repository
## Clone or fork from Github repository
A) Start by cloning or forking the repository [here](https://docs.github.com/en/repositories/creating-and-). 

*(Guide to clonning and forking Github repositories: [Github guide](https://github.com/Department-for-overly-fancy-buttons/Lundeborg-Saunagusmanaging-repositories/cloning-a-repository))*

B) Open a command line interface, and navigate to the directory, where the cloned repository lives.

C) Start the app by executing the following command:
```
docker compose -f compose.dev.yaml up -d
```
D) Now navigate into the directory named **frontend**, and then run the command:
```
docker compose up -d
```
*Ensure that both docker containers are build and running with the command docker ps*
E) Access the webfront url **localhost** or access backend endpoints on **localhost:8080/api/...**