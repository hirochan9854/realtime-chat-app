# Tailwind CSS Documentation

Tailwind CSS is a utility-first CSS framework that generates styles by scanning HTML, JavaScript, and template files for class names. It provides a comprehensive design system through CSS utility classes, enabling rapid UI development without writing custom CSS. The framework operates at build-time, analyzing source files and generating only the CSS classes actually used in the project, resulting in optimized production bundles with zero runtime overhead.

The framework includes an extensive default color palette (18 colors with 11 shades each), responsive breakpoint system, customizable design tokens via CSS custom properties, and support for dark mode, pseudo-classes, pseudo-elements, and media queries through variant prefixes. Tailwind CSS v4.1 introduces CSS-first configuration using the `@theme` directive, native support for custom utilities via `@utility`, seamless integration with modern build tools through Vite, PostCSS, and framework-specific plugins, and enhanced arbitrary value syntax for maximum flexibility.

## Installation with Vite

Installing Tailwind CSS using the Vite plugin for modern JavaScript frameworks.

```bash
# Create a new Vite project
npm create vite@latest my-project
cd my-project

# Install Tailwind CSS and Vite plugin
npm install tailwindcss @tailwindcss/vite
```

```javascript
// vite.config.ts
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
 plugins: [
 tailwindcss(),
 ],
})
```

```css
/* src/style.css */
@import "tailwindcss";
```

## Custom Theme Configuration

Defining custom design tokens using the `@theme` directive in CSS.

```css
/* app.css */
@import "tailwindcss";

@theme {
 /* Custom fonts */
 --font-display: "Satoshi", "sans-serif";
 --font-body: "Inter", system-ui, sans-serif;

 /* Custom colors */
 --color-brand-50: oklch(0.98 0.02 264);
 --color-brand-100: oklch(0.95 0.05 264);
 --color-brand-500: oklch(0.55 0.22 264);
 --color-brand-900: oklch(0.25 0.12 264);

 /* Custom breakpoints */
 --breakpoint-3xl: 120rem;
 --breakpoint-4xl: 160rem;

 /* Custom spacing */
 --spacing-18: calc(var(--spacing) * 18);

 /* Custom animations */
 --ease-fluid: cubic-bezier(0.3, 0, 0, 1);
 --ease-snappy: cubic-bezier(0.2, 0, 0, 1);
}
```

## Custom Utilities

Creating reusable custom utility classes with variant support.

```css
/* Simple custom utility */
@utility content-auto {
 content-visibility: auto;
}

/* Complex utility with nesting */
@utility scrollbar-hidden {
 &::-webkit-scrollbar {
 display: none;
 }
}

/* Functional utility with theme values */
@theme {
 --tab-size-2: 2;
 --tab-size-4: 4;
 --tab-size-github: 8;
}

@utility tab-* {
 tab-size: --value(--tab-size-*);
}
```

## Custom Variants

Registering custom conditional styles with the `@custom-variant` directive.

```css
/* Simple custom variant */
@custom-variant theme-midnight (&:where([data-theme="midnight"] *));

/* Variant with media query */
@custom-variant any-hover {
 @media (any-hover: hover) {
 &:hover {
 @slot;
 }
 }
}

/* ARIA state variant */
@custom-variant aria-asc (&[aria-sort="ascending"]);
@custom-variant aria-desc (&[aria-sort="descending"]);

/* Data attribute variant */
@custom-variant data-checked (&[data-ui~="checked"]);
```

## Layer Organization

Organizing custom styles into Tailwind's cascade layers.

```css
@import "tailwindcss";

/* Base styles for HTML elements */
@layer base {
 h1 {
 font-size: var(--text-2xl);
 font-weight: bold;
 }

 body {
 font-family: var(--font-body);
 }
}

/* Reusable component classes */
@layer components {
 .btn {
 padding: --spacing(2) --spacing(4);
 border-radius: var(--radius);
 font-weight: 600;
 transition: all 150ms;
 }
}
```

## Functions and Directives

Using Tailwind's CSS functions for dynamic values and opacity adjustments.

```css
/* Alpha function for opacity */
.my-element {
 color: --alpha(var(--color-lime-300) / 50%);
 background: --alpha(var(--color-blue-500) / 25%);
}

/* Spacing function */
.my-element {
 margin: --spacing(4);
 padding: calc(--spacing(6) - 1px);
}

/* Source directive for additional content */
@source "../node_modules/@my-company/ui-lib";

/* Apply directive for inline utilities */
.select2-dropdown {
 @apply rounded-b-lg shadow-md;
}
```

## Summary

Tailwind CSS provides a complete utility-first design system that eliminates the need for writing custom CSS in most cases. The framework's primary use cases include rapid prototyping, building production applications with consistent design systems, creating responsive layouts, implementing dark mode, and maintaining design consistency across large teams. By using utility classes directly in markup, developers can iterate quickly, avoid naming conventions, and prevent CSS bloat since only used styles are generated.

The v4.1 release enhances the developer experience with CSS-first configuration, eliminating JavaScript configuration files for most projects. Integration patterns include using the Vite plugin for modern frameworks, PostCSS for custom build pipelines, the Tailwind CLI for simple projects, and CDN scripts for rapid prototyping. The framework excels at component-driven development when combined with React, Vue, Svelte, or other modern frameworks, where utility classes are co-located with component logic. Custom design systems can be fully defined in CSS using `@theme`, with project-specific utilities and variants extending the framework's capabilities without writing JavaScript plugins.
