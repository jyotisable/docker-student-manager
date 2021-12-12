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
        -e MONGODB_CONNECTION_STRING: <connection-string> \
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
      MONGODB_CONNECTION_STRING: <connection-string>
    ports:
      - 3000:3000
```

## Environment Variables

To interact with MongoDB Database:

```
MONGODB_CONNECTION_STRING: <connection-string>
```