# Fastify Multi Service

Skeleton project to illustrate running multiple services within the same container.

## Getting started

Make a copy of `.env.example`, and name it `.env`.

### Create docker network

Check whether you have the `nginx-proxy` network.

    docker network ls

If not found, create the `nginx-proxy` network.

    docker network create nginx-proxy

### Start the container

Start the container

    docker compose up -d

You can then access the application through the following URL:

    http://localhost:3001
    http://localhost:3002
