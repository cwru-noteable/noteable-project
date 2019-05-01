//get the server config from ../data/config.js
const pool = require('../data/config');

//Homepage JSON message
const router = app => {
    app.get('/', (request, response) => {
        response.send({
            message: 'Noteable: Stationery in Motion'
        });
    });

    // ********USERS********

    // list all users [COMPLETE]
	app.get('/users', (request, response) => {
		pool.query('SELECT * FROM user', (error, result) => {
			if (error) throw error;
			response.send(result);
		});
    });

    // add a user [INCOMPLETE]
	app.post('/users', (request, response) => {
		pool.query('INSERT INTO user SET ?', request.body,
			(error, result) => {
				if (error) throw error;
				response.status(201).send
				('User added with ID: ${result.insertID}');
		});
	});

    //edit a user [INCOMPLETE]
	app.put('/users/:id', (request, response) => {
		const id = request.params.id;
		pool.query('UPDATE user SET ? WHERE id = ?', [request.body, id]
		, (error, result) => {
			if(error) throw error;
			response.send('User updated successfully.');
		});
	});

    //delete a user [INCOMPLETE]
	app.delete('/users/:id', (request, response) => {
		 const id = request.params.id;
		pool.query('DELETE FROM user WHERE id = ?', id,
		 (error, result) => {
			if (error) throw error;
			response.send('User deleted.');
		});
	});

    //display a specific user [COMPLETE]
	app.get('/users/:id', (request, response) => {
		const id = request.params.id;
		pool.query('SELECT * FROM user WHERE id = ?', id, 
			(error, result) => {
			if (error) throw error;
			response.send(result);
		});
    });


    // ************IMPLEMENT COLLECTION ****************

    //get table of users to implement collections [COMPLETE]
    app.get('/ImpColl', (request, response) => {
        pool.query('SELECT * FROM Implement_Collection', (error, result) => {
            if (error) throw error;
            response.send(result);
        });
    });

    //edit table of implement collections [INCOMPLETE]
    app.post('/ImpColl', (request, response) => {
        pool.query('INSERT INTO Implement_Collection SET ?', request.body,
            (error, result) => {
                if (error) throw error;
                response.status(201).send
                    ('Implement Collection added with ID: ${result.insertID}');
            });
    });

    //update table of implement collections [INCOMPLETE]
    app.put('/ImpColl/:id', (request, response) => {
        const id = request.params.id;
        pool.query('UPDATE Implement_Collection SET ? WHERE IC_ID = ?', [request.body, id]
            , (error, result) => {
                if (error) throw error;
                response.send('Implement Collection updated successfully.');
            });
    });

    //delete table of implement collections [INCOMPLETE]
    app.delete('/ImpColl/:id', (request, response) => {
        const id = request.params.id;
        pool.query('DELETE FROM Implement_Collection WHERE IC_ID = ?', id,
            (error, result) => {
                if (error) throw error;
                response.send('Implement Collection deleted.');
            });
    });

    //get a list of items (currently selecting names) in an implement collection [COMPLETE] (weird null set handling)
    app.get('/ImpColl/:id', (request, response) => {
        const id = request.params.id;
        var aggregate = [];
        pool.query('SELECT FountainP.FP_Name FROM (Implement_Collection natural join IC_FP natural join FountainP) WHERE Implement_Collection.IC_ID = ? ', id,
            (error, result) => {
                if (error) throw error;
                aggregate.push(result);
                pool.query('SELECT CartridgeP.CP_Name FROM (Implement_Collection natural join IC_CP natural join CartridgeP) WHERE Implement_Collection.IC_ID = ? ', id,
                    (error, result) => {
                        if (error) throw error;
                        aggregate.push(result);
                        pool.query('SELECT WoodP.WP_Name FROM (Implement_Collection natural join IC_WP natural join WoodP) WHERE Implement_Collection.IC_ID = ? ', id,
                            (error, result) => {
                                if (error) throw error;
                                aggregate.push(result);
                                pool.query('SELECT MechanicalP.MP_Name FROM (Implement_Collection natural join IC_MP natural join MechanicalP ) WHERE Implement_Collection.IC_ID = ? ', id,
                                    (error, result) => {
                                        if (error) throw error;
                                        aggregate.push(result);
                                        response.send(aggregate);
                                    });
                            });
                    });
            });
    });
 
    // ************OTHER COLLECTION****************

    //list all Other Collections [COMPLETE]
    app.get('/OthColl', (request, response) => {
        pool.query('SELECT * FROM Other_Collection', (error, result) => {
            if (error) throw error;
            response.send(result);
        });
    });

    //add Other Collection [INCOMPLETE]
    app.post('/OthColl', (request, response) => {
        pool.query('INSERT INTO Other_Collection SET ?', request.body,
            (error, result) => {
                if (error) throw error;
                response.status(201).send
                    ('Other Collection added with ID: ${result.insertID}');
            });
    });

    //edit Other Collection [INCOMPLETE]
    app.put('/OthColl/:id', (request, response) => {
        const id = request.params.id;
        pool.query('UPDATE Other_Collection SET ? WHERE OC_ID = ?', [request.body, id]
            , (error, result) => {
                if (error) throw error;
                response.send('Other Collection updated successfully.');
            });
    });

    //delete Other Collection [INCOMPLETE]
    app.delete('/OthColl/:id', (request, response) => {
        const id = request.params.id;
        pool.query('DELETE FROM Other_Collection WHERE OC_ID = ?', id,
            (error, result) => {
                if (error) throw error;
                response.send('Other Collection deleted.');
            });
    });

    //get a list of items in an other collection [COMPLETE] (weird null set handling)
    app.get('/OthColl/:id', (request, response) => {
        const id = request.params.id;
        var aggregate = [];
        pool.query('SELECT Lead.L_Name FROM (Other_Collection natural join OC_L natural join Lead) WHERE Other_Collection.OC_ID = ? ', id,
            (error, result) => {
                if (error) throw error;
                aggregate.push(result);
                pool.query('SELECT Replacements.R_Name FROM (Other_Collection natural join OC_R natural join Replacements) WHERE Other_Collection.OC_ID = ? ', id,
                    (error, result) => {
                        if (error) throw error;
                        aggregate.push(result);
                        pool.query('SELECT Ink.I_Name FROM (Other_Collection natural join OC_I natural join Ink) WHERE Other_Collection.OC_ID = ? ', id,
                            (error, result) => {
                                if (error) throw error;
                                aggregate.push(result);
                                pool.query('SELECT Pen_Cartridge.PC_Name FROM (Other_Collection natural join OC_PC natural join Pen_Cartridge) WHERE Other_Collection.OC_ID = ? ', id,
                                    (error, result) => {
                                        if (error) throw error;
                                        aggregate.push(result);
                                        pool.query('SELECT Utility.U_Name FROM (Other_Collection natural join OC_U natural join Utility) WHERE Other_Collection.OC_ID = ? ', id,
                                            (error, result) => {
                                                if (error) throw error;
                                                aggregate.push(result);
                                                response.send(aggregate);
                                            });
                                    });
                            });
                    });
            });
    });

}

module.exports = router;