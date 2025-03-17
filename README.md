# Project By Pham Quang Thang

## Getting Started

### Prerequisites

- Docker Desktop: Make sure you have Docker Desktop installed on your machine.
- DBeaver: Ensure DBeaver is installed for database management.
- Postman: Install Postman for API testing.

### Installation

1. **Clone the repository:**
  ```sh
  git clone <repository-url>
  cd <repository-directory>
  ```

2. **Start Docker containers:**
  ```sh
  docker compose up -d
  ```

3. **Set up the backend:**
  - Open a new terminal.
  - Navigate to the backend directory:
    ```sh
    cd backend
    ```
  - Install dependencies:
    ```sh
    pnpm install
    ```

4. **Set up the frontend:**
  - Open a new terminal.
  - Navigate to the frontend directory:
    ```sh
    cd frontend
    ```
  - Install dependencies:
    ```sh
    pnpm install
    ```
5. **Start the development servers:**
  - Open a new terminal.
  - Navigate to the frontend directory:
    ```sh
    cd frontend
    ```
  - Start the frontend development server:
    ```sh
    pnpm dev
    ```
  - Open another new terminal.
  - Navigate to the backend directory:
    ```sh
    cd backend
    ```
  - Start the backend development server:
    ```sh
    pnpm dev
    ```

    ### Check API Endpoints with Postman

    1. **Open Postman:**
      - Launch Postman on your machine.

    2. **Create a new request:**
      - Click on the `New` button and select `Request`.

    3. **Set up the request:**
      - Enter the request URL (e.g., `http://localhost:3000/api/endpoint`).
      - Select the HTTP method (GET, POST, PUT, DELETE) as required.
      - Add any necessary headers, parameters, or body content.

    4. **Send the request:**
      - Click the `Send` button to send the request to the server.

    5. **Verify the response:**
      - Check the response status code, headers, and body to ensure the API is working correctly.

    6. **Save the request:**
      - Save the request in a collection for future use.

    ### Check Database in DBeaver

    1. **Open DBeaver:**
      - Launch DBeaver on your machine.

    2. **Connect to the database:**
      - Click on the `New Database Connection` button.
      - Select the database type (e.g., PostgreSQL, MySQL) and click `Next`.
      - Enter the connection details (host, port, database name, username, and password) and click `Finish`.

    3. **Verify the database:**
      - Once connected, expand the database node in the Database Navigator.
      - Browse through the tables and data to ensure everything is set up correctly.
    ### Accessing the Website

    Once the development server is running, you can access the website by navigating to `http://localhost:3000` in your web browser.

    ### Additional Information

    For more detailed instructions and troubleshooting, please refer to the project's documentation or contact the project maintainers.
    ### Check Database in DBeaver

    1. **Open DBeaver:**
      - Launch DBeaver on your machine.

    2. **Connect to the database:**
      - Click on the `New Database Connection` button.
      - Select the database type (e.g., PostgreSQL, MySQL) and click `Next`.
      - Enter the connection details (host, port, database name, username, and password) and click `Finish`.

    3. **Verify the database:**
      - Once connected, expand the database node in the Database Navigator.
      - Browse through the tables and data to ensure everything is set up correctly.
### Accessing the Website

Once the development server is running, you can access the website by navigating to `http://localhost:3000` in your web browser.

### Additional Information

For more detailed instructions and troubleshooting, please refer to the project's documentation or contact the project maintainers.

