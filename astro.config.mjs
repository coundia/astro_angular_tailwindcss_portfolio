import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import analogjsangular from "@analogjs/astro-angular";
import angular from '@analogjs/astro-angular';
import mdx from "@astrojs/mdx";
import {template} from "./src/data/settings.js"

export default defineConfig({
    integrations: [
        tailwind(),
        sitemap(),
        analogjsangular(),
        mdx(),
        angular({
            vite: {
                inlineStylesExtension: 'scss|sass|less',
                transformFilter: (_code, id) => {
                    return id.includes('src/components');
                }
            },
        }),
    ],
    vite: {
        ssr: {
            noExternal: ['@rx-angular/**', 'astro', '@astrojs/mdx'],
        },
    },
    site: template.website_url,
    base: template.base,
    i18n: {
        locales: [
            "fr",
            "en"
        ],
        defaultLocale: "fr",
        routing: {
            prefixDefaultLocale: false,
        },
    },
});
