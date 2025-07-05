const pactum = require('pactum');


describe('put apis',()=>
{
    pactum.request.setBaseUrl('https://reqres.in');
    const name = "morpheus";
    it('simple put',async ()=>
    {
       await pactum
                   .spec()
                   .put('/api/users/2')
                   .withHeaders("x-api-key", "reqres-free-v1")
                   .withBody(
                    {
                        name: `hero`,
                        job: "zion resident"
                    }
                   )
                   .expectStatus(200)
                   .expectJsonSchema({
                    type : 'object',
                    properties : {
                        name :{type: 'string'},
                        job: { type : 'string'},
                        updatedAt :{ type :"string"}
                    }
                }
                  )
                  .expectJsonSchema({
                    "type": "object"
                  });
     })

})