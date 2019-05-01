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
        var responses = [];
        pool.query('SELECT FountainP.FP_Name FROM (Implement_Collection natural join IC_FP natural join FountainP) WHERE Implement_Collection.IC_ID = ? ', id,
            (error, result) => {
                if (error) throw error;
                responses.push(result);
                pool.query('SELECT CartridgeP.CP_Name FROM (Implement_Collection natural join IC_CP natural join CartridgeP) WHERE Implement_Collection.IC_ID = ? ', id,
                    (error, result) => {
                        if (error) throw error;
                        responses.push(result);
                        pool.query('SELECT WoodP.WP_Name FROM (Implement_Collection natural join IC_WP natural join WoodP) WHERE Implement_Collection.IC_ID = ? ', id,
                            (error, result) => {
                                if (error) throw error;
                                responses.push(result);
                                pool.query('SELECT MechanicalP.MP_Name FROM (Implement_Collection natural join IC_MP natural join MechanicalP ) WHERE Implement_Collection.IC_ID = ? ', id,
                                    (error, result) => {
                                        if (error) throw error;
                                        responses.push(result);
                                        response.send(responses);
                                    });
                            });
                    });
            });
    });
    //inner join IC_FP on IC_FP.IC_ID = Implement_Collection.IC_ID) inner join FountainP on IC_FP.FP_ID = FountainP.FP_ID)
    // ************OTHER COLLECTION****************

    app.get('/OthColl', (request, response) => {
        pool.query('SELECT * FROM Other_Collection', (error, result) => {
            if (error) throw error;
            response.send(result);
        });
    });
    app.post('/OthColl', (request, response) => {
        pool.query('INSERT INTO Other_Collection SET ?', request.body,
            (error, result) => {
                if (error) throw error;
                response.status(201).send
                    ('Other Collection added with ID: ${result.insertID}');
            });
    });

    app.put('/OthColl/:id', (request, response) => {
        const id = request.params.id;
        pool.query('UPDATE Other_Collection SET ? WHERE OC_ID = ?', [request.body, id]
            , (error, result) => {
                if (error) throw error;
                response.send('Other Collection updated successfully.');
            });
    });

    app.delete('/OthColl/:id', (request, response) => {
        const id = request.params.id;
        pool.query('DELETE FROM Other_Collection WHERE OC_ID = ?', id,
            (error, result) => {
                if (error) throw error;
                response.send('Other Collection deleted.');
            });
    });

    app.get('/OthColl/:id', (request, response) => {
        const id = request.params.id;
        pool.query('SELECT * FROM ((Other_Collection inner join OC_L on OC_L.OC_ID=Other_Collection.OC_ID) inner join Lead on OC_L.L_ID = Lead.L_ID) WHERE Other_Collection.OC_ID = ?', id, (error, result) => {
            if (error) throw error;
            response.send(result);
        });
    });

}

module.exports = router;