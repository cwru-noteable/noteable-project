//get the server config from ../data/config.js
const pool = require('../data/config');
const request = require('request');
const mysql = require('mysql');

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

    // add a user [COMPLETE]
    app.post('/users', (request, response) => {
        pool.query('SELECT * FROM (SELECT U_ID FROM user ORDER BY U_ID DESC) AS A LIMIT 1', (error, result) => {
            var uid = result[0].U_ID + 1;
            pool.query('SELECT * FROM (SELECT OC_ID FROM Other_Collection ORDER BY OC_ID DESC) AS A LIMIT 1', (error, result) => {
                var oid = result[0].OC_ID + 1;
                pool.query('SELECT * FROM (SELECT IC_ID FROM Implement_Collection ORDER BY IC_ID DESC) AS A LIMIT 1', (error, result) => {
                    var iid = result[0].IC_ID + 1;
                    pool.query('INSERT INTO Implement_Collection VALUES(?,null);INSERT INTO Other_Collection VALUES(?,null);INSERT INTO user VALUES(?,?,?,?);UPDATE Other_Collection SET U_ID = ? WHERE OC_ID = ?;UPDATE Implement_Collection SET U_ID = ? WHERE IC_ID = ?;', [iid, oid, uid, request.body.username, iid, oid, uid, oid, uid, iid],
                        (error, result) => {
                            if (error) throw error;
                            response.status(201).send
                                ('User added with new collections!\n');
                    });
                });
            });
        });
	});

    //edit a user [COMPLETE]
	app.put('/users/:id', (request, response) => {
		const id = request.params.id;
		pool.query('UPDATE user SET ? WHERE U_ID = ?', [request.body, id], (error, result) => {
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

    //display a user's collection [COMPLETE] (wow this is broken)
    app.get('/users/:id/collection', (request, response) => {
		const id = request.params.id;
	    query = '(SELECT FountainP.FP_Name, FountainP.FP_ID, FountainP.FP_Manufacturer FROM (Implement_Collection natural join IC_FP natural join FountainP)WHERE Implement_Collection.IC_ID = -1)'
        if (request.body.fountainPens)
            query = query + 'UNION ALL (SELECT FountainP.FP_Name, FountainP.FP_ID, FountainP.FP_Manufacturer FROM (Implement_Collection natural join IC_FP natural join FountainP) WHERE Implement_Collection.IC_ID = ?)';
        if (request.body.cartridgePens)
            query = query + 'UNION ALL (SELECT CartridgeP.CP_Name, CartridgeP.CP_ID, CartridgeP.CP_Manufacturer FROM (Implement_Collection natural join IC_CP natural join CartridgeP) WHERE Implement_Collection.IC_ID = ?)';
        if (request.body.mechanicalPencils)
            query = query + 'UNION ALL (SELECT MechanicalP.MP_Name, MechanicalP.MP_ID, MechanicalP.MP_Manufacturer FROM (Implement_Collection natural join IC_MP natural join MechanicalP) WHERE Implement_Collection.IC_ID = ?)';
        if (request.body.woodPencils)
            query = query + 'UNION ALL (SELECT WoodP.WP_Name, WoodP.WP_ID, WoodP.WP_Manufacturer FROM (Implement_Collection natural join IC_WP natural join WoodP) WHERE Implement_Collection.IC_ID = ?)';
        if (request.body.lead)
            query = query + 'UNION ALL (SELECT Lead.L_Name, Lead.L_ID, Lead.L_Manufacturer FROM (Other_Collection natural join OC_L natural join Lead) WHERE Other_Collection.OC_ID = ?)';
        if (request.body.replacements)
            query = query + 'UNION ALL (SELECT Replacements.R_Name, Replacements.R_ID, Replacements.R_Manufacturer FROM (Other_Collection natural join OC_R natural join Replacements) WHERE Other_Collection.OC_ID = ?)';
        if (request.body.ink)
            query = query + ' UNION ALL (SELECT Ink.I_Name, Ink.I_ID, Ink.I_Manufacturer FROM (Other_Collection natural join OC_I natural join Ink) WHERE Other_Collection.OC_ID = ?)';
        if (request.body.penCartridge)
            query = query + 'UNION ALL (SELECT Pen_Cartridge.PC_Name, Pen_Cartridge.PC_ID, Pen_Cartridge.PC_Manufacturer FROM (Other_Collection natural join OC_PC natural join Pen_Cartridge) WHERE Other_Collection.OC_ID = ?)';
        if (request.body.utility)
            query = query + 'UNION ALL (SELECT Utility.U_Name, Utility.U_ID, Utility.U_Manufacturer FROM (Other_Collection natural join OC_U natural join Utility) WHERE Other_Collection.OC_ID = ?)';
            pool.query(query, [id, id, id, id, id, id, id, id, id],
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

    //Add to implement collection (using a string) (BROKEN)
    app.post('/ImpColl/:id/add', (request, res) => {
        const iid = request.params.id;
        const target = request.body.target;
        const name = request.body.name;
        if (target == "MechanicalP") {
            pool.query('SELECT MP_ID FROM MechanicalP WHERE MP_Name = ?', name, (error, response) => {
                var targid = response[0].MP_ID;
                pool.query('INSERT INTO IC_MP (IC_ID, MP_ID) VALUES (?, ?)', [iid, targid], (error, result) => {
                    if (error) throw error;
                    res.send('Added Mechanical Pencil to Collection!\n');
                });
            });
        }
        else if (target == "FountainP") {
            pool.query('SELECT FP_ID FROM FountainP WHERE FP_Name = ?', name, (error, response) => {
                var targid = response[0].FP_ID;
                pool.query('INSERT INTO IC_FP (IC_ID, FP_ID) VALUES (?, ?)', [iid, targid], (error, response) => {
                    if (error) throw error;
                    res.send("Added Fountain Pen to Collection!");
                });
            });
        }
        else if (target == "WoodP") {
            pool.query('SELECT WP_ID FROM WoodP WHERE WP_Name = ?', name, (error, response) => {
                var targid = response[0].WP_ID;
                pool.query('INSERT INTO IC_WP (IC_ID, WP_ID) VALUES (?, ?)', [iid, targid], (error, response) => {
                    if (error) throw error;
                    res.send("Added Wood Pencil to Collection!");
                });
            });

        }
        else if (target == "CartridgeP") {
            pool.query('SELECT CP_ID FROM CartridgeP WHERE CP_Name = ?', name, (error, response) => {
                var targid = response[0].CP_ID;
                pool.query('INSERT INTO IC_CP (IC_ID, CP_ID) VALUES (?, ?)', [iid, targid], (error, response) => {
                    if (error) throw error;
                    res.send("Added Cartridge Pen to Collection!");
                });
            });

        }
        else {
            res.send({message: 'Category not found.'});
        }
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

    //Add to other collection (using a string) [UNTESTED] (BROKEN)
    app.post('/OthColl/:id/add', (request, res) => {
        const id = request.params.id;
        const target = request.body.target;
        const name = request.body.name;
        if (target == "Lead") {
            pool.query('SELECT L_ID FROM Lead WHERE L_Name = ?', name, (error, response) => {
                var targid = response[0].L_ID;
                pool.query('INSERT INTO OC_L (OC_ID, L_ID) VALUES (?, ?)', [id, targid], (error, result) => {
                    if (error) throw error;
                    res.send('Added Lead to Collection!.\n');
                });
            });
        }
        else if (target == "Replacements") {
            pool.query('SELECT R_ID FROM Replacements WHERE R_Name = ?', name, (error, response) => {
                var targid = response[0].FP_ID;
                pool.query('INSERT INTO OC_R (OC_ID, R_ID) VALUES (?, ?)', [id, targid], (error, response) => {
                    if (error) throw error;
                    res.send("Added Replacement to Collection!");
                });
            });
        }
        else if (target == "Ink") {
            pool.query('SELECT I_ID FROM Ink WHERE I_Name = ?', name, (error, response) => {
                var targid = response[0].WP_ID;
                pool.query('INSERT INTO OC_I (OC_ID, I_ID) VALUES (?, ?)', [id, targid], (error, response) => {
                    if (error) throw error;
                    res.send("Added Ink to Collection!");
                });
            });

        }
        else if (target == "Pen_Cartridge") {
            pool.query('SELECT PC_ID FROM Pen_Cartridge WHERE PC_Name = ?', name, (error, response) => {
                var targid = response[0].PC_ID;
                pool.query('INSERT INTO OC_PC (OC_ID, PC_ID) VALUES (?, ?)', [id, targid], (error, response) => {
                    if (error) throw error;
                    res.send("Added Pen Cartridge to Collection!");
                });
            });

        }
        else if (target == "Utility") {
            pool.query('SELECT U_ID FROM Utility WHERE U_Name = ?', name, (error, response) => {
                var targid = response[0].U_ID;
                pool.query('INSERT INTO OC_U (OC_ID, U_ID) VALUES (?, ?)', [id, targid], (error, response) => {
                    if (error) throw error;
                    res.send("Added Utility to Collection!");
                });
            });

        }
        else {
            res.send({ message: 'Category not found.' });
        }
    });

    // ************GALLERY**********
    app.get('/gallery', (request, response) => {
        //TO BE DONE (takes the same boolean from specific users)
    });

    app.post('/gallery', (request, response) => {
        const type = request.body.basicAtts.type;
        const name = request.body.basicAtts.ItemName;
        const manufacturer = request.body.basicAtts.manufacturer;
        if (type == "Lead") {
            pool.query('SELECT * FROM (SELECT L_ID FROM Lead ORDER BY L_ID DESC) AS A LIMIT 1', (error, result) => {
                const id = result[0].L_ID + 1;
                const size = request.body.stats.size;
                pool.query('INSERT INTO Lead (L_ID, L_Name, L_Manufacturer, L_Size) VALUES (?, ?, ?, ?)', [id, name, manufacturer, size], (error, result) => {
                    if (error) throw error;
                    response.status(201).send('Added Lead to Gallery!.\n');
                });
            });
        }
        else if (type == "Replacements") {
            pool.query('SELECT * FROM (SELECT R_ID FROM Replacements ORDER BY R_ID DESC) AS A LIMIT 1', (error, result) => {
                const id = result[0].R_ID + 1;
                const rtype = request.body.stats.replacementType;
                pool.query('INSERT INTO Replacements (R_ID, R_Name, R_Manufacturer, R_Type) VALUES (?, ?, ?, ?)', [id, name, manufacturer, rtype], (error, result) => {
                    if (error) throw error;
                    response.status(201).send('Added Replacement to Gallery!.\n');
                });
            });
        }
        else if (type == "Ink") {
            pool.query('SELECT * FROM (SELECT I_ID FROM Ink ORDER BY I_ID DESC) AS A LIMIT 1', (error, result) => {
                const id = result[0].I_ID + 1;
                const color = request.body.stats.color;
                pool.query('INSERT INTO Ink (I_ID, I_Name, I_Manufacturer, I_Color) VALUES (?, ?, ?, ?)', [id, name, manufacturer, color], (error, result) => {
                    if (error) throw error;
                    response.status(201).send('Added Ink to Gallery!.\n');
                });
            });
        }
        else if (type == "penCartridge") {
            pool.query('SELECT * FROM (SELECT PC_ID FROM Pen_Cartridge ORDER BY PC_ID DESC) AS A LIMIT 1', (error, result) => {
                const id = result[0].PC_ID + 1;
                const pcType = request.body.stats.cartridgeType;
                pool.query('INSERT INTO Pen_Cartridge (PC_ID, PC_Name, PC_Manufacturer, PC_Type) VALUES (?, ?, ?, ?)', [id, name, manufacturer, pcType], (error, result) => {
                    if (error) throw error;
                    response.status(201).send('Added Pen Cartridge to Gallery!.\n');
                });
            });
        }
        else if (type == "Utility") {
            pool.query('SELECT * FROM (SELECT U_ID FROM Utility ORDER BY U_ID DESC) AS A LIMIT 1', (error, result) => {
                const id = result[0].UC_ID + 1;
                const uType = request.body.stats.utilityType;
                pool.query('INSERT INTO Utility (U_ID, U_Name, U_Manufacturer, U_Type) VALUES (?, ?, ?, ?)', [id, name, manufacturer, pcType], (error, result) => {
                    if (error) throw error;
                    response.status(201).send('Added Utility to Gallery!.\n');
                });
            });
        }
        else if (type == "mechanicalPencil") {
            pool.query('SELECT * FROM (SELECT MP_ID FROM MechanicalP ORDER BY MP_ID DESC) AS A LIMIT 1', (error, result) => {
                const id = result[0].MP_ID + 1;
                const material = request.body.stats.material;
                const size = request.body.stats.leadSize;
                pool.query('INSERT INTO MechanicalP (MP_ID, MP_Name, MP_Manufacturer, MP_Material, MP_Lead_Size) VALUES (?, ?, ?, ?)', [id, name, manufacturer, material, size], (error, result) => {
                    if (error) throw error;
                    response.status(201).send('Added Mechanical Pencil to Gallery!.\n');
                });
            });
        }
        else if (type == "fountainPen") {
            pool.query('SELECT * FROM (SELECT FP_ID FROM FountainP ORDER BY FP_ID DESC) AS A LIMIT 1', (error, result) => {
                const id = result[0].FP_ID + 1;
                const material = request.body.stats.material;
                const inkType = request.body.stats.inkType;
                pool.query('INSERT INTO FountainP (FP_ID, FP_Name, FP_Manufacturer, FP_Material, FP_Ink_Type) VALUES (?, ?, ?, ?)', [id, name, manufacturer, material, inkType], (error, result) => {
                    if (error) throw error;
                    response.status(201).send('Added Fountain Pen to Gallery!.\n');
                });
            });
        }
        else if (type == "cartridgePen") {
            pool.query('SELECT * FROM (SELECT CP_ID FROM CartridgeP ORDER BY CP_ID DESC) AS A LIMIT 1', (error, result) => {
                const id = result[0].CP_ID + 1;
                const material = request.body.stats.material;
                pool.query('INSERT INTO CartridgeP (CP_ID, CP_Name, CP_Manufacturer, CP_Material) VALUES (?, ?, ?, ?)', [id, name, manufacturer, material], (error, result) => {
                    if (error) throw error;
                    response.status(201).send('Added Cartridge Pen to Gallery!.\n');
                });
            });
        }
        else if (type == "woodPencil") {
            pool.query('SELECT * FROM (SELECT WP_ID FROM WoodP ORDER BY WP_ID DESC) AS A LIMIT 1', (error, result) => {
                const id = result[0].WP_ID + 1;
                const material = request.body.stats.material;
                pool.query('INSERT INTO WoodP (WP_ID, WP_Name, WP_Manufacturer, WP_Material) VALUES (?, ?, ?, ?)', [id, name, manufacturer, material], (error, result) => {
                    if (error) throw error;
                    response.status(201).send('Added Wood Pencil to Gallery!.\n');
                });
            });
        }
    });

    app.put('/gallery', (request, response) => {
        const type = request.body.basicAtts.type;
        const name = request.body.basicAtts.itemName;
        const manufacturer = request.body.basicAtts.manufacturer;
        const id = request.body.basicAtts.itemID;
        if (type == "Lead") {
            const size = request.body.stats.size;
            pool.query('UPDATE Lead SET L_Name = ?, L_Manufacturer = ?, L_Size = ? WHERE L_ID = ?', [name, manufacturer, size, id], (error, result) => {
                if (error) throw error;
                response.status(200).send('Updated Lead!\n');
            });
        }
        else if (type == "Replacements") {
            const rtype = request.body.stats.replacementType;
            pool.query('UPDATE Replacements SET R_Name = ?, R_Manufacturer = ?, R_Type = ? WHERE R_ID = ?', [name, manufacturer, rtype, id], (error, result) => {                if (error) throw error;
                if (error) throw error;
                response.status(200).send('Updated Replacement!\n');
            });
        }
        else if (type == "Ink") {
            const color = request.body.stats.color;
            pool.query('UPDATE Ink SET I_Name = ?, I_Manufacturer = ?, I_Color = ? WHERE I_ID = ?', [name, manufacturer, color, id], (error, result) => {
                if (error) throw error;
                response.status(200).send('Updated Ink!\n');
            });
        }
        else if (type == "penCartridge") {
            const pcType = request.body.stats.cartridgeType;
            pool.query('UPDATE Pen_Cartridge SET PC_Name = ?, PC_Manufacturer = ?, PC_Type = ? WHERE PC_ID = ?', [name, manufacturer, pcType, id], (error, result) => {
                if (error) throw error;
                response.status(200).send('Updated Pen Cartridge!\n');
            });
        }
        else if (type == "Utility") {
            const uType = request.body.stats.utilityType;
            pool.query('UPDATE Utility SET U_Name = ?, U_Manufacturer = ?, U_Type = ? WHERE U_ID = ?', [name, manufacturer, uType, id], (error, result) => {
                if (error) throw error;
                response.status(200).send('Updated Utility!\n');
            });
        }
        else if (type == "mechanicalPencil") {
            const material = request.body.stats.material;
            const size = request.body.stats.leadSize;
            pool.query('UPDATE MechanicalP SET MP_Name = ?, MP_Manufacturer = ?, MP_Material = ?, MP_Lead_Size = ? WHERE PC_ID = ?', [name, manufacturer, material, size, id], (error, result) => {
                if (error) throw error;
                response.status(200).send('Updated Mechanical Pencil!\n');
            });
        }
        else if (type == "fountainPen") {
            const material = request.body.stats.material;
            const inkType = request.body.stats.inkType;
            pool.query('UPDATE FountainP SET FP_Name = ?, FP_Manufacturer = ?, FP_Material = ?, FP_Ink_Type = ? WHERE FP_ID = ?', [name, manufacturer, material, inkType, id], (error, result) => {
                if (error) throw error;
                response.status(200).send('Updated Fountain Pen!\n');
            });
        }
        else if (type == "cartridgePen") {
            const material = request.body.stats.material;
            pool.query('UPDATE CartridgeP SET CP_Name = ?, CP_Manufacturer = ?, CP_Material = ?, WHERE CP_ID = ?', [name, manufacturer, material, id], (error, result) => {
                if (error) throw error;
                response.status(200).send('Updated Cartridge Pen!\n');
            });
        }
        else if (type == "woodPencil") {
            const material = request.body.stats.material;
            pool.query('UPDATE WoodP SET WP_Name = ?, WP_Manufacturer = ?, WP_Material = ?, WHERE WP_ID = ?', [name, manufacturer, material, id], (error, result) => {
                if (error) throw error;
                response.status(200).send('Updated Wood Pencil!\n');
            });
        }
    });

    // ************Collections**********
    app.get('/collection/:u_name', (request, response) => {
        pool.query('SELECT IC_ID, OC_ID FROM user WHERE U_Name = ?', request.params.u_name, (request, response) => {
            const iid = response[0].IC_ID;
            const oid = response[0].OC_ID;
            query = '(SELECT FountainP.FP_Name, FountainP.FP_ID, FountainP.FP_Manufacturer FROM (Implement_Collection natural join IC_FP natural join FountainP)WHERE Implement_Collection.IC_ID = -1)'
            if (request.body.fountainPens)
                query = query + 'UNION ALL (SELECT FountainP.FP_Name, FountainP.FP_ID, FountainP.FP_Manufacturer FROM (Implement_Collection natural join IC_FP natural join FountainP) WHERE Implement_Collection.IC_ID = ' + iid + ')';
            if (request.body.cartridgePens)
                query = query + 'UNION ALL (SELECT CartridgeP.CP_Name, CartridgeP.CP_ID, CartridgeP.CP_Manufacturer FROM (Implement_Collection natural join IC_CP natural join CartridgeP) WHERE Implement_Collection.IC_ID = ' + iid + ')';
            if (request.body.mechanicalPencils)
                query = query + 'UNION ALL (SELECT MechanicalP.MP_Name, MechanicalP.MP_ID, MechanicalP.MP_Manufacturer FROM (Implement_Collection natural join IC_MP natural join MechanicalP) WHERE Implement_Collection.IC_ID = ' + iid + ')';
            if (request.body.woodPencils)
                query = query + 'UNION ALL (SELECT WoodP.WP_Name, WoodP.WP_ID, WoodP.WP_Manufacturer FROM (Implement_Collection natural join IC_WP natural join WoodP) WHERE Implement_Collection.IC_ID = ' + iid + ')';
            if (request.body.lead)
                query = query + 'UNION ALL (SELECT Lead.L_Name, Lead.L_ID, Lead.L_Manufacturer FROM (Other_Collection natural join OC_L natural join Lead) WHERE Other_Collection.OC_ID = ' + oid + ')';
            if (request.body.replacements)
                query = query + 'UNION ALL (SELECT Replacements.R_Name, Replacements.R_ID, Replacements.R_Manufacturer FROM (Other_Collection natural join OC_R natural join Replacements) WHERE Other_Collection.OC_ID = ' + oid + ')';
            if (request.body.ink)
                query = query + ' UNION ALL (SELECT Ink.I_Name, Ink.I_ID, Ink.I_Manufacturer FROM (Other_Collection natural join OC_I natural join Ink) WHERE Other_Collection.OC_ID = ' + oid + ')';
            if (request.body.penCartridge)
                query = query + 'UNION ALL (SELECT Pen_Cartridge.PC_Name, Pen_Cartridge.PC_ID, Pen_Cartridge.PC_Manufacturer FROM (Other_Collection natural join OC_PC natural join Pen_Cartridge) WHERE Other_Collection.OC_ID = ' + oid + ')';
            if (request.body.utility)
                query = query + 'UNION ALL (SELECT Utility.U_Name, Utility.U_ID, Utility.U_Manufacturer FROM (Other_Collection natural join OC_U natural join Utility) WHERE Other_Collection.OC_ID = ' + oid + ')';
            pool.query(query,
                (error, result) => {
                    if (error) throw error;
                    response.send(result);
                });
        });
    });

    app.get('/collection/:u_name/item', (request, response) => {
        //todo, get specific item
    });

    app.post('/collection/:u_name/item', (request, response) => {
        //todo, create item and add immediately (see npp)
    });

    app.delete('/collection/:u_name/item', (request, response) => {
        //todo, remove item from collection
    });
    /*
     	/collection/:u_name
		GET (Display collection, takes booleans per category) (TODO)
			input:
				{"mechanicalPencil": bool,
				"fountainPens": bool,
				"cartridgePens": bool,
				"woodPencils": bool,
				"lead": bool,
				"ink": bool,
				"penCartridge": bool,
				"utility": bool,
				"replacements" bool
				}

	    /collection/:u_name/item
		GET (Display information for single item given ID)
			desired input:
				{
					"itemId": int,
					"type": string
				}
			desired output:
				{
					"itemId": string,
					"itemName": string,
					"manufacturer": string,
					"stats": object
				}

		POST (Create an item and add to user's collection)
			desired input:
				{
			   basicAtts: {
					itemName: string,
					type: string,
					manufacturer: string
				 },
			   stats: object
				}

		DELETE (Delete an item from user's collection)
			desired input:
				{
					"itemId": int,
					"type": string
				}
     */

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

    // ************Ink*************
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
