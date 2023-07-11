# 🚀 Fund Raising Project Server Side Documentation

---

This documentation provides an overview and details about the Fund Raising Project Server Side implemented in the provided code. The server is built using the Express.js framework and includes various endpoints for managing ideas, users, donations, login, and logout functionality.

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
-   'CORS' (Cross-Origin Resource Sharing) is enabled to allow requests from 'http://localhost:3000'.
-   Body parsing middleware is used for handling 'JSON' and URL-encoded data.
-   The server uses 'cookies' for session management.

---

<a name="ideas-endpoints"></a>

## 💡 Ideas Endpoints

<a name="get-ideas"></a>
📥 GET /ideas

-   Description: Retrieves a list of ideas based on optional query parameters.

    -   URL example:  
        https://fund-raising-project-server-side.azurewebsites.net/ideas

-   Query Parameters:

    -   'sortBy' (optional): Sorts the ideas based on specific criteria. Accepted values: 'totalDonationSum', 'status'

        -   URL example:  
            https://fund-raising-project-server-side.azurewebsites.net/ideas?sorBy=totalDonationSum

    -   'status' (optional): Filters ideas based on the status. Accepted values: 'accepted', 'pending', 'rejected'
        -   URL example:  
            https://fund-raising-project-server-side.azurewebsites.net/ideas?sortBy=status&status=rejected

-   Response:
    -   Status Code: 200 (OK)
    -   Body: An array of ideas in the requested order and filter criteria.
    -   JSON example:
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
📥 POST /ideas

-   Description: Creates a new idea.

    -   URL example:
        https://fund-raising-project-server-side.azurewebsites.net/ideas

-   Request Body:

    -   'header': Idea's header/title.
    -   'description': Idea's description.
    -   'askedSum': The requested sum for the idea.
    -   'userId': ID of the user associated with the idea.
    -   'JSON' example:  
         ```json
        {
        "header": "Header For Example",
        "description": "Description for example",
        "askedSum": 10000,
        "userId": "6fba75be-1f13-449e-b8ee-0d9287d70208"
        }

    ```

    ```

-   Response:

    -   Status Code: 200 (OK)
    -   Body: Success message indicating that the idea was created successfully.

        -   Message example:

        ```
        Idea created successfully.
        ```

<a name="put-ideas"></a>
🔧 PUT /ideas

-   Description: Updates an existing idea.

    -   URL example:  
        https://fund-raising-project-server-side.azurewebsites.net/ideas

-   Request Body:

    -   'ideaId': ID of the idea to be updated.
    -   'key': The property/key to be updated.
    -   'value': The new value for the specified property/key.
    -   'JSON' example:

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
🔧 PUT /ideas/status

-   Description: Updates the status (approval) of an existing idea.

    -   URL example:  
        https://fund-raising-project-server-side.azurewebsites.net/ideas/status

-   Request Body:
    -   'ideaId': ID of the idea to update the status.
    -   'isApproved': Boolean value representing the new status (true for approved, false for rejected).
    -   'JSON' example:
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
🗑️ DELETE /ideas

-   Description: Deletes an existing idea.

    -   URL example:  
        https://fund-raising-project-server-side.azurewebsites.net/ideas

-   Request Body:

    -   'ideaId': ID of the idea to be deleted.
    -   'JSON' example:

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
📥 GET /users

-   Description: Retrieves a list of all users.
-   Response:
    -   Status Code: 200 (OK)
    -   Body: An array of user objects representing all the users.

<a name="post-users"></a>
📥 POST /users

-   Description: Creates a new user.
-   Request Body:
    -   'username': User's username.
    -   'password': User's password.
    -   'firstName': User's first name.
    -   'lastName': User's last name.
-   Response:
    -   Status Code: 200 (OK)
    -   Body: Success message indicating that the user was created successfully.

<a name="put-users"></a>
🔧 PUT /users

-   Description: Updates an existing user.
-   Request Body:
    -   ' userId': ID of the user to be updated.
    -   'key': The property/key to be updated.
    -   'value': The new value for the specified property/key.
-   Response:
    -   Status Code: 200 (OK)
    -   Body: Success message indicating that the user was updated successfully.

<a name="delete-users"></a>
🗑️ DELETE /users

-   Description: Deletes an existing user.
-   Request Body:
    -   'userId': ID of the user to be deleted.
-   Response:
    -   Status Code: 200 (OK)
    -   Body: Success message indicating that the user was deleted successfully.

---

<a name="donations-endpoints"></a>

## 💰 Donations Endpoints

<a name="get-donations"></a>
📥 GET /donations

-   Description: Retrieves the total sum donated for a specific idea.
-   Request Body:
    -   'ideaId': ID of the idea to get the total sum donated for.
-   Response:
    -   Status Code: 200 (OK)
    -   Body: The total sum donated for the specified idea.

<a name="post-donations"></a>
📥 POST /donations

-   Description: Creates a new donation for an idea, either by a registered or an unregistered user.
-   Request Body:
    -   'ideaId': ID of the idea for which the donation is made.
    -   'userId' (optional): ID of the registered user making the donation.
    -   'firstName' (optional): First name of the unregistered user making the donation.
    -   'sum': The amount being donated.
-   Response:
    -   Status Code: 200 (OK)
    -   Body: Success message indicating that the donation was created successfully.

---

<a name="login-and-logout-endpoints"></a>

## 🔒 Login and Logout Endpoints

<a name="post-login"></a>
📥 POST /login

-   Description: Logs in a user and creates a session.

    -   URL example:  
        https://fund-raising-project-server-side.azurewebsites.net/login

-   Request Body: - 'username': User's username. - 'password': User's password.
    -   JSON example:
    ```json
    { {
    "username": "DVader",
    "password": "123"
    }
    }
    ```
-   Response:
-   Status Code: 200 (OK)
-   Body: Success message indicating that the user was logged in successfully.

<a name="get-login"></a>
📥 GET /login

-   Description: Retrieves the information of the logged-in user.
-   Request Body:
-   'userLoginSession': Session ID of the logged-in user.
-   Response:
-   Status Code: 200 (OK)
-   Body: JSON object containing information about the logged-in user, including name and role.

<a name="post-logout"></a>
📥 POST /logout

-   Description: Logs out the user and clears the session.
-   Request Body:
-   'userLoginSession': Session ID of the user to be logged out.
-   Response:
-   Status Code: 200 (OK)
-   Body: Success message indicating that the user was logged out successfully.

---

📖 This concludes the documentation for the Fund Raising Project Server Side. The provided code includes various endpoints for managing ideas, users, donations, login, and logout functionality. Each endpoint is described with its purpose, request/response details, and any required parameters or bodies.

📝 Please note that this documentation assumes familiarity with the Node.js and Express.js framework and the usage of the provided code within a larger application or system. Make sure to adapt and integrate the code as needed based on your specific requirements and project structure.

```

```
