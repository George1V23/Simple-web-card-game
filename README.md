# Deployment of a simple web application

I created a simple web card game with HTML, CSS and JavaScript. For this web game, I build an image and made a containerized application by using Docker. Using Kubernetes I made deployment of the image of my containerized application on Minikube cluster.

## [App](/App/README.md)

My simple web card game, dependencies are in the [`/App`](/App/) folder.

## [Docker](/Docker/README.md)

Dockerfile for container image of my web app to run on Apache httpd web server is in the [`/Docker`](/Docker) folder.

## [K8s](/K8s/README.md)

In [`/K8s`](/K8s/) file are Kubernetes `Deployment` and `Service` YAML manifests.