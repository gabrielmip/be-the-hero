const connection = require('../database/connection');

module.exports = {

    async index(request, response) {
        const ngoId = request.headers.authorization;
        if (!ngoId) {
            return response.status(400).json({
                error: 'No authorization header sent.'
            });
        }

        const incidents = await connection('incidents')
            .where('ngo_id', ngoId)
            .select('*');

        return response.json(incidents);
    }

}