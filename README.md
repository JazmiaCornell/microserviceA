# Microservice A - Password Hashing

## What Microservice A Does

Microservice A provides a secure way to hash plaintext passwords using bcrypt. It recieves plaintext passwords via a REST API and returns a hashed passwords.

## Why is Microservice A Useful

Storing plaintext passwords is a security risk. This microservice ensures that passwords are hashed consistently and securely before storage to prevent unauthorized access.

## How To Get Started

1. Clone the repository: `git clone https://github.comJazmiaCornell/microserviceA.git`
2. Install Dependecies: `npm install`
3. Run the microservice: `node index.js`

### Usage Notes

- To implement password hashing, you only need to run and interact with the `index.js` file.

- The `client.js` file is provided only for demonstration and is not required for integrating the microservice into your project.

- Your application should make HTTP POST requests directly to the microservice’s /hash endpoint as described below.

## Communication Contract

### Requesting Data from Microservice A

To request a hashed password from Microservice A, send an HTTP POST request to the /hash endpoint on port 8081. The request must include a JSON body with a plaintext_password field. Below is an example of the call.

```js
app.post("/hash", async (req, res) => {
  const { plaintext_password } = req.body;

  // Return an error if no password is provided
  if (!plaintext_password) {
    return res.status(400).json({ error: "Password is required." });
  }

  try {
    // Send the plaintext password to Microservice A and await the hashed password
    const response = await axios.post("http://localhost:8081/hash", {
      plaintext_password: plaintext_password,
    });
    ...
  } catch (e) {
    ...
  }
});
```

### Receiving Data from Microservice A

To recieve a hashed password from Microservice A, the HTTP POST request must wait for the response from Microservice A, which is a JSON object containing hashed_password. Below is an example of the call.

`const hashed_password = response.data.hashed_password;`

### UML Sequence Diagram

See the interactions between the main program and Microservice A in the `UML_diagram.png` file.
