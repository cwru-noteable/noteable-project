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

    //get a list of items (currently selecting names) in an implement collection [COMPLETE]
    app.get('/ImpColl/:id', (request, response) => {
        const id = request.params.id;
        pool.query('SELECT FountainP.FP_Name FROM (Implement_Collection natural join IC_FP natural join FountainP) WHERE Implement_Collection.IC_ID = ? UNION ALL SELECT CartridgeP.CP_Name FROM (Implement_Collection natural join IC_CP natural join CartridgeP) WHERE Implement_Collection.IC_ID = ? UNION ALL SELECT MechanicalP.MP_Name FROM (Implement_Collection natural join IC_MP natural join MechanicalP) WHERE Implement_Collection.IC_ID = ? UNION ALL SELECT WoodP.WP_Name FROM (Implement_Collection natural join IC_WP natural join WoodP) WHERE Implement_Collection.IC_ID = ?', [id, id, id , id],
            (error, result) => {
                if (error) throw error;              
                response.send(result);
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

    //get a list of items in an other collection [COMPLETE]
    app.get('/OthColl/:id', (request, response) => {
        const id = request.params.id;
        var aggregate = [];
        pool.query('SELECT Utility.U_Name FROM (Other_Collection natural join OC_U natural join Utility) WHERE Other_Collection.OC_ID = ? UNION ALL SELECT Ink.I_Name FROM (Other_Collection natural join OC_I natural join Ink) WHERE Other_Collection.OC_ID = ? UNION ALL SELECT Lead.L_Name FROM (Other_Collection natural join OC_L natural join Lead) WHERE Other_Collection.OC_ID = ? UNION ALL SELECT Replacements.R_Name FROM (Other_Collection natural join OC_R natural join Replacements) WHERE Other_Collection.OC_ID = ? UNION ALL SELECT Pen_Cartridge.PC_Name FROM (Other_Collection natural join OC_PC natural join Pen_Cartridge) WHERE Other_Collection.OC_ID = ?', [id, id, id, id, id],
            (error, result) => {
                if (error) throw error;
                response.send(result);
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
    //list all Fountain Pens [COMPLETE]
    app.get('/FountP', (request, response) => {
        pool.query('SELECT * FROM FountainP', (error, result) => {
            if (error) throw error;
            response.send(result);
        });
    });

    //add Fountain Pen [COMPLETE]
    app.post('/FountP', (request, response) => {
        pool.query('INSERT INTO FountainP SET ?', request.body,
            (error, result) => {
                if (error) throw error;
                response.status(201).send
                    ('Fountain Pen added!\n');
            });
    });

    //edit Fountain Pen [COMPLETE]
    app.put('/FountP/:id', (request, response) => {
        const id = request.params.id;
        pool.query('UPDATE FountainP SET ? WHERE FP_ID = ?', [request.body, id]
            , (error, result) => {
                if (error) throw error;
                response.send('Fountain Pen updated successfully.\n');
            });
    });

    //delete Fountain Pen [COMPLETE]
    app.delete('/FountP/:id', (request, response) => {
        const id = request.params.id;
        pool.query('DELETE FROM FountainP WHERE FP_ID = ? ', id,
            (error, result) => {
                if (error) throw error;
                response.send('Fountain Pen deleted.\n');

            });
    });


    // ************Cartridge P**********
    //list all Cartridge Pens [COMPLETE]
    app.get('/CartP', (request, response) => {
        pool.query('SELECT * FROM CartridgeP', (error, result) => {
            if (error) throw error;
            response.send(result);
        });
    });

    //add Cartridge Pen [COMPLETE]
    app.post('/CartP', (request, response) => {
        pool.query('INSERT INTO CartridgeP SET ?', request.body,
            (error, result) => {
                if (error) throw error;
                response.status(201).send
                    ('Cartridge Pen added!\n');
            });
    });

    //edit Cartridge Pen [COMPLETE]
    app.put('/CartP/:id', (request, response) => {
        const id = request.params.id;
        pool.query('UPDATE CartridgeP SET ? WHERE CP_ID = ?', [request.body, id]
            , (error, result) => {
                if (error) throw error;
                response.send('Cartridge Pen updated successfully.\n');
            });
    });

    //delete Cartridge Pen [COMPLETE]
    app.delete('/CartP/:id', (request, response) => {
        const id = request.params.id;
        pool.query('DELETE FROM CartridgeP WHERE CP_ID = ? ', id,
            (error, result) => {
                if (error) throw error;
                response.send('Cartridge Pen deleted.\n');

            });
    });

    // ************Wood P**********
    //list all Wood Pencils [COMPLETE]
    app.get('/WoodP', (request, response) => {
        pool.query('SELECT * FROM WoodP', (error, result) => {
            if (error) throw error;
            response.send(result);
        });
    });

    //add Wood Pencil [COMPLETE]
    app.post('/WoodP', (request, response) => {
        pool.query('INSERT INTO WoodP SET ?', request.body,
            (error, result) => {
                if (error) throw error;
                response.status(201).send
                    ('Wood Pencil added!\n');
            });
    });

    //edit Wood Pencil [COMPLETE]
    app.put('/WoodP/:id', (request, response) => {
        const id = request.params.id;
        pool.query('UPDATE WoodP SET ? WHERE WP_ID = ?', [request.body, id]
            , (error, result) => {
                if (error) throw error;
                response.send('Wood Pencil updated successfully.\n');
            });
    });

    //delete Wood Pencil [COMPLETE]
    app.delete('/WoodP/:id', (request, response) => {
        const id = request.params.id;
        pool.query('DELETE FROM WoodP WHERE WP_ID = ? ', id,
            (error, result) => {
                if (error) throw error;
                response.send('Wood Pencil deleted.\n');

            });
    });

    // ************Lead************
    //list all Lead [COMPLETE]
    app.get('/Lead', (request, response) => {
        pool.query('SELECT * FROM Lead', (error, result) => {
            if (error) throw error;
            response.send(result);
        });
    });

    //add Lead [COMPLETE]
    app.post('/Lead', (request, response) => {
        pool.query('INSERT INTO Lead SET ?', request.body,
            (error, result) => {
                if (error) throw error;
                response.status(201).send
                    ('Lead added!\n');
            });
    });

    //edit Lead [COMPLETE]
    app.put('/Lead/:id', (request, response) => {
        const id = request.params.id;
        pool.query('UPDATE Lead SET ? WHERE L_ID = ?', [request.body, id]
            , (error, result) => {
                if (error) throw error;
                response.send('Lead updated successfully.\n');
            });
    });

    //delete Lead [COMPLETE]
    app.delete('/Lead/:id', (request, response) => {
        const id = request.params.id;
        pool.query('DELETE FROM Lead WHERE L_ID = ? ', id,
            (error, result) => {
                if (error) throw error;
                response.send('Lead deleted.\n');

            });
    });

    // ************Replacements************
    //list all Replacements [COMPLETE]
    app.get('/Repl', (request, response) => {
        pool.query('SELECT * FROM Replacements', (error, result) => {
            if (error) throw error;
            response.send(result);
        });
    });

    //add Replacement [COMPLETE]
    app.post('/Repl', (request, response) => {
        pool.query('INSERT INTO Replacements SET ?', request.body,
            (error, result) => {
                if (error) throw error;
                response.status(201).send
                    ('Replacement added!\n');
            });
    });

    //edit Replacement [COMPLETE]
    app.put('/Repl/:id', (request, response) => {
        const id = request.params.id;
        pool.query('UPDATE Replacements SET ? WHERE R_ID = ?', [request.body, id]
            , (error, result) => {
                if (error) throw error;
                response.send('Replacement updated successfully.\n');
            });
    });

    //delete Replacement [COMPLETE]
    app.delete('/Repl/:id', (request, response) => {
        const id = request.params.id;
        pool.query('DELETE FROM Replacements WHERE R_ID = ? ', id,
            (error, result) => {
                if (error) throw error;
                response.send('Replacement deleted.\n');

            });
    });

    // ************Ink************
    //list all Ink [COMPLETE]
    app.get('/Ink', (request, response) => {
        pool.query('SELECT * FROM Ink', (error, result) => {
            if (error) throw error;
            response.send(result);
        });
    });

    //add Ink [COMPLETE]
    app.post('/Ink', (request, response) => {
        pool.query('INSERT INTO Ink SET ?', request.body,
            (error, result) => {
                if (error) throw error;
                response.status(201).send
                    ('Ink added!\n');
            });
    });

    //edit Ink [COMPLETE]
    app.put('/Ink/:id', (request, response) => {
        const id = request.params.id;
        pool.query('UPDATE Ink SET ? WHERE I_ID = ?', [request.body, id]
            , (error, result) => {
                if (error) throw error;
                response.send('Ink updated successfully.\n');
            });
    });

    //delete Ink [COMPLETE]
    app.delete('/Ink/:id', (request, response) => {
        const id = request.params.id;
        pool.query('DELETE FROM Ink WHERE I_ID = ? ', id,
            (error, result) => {
                if (error) throw error;
                response.send('Ink deleted.\n');

            });
    });

    // ************Pen Cartridge************
    //list all Pen Cartridges [COMPLETE]
    app.get('/PenC', (request, response) => {
        pool.query('SELECT * FROM Pen_Cartridge', (error, result) => {
            if (error) throw error;
            response.send(result);
        });
    });

    //add Pen Cartridge [COMPLETE]
    app.post('/PenC', (request, response) => {
        pool.query('INSERT INTO Pen_Cartridge SET ?', request.body,
            (error, result) => {
                if (error) throw error;
                response.status(201).send
                    ('Pen Cartridge added!\n');
            });
    });

    //edit Pen Cartridge [COMPLETE]
    app.put('/PenC/:id', (request, response) => {
        const id = request.params.id;
        pool.query('UPDATE Pen_Cartridge SET ? WHERE PC_ID = ?', [request.body, id]
            , (error, result) => {
                if (error) throw error;
                response.send('Pen Cartridge updated successfully.\n');
            });
    });

    //delete Pen Cartridge [COMPLETE]
    app.delete('/PenC/:id', (request, response) => {
        const id = request.params.id;
        pool.query('DELETE FROM Pen_Cartridge WHERE PC_ID = ? ', id,
            (error, result) => {
                if (error) throw error;
                response.send('Pen Cartridge deleted.\n');

            });
    });

    // ************Utility************
    //list all Utility [COMPLETE]
    app.get('/Utility', (request, response) => {
        pool.query('SELECT * FROM Utility', (error, result) => {
            if (error) throw error;
            response.send(result);
        });
    });

    //add Utility [COMPLETE]
    app.post('/Utility', (request, response) => {
        pool.query('INSERT INTO Utility SET ?', request.body,
            (error, result) => {
                if (error) throw error;
                response.status(201).send
                    ('Utility added!\n');
            });
    });

    //edit Utility [COMPLETE]
    app.put('/Utility/:id', (request, response) => {
        const id = request.params.id;
        pool.query('UPDATE Util SET ? WHERE U_ID = ?', [request.body, id]
            , (error, result) => {
                if (error) throw error;
                response.send('Utility updated successfully.\n');
            });
    });

    //delete Utility [COMPLETE]
    app.delete('/Utility/:id', (request, response) => {
        const id = request.params.id;
        pool.query('DELETE FROM Utility WHERE U_ID = ? ', id,
            (error, result) => {
                if (error) throw error;
                response.send('Utility deleted.\n');

            });
    });
}

module.exports = router;