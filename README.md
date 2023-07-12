# 🚀 Fund Raising Project Server Side Documentation

---

This is a server side part of my fund raising project. Written in JavaScript using Node.JS, and Express.JS framework, includes various endpoints for managing ideas, users, donations, login, and logout functionality.
The template for this documentation has been generated with the help of [ChatGPT](https://openai.com/).

## Table of Contents

1. 🛠️ [Server Setup](#server-setup)
2. 💡 [Ideas Endpoints](#ideas-endpoints)
    - 📥 [GET /ideas](#get-ideas)
    - 📤 [POST /ideas](#post-ideas)
    - 🔧 [PUT /ideas](#put-ideas)
    - 🔧 [PUT /ideas/status](#put-ideas-status)
    - 🗑️ [DELETE /ideas](#delete-ideas)
3. 👥 [Users Endpoints](#users-endpoints)
    - 📥 [GET /users](#get-users)
    - 📤 [POST /users](#post-users)
    - 🔧 [PUT /users](#put-users)
    - 🗑️ [DELETE /users](#delete-users)
4. 💰 [Donations Endpoints](#donations-endpoints)
    - 📥 [GET /donations](#get-donations)
    - 📤 [POST /donations](#post-donations)
5. 🔒 [Login and Logout Endpoints](#login-and-logout-endpoints)
    - 📤 [POST /login](#post-login)
    - 📥 [GET /login](#get-login)
    - 📤 [POST /logout](#post-logout)

---

<a name="server-setup"></a>

## Server Setup 🛠️

The server is set up using Node.js, Express.js framework and includes necessary middleware and configurations. Here are the important details regarding server setup:

-   The server listens on port 3003.
-   CORS (Cross-Origin Resource Sharing) is enabled to allow requests from http://localhost:3000.
-   Body parsing middleware is used for handling 'JSON' and URL-encoded data.
-   The server uses 'cookies' for session management.

---

<a name="ideas-endpoints"></a>

## 💡 Ideas Endpoints

<a name="get-ideas"></a>

### 📥 GET /ideas

-   Retrieves a list of ideas based on optional query parameters.

    -   URL example:  
        https://fund-raising-project-server-side.azurewebsites.net/ideas

-   Query Parameters:

    -   `sortBy` (optional): Sorts the ideas based on specific criteria. Accepted values: `totalDonationSum`, `status`

        -   URL example:  
            https://fund-raising-project-server-side.azurewebsites.net/ideas?sorBy=totalDonationSum

    -   `status`(optional): Filters ideas based on the `status`. Accepted values: `accepted`, `pending`, `rejected`
        -   URL example:  
            https://fund-raising-project-server-side.azurewebsites.net/ideas?sortBy=status&status=rejected

-   Response:

    -   Status Code: 200 (OK)
    -   Body: An array of ideas in the requested order and filter criteria.

-   `JSON` example:
    ```json
    [
        {
            "id": "70c8e131-ac49-453f-85f6-d18160b7be19",
            "picture": "./img/default_idea.png",
            "header": "Idea 1",
            "description": "Idea 1 Description 1 ",
            "askedSum": 100,
            "userId": "6fba75be-1f13-449e-b8ee-0d9287d70208",
            "status": "accepted",
            "donations": [
                {
                    "id": "d6667fd3-0182-4730-9f20-866602f87ff8",
                    "sum": 20,
                    "userId": "6fba75be-1f13-449e-b8ee-0d9287d70208",
                    "ideaId": "70c8e131-ac49-453f-85f6-d18160b7be19"
                },
                {
                    "id": "7a739df1-7629-4743-8387-0334af332692",
                    "sum": 10,
                    "userId": "6fba75be-1f13-449e-b8ee-0d9287d70208",
                    "ideaId": "70c8e131-ac49-453f-85f6-d18160b7be19"
                }
            ],
            "totalDonationSum": 30
        }
    ]
    ```

<a name="post-ideas"></a>

### 📥 POST /ideas

-   Creates a new idea.

    -   URL example:
        https://fund-raising-project-server-side.azurewebsites.net/ideas

-   Request Body:

    -   `header`: Idea's header/title.
    -   `description`: Idea's description.
    -   `askedSum`: The requested sum for the idea.
    -   `userId`: ID of the user associated with the idea.

-   `JSON` example:

    ```json
    {
        "header": "Header For Example",
        "description": "Description for example",
        "askedSum": 10000,
        "userId": "6fba75be-1f13-449e-b8ee-0d9287d70208"
    }
    ```

-   Response:

    -   Status Code: 200 (OK)
    -   Body: Success message indicating that the idea was created successfully.

        -   Message example:

        ```
        Idea created successfully.
        ```

<a name="put-ideas"></a>

### 🔧 PUT /ideas

-   Updates an existing idea.

    -   URL example:  
        https://fund-raising-project-server-side.azurewebsites.net/ideas

-   Request Body:

    -   `ideaId`: ID of the idea to be updated.
    -   `key`: The property/key to be updated.
    -   `value`: The new value for the specified property/key.

-   `JSON` example:

    ```json
    {
        "ideaId": "b8f40262-d265-419d-a769-e0299901b73b",
        "key": "description",
        "value": "UPDATED Description Example"
    }
    ```

-   Response:
    -   Status Code: 200 (OK)
    -   Body: Success message indicating that the idea was updated successfully.
        -   Message example:
        ```
        Idea updated successfully.
        ```

<a name="put-ideas-status"></a>

### 🔧 PUT /ideas/status

-   Updates the status (approval) of an existing idea.

    -   URL example:  
        https://fund-raising-project-server-side.azurewebsites.net/ideas/status

-   Request Body:

    -   `ideaId`: ID of the idea to update the status.
    -   `isApproved`: Boolean value representing the new status (true for approved, false for rejected).

-   `JSON` example:
    ```json
    {
        "ideaId": "b8f40262-d265-419d-a769-e0299901b73b",
        "key": "isApproved",
        "value": "true"
    }
    ```
-   Response:
    -   Status Code: 200 (OK)
    -   Body: Success message indicating that the idea'sstatus was updated successfully.
        -   Message example:
        ```
        Ideas status updated successfully.
        ```

<a name="delete-ideas"></a>

### 🗑️ DELETE /ideas

-   Deletes an existing idea.

    -   URL example:  
        https://fund-raising-project-server-side.azurewebsites.net/ideas

-   Request Body:

    -   `ideaId`: ID of the idea to be deleted.

-   `JSON` example:

    ```json
    {
        "ideaId": "b8f40262-d265-419d-a769-e0299901b73b"
    }
    ```

-   Response:
    -   Status Code: 200 (OK)
    -   Body: Success message indicating that the idea was deleted successfully.
        -   Message example:
        ```
        Ideas successfully deleted.
        ```

---

<a name="users-endpoints"></a>

## 👥 Users Endpoints

<a name="get-users"></a>

### 📥 GET /users

-   Retrieves a list of all users.

    -   URL example:  
        https://fund-raising-project-server-side.azurewebsites.net/users

-   Response:

    -   Status Code: 200 (OK)
    -   Body: An array of user objects representing all the users.

-   `JSON` example:
    ```json
    [
        {
            "id": "6fba75be-1f13-449e-b8ee-0d9287d70208",
            "picture": "./img/default_userpic.webp",
            "username": "DVader",
            "password": "202cb962ac59075b964b07152d234b70",
            "firstName": "Darth",
            "lastName": "Vader",
            "session": "542a7bf888c911a06bd2966cf87931d2",
            "role": "user"
        }
    ]
    ```

<a name="post-users"></a>

### 📥 POST /users

-   Creates a new user.

    -   URL example:  
        https://fund-raising-project-server-side.azurewebsites.net/users

-   Request Body:

    -   `username`: User's username.
    -   `password`: User's password.
    -   `firstName`: User's first name.
    -   `lastName`: User's last name.

-   `JSON` example:

    ```json
    {
        "username": "GreateJedi",
        "password": "UltraStronPassword123",
        "firstName": "The Greatest",
        "lastName": "Jedi"
    }
    ```

-   Response:
    -   Status Code: 200 (OK)
    -   Body: Success message indicating that the user was created successfully.
        -   Message example:
        ```
        User created successfully.
        ```

<a name="put-users"></a>

### 🔧 PUT /users

-   Updates an existing user.

    -   URL example:  
        https://fund-raising-project-server-side.azurewebsites.net/users

-   Request Body:

    -   `userId`: ID of the user to be updated.
    -   `key`: The property/key to be updated.
    -   `value`: The new value for the specified property/key.

-   `JSON` example:

    ```json
    {
        "userId": "4429f767-ce48-4b4a-b1be-975aca7313c9",
        "key": "firstName",
        "value": "Jimmy"
    }
    ```

-   Response:

    -   Status Code: 200 (OK)
    -   Body: Success message indicating that the user was updated successfully.

        -   Message example:

        ```
        User successfully update.
        ```

-   `JSON` example:
    ```json
    [
        {
            "id": "4e97bd2a-b0ec-41fc-92bd-a286360f8be1",
            "picture": "./img/default_userpic.webp",
            "username": "GreateJedi",
            "password": "8051013a166f52c8a71d886353ec528e",
            "firstName": "The Greatest",
            "lastName": "Jedi",
            "session": null,
            "role": "user"
        }
    ]
    ```

<a name="delete-users"></a>

### 🗑️ DELETE /users

-   Deletes an existing user.

    -   URL example:  
        https://fund-raising-project-server-side.azurewebsites.net/users

-   Request Body:

    -   `userId`: ID of the user to be deleted.

-   `JSON` example:

    ```json
    {
        "userId": "4429f767-ce48-4b4a-b1be-975aca7313c9"
    }
    ```

-   Response:
    -   Status Code: 200 (OK)
    -   Body: Success message indicating that the user was deleted successfully.
        -   Message example:
        ```
        User successfully deleted.
        ```

---

<a name="donations-endpoints"></a>

## 💰 Donations Endpoints

<a name="get-donations"></a>

📥 GET /donations

-   Retrieves the total sum donated for a specific idea.

    -   URL example:  
        https://fund-raising-project-server-side.azurewebsites.net/donations

-   Request Body:

    -   `ideaId`: ID of the idea to get the total sum donated for.

-   `JSON` example:
    ```json
    {
        "ideaId": "70c8e131-ac49-453f-85f6-d18160b7be19"
    }
    ```
-   Response:
    -   Status Code: 200 (OK)
    -   Body: The total sum donated for the specified idea.
        -   Message example:
        ```
        30
        ```

<a name="post-donations"></a>

### 📥 POST /donations

-   Creates a new donation for an idea, either by a registered or an unregistered user.

    -   URL example:  
        https://fund-raising-project-server-side.azurewebsites.net/donations

-   Request Body:

    -   `ideaId`: ID of the idea for which the donation is made.
    -   `userId` (optional): ID of the registered user making the donation.
    -   `firstName` (optional): First name of the unregistered user making the donation.
    -   `sum`: The amount being donated.

-   `JSON` example:

    ```json
    {
        "ideaId": "55b27a57-394b-4df4-87f3-ea47dccb040e",
        "userId": "a9670cd0-85fa-4847-966b-ab10d58e7a67",
        "sum": 250
    }
    ```

-   Response:

    -   Status Code: 200 (OK)
    -   Body: Success message indicating that the donation was created successfully.
        -   Message example:
        ```
        Donation created successfully.
        ```

-   `JSON` example:
    ```json
    [
        {
            "id": "91dfc9ea-14fa-4f1b-b3c3-740ac1ce729d",
            "sum": 250,
            "userId": "a9670cd0-85fa-4847-966b-ab10d58e7a67",
            "ideaId": "55b27a57-394b-4df4-87f3-ea47dccb040e"
        }
    ]
    ```

---

<a name="login-and-logout-endpoints"></a>

## 🔒 Login and Logout Endpoints

<a name="post-login"></a>

### 📥 POST /login

-   Logs in a user and creates a session.

    -   URL example:  
        https://fund-raising-project-server-side.azurewebsites.net/login

-   Request Body:

    -   `username`: User's username.
    -   `password`: User's password.

-   `JSON` example:
    ```json
    {
        "username": "DVader",
        "password": "123"
    }
    ```
-   Response:
    -   Status Code: 200 (OK)
    -   Body: Success message indicating that the user was logged in successfully.
        -   Message example:
        ```
        Successfully logged in.
        ```

<a name="get-login"></a>

### 📥 GET /login

-   Retrieves the information of the logged-in user.
    -   URL example:  
        https://fund-raising-project-server-side.azurewebsites.net/login
-   Request Body:

    -   `userLoginSession`: Session ID of the logged-in user.

-   `JSON` example:
    ```json
    {
        "userLoginSession": "000e1fb3a675b7094b5836b85217015d"
    }
    ```
-   Response:

    -   Status Code: 200 (OK)
    -   Body: `JSON` object containing information about the logged-in user, including name and role.

-   `JSON` example:
    ```json
    {
        "status": "OK",
        "message": "You are Logged in.",
        "name": "Master",
        "role": "user"
    }
    ```

<a name="post-logout"></a>

### 📥 POST /logout

-   Logs out the user and clears the session.
    -   URL example:  
        https://fund-raising-project-server-side.azurewebsites.net/logout
-   Request Body:

    -   `userLoginSession`: Session ID of the user to be logged out.

-   `JSON` example:
    ```json
    {
        "userLoginSession": "000e1fb3a675b7094b5836b85217015d"
    }
    ```
-   Response:
    -   Status Code: 200 (OK)
    -   Body: Success message indicating that the user was logged out successfully.
        -   Message example:
        ```
        You have successfully logged out.
        ```

---

📖 This concludes the documentation for the Fund Raising Project Server Side. The provided code includes various endpoints for managing ideas, users, donations, login, and logout functionality. Each endpoint is described with its purpose, request/response details, and any required parameters or bodies.

📝 Please note that this documentation assumes familiarity with the Node.js and Express.js framework and the usage of the provided code within a larger application or system. Make sure to adapt and integrate the code as needed based on your specific requirements and project structure.
