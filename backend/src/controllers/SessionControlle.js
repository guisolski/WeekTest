const connection = require('../database/connections');

module.exports = {
    async  create(req, resp) {
        const { id } = req.body;
        console.log(id);
        const ong = await (await connection('ongs').where('id', id)
        .select('name'))[0]
        ;
        console.log(ong)
        if (!ong) {
            return resp.status(400).json({ "error": 'No found' });
        }
        return resp.json(ong);

    }
};