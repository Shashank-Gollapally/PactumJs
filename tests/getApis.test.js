const pactum = require("pactum");
const { email,regex,string,like,any,int } = require('pactum-matchers');

describe("This is a sample api test", () => {
  pactum.request.setDefaultTimeout(5000)// bydefault it is 3seconds

 // pactum.request.setDefaultHeaders("x-api-key", "reqres-free-v1");
  it("get api call", async () => {
    const response = await pactum
      .spec()
      .get("https://reqres.in/api/users/2")
      .withHeaders("x-api-key", "reqres-free-v1")
      .expectStatus(200)
      .returns('');
      console.log(JSON.stringify(response, null, 2));
  });

  it("get api call with query param", async () => {
    const response = await pactum
      .spec()
      .get('https://randomuser.me/api')
      .withQueryParams('gender', 'male')
      .expectStatus(200)
      .returns('');
      console.log(JSON.stringify(response, null, 2));
  });

  it("get api call with delay", async () => {
    const response = await pactum
      .spec()
      .get('https://reqres.in/api/users')
      .withQueryParams('delay', 3)
      .withHeaders("x-api-key", "reqres-free-v1")
      // .retry({
      //   // count : 2,
      //   // delay: 10000,
      //   strategy: ({res}) => { return res.statusCode === 200 }
      // })
      .expectStatus(200)
      .expectResponseTime(10000)
  });

  it("get api call with expectJson", async () => {//expectJson(path,value) => if u use single path like data.id =1, this works
    await pactum.spec()                           // but if u do object level , we need to add all the details , otherwise it will fail
      .get('https://reqres.in/api/users/1')
      .withHeaders("x-api-key", "reqres-free-v1")
      .expectJson({
        "data": {
          "id": 1,
          "email": "george.bluth@reqres.in",
          "first_name": "George",
          "last_name": "Bluth",
          "avatar": "https://reqres.in/img/faces/1-image.jpg"
        },
        "support": {
          "url": "https://contentcaddy.io?utm_source=reqres&utm_medium=json&utm_campaign=referral",
          "text": "Tired of writing endless social media content? Let Content Caddy generate it for you."
        }
      });
  });

  it("get api call with expectJsonLike", async () => {//expectJsonLike({partialobject}) =>partially object works
    const response = await pactum
      .spec()
      .get("https://reqres.in/api/users/2")
      .withHeaders("x-api-key", "reqres-free-v1")
      .expectStatus(200)
      .expectJsonLike({
        data: {
          id: 2,
          first_name: 'Janet'
        },
        support :{
            text: "Tired of writing endless social media content? Let Content Caddy generate it for you."
        }
      })
  });

  it("get api call with expectJsonMatch", async () => {//expectJsonMatch(path,matcher) => import regex and use it 
    const response = await pactum
      .spec()
      .get("https://reqres.in/api/users/2")
      .withHeaders("x-api-key", "reqres-free-v1")
      .expectStatus(200)
      .expectJsonMatch('data',
        {
            first_name :string(),// match with string
            last_name :like('sha'),//anything like string
            id: regex(/\d+/),
            // email: email()
          //  email : regex(/\S+@\S+\.\S+/)
            email : regex(/\S+@\S+\.\S+/)//regex
        }
      )
      .expectJsonMatch('support',
        {
            url : any(),//any value string or number
            text : any('te')//any avalue but string
        }
      )
  });

it("get api call with expectJsonMatchStrict", async () => {//expectJsonMatchStrict(path,matcher) => just like expectjson strict deep equal
    const response = await pactum
      .spec()
      .get("https://reqres.in/api/users/2")
      .withHeaders("x-api-key", "reqres-free-v1")
      .expectStatus(200)
      .expectJsonMatchStrict('data',
        {
            first_name :string(),// match with string
            last_name :like('sha'),//anything like string
            id: int(),
            // email: email()
          //  email : regex(/\S+@\S+\.\S+/)
          //  email : regex(/\S+@\S+\.\S+/)//regex
        }
      )
     
  });

  it("get api call with expectJsonSchema", async () => {//expectJsonSchema(path, schema) => just like expectjson strict deep equal
    const response = await pactum
      .spec()
      .get("https://reqres.in/api/users/1")
      .withHeaders("x-api-key", "reqres-free-v1")
      .expectStatus(200)
      .expectJsonSchema('data', {
        type: 'object',
        properties : {
            id : { type : "integer"},
            email: { type : "string"},
            first_name:{ type : "string"},
            last_name:{ type : "string"},
            avatar:{ type : "string"}
        }})
      .expectJsonSchema('support', {
        type: 'object',
        });
     
  });
});
