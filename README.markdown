# Backend Engineer Test

Welcome to the Backend Engineer Test project as completed by me Stephen Ignatius. This project is a simple RESTful API for creating and managing products in a store, featuring token-based authentication.

## Requirements

- NodeJS
- Typescript
- MongoDB
- Docker
- Azure Virtual Machine
- Postman

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/REALSTEVEIG/MAINSTACK-Backend-Engineer-Test.git
   ```

2. Install dependencies:

   ```bash
   cd MAINSTACK-Backend-Engineer-Test
   npm install
   ```

3. env file:

   ```bash
   Create a .env file in the root directory of the project and add the following environment variables:

    PORT=8000
    APP_VERSION=1.0
    MONGO_URI="mongodb+srv://<NAME>:<PASSWORD>@cluster0.k5vhuve.mongodb.net/?retryWrites=true&w=majority"
    DB_NAME=mainstack-dev
    DB_NAME_TEST=tests
    ALLOWED_HOSTNAMES="http://localhost:3000"
   ```

3. Run the application:

   ```bash
   npm run dev
   ```

   The API will be available at `http://localhost:8000`.

## Token-based Authentication

The API implements token-based authentication. Include the token in the headers for protected endpoints.

## Documentation

API documentation is available on Postman. View the [Postman Documentation](https://documenter.getpostman.com/view/25652727/2s9YkgERWh) for detailed information on each endpoint.

## Testing

### Unit Tests

The project includes unit tests for all service files. Run the tests using:

```bash
npm run test
```

### Integration Tests

- **Tests:** <img width="960" alt="TESTS" src="https://github.com/REALSTEVEIG/MAINSTACK-Backend-Engineer-Test/assets/101066723/9161bd2d-db3c-475e-a499-a01ad2720eed">

- **Create Product Endpoint:** <img width="960" alt="create product r" src="https://github.com/REALSTEVEIG/MAINSTACK-Backend-Engineer-Test/assets/101066723/be5dea87-67d9-40f0-9172-594b8215c216">

- **Get All Products Endpoint:** <img width="960" alt="get all products" src="https://github.com/REALSTEVEIG/MAINSTACK-Backend-Engineer-Test/assets/101066723/58e3b99b-dbbc-4281-9138-c7d43355a84c">

## Live API

The containerized API is deployed on an Azure Virtual Machine. Access it at [http://20.67.246.86:8000/api/auth/signup](http://20.67.246.86:8000/api/auth/signup).

```
