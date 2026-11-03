---
layout: post
title: "Docker"
description: "Primeros pasos"
date: 2024-02-16
feature_image: images/blogs/misc/f1-docker.main.jpeg
tags: [ia, aprendizaje]
---

# Docker
Docker es un servicio que te permite crear y administrar contenedores a partir de una imágen que contiene los pasos para instalar todos los elementos necesarios para que tu aplicación se ejecute.

<!--more-->

## Introducción
Docker es un servicio que se ofrece como software de acceso libre, aunque con opción a comprar otros servicios, para crear y administrar contenedores a partir de una imágen. La primera vez que use docker fue una experiencia agridulce, pues no tenía idea de qué hace o cómo se maneja. Por eso este tutoria tratará de darte un sólido panorama para que entiendas docker y en artículos posteriores iremos desarrollando una aplicación contenida en un docker.

Es importante decir que estos artículos, aunque escritos para gente con poco o nula experiencia, no abordara por los pasos iniciales. Es decir a este punto ya debes tener instalado docker en tu equipo y haber validado que el CLI este ejecutandose. 

### Conceptos
Considero que es importante aterrizar qué hace docker antes de presentar los comandos y demás elementos. Actualmente estoy desarrollando un servicio web, por lo que los ejemplos con los que trabajaré serán enfocadas a projectos web con Django y React. 

![diagramaApp](images/blogs/docker/diagrama.png)

El diagrama de arriba fue tomado de la página de docker, sin embargo vamos a alter un poco la infraestructura presentada.

En el diagrama podemos reconocer varias cosas que iremos abordando paso a paso. Para esta inicio refiramonos a la parte que contiene al back-end y al front-end. Estos servicios pueden ser desarrollados en cualquier lenguaje de programación orientado a cualquier actividad. Iniciemos con la aplicación back-end. Para ello haremos una aplicación con Django.

```python
Montar el codigo
```

Ahora que hemos visto que la página funciona, vamos a crear el contenedor, para ello hay que preguntarnos varias cosas ¿qué elementos utilice para desplegar mi aplicación? ¿Utilizo secretos? ¿Tengo archivos pesados?, etc. Al ir respondiendo preguntas como esas podemos ir definiendo nuestro contenedor. 

### Imagen
Una [imagen](https://docs.docker.com/engine/reference/builder/) es una plantilla que agrupo todas las instrucciones para crear el contenedor. El **Dockerfile** es un documento de texto que puede crear contenedores de forma automàtica a partir de la ejecución de las instrucciones que contiene. En la documentación de docker uno puede explorar todas las instrucciones validas para utilizar en el contenedor.

En este ejemplo vamos a crear una versión simple y después le iremos agregando elementos hasta tenerla en la forma ideal, para ello iniciaremos creando un Dockerfile.dev, cuyo objetivo será ejecutar la aplicación con todos los elementos necesarios para que la aplicación se ejecute, sin considerar otros factores. Será de utilidad cuando el equipo de desarrollo desee implementar nuevas soluciones o simplemente trabajar en tareas de desarrollo. 

> Nota: Es importante que los archivos se llamen Dockerfile, también es importante que generes otros archivos como .gitignore y .dockerignore
```dockerfile
FROM python:3.10-buster

# Env vars
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

WORKDIR /app

COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install -r requirements.txt


COPY . .
EXPOSE 8000

ENTRYPOINT [ "/app/run.sh" ]
```
Ahora, es intimidante a primera vista, si usted no tiene conocimientos en archivos con formato estructurado. Respira y mira de nuevo la configuración, a segunda vista uno puede ver que no es tan compleja la sintaxis y que no son o sean elementos que uno no haya trabajado antes, si se enfoca en esta área. Primero, note que al inicio hay algunos comandos en mayusculas. Estas son palabras reservadas que pueden ser usados en los archivos Dockerfile. Se leen de arriba hacia abajo en orden secuencial. 

Detalle de cada instrucción:
- FROM: Permite crear un contenedor desde una imagen previa. En nuestro caso estamos creando un contenedor que tenga python3.10.
- ENV: Permite establecer variables de entorno para nuestro contenedor. Las variables que hemos agregado se usan para evitar el almacenamiento de archivos con terminacion .pyc y otros archivos de salida. 
- WORKDIR: Será la ruta que tu contenedor use como base. Actualmente te encuntras en una ruta absoluta en tu computadora, por ejemplo en /home/user/django, pues bien, esta es tu ruta de trabajo y puedes llamar fácilmente a todo lo que se encuentre dentro de esta ruta. Así tu contenedor estará situado en /app y esa sera su ruta de trabajo.
- COPY: Permite copiar archivos de la ruta actual hacia cualquier lugar de tu contenedor. Considera que docker se basa en linux, por lo que muchas de las ubicaciones que usa linux para sus aplicaciones y demás variables, también estarán disponibles en tu contenedor. en nustro caso unicamente estamos copiando configuraciones. 
- RUN: Permite ejecutar comandos en el docker. Como se dijo, docker crea una pequeña computadora con linux por lo que puede colocar los mismos comandos que usa en linux para ejecutar comando. En nuestro ejemplo estamos instalando los reuiremnts.txt de nuestra app.
- EXPOSE: Permite a docker la comunicación con un puerto de su host y el contenedor.
- ENTRYPOINT: Permite configurar un archivo que debe ser ejecutado por default por docker. 

Ahora, espero, que sea más fácil leer el archivo. De arriba a abajo, le decimos a docker que construya un contenedor que ejecute docker, que no almacene variables en la ejecución. Después acceda a la carpeta app y ahí copie e instale los requerimentos. Abra el puerto 8000 y ejecute un sh. 
