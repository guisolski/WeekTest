const connection = require('../database/connections');

module.exports = {
   async  index(req, resp) {
    const ong_id = req.headers.authorization;
      const ongs = await connection('incidents').where('ong_id', ong_id).select('*');
      return resp.json(ongs);
   }
};