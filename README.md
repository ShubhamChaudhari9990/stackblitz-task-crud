# TaskCrud

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.12.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


## How did I organise the modules and signal store?

In this Angular + NgRx Signals app, we followed a feature-based modular architecture. Here's how we structured and organized modules and signal stores:


✅ 1. Feature-Based Module Structure
Each logical feature of the app (e.g. Tasks-chart, task-view, task-form) lives inside its own Angular componet. This helps in:

Better encapsulation and maintainability

Easier code reuse and lazy loading

Clean separation of UI, state, and business logic

Example structure:

src/
├── app/
│   ├── components/
│   │   ├── main-menu/      # Navigation component
│   │   ├── task-charts/    # Chart visualization (e.g. bar)
│   │   ├── task-form/      # Add/Edit Task form using Reactive Forms
│   │   ├── task-table/     # Task list with edit/delete options
│   ├── interface/          # TypeScript interfaces for task models
│   ├── store/              # NgRx Signals store for managing state
│   ├── app.config.ts       # Standalone Angular app config
│   ├── app.routes.ts       # Routing setup
│   ├── app.component.ts    # Root component
│   └── app.component.html/css/spec.ts
├── index.html
└── main.ts

Signal Store Setup

Inside each feature's store/ folder, we define a dedicated Signal Store (e.g., TaskStore) which holds all the reactive state using Angular's new signals API.

Store responsibilities:

Keep all application state (signal())

Expose derived data using computed()

Perform mutations via methods like add(), update(), delete()

Optionally: run signalEffect() when you want to trigger side effects


✅ 2. computedSignal
What it is:

computedSignal derives state values based on other signals. It is reactive, meaning it automatically recalculates derived values whenever the underlying signals change.

Why we chose it:

Declarative State Derivation: Instead of storing computed values like chart data or filtered impressions in the store (which can become redundant), computedSignal allows us to derive values based on signals. This avoids unnecessary duplication of state and makes the code simpler.

Automatic Updates: If any of the signals change, the computed value is automatically updated. This is especially useful for UI elements that depend on aggregated data (like charts), reducing the need for explicit state management logic.

Example in Our App:
We use computedSignal to dynamically compute the chart data whenever the impressions data changes.


✅ 3 NgRx Signals (Chosen Approach)

What is it?

NgRx Signals, as part of Angular's reactive paradigm, allows for lightweight state management, reducing the boilerplate and complexity of traditional NgRx Store. signals are the new way of managing state, and computedSignal and signalEffect make handling derived states and side effects simpler.

Why we chose it:

Simplicity: With signals, there's no need for actions, reducers, or selectors. Instead, state is directly stored in signal() and derived using computed(), which reduces the complexity and makes the code easier to read.

Declarative: Signals provide a more declarative way of managing state. Computed values automatically re-render when dependent signals change, which makes it easier to reason about.

Fewer Dependencies: Unlike NgRx Store, which requires you to install additional dependencies, NgRx Signals leverages Angular's built-in reactivity system.

Performance: Signals avoid unnecessary observables and reduce the overhead of state changes. They automatically trigger the update mechanism only when relevant signals change.

Trade-offs:

New Paradigm: NgRx Signals is relatively new, and thus not as widely adopted. Documentation and community examples are still growing, which can be a barrier for developers unfamiliar with the concept.

Learning Curve: If developers are more familiar with RxJS or NgRx Store, it might take some time to adopt the signalEffect and computedSignal patterns. Transitioning from RxJS-based store management to signals might require a mindset shift.

Limited Features: While powerful, NgRx Signals might not have all the advanced features of the traditional NgRx Store, especially in terms of middleware, dev tools, or built-in features like entity management, caching, etc. If those were required, using NgRx Store might be the better choice.


✅ 4 Service-Based State (Manual Approach)

What is it?

Another approach could involve storing all state within services using variables and exposing getters and setters. This approach does not use RxJS or NgRx at all.

Why we considered it:

Simplicity: For very small apps, this could be the simplest solution. There’s no need for extra dependencies.

Trade-offs:

Harder to Maintain: As the app grows, managing state manually within services becomes error-prone and difficult to maintain. It's easy to forget to update a state or sync it between components.

No Reactive Updates: Without an observable pattern, your components would need to rely on manual updates (e.g., calling ngOnChanges), which defeats the purpose of Angular’s reactive design.

Why we didn’t choose it:

This approach doesn't scale well. For larger apps or when you need to react to state changes automatically (like in charts or tables), this becomes cumbersome.

