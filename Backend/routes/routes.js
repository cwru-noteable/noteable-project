const pool = require ('../data/config');

const router = app => {
    app.get('/', (request, response) => {
        response.send({
            message: 'Noteable: Stationery in Motion'
        });
    });

    // ********USERS********
	app.get('/users', (request, response) => {
		pool.query('SELECT * FROM user', (error, result) => {
			if (error) throw error;
			response.send(result);
		});
	});
	app.post('/users', (request, response) => {
		pool.query('INSERT INTO user SET ?', request.body,
			(error, result) => {
				if (error) throw error;
				response.status(201).send
				('User added with ID: ${result.insertID}');
		});
	});

	app.put('/users/:id', (request, response) => {
		const id = request.params.id;
		pool.query('UPDATE user SET ? WHERE id = ?', [request.body, id]
		, (error, result) => {
			if(error) throw error;
			response.send('User updated successfully.');
		});
	});

	app.delete('/users/:id', (request, response) => {
		 const id = request.params.id;
		pool.query('DELETE FROM user WHERE id = ?', id,
		 (error, result) => {
			if (error) throw error;
			response.send('User deleted.');
		});
	});

	app.get('/users/:id', (request, response) => {
		const id = request.params.id;
		pool.query('SELECT * FROM user WHERE id = ?', id, 
			(error, result) => {
			if (error) throw error;
			response.send(result);
		});
    });


    // ************IMPLEMENT COLLECTION ****************

    app.get('/ImpColl', (request, response) => {
        pool.query('SELECT * FROM Implement_Collection', (error, result) => {
            if (error) throw error;
            response.send(result);
        });
    });
    app.post('/ImpColl', (request, response) => {
        pool.query('INSERT INTO Implement_Collection SET ?', request.body,
            (error, result) => {
                if (error) throw error;
                response.status(201).send
                    ('Implement Collection added with ID: ${result.insertID}');
            });
    });

    app.put('/ImpColl/:id', (request, response) => {
        const id = request.params.id;
        pool.query('UPDATE Implement_Collection SET ? WHERE IC_ID = ?', [request.body, id]
            , (error, result) => {
                if (error) throw error;
                response.send('Implement Collection updated successfully.');
            });
    });

    app.delete('/ImpColl/:id', (request, response) => {
        const id = request.params.id;
        pool.query('DELETE FROM Implement_Collection WHERE IC_ID = ?', id,
            (error, result) => {
                if (error) throw error;
                response.send('Implement Collection deleted.');
            });
    });

    app.get('/ImpColl/:id', (request, response) => {
        const id = request.params.id;
        pool.query('SELECT * FROM Implement_Collection WHERE IC_ID = ?', id,
            (error, result) => {
                if (error) throw error;
                response.send(result);
            });
    });

}

module.exports = router;

