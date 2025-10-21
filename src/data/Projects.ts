import dddLogo from "../assets/ddd_maker.png";
import apiLogo from "../assets/api_topall_money.png";
import flutterLogo from "../assets/topall_flutter.png";
import portfolioLogo from "../assets/pcoundia.com.png";
import megaLogo from "../assets/megastore.png";
import dddLayers from "../assets/ddd_layers.png";
import ddd2 from "../assets/ddd2.png";
import ddd1 from "../assets/ddd1.png";

export const Projects = [
	{
		title: "Jaayko",
		logo: flutterLogo,
		description: "Une app multi-plateforme (Desktop, Android, IOS) qui connecte vendeurs et acheteurs sans intermédiaire." +
			" Publiez, discutez, vendez ou achetez — le tout en quelques secondes grace à l'IA. (octobre 2025)",
		resume: "Front-end: Flutter (SQLite • DDD • sync différée • IA intégrée • local first) |  Backend: Spring Boot",
		link: "https://www.pcoundia.com/app/jaayko",
	},
	{
		title: "DDD Maker Bundle (Symfony)",
		logo: dddLogo,
		description: "Bundle Symfony open-source pour générer rapidement des couches DDD (aggregates, value objects, use cases) suivant CQRS. Accélère le kick-off et impose une architecture cohérente.",
		resume: "Générateur DDD pour Symfony (CQRS, scaffolding, conventions).",
		link: "https://packagist.org/packages/cnd/ddd-maker-bundle",
	},
	{
		title: "Top all money (Laravel)",
		logo: apiLogo,
		description: "Plateforme de gestion financière modulaire : API REST sécurisée, back-office Filament, OpenAPI, rôles/permissions, pensée pour mobiles et SPA et CI/CD GitHub Actions vers un VPS Nginx.",
		resume: "Stack : Laravel 12 • Filament 4 • L5-Swagger • Sanctum • laravel-permission • micro-services.",
		link: "https://github.com/coundia/top-all-money-laravel",
	},

	{
		title: "Portfolio (Angular)",
		logo: portfolioLogo,
		description: "Portfolio construit avec Angular, Tailwind et Astro : pages rapides, animations légères, blog technique et CI/CD GitHub Actions vers un VPS Nginx.",
		resume: "Vitrine + blog, SSG via Astro, design responsive.",
		link: "https://pcoundia.com",
	},
	{
		title: "Co-fondateur Megastore SN (Laravel)",
		logo: megaLogo,
		description: "Plateforme e-commerce reliée à une boutique physique au Sénégal : catalogue, panier, paiements et gestion des stocks.",
		resume: "E-commerce full Laravel en production.",
		link: "https://shop.megastore.sn/store/shop",
	},
	{
		title: "Générateur code DDD (Spring Boot MVC)",
		logo: ddd2,
		description: "Générateur Web pour projets CQRS + DDD sur Spring Boot avec Axon et RabbitMQ : domaines, commandes/événements, services et endpoints. Évolution continue.",
		resume: "Industrialisation DDD côté Spring (JPA, Axon, RabbitMQ).",
		link: "https://github.com/coundia/axon-web-cqrs-generator",
	},
	{
		title: "Générateur code DDD (Spring Boot WebFlux)",
		logo: ddd1,
		description: "Variante 100% réactive : CQRS + DDD sur Spring Boot, Axon et RabbitMQ, I/O haute performance et back-pressure.",
		resume: "Version réactive du générateur DDD (WebFlux).",
		link: "https://github.com/coundia/axon-webflux-cqrs-generator",
	}
];
