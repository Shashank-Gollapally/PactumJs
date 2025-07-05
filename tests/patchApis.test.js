const pactum = require('pactum');

describe('patch apis', () => {
    pactum.request.setBaseUrl('https://reqres.in');
    it('happy patch', async() => {

        await pactum
                    .spec()
                    .patch('/api/users/2')
                    .withHeaders("x-api-key", "reqres-free-v1")
                    .withBody(
                        
                            {
                                "name": "helo",
                            }
                        
                    )
                    .expectStatus(200);
        
    });
});