# FastApi-Sqlalchemy-and-Postgres-Tutorial
**Supermarket Backend API**
This is a simple backend API for a supermarket application built using Python, FastAPI, SQLAlchemy, and Postgres. It provides endpoints to perform CRUD (Create, Read, Update, Delete) operations on supermarket products.

**Features**
Create, read, update, and delete products
Fetch a list of all products
Filter products by category
Sort products by price
Pagination support

**Technologies Used**
Python
FastAPI
SQLAlchemy
Postgres

**Getting Started**
To get started with the API, follow these steps:

Clone the repository: git clone https://github.com/Timsmall94/FastApi-Sqlalchemy-and-Postgres-Tutorial.git
Install the required dependencies: pip install -r requirements.txt
Create a Postgres database and update the database connection details in the config.py file.
Run the database migrations: alembic upgrade head
Start the FastAPI server: uvicorn main:app --reload

**API Documentation**
The API documentation is available at Swagger UI and Redoc when the server is running.

**Endpoints**
GET /products: Get a list of all products
GET /products/{product_id}: Get details of a specific product
POST /products: Create a new product
PUT /products/{product_id}: Update an existing product
DELETE /products/{product_id}: Delete a product

**Contributing**
Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

