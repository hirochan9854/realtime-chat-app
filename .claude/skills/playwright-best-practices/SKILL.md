---
name: playwright-best-practices
description: Use when writing Playwright tests, fixing flaky tests, debugging failures, implementing Page Object Model, configuring CI/CD, optimizing performance, mocking APIs, handling authentication or OAuth, testing accessibility (axe-core), file uploads/downloads, date/time mocking, WebSockets, geolocation, permissions, multi-tab/popup flows, mobile/responsive layouts, touch gestures, GraphQL, error handling, offline mode, multi-user collaboration, third-party services (payments, email verification), console error monitoring, global setup/teardown, test annotations (skip, fixme, slow), test tags (@smoke, @fast, @critical, filtering with --grep), project dependencies, security testing (XSS, CSRF, auth), performance budgets (Web Vitals, Lighthouse), iframes, component testing, canvas/WebGL, service workers/PWA, test coverage, i18n/localization, Electron apps, or browser extension testing. Covers E2E, component, API, visual, accessibility, security, Electron, and extension testing.
license: MIT
metadata:
  author: currents.dev
  version: "1.1"
---

# Playwright Best Practices

This skill provides comprehensive guidance for all aspects of Playwright test development, from writing new tests to debugging and maintaining existing test suites.

## Activity-Based Reference Guide

Consult these references based on what you're doing:

### Writing New Tests

**When to use**: Creating new test files, writing test cases, implementing test scenarios

| Activity                            | Reference Files                                                                                                                               |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **Writing E2E tests**               | [test-suite-structure.md](core/test-suite-structure.md), [locators.md](core/locators.md), [assertions-waiting.md](core/assertions-waiting.md) |
| **Writing component tests**         | [component-testing.md](testing-patterns/component-testing.md), [test-suite-structure.md](core/test-suite-structure.md)                        |
| **Writing API tests**               | [api-testing.md](testing-patterns/api-testing.md), [test-suite-structure.md](core/test-suite-structure.md)                                    |
| **Writing GraphQL tests**           | [graphql-testing.md](testing-patterns/graphql-testing.md), [api-testing.md](testing-patterns/api-testing.md)                                  |
| **Writing visual regression tests** | [visual-regression.md](testing-patterns/visual-regression.md), [canvas-webgl.md](testing-patterns/canvas-webgl.md)                            |
| **Structuring test code with POM**  | [page-object-model.md](core/page-object-model.md), [test-suite-structure.md](core/test-suite-structure.md)                                    |
| **Setting up test data/fixtures**   | [fixtures-hooks.md](core/fixtures-hooks.md), [test-data.md](core/test-data.md)                                                                |
| **Handling authentication**         | [authentication.md](advanced/authentication.md), [authentication-flows.md](advanced/authentication-flows.md)                                  |
| **Testing date/time features**      | [clock-mocking.md](advanced/clock-mocking.md)                                                                                                 |
| **Testing file upload/download**    | [file-operations.md](testing-patterns/file-operations.md), [file-upload-download.md](testing-patterns/file-upload-download.md)                |
| **Testing forms/validation**        | [forms-validation.md](testing-patterns/forms-validation.md)                                                                                   |
| **Testing drag and drop**           | [drag-drop.md](testing-patterns/drag-drop.md)                                                                                                 |
| **Testing accessibility**           | [accessibility.md](testing-patterns/accessibility.md)                                                                                         |
| **Testing security (XSS, CSRF)**    | [security-testing.md](testing-patterns/security-testing.md)                                                                                   |
| **Using test annotations**          | [annotations.md](core/annotations.md)                                                                                                         |
| **Using test tags**                 | [test-tags.md](core/test-tags.md)                                                                                                             |
| **Testing iframes**                 | [iframes.md](browser-apis/iframes.md)                                                                                                         |
| **Testing canvas/WebGL**            | [canvas-webgl.md](testing-patterns/canvas-webgl.md)                                                                                           |
| **Internationalization (i18n)**     | [i18n.md](testing-patterns/i18n.md)                                                                                                           |
| **Testing Electron apps**           | [electron.md](testing-patterns/electron.md)                                                                                                   |
| **Testing browser extensions**      | [browser-extensions.md](testing-patterns/browser-extensions.md)                                                                               |

### Mobile & Responsive Testing

| Activity                        | Reference Files                                                                  |
| ------------------------------- | -------------------------------------------------------------------------------- |
| **Device emulation**            | [mobile-testing.md](advanced/mobile-testing.md)                                  |
| **Touch gestures (swipe, tap)** | [mobile-testing.md](advanced/mobile-testing.md)                                  |
| **Viewport/breakpoint testing** | [mobile-testing.md](advanced/mobile-testing.md)                                  |
| **Mobile-specific UI**          | [mobile-testing.md](advanced/mobile-testing.md), [locators.md](core/locators.md) |

### Real-Time & Browser APIs

| Activity                        | Reference Files                                                                          |
| ------------------------------- | ---------------------------------------------------------------------------------------- |
| **WebSocket/real-time testing** | [websockets.md](browser-apis/websockets.md)                                              |
| **Geolocation mocking**         | [browser-apis.md](browser-apis/browser-apis.md)                                          |
| **Permission handling**         | [browser-apis.md](browser-apis/browser-apis.md)                                          |
| **Multi-tab/popup flows**       | [multi-context.md](advanced/multi-context.md)                                            |
| **OAuth popup handling**        | [third-party.md](advanced/third-party.md), [multi-context.md](advanced/multi-context.md) |

### Debugging & Troubleshooting

| Activity                                          | Reference Files                                                                                                                                |
| ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| **Debugging test failures**                       | [debugging.md](debugging/debugging.md), [assertions-waiting.md](core/assertions-waiting.md)                                                    |
| **Fixing flaky tests**                            | [flaky-tests.md](debugging/flaky-tests.md), [debugging.md](debugging/debugging.md), [assertions-waiting.md](core/assertions-waiting.md)        |
| **Fixing selector issues**                        | [locators.md](core/locators.md), [debugging.md](debugging/debugging.md)                                                                        |
| **Investigating timeout issues**                  | [assertions-waiting.md](core/assertions-waiting.md), [debugging.md](debugging/debugging.md)                                                    |
| **Using trace viewer**                            | [debugging.md](debugging/debugging.md)                                                                                                         |
| **Debugging console/JS errors**                   | [console-errors.md](debugging/console-errors.md), [debugging.md](debugging/debugging.md)                                                       |

### Infrastructure & Configuration

| Activity                                | Reference Files                                                                                                          |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **Configuring Playwright project**      | [configuration.md](core/configuration.md), [projects-dependencies.md](core/projects-dependencies.md)                     |
| **Setting up CI/CD pipelines**          | [ci-cd.md](infrastructure-ci-cd/ci-cd.md), [github-actions.md](infrastructure-ci-cd/github-actions.md)                   |
| **Docker/container setup**              | [docker.md](infrastructure-ci-cd/docker.md)                                                                              |
| **Optimizing test performance**         | [performance.md](infrastructure-ci-cd/performance.md), [test-suite-structure.md](core/test-suite-structure.md)           |
| **Configuring parallel execution**      | [parallel-sharding.md](infrastructure-ci-cd/parallel-sharding.md), [performance.md](infrastructure-ci-cd/performance.md) |

### Framework-Specific Testing

| Activity                  | Reference Files                     |
| ------------------------- | ----------------------------------- |
| **Testing React apps**    | [react.md](frameworks/react.md)     |
| **Testing Next.js apps**  | [nextjs.md](frameworks/nextjs.md)   |
| **Testing Vue/Nuxt apps** | [vue.md](frameworks/vue.md)         |
| **Testing Angular apps**  | [angular.md](frameworks/angular.md) |

## Test Validation Loop

After writing or modifying tests:

1. **Run tests**: `npx playwright test --reporter=list`
2. **If tests fail**:
   - Review error output and trace (`npx playwright show-trace`)
   - Fix locators, waits, or assertions
   - Re-run tests
3. **Only proceed when all tests pass**
4. **Run multiple times** for critical tests: `npx playwright test --repeat-each=5`
