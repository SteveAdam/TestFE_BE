# TestFEBE

This project is a task management application designed to help users organize and track their tasks efficiently. It provides features such as task creation, editing, and deletion, along with a user-friendly interface.

## Installation

To set up the project locally, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the required dependencies by running:

    ```bash
    npm install
    ```

## Running the JSON Server

This project uses a local JSON server to simulate a backend database. To start the JSON server:

1. Ensure you have `json-server` installed globally. If not, install it using:

    ```bash
    npm install -g json-server
    ```

2. Start the JSON server by running:

    ```bash
    json-server --watch db.json
    ```

    This will serve the JSON database at `http://localhost:3000/`.

## Development Server

To start the Angular development server:

1. Run the following command:

    ```bash
    ng serve
    ```

2. Open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code Scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project, run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running Unit Tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running End-to-End Tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
