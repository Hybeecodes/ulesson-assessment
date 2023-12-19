# ULesson Assessment Test

## Table of Contents

- [Introduction](#introduction)
- [Requirements](#requirements)
- [Getting Started](#getting-started)
    - [Installation](#installation)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Contributing](#contributing)

## Introduction

Welcome to the EdTech Assessment Test project! This NestJS application uses TypeORM to interact with a MySQL database, providing a platform for accessing lessons, creating notes, taking quizzes, and generating detailed reports.

## Requirements

Before getting started, ensure that you have the following prerequisites:

- Node.js (version X.X.X)
- npm (version X.X.X)
- MySQL Database

## Getting Started

Follow the steps below to set up and run the EdTech Assessment Test application.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Hybeecodes/ulesson-assessment.git

2. Change into the project directory:

   ```bash
   cd ulesson-assessment
   ```
3. Install dependencies:

   ```bash
    npm install
    ```
4. Database Setup:

   Create a MySQL database for the project.

   Update the database configuration in the .env file with your database credentials:

   ```bash
    DB_HOST=localhost
    DB_USER=root
    DB_PASS=12345678
    DB_NAME=ulessondb
    PORT=8081
    JWT_SECRET=secret
    JWT_EXPIRES_IN=1h
   
    ```
   
5. Run Database Migrations:

   ```bash
   npm run migration:run
   ```
   
6. Start the application:

   ```bash
    npm run start:dev
    ```
   
## Project Structure

The project structure is based on the [NestJS best practices](https://docs.nestjs.com/techniques/performance).

## Design Patterns
This project uses the following design patterns:
* Repository Pattern
* Service Pattern
* Dependency Injection

The project also uses the following SOLID principles:
* Single Responsibility Principle
* Interface Segregation Principle
* Dependency Inversion Principle
* Open/Closed Principle

## API Documentation

The API documentation is available at [http://localhost:8081/docs](http://localhost:8081/docs) once the application is running.

## Testing

Run the following command to run tests:

```bash
npm run test
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
