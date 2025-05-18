const express = require("express");
const axios = require("axios");
const app = express();
const PORT = 8082;

app.use(express.json());

// For Testing - Sends fixed password and waits for response from post request to Microservice A
// Once hashed_password is received, prints directly in browser
app.get("/test-hash", async (req, res) => {
  try {
    // sends fixed password to /hash in main program (client)
    const response = await axios.post("http://localhost:8082/hash", {
      plaintext_password: "MicroserviceATestPassword",
    });
    res.send(`Hashed password: ${response.data.hashed_password}`);
  } catch (e) {
    console.log(e);
    res.status(500).send("Error hashing password");
  }
});

// sends plaintext_password from main program to Hashed Password Microservice A
app.post("/hash", async (req, res) => {
  const { plaintext_password } = req.body;

  // returns error if empty
  if (!plaintext_password) {
    return res.status(400).json({ error: "Password is required." });
  }

  try {
    // sends plaintext_password to microservice A and awaits response (hashed_password)
    const response = await axios.post("http://localhost:8081/hash", {
      plaintext_password: plaintext_password,
    });

    const hashed_password = response.data.hashed_password;
    return res.json({ hashed_password });
  } catch (e) {
    // if error
    console.log(e);
    return res.status(500).json({ error: "Password hashing failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Main Program running on http://localhost:${PORT}`);
});
