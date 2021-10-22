# Student-Manager

Student-Manager is a node JS application that performs simple CRUD operations on students data.

## How to use this Image?

1. Pull this image (latest): 

    `docker pull shoaib1999/student-manager`

2. Run the image:
    ```
$ docker run --network <your-network> -d \
    --name <container-name> \
    -p <host-port>:3000 \
        -e DB_USERNAME: <db-username> \
        -e DB_PASSWORD: <db-password> \
        -e DB_HOSTNAME: <db-hostname> \
        -e DB_PORT: <db-port> \
    student-manager:tag
           
    ```

## Using docker stack deploy or docker-compose

```
version: "3.9"
services:
  student-manager:
    image: student-manager
    restart: always
    environment:
      DB_USERNAME: <db-username>
      DB_PASSWORD: <db-password>
      DB_HOSTNAME: <db-hostname>
      DB_PORT: <db-port>
    ports:
      - 3000:3000
```

## Environment Variables

To interact with MongoDB Database:

```
DB_USERNAME: <db-username>
DB_PASSWORD: <db-password>
DB_HOSTNAME: <db-hostname>
DB_PORT: <db-port>
```