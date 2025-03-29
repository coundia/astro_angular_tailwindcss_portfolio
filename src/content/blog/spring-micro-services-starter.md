---
title: "Starter Microservices Spring Cloud"
date: "2025-03-28"
tags: ["Spring", "DDD", "CQRS", "AXON", "RABBITMQ", "POSTGRESQL", "WEBFLUX", "R2DBC"]
excerpt: "Découvrez le starter `spring-microservices-starter` simplifie les microservices avec spring."
author: "Papa COUNDIA"
link: "https://github.com/coundia/spring-microservices-starter"
---

# Starter Microservices Spring Cloud

Cet article présente le projet `spring-microservices-starter`, un socle technique destiné à simplifier la mise en place d’architectures microservices réactives et évolutives. Ce starter repose sur l’écosystème **Spring Cloud** et intègre des composants tels que **Eureka**, **Spring Cloud Config**, **Gateway**, **Axon Framework**, **RabbitMQ**, **PostgreSQL**, et **WebFlux** avec **R2DBC** pour assurer une communication non bloquante et entièrement asynchrone.

L’objectif est de fournir un modèle de démarrage robuste pour développer des microservices modulaires, scalables, et facilement maintenables. Il s’adresse aux équipes souhaitant adopter une architecture moderne et réactive en environnement distribué.

Le projet est disponible sur GitHub : [https://github.com/coundia/spring-microservices-starter](https://github.com/coundia/spring-microservices-starter)

## Sommaire
1. [Architecture Globale](#architecture-globale)
2. [Services Principaux](#services-principaux)
3. [Configuration Eureka](#configuration-eureka)
4. [Configuration du Cloud Config Server](#configuration-du-cloud-config-server)
5. [Configuration du Gateway](#configuration-du-gateway)
6. [Axon, RabbitMQ, et PostgreSQL](#axon-rabbitmq-et-postgresql)
7. [Sécuriser les Microservices](#securiser-les-microservices)
8. [Conclusion](#conclusion)

---

## Architecture Globale

L’architecture repose sur les composants suivants :

![architecture_system.png](assets/architecture_system.png)

- **Cloud Config Server (Port 8081)** : Serveur de configuration centralisé chargé de fournir les fichiers de configuration aux microservices.
- **Eureka (Port 8761)** : Registre de services permettant à chaque microservice de découvrir dynamiquement les autres.
- **Gateway (Port 8080)** : Point d’entrée unique permettant le routage, la sécurité, et la tolérance aux pannes.
- **Product-Command (Port 8090)** : Microservice chargé des opérations de création, modification et suppression des produits.
- **Product-Query (Port 8091)** : Microservice dédié à la consultation des données produits.

Les services sont orchestrés via **Docker** ou **Docker Compose** pour faciliter le déploiement et la gestion.

## Architecture DDD

Le projet adopte l’approche **Domain Driven Design (DDD)** afin de mieux structurer le code métier. Il est découpé en couches clairement identifiées :

![ddd_layers.png](assets/ddd_layers.png)

source: https://www.hibit.dev/posts/15/domain-driven-design-layers

- **Domain Layer** : Contient les entités, agrégats, événements, commandes, objets valeurs et services métier.
- **Application Layer** : Coordonne les opérations métier via des gestionnaires de commandes, d’événements et de requêtes.
- **Infrastructure Layer** : Implémente les interfaces techniques (base de données, messaging, configuration).
- **Presentation Layer** : Fournit les API REST pour l’exposition externe.

## Services Principaux

### Cloud Config Server
Centralise la configuration des microservices à partir d’un dépôt Git local ou distant. Cela permet une uniformisation et une gestion centralisée de la configuration.

### Eureka
Chaque microservice s’enregistre auprès d’Eureka et peut découvrir les autres services par leur nom, sans dépendance à une adresse IP ou un port statique.

### Gateway
Fait office de passerelle unique pour toutes les requêtes entrantes. Il intègre des mécanismes de résilience avec **Resilience4j**.

### Product-Command
Responsable des opérations de modification des produits. Il utilise **Axon** pour la gestion des commandes et des événements, et **RabbitMQ** pour la communication inter-services.

### Product-Query
Expose les données en lecture via des projections. Repose sur **R2DBC** pour l’accès non bloquant à la base PostgreSQL.

## Configuration Eureka

Extrait du fichier `application.properties` pour Eureka :

```properties
spring.application.name=eureka
server.port=8761
eureka.client.register-with-eureka=false
eureka.client.fetch-registry=false
management.endpoints.web.exposure.include=health,info
```

Accessible via : `http://localhost:8761/`

## Configuration du Cloud Config Server

Exemple de configuration minimale :

```properties
spring.application.name=cloud-config-server
server.port=8081
spring.cloud.config.server.git.uri=/MON-PATH/config-repo
```

Les fichiers de configuration centralisés (ex: `gateway-server.properties`, `product-command.properties`) sont placés dans ce dépôt.

## Configuration du Gateway

Configuration typique du Gateway avec découverte de service :

```properties
spring.application.name=gateway-server
server.port=8080
eureka.client.serviceUrl.defaultZone=http://192.168.1.23:8761/eureka/

spring.cloud.gateway.discovery.locator.enabled=true
spring.cloud.gateway.discovery.locator.lower-case-service-id=true

spring.cloud.gateway.routes[0].id=product-command-route
spring.cloud.gateway.routes[0].uri=lb://PRODUCT-COMMAND
spring.cloud.gateway.routes[0].predicates[0]=Path=/api/v1/commands/products/**
```

## Axon, RabbitMQ et PostgreSQL

- **Axon** : Implémente les patterns **CQRS** et **Event Sourcing**.
- **RabbitMQ** : Facilite la communication asynchrone entre les services.
- **PostgreSQL** : Utilisé à la fois pour le stockage traditionnel et comme **event store** avec Axon.

### Exemple de test réactif

```java
@Test
void it_should_create_aggregate_reactively() {
    Mono<String> result = Mono.fromFuture(
        commandGateway.send(new CreateProductCommand("productId", "productName"))
    );
    StepVerifier.create(result)
                .expectNext("productId")
                .verifyComplete();
}
```

## Sécuriser les Microservices

Pour garantir que seuls les appels issus du Gateway accèdent aux microservices, un header spécifique (`X-Gateway-Auth`) peut être ajouté via un **Route Filter** :

```properties
spring.cloud.gateway.routes[0].filters[0]=AddRequestHeader=X-Gateway-Auth,true
```

Puis vérifié dans les services internes :

```java
.http.authorizeExchange(exchanges -> exchanges
        .pathMatchers("/**").access(gatewayAuthManager)
        .anyExchange().permitAll()
)
```

## Conclusion

Le projet `spring-microservices-starter` constitue une base solide pour développer des systèmes microservices modernes, réactifs et résilients. Grâce à une architecture modulaire, à l’intégration de composants éprouvés, et à l’adoption de principes comme le DDD et le CQRS, il permet d’industrialiser rapidement le développement de services métiers robustes. Il peut être utilisé tel quel ou adapté aux besoins spécifiques d’une organisation.

