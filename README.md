1. [Link to the task.](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/containerization-database-orm/assignment.md)
2. Done 10.06.2025 / Deadline 10.06.2025
3. [Cross-Check:Review](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/containerization-database-orm/score.md).
4. [My Solutions Link](https://github.com/asadbekiv/nodejs2025Q2-service)
5. Self-assessment score: `300/360`

> Please use ! `feature/docker-database` branch for cross-checking
After switching to `feature/docker-database` branch create .env file  or remove `.example`  part in the `.env.example` file.Set following values in .env

```
PORT=4000
DATABASE_HOST='localhost'
PORT_POSTGRES=5432
DATABASE_USERNAME='postgres'
DATABASE_PASSWORD='test1234'
DATABASE_NAME='nodejs2025q2_service'
```

if you face problem,conduct me via [Discord](https://discord.com/users/123456789012345678) or Comment section while checking my solutions.


### **Check**
For check simplification you have pre-implemented npm-scripts in package.json.

---

### Test scripts

```bash
# install node_modules and npm packages
$ npm install

# run application development mode
$ npm run start:dev

# run all test cases(67 tests)
$ npm run test

# build docker containers(create)
$ docker compose up --build

# shut down docker containers
$ docker compose down
```

1) Containerization, Docker
- [x] +20 Readme.md has instruction how to run application
- [x] +30 user-defined bridge is created and configured
- [x] +30 container auto restart after crash
- [x] +20 application is restarting upon changes implemented into src folder
- [x] +30 database files and logs to be stored in volumes instead of container
2) Database (PostgreSQL) & ORM
- [x] +20 Users data is stored in PostgreSQL database and typeorm / prisma interacts with the database to manipulate data.
- [x] +20 Artists data is stored in PostgreSQL database and typeorm / prisma interacts with the database to manipulate data.
- [x] +20 Albums data is stored in PostgreSQL database and typeorm / prisma interacts with the database to manipulate data.
- [x] +20 Tracks data is stored in PostgreSQL database and typeorm / prisma interacts with the database to manipulate data.
- [x] +20 Favorites data is stored in PostgreSQL database and typeorm / prisma interacts with the database to manipulate data
Advanced Scope
1) Containerization, Docker
- [X] +20 Final size of the Docker image with application is less than 500 MB
- [ ] +10 Implemented npm script for vulnerabilities scanning (free solution)
- [x] +20 Your built image is pushed to DockerHub
2) Database & ORM
- [ ] +30 Migrations are used to create database entities
- [x] +10 Variables used for connection to database to be stored in .env
- [x] +10 typeorm [decorators](https://typeorm.io/#/relations) or prisma relations create relations between entities
- [x] +30 Local PostgreSQL installation is not required for task check, connection is implemented to database stored in docker container (on the basis of the previous task)

---
#### Only 2 tests arern't passed.I will be happy If you share your solutions for not passed 2 tests.
#### You can access OpenAPi documenation via `http://localhost:4000/api`
![Screenshot from 2025-06-09 09-14-01](https://github.com/user-attachments/assets/65128610-0334-4379-997a-5ed95cd818be)

##### Docker image upload to Docker Hub
![Screenshot from 2025-06-10 02-54-26](https://github.com/user-attachments/assets/1bab3dc6-1ff7-4160-b544-0985d30bb074)



