# MultiHangManWeb
## Andrés Felipe Cubillos Hurtado

## Heroku:🎮
https://hangmanarsw2021i.herokuapp.com/
## CircleCi:
https://app.circleci.com/pipelines/github/andrewcubillos

### Resumen
El objetivo de este proyecto es brindar al usuario, una opción multijugador del famoso juego "Ahorcado", en donde pueda interactuar y competir con diferentes usuarios, ganando puntos y rankeando.

### Descripción

En la actualidad existen un gran número de juegos de este tipo tanto online, como móvil, pero todos cumplen con una misma estructura, una palabra, un solo ahorcado. Este proyecto, propone una versión un poco diferente, en donde haya una o varias personas, adivinando una o varias palabras al mismo tiempo, ganando puntos y rankeando

![alt text](https://raw.githubusercontent.com/andrewcubillos/ARSW-2021-i-Project-MultiHangManWeb/master/img/MULTIHANGMAN3.png)

![alt text](https://raw.githubusercontent.com/andrewcubillos/ARSW-2021-i-Project-MultiHangManWeb/master/img/MULTIHANGMAN4.png)

![alt text](https://raw.githubusercontent.com/andrewcubillos/ARSW-2021-i-Project-MultiHangManWeb/master/img/MULTIHANGMAN.png)

![alt text](https://raw.githubusercontent.com/andrewcubillos/ARSW-2021-i-Project-MultiHangManWeb/master/img/MULTIHANGMAN2.png)

![alt text](https://raw.githubusercontent.com/andrewcubillos/ARSW-2021-i-Project-MultiHangManWeb/master/img/MULTIHANGMAN6.png)

### Funcionamiento
El juego cuenta con el mismo funcionamiento del ahorcado clásico, se tiene una palabra a adivinar y alguien quien la adivine, en este caso varios jugadores competirán por quien la adivina primero, sin morir en el intento, puede darse el caso de que el modo sea o una palabra y muchos jugadores, o varias palabras y varios jugadores. 
Los jugadores compiten en tiempo real vía web, tienen un tema y unas pistas, cada pista usada le sumará un miembro al hombre ahorcado de quien la use. Cuando alguien adivina una letra, dependiendo de las apariciones de esa letra, sumará un número de puntos, pero si por el contrario en su turno el jugador erró, su hombre se irá ahorcando; quien agoté sus oportunidades y ahorque al pobre hombre será eliminado del juego. Gana el jugador con mayor puntaje, luego de aparecer la palabra completa.

### Historias de usuario
#### 1.Registro
**Como** Usuario 
**Quiero** Registrarme
**Para Poder** Ingresar al juego y entrar al Ranking
##### Criterios de aceptación
* El usuario debe tener un nombre para poder ingresar y entrar en el ranking
* El usuario puede entrar sin nombre pero no podrá entrar en el ranking

#### 2.Estadísticas
**Como** Usuario 
**Quiero** Ver las estadísticas
**Para Poder** Saber en que posición me encuentro
##### Criterios de aceptación
* Las estadísticas deben actualizarse en tiempo real

#### 3.Crear una sala
**Como** Usuario 
**Quiero** Crear una sala
**Para Poder** Jugar con amigos u otras personas
##### Criterios de aceptación
* La sala debe tener un nombre único
* La sala debe estar configurada en cuanto al máximo de personas, tiempo y tema, antes de la creación

#### 4.Ingresar una sala
**Como** Usuario 
**Quiero** Ingresar una sala
**Para Poder** Jugar con amigos u otras personas
##### Criterios de aceptación
* La sala no debe de estar llena
* El juego no debe haber empezado

#### 5.Puntaje
**Como** Usuario 
**Quiero** ganar puntaje
**Para Poder** poder ganar el juego y subir en el ranking
##### Criterios de aceptación
* El puntaje debe ir aumentando en tiempo real


