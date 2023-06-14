const request = require('supertest');

describe('Authentification', () => {
  let token;

  test("Add User", async () => { 
    const User = {
    username: "willy",
    email: "willydz@gmail.com",
    password: "123456"
    }
    const response = await request("http://localhost:8080") 
      .post("/api/auth/signup")
      .send(User)
      expect(response.statusCode).toBe(200); 
  });

  test("Login", async () => { 
    const response = await request("http://localhost:8080") 
      .post("/api/auth/signin")
      .send({username : "willy", password: "123456"})
      expect(response.statusCode).toBe(200);
      token= response.body.accessToken
  });

    test("Wrong password", async () => { 
        const response = await request("http://localhost:8080") 
          .post("/api/auth/signin")
          .send({username : "willy", password: "a"})
          expect(response.statusCode).toBe(401); // Définit le code de retour attendu
      });

    test("Wrong username", async () => { 
        const response = await request("http://localhost:8080") 
          .post("/api/auth/signin")
          .send({username : "j", password: "123456"})
          expect(response.statusCode).toBe(404);
      });
  });