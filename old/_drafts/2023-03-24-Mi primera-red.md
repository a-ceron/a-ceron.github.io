---
layout: post
title: "Redes neuronales"
description: "Resumen de una red neuronal"
date: 2023-03-25
feature_image: images/blogs/misc/p1-qro-trash.jpeg
tags: [ia, aprendizaje]
---

# Redes neuronales
La inteligencia artificial en moda por muchos de los modelos que diferentes empresas han presentado para mejorar la calidad de los servicios tiene como base en su desarrollo conceptos biológicos como el de la neurona. A groso modo, la inteligencia artificial no es más que una rama de aprendizaje de máquina que, para su desarrollo, hace uso de redes neuronales.

<!--more-->

## Neurona
De forma simple, una neurona es un objeto que permite, o no, transimitir un estímulo eléctrico. A la unión entre neuronas se le denomína sinapsis y son estas sinapsis las que nos permiten desarrollar actividades complejas. 

Siguiendo esta idea, a diferentes cientificos iniciaron a implementar modelos que replican la sinapsis neuronal para realizar actividades complejas. En sus primeros ejercicios, al usar una sola neurona se tuvieron buenos resultados en problemas lineales, pero para problemas más complejos no hubo el mismo resultado. 

$$
neurona(X) = f(\Sigma w_i x_i + bias)
$$

El resultado de arriba es la expresión más simple de una neurona, si se muestra atención se pueden identificar tres elementos, $w_i$ que van a ser valores que vamos a manipular hasta encontrar los adecuados a nuestro problema, $x_i$ que son los emenetos de entrada del problema y $bias$ el cual es un parámetro de inicio que también puede ser modificado. 