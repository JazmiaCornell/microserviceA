var express = require("express");
const app = express();
PORT = 8081;

app.use(express.json());

const bcrypt = require("bcrypt");
const saltRounds = 10;

// receives plaintext_password from main program and hashes password, sends hashed_password back to main program
app.post("/hash", async (req, res) => {
  const { plaintext_password } = req.body;

  // returns error if empty
  if (!plaintext_password) {
    return res.status(400).json({ error: "Password is required." });
  }

  try {
    // hashed password with bcrypt, sends hashed_password back to main program
    const hashed_password = await bcrypt.hash(plaintext_password, saltRounds);
    return res.json({ hashed_password });
    console.log(hashed_password);
  } catch (e) {
    // if error
    console.log(e);
    return res.status(500).json({ error: "Failed to hash password." });
  }
});

app.listen(PORT, () => {
  console.log(`Microservice A running on http://localhost:${PORT}`);
});
