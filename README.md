1. [Link to the task.](https://github.com/AlreadyBored/nodejs-assignments/tree/main/assignments/logging-error-authentication-authorization)
2. Done 17.06.2025 / Deadline 17.06.2025
3. [Cross-Check: Review](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/logging-error-authentication-authorization/score.md).
4. [My Solutions Link](https://github.com/asadbekiv/nodejs2025Q2-service)
5. Self-assessment score: `340/340`

> Please use the! `feature/auth-error-logging` branch for cross-checking
After switching to `feature/auth-error-logging` branch, create .env file or remove the `.example`  part in the `.env.example` file. Setthe  following values in .env

```
PORT=4000

DATABASE_HOST='localhost'
PORT_POSTGRES=5432
DATABASE_USERNAME='postgres'
DATABASE_PASSWORD='test1234'
DATABASE_NAME='test'

CRYPT_SALT=10
JWT_SECRET_KEY=secret123123
JWT_SECRET_REFRESH_KEY=secret123123
TOKEN_EXPIRE_TIME=1h
TOKEN_REFRESH_EXPIRE_TIME=24h

LOG_LEVEL=3    
LOG_MAX_SIZE_KB=20


```

if you face problem,conduct me via [Discord](https://discord.com/users/123456789012345678) or Comment section while checking my solutions.


### **Check**
For check simplification, you have pre-implemented npm-scripts in package.json.

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
$ docker compose down -d
```

All tests passed successfully
![Screenshot from 2025-06-15 06-46-19](https://github.com/user-attachments/assets/d9beb87d-e33a-4de3-af2f-1d1d3f4e2e80)

Logger service implemented with logs and errors  respectively
![Screenshot from 2025-06-15 23-16-11](https://github.com/user-attachments/assets/4402941a-4c90-4db0-8789-d43eab0a6c93)
