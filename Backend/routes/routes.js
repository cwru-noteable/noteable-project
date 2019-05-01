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

    // add a user [INCOMPLETE] //TODO: Finish linking collections to user automatically
	app.post('/users', (request, response) => {
		pool.query('INSERT INTO user SET ?', request.body,
			(error, result) => {
				if (error) throw error;
				response.status(201).send
				('User added with new collections!\n');
		});
	});

    //edit a user [COMPLETE]
	app.put('/users/:id', (request, response) => {
		const id = request.params.id;
		pool.query('UPDATE user SET ? WHERE U_ID = ?', [request.body, id]
		, (error, result) => {
			if(error) throw error;
			response.send('User updated successfully.\n');
		});
	});

    //delete a user [COMPLETE]
	app.delete('/users/:id', (request, response) => {
		 const id = request.params.id;
		pool.query('DELETE FROM user WHERE U_ID = ?', id,
		 (error, result) => {
			if (error) throw error;
             response.send('User deleted.\n');
		});
	});

    //display a specific user [COMPLETE]
	app.get('/users/:id', (request, response) => {
		const id = request.params.id;
		pool.query('SELECT * FROM user WHERE U_ID = ?', id, 
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

    //add table of implement collections [COMPLETE]
    app.post('/ImpColl', (request, response) => {
        pool.query('INSERT INTO Implement_Collection SET ?', request.body,
            (error, result) => {
                if (error) throw error;
                response.status(201).send
                    ('Implement Collection added!\n');
            });
    });

    //update table of implement collections [COMPLETE]
    app.put('/ImpColl/:id', (request, response) => {
        const id = request.params.id;
        pool.query('UPDATE Implement_Collection SET ? WHERE IC_ID = ?', [request.body, id]
            , (error, result) => {
                if (error) throw error;
                response.send('Implement Collection updated successfully.\n');
            });
    });

    //delete Implement Collection [COMPLETE]
    app.delete('/ImpColl/:id', (request, response) => {
        const id = request.params.id;
        pool.query('UPDATE Implement_Collection set U_ID = null where IC_ID = ?', id, (error, result) => {
            pool.query('DELETE FROM Implement_Collection WHERE IC_ID = ? ', id,
                (error, result) => {
                    if (error) throw error;
                    response.send('Implement Collection deleted.\n');
                });
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

    //add Other Collection [COMPLETE]
    app.post('/OthColl', (request, response) => {
        pool.query('INSERT INTO Other_Collection SET ?', request.body,
            (error, result) => {
                if (error) throw error;
                response.status(201).send
                    ('Other Collection added!\n');
            });
    });

    //edit Other Collection [COMPLETE]
    app.put('/OthColl/:id', (request, response) => {
        const id = request.params.id;
        pool.query('UPDATE Other_Collection SET ? WHERE OC_ID = ?', [request.body, id]
            , (error, result) => {
                if (error) throw error;
                response.send('Other Collection updated successfully.\n');
            });
    });

    //delete Other Collection [COMPLETE]
    app.delete('/OthColl/:id', (request, response) => {
        const id = request.params.id;
        pool.query('UPDATE Other_Collection set U_ID = null where OC_ID = ?', id,(error, result) => {
            pool.query('DELETE FROM Other_Collection WHERE OC_ID = ? ', id, 
            (error, result) => {
                if (error) throw error;
                response.send('Other Collection deleted.\n');

            });
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

    // ************Mechanical P**********
    //list all Mechanical Pencils [COMPLETE]
    app.get('/MechP', (request, response) => {
        pool.query('SELECT * FROM MechanicalP', (error, result) => {
            if (error) throw error;
            response.send(result);
        });
    });

    //add Mechanical Pencil [COMPLETE]
    app.post('/MechP', (request, response) => {
        pool.query('INSERT INTO MechanicalP SET ?', request.body,
            (error, result) => {
                if (error) throw error;
                response.status(201).send
                    ('Mechanical Pencil added!\n');
            });
    });

    //edit Mechanical Pencil [COMPLETE]
    app.put('/MechP/:id', (request, response) => {
        const id = request.params.id;
        pool.query('UPDATE MechanicalP SET ? WHERE MP_ID = ?', [request.body, id]
            , (error, result) => {
                if (error) throw error;
                response.send('Mechanical Pencil updated successfully.\n');
            });
    });

    //delete Mechanical Pencil [COMPLETE]
    app.delete('/MechP/:id', (request, response) => {
        const id = request.params.id;
        pool.query('DELETE FROM MechanicalP WHERE MP_ID = ? ', id,
            (error, result) => {
                if (error) throw error;
                response.send('Mechanical Pencil deleted.\n');

            });
    });

    // ************Fountain P**********

    // ************Cartridge P**********

    // ************Wood P**********

    // ************Lead************

    // ************Replacements************

    // ************Ink************

    // ************Pen Cartridge************

    // ************Utility************
}

module.exports = router;