---
title: "Génération de Code DDD avec Symfony"
date: "2025-03-16"
tags: ["Symfony", "DDD", "CQRS", "PHP"]
excerpt: "Découvrez comment le bundle `cnd/ddd-maker-bundle` simplifie la génération de code DDD dans vos projets Symfony."
author: "Papa COUNDIA"
link: "https://packagist.org/packages/cnd/ddd-maker-bundle"
---

## Introduction

La conception pilotée par le métier (DDD) et la ségrégation des responsabilités de commande et de requête (CQRS) sont des approches puissantes pour structurer les applications complexes.
Cependant, leur mise en place peut être fastidieuse. C'est là qu'intervient le bundle [cnd/ddd-maker-bundle](https://packagist.org/packages/cnd/ddd-maker-bundle), qui automatise la génération des artefacts DDD dans Symfony.

![ddd_layers.png](assets/ddd_layers.png)
source: [https://www.hibit.dev/posts/15/domain-driven-design-layers](https://www.hibit.dev/posts/15/domain-driven-design-layers)

## Fonctionnalités

Le bundle permet de générer rapidement :

- Des commandes (commande),
- Des requêtes (queries),
- Des entités, agrégats, et objets de valeur etc..

Il s'intègre parfaitement avec Symfony Messenger pour gérer les commandes et requêtes de manière asynchrone(ou sync).

## Installation

Ajoutez le bundle à votre projet Symfony via Composer :

	composer create-project symfony/skeleton:"7.2.x" my_project_directory

    composer require cnd/ddd-maker-bundle --dev


Si vous développez localement, ajoutez un dépôt de chemin dans `composer.json` :

```json
{
    "repositories": [
        {
            "type": "path",
            "url": "../ddd-maker-bundle"
        }
    ],
    "require": {
        "cnd/ddd-maker-bundle": "*"
    }
}
```

Assurez-vous que le bundle est activé dans `config/bundles.php` :

```php
return [
    Cnd\DddMakerBundle\DddMakerBundle::class => ['all' => true],
];
```

## Utilisation

Listez les commandes disponibles avec :

    php bin/console list make

### Génération d'une structure CQRS complète

Pour générer toutes les classes nécessaires pour une entité :

    php bin/console make:ddd-full Wallet

### Génération d'une commande

    php bin/console make:ddd-command Wallet UpdatePhone

Fichiers créés :

*  src/Core/Application/Command/Wallet/UpdatePhone/UpdatePhoneCommand.php
*  src/Core/Application/Command/Wallet/UpdatePhone/UpdatePhoneCommandHandler.php
*  src/Core/Presentation/Controller/Wallet/UpdatePhone/UpdatePhoneController.php
*  tests/Functional/Wallet/UpdatePhone/UpdatePhoneControllerTest.php

### Génération d'une requête

    php bin/console make:ddd-query Wallet find phoneNumber

Fichiers créés :

*  src/Core/Application/Query/Wallet/FindByPhoneNumber/FindByPhoneNumberQuery.php
*  src/Core/Application/Query/Wallet/FindByPhoneNumber/FindByPhoneNumberQueryHandler.php
*  src/Core/Presentation/Controller/Wallet/FindByPhoneNumber/FindByPhoneNumberController.php
*  tests/Functional/Wallet/FindByPhoneNumber/FindByPhoneNumberControllerTest.php

### Génération de values objects

    php bin/console make:ddd-vo Wallet

## Remarques

1. Seuls les champs définis dans le constructeur sont pris en compte.
2. Il est recommandé d'ajouter les getters et setters pour une meilleure compatibilité.

## Conclusion

Le bundle [cnd/ddd-maker-bundle](https://packagist.org/packages/cnd/ddd-maker-bundle) simplifie considérablement l'implémentation de DDD et CQRS dans Symfony. Il permet aux développeurs de se concentrer sur la logique métier sans perdre de temps sur la création de fichiers répétitifs.

Pour en savoir plus, consultez la [documentation](https://packagist.org/packages/cnd/ddd-maker-bundle).

Pour aller plus loin tu peux voir ce starter [https://github.com/coundia/ddd-maker-bundler-starter](https://github.com/coundia/ddd-maker-bundler-starter)
