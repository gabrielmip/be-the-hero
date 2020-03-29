const connection = require('../database/connection');

module.exports = {
    async create (request, response) {
        const {id} = request.body;
        const ngo = await connection('ngos')
            .where('id', id)
            .select('name')
            .first();

        if (!ngo) {
            return response.status(404)
                .json({error: 'No NGO found.'})
        }

        return response.json(ngo);
    }
}