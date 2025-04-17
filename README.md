# Query Translator

A NestJS-based API service for translating queries between different formats and languages.

## Description

This project provides a robust API service built with NestJS that handles query translation tasks. It's designed to be scalable, maintainable, and follows best practices in TypeScript and Node.js development.

## Features

- RESTful API endpoints for query translation
- TypeScript support
- Built-in validation and transformation
- Testing infrastructure with Jest
- ESLint and Prettier for code quality
- Development and production configurations

## Prerequisites

- Node.js 20
- npm or yarn package manager

## Installation

1. Clone the repository:

```bash
git clone git@github.com:NelsonSDE/query-translator.git
cd query-translator
```

2. Install dependencies:

```bash
npm install
```

## Running the Application

### Development Mode

```bash
npm run start:dev
```

## Project Structure

```
src/
├── common/           # Shared utilities and common code
├── translator/       # Core translation logic and services
├── __test_utils__/  # Testing utilities and mocks
├── app.module.ts    # Root application module
└── main.ts          # Application entry point
```

## Testing

The project uses Jest for testing. You can run different types of tests using the following commands:

```bash
# Unit tests
npm run test

# Test coverage
npm run test:cov
```

## API Examples

### Request Payload

```json
{
  "query": "db.user.find({age: {$gte: 21}},{name: 1, _id: 1});",
  "source": "mongodb",
  "target": "sql"
}
```

### Response Payload

```json
{
  "source": "mongodb",
  "target": "sql",
  "originalQuery": "db.user.find({age: {$gte: 21}},{name: 1, _id: 1});",
  "translatedQuery": "SELECT name, _id FROM user WHERE $gte >= 'age';"
}
```
