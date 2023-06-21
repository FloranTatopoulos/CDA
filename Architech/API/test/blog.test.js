const request = require('supertest');
const dotenv = require('dotenv')
dotenv.config();
const MDP = process.env.MDPADMIN;

describe('Testing blog CRUD', () => {
    let id;
    let token;
    test("Login", async () => { 
        const response = await request("https://api.architechcda.fr") 
          .post("/api/auth/signin")
          .send({username : "flo-admin", password: MDP})
          expect(response.statusCode).toBe(200);
          token= response.body.accessToken;
      });

    test('Create post', async () => {
      const blog = {  
        theme: "decoration",
        image : "",
        title: "Blog",
        body: "Ceci est un post",
        author: "flo"
      };
      const response = await request("https://api.architechcda.fr")
        .post('/api/blog/createPost')
        .set('token', `Bearer ${token}`)
        .send(blog);
        expect(response.statusCode).toBe(200); 
        expect(response.body.data).toBeDefined();
        expect(response.body.status).toBe('Post créé');
        id = response.body.data.id;
    });

    test('should get all posts', async () =>{
        const response = await request("https://api.architechcda.fr")
        .get('/api/blog/readPost')
        expect(response.statusCode).toBe(200); 
        expect(response.body.data).toBeDefined();
        expect(response.body.status).toBe('Posts affichés');
    })

    test('should get only one post', async() =>{
          const response = await request("https://api.architechcda.fr")
            .get(`/api/blog/getPostById/${id}`);
            expect(response.statusCode).toBe(200); 
            expect(response.body.data).toBeDefined();
            expect(response.body.status).toBe('Post affiché');
    })

    test('should update a post', async() =>{
        const updatedPost = { 
            theme: "Luxe",
            image : "",
            title: "Blog",
            body: "Ceci est un post",
            author: "flo"
         };

        const response = await request("https://api.architechcda.fr")
        .put(`/api/blog/updatePost/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updatedPost);
        expect(response.statusCode).toBe(200); 
        expect(response.body.data).toBeDefined();
        expect(response.body.status).toBe('Post mis a jour');
    })

    test('should delete a post', async() =>{
        const response = await request("https://api.architechcda.fr")
          .delete(`/api/blog/updatePost/${id}`)
          .set('Authorization', `Bearer ${token}`)
          expect(response.statusCode).toBe(200); 
          expect(response.body.data).toBeDefined();
          expect(response.body.status).toBe('Post supprimé');
    })
});