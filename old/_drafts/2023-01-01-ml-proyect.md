---
layout: post
title: "Localización de objetos usando redes profundas"
description: "Se comenta y presenta un algoritmo de detección de objetos usando Tensorflow."
date: 2023-01-01
feature_image: images/blogs/ml/p2-ml-tucan.png
tags: [computo, aprendizaje profundo]
---

Yo no soy un experto en aprendizaje profundo, por lo que este modelo no será el mejor ni el más poderoso pero será un modelo construido paso a paso con el fin de entender el funcionamiento de este tipo de aplicación.

<!--more-->

Habra ciertas cosas que detras tienen una propia complejidad a la cual no voy a ahondar en este artículo, con el tiempo haré más publicaciones que permitan desmenuzar cada parte de la publicación de forma más profunda.

- Problema de regresión -> por lo que usaremos el error cuadrado medio y un optimizador adam
- Usualmente en deeplearnifn nos gusta normalizar las entradas y las salidads. No hace mucho sentido hacer una normalización gausiana
- Normalizaremos las coordendas

El plan será
1. generar cajas
2. Identificar las cajas
3. Localizar si en la caja hay algo
4. Localizar, si hay algo en la caja, si hay diferentes objetos en la caja
5. Localizar, si hay algo en la caja, si hay objetos empalmados
> Note que en ciencias de la computación siempre es usual que la coordenada vertical venga primero. Como cuasimatemático a mi siempre me frusto heste hecho.
> Note que usar sigmoide es cuando estamos clasificando
