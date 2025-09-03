import dddLogo from "../assets/ddd_maker.png";
import apiLogo from "../assets/api_topall_money.png";
import flutterLogo from "../assets/topall_flutter.png";
import portfolioLogo from "../assets/pcoundia.com.png";
import megaLogo from "../assets/megastore.png";
import dddLayers from "../assets/ddd_layers.png";

export const Projects = [
	{
		title: "DDD Maker Bundle (Symfony)",
		logo: dddLogo,
		description: "Un bundle Symfony open-source pour générer du code DDD (Domain-Driven Design) avec le modèle CQRS.",
		resume: "Automatisation de la génération de code DDD en Symfony disponible sur https://packagist.org/packages/cnd/ddd-maker-bundle. ",
		link: "https://packagist.org/packages/cnd/ddd-maker-bundle",
	},
	{
		title: "Top all money (Laravel)",
		logo: apiLogo,
		description: "Plateforme de gestion financière développée Disponible sur https://github.com/coundia/top-all-money-laravel et déployé sur  https://topall.megastore.sn/api/documentation.",
		resume: "Stack: Laravel 12, filament 4, l5-swagger, sanctum, laravel-permission et microservices pour les clients mobiles et SPA. https://github.com/coundia/top-all-money-laravel",
		link: "https://github.com/coundia/top-all-money-laravel",
	},
	{
		title: "Top all money (Flutter)",
		logo: flutterLogo,
		description: "Plateforme de gestion financière développée, fonctionnant en mode local first avec synchronisation vers un backend.",
		resume: "Stack: Flutter, local first, DDD, Sqlite Disponible https://github.com/coundia/money_pulse",
		link: "https://github.com/coundia/money_pulse",
	},
	{
		title: "Portfolio (Angular)",
		logo: portfolioLogo,
		description: "Portfolio personnel développé avec Angular, Tailwind CSS et ASTRO intégrant une présentation des projets, des compétences et un blog technique. Déployé automatiquement via GitHub Actions sur un serveur VPS avec Nginx disponible sur https://github.com/coundia/astro_angular_tailwindcss_portfolio et déployé sur https://pcoundia.com .",
		resume: "Plateforme pour mettre en avant les compétences, projets et expériences.",
		link: "https://pcoundia.com",
	},
	{
		title: "Co-funder Megastore SN (Laravel)",
		logo: megaLogo,
		description: "Plateforme e-commerce proposant une large gamme de produits avec une boutique physique au Sénégal.",
		resume: "E-commerce (Stack: Laravel) et magasin physique au Sénégal. Déployé sur https://shop.megastore.sn/store/shop",
		link: "https://shop.megastore.sn/store/shop",
	},
	{
		title: "Générateur code DDD  (Spring Boot non réactif)",
		logo: dddLayers,
		description: "Axon Web Code Generator automatise la génération de projets backend en CQRS + DDD avec Spring Boot, Axon et RabbitMQ. Un outil puissant pour industrialiser le développement orienté domaine. Ce projet est en constante évolution. Pour plus de détails voir l'article: https://www.pcoundia.com/blog/jpa-axon-web-cqrs-generator",
		resume: "Automatisation de la génération de code DDD en Spring.",
		link: "https://github.com/coundia/axon-web-cqrs-generator",
	},
	{
		title: "Générateur code DDD  (Spring Boot REACTIF)",
		logo: dddLayers,
		description: "Axon WebFlux Code Generator automatise la génération de projets backend en CQRS + DDD avec Spring Boot, Axon et RabbitMQ 100% réactifs. Un outil puissant pour industrialiser le développement orienté domaine. Ce projet est en constante évolution.",
		resume: "Automatisation de la génération de code DDD en Spring.",
		link: "https://github.com/coundia/axon-webflux-cqrs-generator",
	}
];
