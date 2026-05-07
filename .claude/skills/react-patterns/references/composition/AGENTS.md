# React Composition Patterns

**Version 1.0.0**
Engineering
January 2026

> **Note:**
> This document is mainly for agents and LLMs to follow when maintaining,
> generating, or refactoring React codebases using composition. Humans
> may also find it useful, but guidance here is optimized for automation
> and consistency by AI-assisted workflows.

---

## Abstract

Composition patterns for building flexible, maintainable React components. Avoid boolean prop proliferation by using compound components, lifting state, and composing internals. These patterns make codebases easier for both humans and AI agents to work with as they scale.

---

## Table of Contents

1. [Component Architecture](#1-component-architecture) — **HIGH**
   - 1.1 [Avoid Boolean Prop Proliferation](#11-avoid-boolean-prop-proliferation)
   - 1.2 [Use Compound Components](#12-use-compound-components)
2. [State Management](#2-state-management) — **MEDIUM**
   - 2.1 [Decouple State Management from UI](#21-decouple-state-management-from-ui)
   - 2.2 [Define Generic Context Interfaces for Dependency Injection](#22-define-generic-context-interfaces-for-dependency-injection)
   - 2.3 [Lift State into Provider Components](#23-lift-state-into-provider-components)
3. [Implementation Patterns](#3-implementation-patterns) — **MEDIUM**
   - 3.1 [Create Explicit Component Variants](#31-create-explicit-component-variants)
   - 3.2 [Prefer Composing Children Over Render Props](#32-prefer-composing-children-over-render-props)
4. [React 19 APIs](#4-react-19-apis) — **MEDIUM**
   - 4.1 [React 19 API Changes](#41-react-19-api-changes)

---

## Rule Index

| File | Rule | Impact |
|------|------|--------|
| `architecture-avoid-boolean-props.md` | Avoid Boolean Prop Proliferation | CRITICAL |
| `architecture-compound-components.md` | Use Compound Components | HIGH |
| `state-decouple-implementation.md` | Decouple State Management from UI | MEDIUM |
| `state-context-interface.md` | Define Generic Context Interfaces | HIGH |
| `state-lift-state.md` | Lift State into Provider Components | HIGH |
| `patterns-explicit-variants.md` | Create Explicit Component Variants | MEDIUM |
| `patterns-children-over-render-props.md` | Prefer Children Over Render Props | MEDIUM |
| `react19-no-forwardref.md` | React 19 API Changes | MEDIUM |

---

## References

1. [https://react.dev](https://react.dev)
2. [https://react.dev/learn/passing-data-deeply-with-context](https://react.dev/learn/passing-data-deeply-with-context)
3. [https://react.dev/reference/react/use](https://react.dev/reference/react/use)
