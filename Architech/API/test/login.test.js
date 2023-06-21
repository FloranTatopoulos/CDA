const request = require('supertest');
const dotenv = require('dotenv')
dotenv.config();
const MDP = process.env.MDPTEST;

describe('Authentification', () => {
  let token;

  test("Register", async () => { 
    const User = {
    username: "will",
    email: "willy@gmail.com",
    password: MDP,
    }
    const response = await request("https://api.architechcda.fr") 
      .post("/api/auth/signup")
      .send(User)
      expect(response.statusCode).toBe(200); 
  });

  test("Login", async () => { 
    const response = await request("https://api.architechcda.fr") 
      .post("/api/auth/signin")
      .send({username : "will", password: MDP})
      expect(response.statusCode).toBe(200);
      token= response.body.accessToken
  });

    test("Wrong password", async () => { 
        const response = await request("https://api.architechcda.fr") 
          .post("/api/auth/signin")
          .send({username : "will", password: "a"})
          expect(response.statusCode).toBe(401); // Définit le code de retour attendu
      });

    test("Wrong username", async () => { 
        const response = await request("https://api.architechcda.fr") 
          .post("/api/auth/signin")
          .send({username : "j", password: MDP})
          expect(response.statusCode).toBe(404);
      });
  });