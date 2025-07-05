const pactum = require("pactum");

describe("Post Apis", () => {
  it("create user successful", async () => {
    await pactum
      .spec()
      .post("https://reqres.in/api/users")
      .withHeaders("x-api-key", "reqres-free-v1")
      .withBody({
        name: "hello",
        job: "123",
      })
      .expectStatus(201)
      .expectBodyContains("hello")

      .stores("UserID", 'id');
    await pactum
      .spec()
      .get('https://reqres.in/api/users/$S{UserID}')//correct only but the value is not getting updated
     // .withPathParams('id', '$S{User_ID}')
      .withHeaders("x-api-key", "reqres-free-v1")

      .expectStatus(200);

  });
  it("create user successful", async () => {
    await pactum.spec()
  .get('http://jsonplaceholder.typicode.com/posts')
  .expectStatus(200)
  .stores('FirstPostId', '[0].id');

   await pactum.spec()
  .get(`http://jsonplaceholder.typicode.com/posts/{id}/comments`)
  .withPathParams('id', '$S{FirstPostId}')
  .expectStatus(200);
  });
  it("register successful", async () => {
    const response = await pactum
      .spec()
      .post("https://reqres.in/api/register")
      .withHeaders("x-api-key", "reqres-free-v1")
      .withBody({
        email: "eve.holt@reqres.in",
        password: "pistol",
      })
      .expectStatus(200)
      .returns((crx) => crx.res.json);
    console.log(response.token);
    console.log(response.id);
    // console.log(response);
  });
  it("register unsuccessful", async () => {
    const response = await pactum
      .spec()
      .post("https://reqres.in/api/register")
      .withHeaders("x-api-key", "reqres-free-v1")
      .withBody({
        email: "shasshank@gmail.com",
      })
      .expectStatus(400)
      .expectBodyContains("Missing password");
    // console.log(response);
  });
});
