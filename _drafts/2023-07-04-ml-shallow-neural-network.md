---
layout: post
title: "Redes poco profundas"
description: "Se introducirán las redes neuronales poco profundas."
date: 2023-07-04
feature_image: images/blogs/ml/c3-ml-snn.jpeg
tags: [computo, aprendizaje profundo]
---

Un acercamiento inicial a los modelos de aprendizaje profundo puede ser el desarrollo de redes neuronales poco profundas, que describen funciones lineales por partes y son lo suficientemente capaces de aproximar releciones complejas arbrutarias entre entradas y salidas multidimensionales.

<!--more-->

Las redes neuronales poco profundas son funciones de la forma $$y = f[x, \phi]$$, con parámetros $$\phi$$ que mapean variables de entrada multivariables $$x$$ a salidas multivariable $$y$$.

Para lograr una intuición de cómo funcionan las redes neuronales, vamos a introducir el siguiente sistema de ecuaciones

$$
h_1 = a[\theta_{10} + \theta_{11}x]\\
h_2 = a[\theta_{20} + \theta_{21}x]\\
h_3 = a[\theta_{30} + \theta_{31}x]
$$

y nos referiremos a estas funciones como unidades ocultas. Para calcular la salida de una red neuronal vamos a combinar estas unidades ocultas como una función lineal

$$
\hspace{4cm}y = \phi_{0} + \phi_1h_1 + \phi_2h_2 + \phi_3h_3 \hspace{5cm} (4)
$$

Note que las unidades ocultas estan formadas por lineas de la forma $$\theta + \theta x$$ y esta línea es modificada usando la función de activación $$a[\cdot]$$. En la función lineal estas lineas son evaluadas con un peso $$\phi$$ y un offset que controla la altura final de la función final.

### Eveluación inicial
1. ¿Qué tipo de mapeo debe ser creado si la función de activación de la ecuación 4


## Referencias
Prince, S. J. (2023). UNDERSTANDING DEEP LEARNING. MIT PRESS.
