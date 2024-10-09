# Node.js Application with Docker

This project demonstrates how to run a Node.js application inside a Docker container using the `node:21.2.0-alpine` image.

## Prerequisites

- [Docker](https://www.docker.com/get-started) installed on your machine.

## Getting Started

### 1. Running with Docker

To run the application inside a Docker container, follow these steps:

#### Build the Docker Image

First, build the Docker image for your Node.js app using the `Dockerfile` in this repository. The image will be named `getting-started`.

```bash
- docker build -t getting-started .
- docker run -dp 127.0.0.1:3002:3002 getting-started
