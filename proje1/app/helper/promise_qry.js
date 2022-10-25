const {db} = require('../config/db.config');

exports.run = async (sql) => {
	return new Promise(function (resolve, reject) {
		db.query(sql, (err, query_result) => 
		{
			//db.end()
			if(err) 
			{
				console.log("DB query error:  ", err.message);
				reject(err) //  connect EHOSTUNREACH
			}
			else
			{
				resolve(query_result.rows)
			}
		})
	})
}