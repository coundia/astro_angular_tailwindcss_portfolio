---
title: "Axon Web Code Generator : Générateur CQRS + DDD avec Spring Boot"
date: "2025-04-15"
tags: ["Spring Boot", "Axon", "RabbitMQ", "PostgreSQL", "CQRS", "DDD", "Code Generator"]
excerpt: "Axon Web Code Generator automatise la génération de projets backend en CQRS + DDD avec Spring Boot, Axon et RabbitMQ. Un outil puissant pour industrialiser le développement orienté domaine."
author: "Papa COUNDIA"
link: "https://github.com/coundia/axon-web-cqrs-generator"
---

# Génération automatique de code CQRS + DDD avec Spring Boot et Axon

## 🧭 Introduction

Le développement d'applications métier structurées repose de plus en plus sur des architectures robustes,
telles que **CQRS (Command Query Responsibility Segregation)** et **DDD (Domain-Driven Design)**. 
Toutefois, la mise en œuvre manuelle de ces patterns entraîne une répétition fastidieuse de code,
souvent sujette à des erreurs.

**Axon Web Code Generator** a été conçu pour automatiser cette tâche.
Il permet de générer une application backend complète à partir de simples définitions d'entités, 
en suivant les principes du **CQRS** et du **DDD**, avec une stack moderne basée sur **Spring Boot**,
**Axon Framework**, **RabbitMQ**, **JPA** et **PostgreSQL**.

## 🎯 Objectif du projet

L'objectif est de :

- **Industrialiser** la production de code backend structuré
- **Réduire le temps de développement** et les erreurs humaines
- **Encourager les bonnes pratiques** d'architecture orientée domaine
- **Offrir un point de départ cohérent** pour tout nouveau projet  

## ⚙️ Technologies utilisées

Ce générateur repose sur :

- **Spring Boot** pour la structure de base
- **Spring Data JPA** pour la persistance relationnelle
- **Axon Framework** pour la gestion des commandes, requêtes et événements
- **RabbitMQ** pour l'asynchrone et la découpe des responsabilités
- **PostgreSQL** comme base de données
- **Mustache** pour la génération des fichiers
- **Swagger/OpenAPI** pour la documentation automatique des endpoints
- **Java 17+** comme langage de programmation

## 🧠 Architecture générée

La structure du projet respecte une architecture hexagonale :

```bash
domain/           # Agrégats, ValueObjects, Events
application/      # DTOs, CommandHandlers, QueryHandlers
infrastructure/   # Repositories JPA, RabbitMQ Producers
presentation/     # Contrôleurs REST
resources/templates/        # Templates Mustache pour la génération
shared/           # Services utilitaires communs
```

## 🚀 Mise en route

Démarrage du projet en local :

```bash
./mvnw spring-boot:run
```

## 🧪 Comment ça fonctionne ?

La génération se fait via un appel HTTP `POST` en fournissant un chemin de sortie et la définition d’une entité. Voici deux exemples :

### Génération de l’entité `Product`

```http
POST http://127.0.0.1:8071/api/v1/generator/all
Accept: application/x-ndjson
Content-Type: application/json

{
  "outputDir": "/chemin/vers/products",
  "definition": {
    "name": "Product",
    "table": "products",
    "fields": [
      { "name": "id", "type": "String" },
      { "name": "name", "type": "String" },
      { "name": "price", "type": "Double" },
      { "name": "sales", "type": "List<com.example.Sale>", "relation":"oneToMany" }
    ]
  }
}
```

### Génération de l’entité `Sale`

```http
POST http://127.0.0.1:8071/api/v1/generator/all
Accept: application/x-ndjson
Content-Type: application/json

{
  "outputDir": "/chemin/vers/sales",
  "definition": {
    "name": "Sale",
    "table": "sales",
    "fields": [
      { "name": "id", "type": "String" },
      { "name": "quantity", "type": "Integer" },
      { "name": "total_price", "type": "Double" },
      { "name": "facture", "type": "String" },
      { "name": "Product", "type": "com.example.Product", "relation":"manyToOne" }
    ]
  }
}
```

## 📂 Structure du  projet généré:
```bash
domain/           # Agrégats, ValueObjects, Events
application/      # DTOs, CommandHandlers, QueryHandlers
infrastructure/   # Repositories JPA, RabbitMQ Producers
presentation/     # Contrôleurs REST
shared/           # Services utilitaires communs
```

Les classes générées incluent :

- Commandes (Create, Update, Delete)
- Événements (Created, Updated, Deleted)
- Agrégats
- QueryHandlers & CommandHandlers
- Projections (avec JPA)
- Entités persistantes
- DTOs & REST Controllers


## 🧩 Domaines d’application

Cet outil s’applique dans de nombreux contextes métier :

- Systèmes de gestion commerciale (ERP, stock, facturation)
- Plateformes e-commerce
- Applications SaaS B2B
- Systèmes de réservation
- Outils internes d’entreprise
- Projets open-source structurés

## 🔗 Dépôt GitHub

Le code source complet est accessible ici :

https://github.com/coundia/axon-web-cqrs-generator

Un exemple de code généré est disponible dans le dépôt suivant :

👉 [https://github.com/coundia/spring-axon-rabbitmq-web-jpa-starter](https://github.com/coundia/spring-axon-rabbitmq-web-jpa-starter)

## ✅ Conclusion

**Axon Web Code Generator** répond au besoin crucial d’industrialisation du développement backend moderne. En générant automatiquement des composants respectant les principes **CQRS** et **DDD**, il permet de se concentrer sur la logique métier tout en s’appuyant sur une architecture solide et maintenable.

Cet outil s’adresse aux architectes, développeurs et équipes cherchant à standardiser et accélérer leurs développements tout en respectant les bonnes pratiques logicielles.
 
Ce projet est en constante évolution.

---
