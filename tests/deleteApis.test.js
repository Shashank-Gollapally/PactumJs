const pactum = require('pactum');

describe('delete apis', () => {
    pactum.request.setBaseUrl('https://reqres.in');
    it('happy delete', async() => {

        await pactum
                    .spec()
                    .delete('/api/users/2')
                    .withHeaders("x-api-key", "reqres-free-v1")
                    .expectStatus(204);
        
    });
});