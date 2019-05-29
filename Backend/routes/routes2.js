//get the server config from ../data/config.js
const pool = require('../data/config2');
const mysql = require('mysql');

//Homepage JSON message
const router = app => {
    app.get('/', (request, response) => {
        response.send({
            message: 'Noteable: Stationery in Motion'
        });
    });

/*
██    ██ ███████ ███████ ██████  ███████
██    ██ ██      ██      ██   ██ ██
██    ██ ███████ █████   ██████  ███████
██    ██      ██ ██      ██   ██      ██
 ██████  ███████ ███████ ██   ██ ███████
*/
    // @todo: list all users
	app.get('/users', (request, response) => {
		pool.query('SELECT userID, username, firstName, lastName FROM Users', (error, result) => {
			if (error) throw error;
			response.send(result);
		});
  });

    // @todo: add a user
    app.post('/users', (request, response) => {
        pool.query('SELECT * FROM (SELECT U_ID FROM user ORDER BY U_ID DESC) AS A LIMIT 1', (error, result) => {
            var uid = result[0].U_ID + 1;
            pool.query('SELECT * FROM (SELECT OC_ID FROM Other_Collection ORDER BY OC_ID DESC) AS A LIMIT 1', (error, result) => {
                var oid = result[0].OC_ID + 1;
                pool.query('SELECT * FROM (SELECT IC_ID FROM Implement_Collection ORDER BY IC_ID DESC) AS A LIMIT 1', (error, result) => {
                    var iid = result[0].IC_ID + 1;
                    pool.query('INSERT INTO Implement_Collection VALUES(?,null);INSERT INTO Other_Collection VALUES(?,null);INSERT INTO user VALUES(?,?,?,?);UPDATE Other_Collection SET U_ID = ? WHERE OC_ID = ?;UPDATE Implement_Collection SET U_ID = ? WHERE IC_ID = ?;', [iid, oid, uid, request.body.username, iid, oid, uid, oid, uid, iid],
                        (error, result) => {
                            var code = 201;
                            var message = 'User added with new collections!';
                            if (error) {
                              if (error.code == 'ER_DUP_ENTRY') {
                                code = 200;
                                message = 'Existing User Logged in!';
                              }
                              else {
                                throw error;
                              }
                            }
                            response.status(code).send
                                (message);
                        });
                });
            });
        });
	});

    //@todo: edit a user
	app.put('/users/:id', (request, response) => {
		const id = request.params.id;
		pool.query('UPDATE user SET ? WHERE U_ID = ?', [request.body, id], (error, result) => {
			if(error) throw error;
			response.send('User updated successfully.');
		});
	});

    //@todo: delete a user
	app.delete('/users/:id', (request, response) => {
		 const id = request.params.id;
		pool.query('DELETE FROM user WHERE U_ID = ?', id,
		 (error, result) => {
			if (error) throw error;
             response.send('User deleted.');
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

    /*
   ██████   █████  ██      ██      ███████ ██████  ██    ██
  ██       ██   ██ ██      ██      ██      ██   ██  ██  ██
  ██   ███ ███████ ██      ██      █████   ██████    ████
  ██    ██ ██   ██ ██      ██      ██      ██   ██    ██
   ██████  ██   ██ ███████ ███████ ███████ ██   ██    ██
  */


    app.get('/gallery', (request, response) => {
        var aggregate = [];
        pool.query('SELECT *  FROM FountainP', (error, result) => {
            var frontend = result.map((item, i) => ({
                basicAtts: {
                    itemName: item.FP_Name,
                    itemId: item.FP_ID,
                    manufacturer: item.FP_Manufacturer,
                    type: "fountainPen"
                },
                stats: {
                    material: item.FP_Material,
                    inkType: item.FP_Ink_Type,
                }
            }));
            for (i = 0; i < frontend.length; i++) {
                if (request.query.fountainPens == 'true') aggregate.push(frontend[i]);

            }
            pool.query('SELECT * FROM CartridgeP', (error, result) => {
                frontend = result.map((item, i) => ({
                    basicAtts: {
                        itemName: item.CP_Name,
                        itemId: item.CP_ID,
                        manufacturer: item.CP_Manufacturer,
                        type: "cartridgePen"
                    },
                    stats: {
                        material: item.CP_Material,
                    }
                }));
                for (i = 0; i < frontend.length; i++) {

                    if (request.query.cartridgePens == 'true') aggregate.push(frontend[i]);
                }
                pool.query('SELECT * FROM MechanicalP', (error, result) => {
                    frontend = result.map((item, i) => ({
                        basicAtts: {
                            itemName: item.MP_Name,
                            itemId: item.MP_ID,
                            manufacturer: item.MP_Manufacturer,
                            type: "mechanicalPencil"
                        },
                        stats: {
                            material: item.MP_Material,
                            leadSize: item.MP_Lead_Size,
                        }
                    }));
                    for (i = 0; i < frontend.length; i++) {
                        if (request.query.mechanicalPencils == 'true') aggregate.push(frontend[i]);
                    }
                    pool.query('SELECT * FROM WoodP', (error, result) => {
                        frontend = result.map((item, i) => ({
                            basicAtts: {
                                itemName: item.WP_Name,
                                itemId: item.WP_ID,
                                manufacturer: item.WP_Manufacturer,
                                type: "woodPencil"
                            },
                            stats: {
                                material: item.WP_Material,
                            }
                        }));
                        for (i = 0; i < frontend.length; i++) {
                            if (request.query.woodPencils == 'true') aggregate.push(frontend[i]);
                        }
                        pool.query('select * from Lead', (error, result) => {
                            frontend = result.map((item, i) => ({
                                basicAtts: {
                                    itemName: item.L_Name,
                                    itemId: item.L_ID,
                                    manufacturer: item.L_Manufacturer,
                                    type: "lead"
                                },
                                stats: {
                                    size: item.L_Size,
                                }
                            }));
                            for (i = 0; i < frontend.length; i++) {
                                if (request.query.lead == 'true') aggregate.push(frontend[i]);
                            }
                            pool.query('select * from Ink', (error, result) => {
                                frontend = result.map((item, i) => ({
                                    basicAtts: {
                                        itemName: item.I_Name,
                                        itemId: item.I_ID,
                                        manufacturer: item.I_Manufacturer,
                                        type: "ink"
                                    },
                                    stats: {
                                        color: item.I_Color,
                                    }
                                }));
                                for (i = 0; i < frontend.length; i++) {
                                    if (request.query.ink == 'true') aggregate.push(frontend[i]);
                                }
                                pool.query('select * from Replacements', (error, result) => {
                                    frontend = result.map((item, i) => ({
                                        basicAtts: {
                                            itemName: item.R_Name,
                                            itemId: item.R_ID,
                                            manufacturer: item.R_Manufacturer,
                                            type: "replacements"
                                        },
                                        stats: {
                                            replacementType: item.R_Type,
                                        }
                                    }));
                                    for (i = 0; i < frontend.length; i++) {
                                        if (request.query.replacements == 'true') aggregate.push(frontend[i]);
                                    }
                                    pool.query('select * from Pen_Cartridge', (error, result) => {
                                        frontend = result.map((item, i) => ({
                                            basicAtts: {
                                                itemName: item.PC_Name,
                                                itemId: item.PC_ID,
                                                manufacturer: item.PC_Manufacturer,
                                                type: "penCartridge"
                                            },
                                            stats: {
                                                cartridgeType: item.PC_Type,
                                            }
                                        }));
                                        for (i = 0; i < frontend.length; i++) {
                                            if (request.query.penCartridge == 'true') aggregate.push(frontend[i]);
                                        }
                                        pool.query('select * from Utility', (error, result) => {
                                            frontend = result.map((item, i) => ({
                                                basicAtts: {
                                                    itemName: item.U_Name,
                                                    itemId: item.U_ID,
                                                    manufacturer: item.U_Manufacturer,
                                                    type: "utility"
                                                },
                                                stats: {
                                                    utilityType: item.U_Type,
                                                }
                                            }));
                                            if (request.query.utility == 'true') {
                                                for (i = 0; i < frontend.length; i++) {
                                                    aggregate.push(frontend[i]);
                                                }
                                            }
                                            if (error) throw error;
                                            console.log("Aggregate result");
                                            console.log(aggregate);
                                            console.log();
                                            response.send(aggregate);
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });

    app.post('/gallery', (request, response) => {
        const type = request.body.basicAtts.type;
        const name = request.body.basicAtts.ItemName;
        const manufacturer = request.body.basicAtts.manufacturer;
        if (type == "lead") {
            pool.query('SELECT * FROM (SELECT L_ID FROM Lead ORDER BY L_ID DESC) AS A LIMIT 1', (error, result) => {
                const id = result[0].L_ID + 1;
                const size = request.body.stats.size;
                pool.query('INSERT INTO Lead (L_ID, L_Name, L_Manufacturer, L_Size) VALUES (?, ?, ?, ?)', [id, name, manufacturer, size], (error, result) => {
                    if (error) throw error;
                    response.status(201).send('Added Lead to Gallery!.');
                });
            });
        }
        else if (type == "replacements") {
            pool.query('SELECT * FROM (SELECT R_ID FROM Replacements ORDER BY R_ID DESC) AS A LIMIT 1', (error, result) => {
                const id = result[0].R_ID + 1;
                const rtype = request.body.stats.replacementType;
                pool.query('INSERT INTO Replacements (R_ID, R_Name, R_Manufacturer, R_Type) VALUES (?, ?, ?, ?)', [id, name, manufacturer, rtype], (error, result) => {
                    if (error) throw error;
                    response.status(201).send('Added Replacement to Gallery!.');
                });
            });
        }
        else if (type == "ink") {
            pool.query('SELECT * FROM (SELECT I_ID FROM Ink ORDER BY I_ID DESC) AS A LIMIT 1', (error, result) => {
                const id = result[0].I_ID + 1;
                const color = request.body.stats.color;
                pool.query('INSERT INTO Ink (I_ID, I_Name, I_Manufacturer, I_Color) VALUES (?, ?, ?, ?)', [id, name, manufacturer, color], (error, result) => {
                    if (error) throw error;
                    response.status(201).send('Added Ink to Gallery!.');
                });
            });
        }
        else if (type == "penCartridge") {
            pool.query('SELECT * FROM (SELECT PC_ID FROM Pen_Cartridge ORDER BY PC_ID DESC) AS A LIMIT 1', (error, result) => {
                const id = result[0].PC_ID + 1;
                const pcType = request.body.stats.cartridgeType;
                pool.query('INSERT INTO Pen_Cartridge (PC_ID, PC_Name, PC_Manufacturer, PC_Type) VALUES (?, ?, ?, ?)', [id, name, manufacturer, pcType], (error, result) => {
                    if (error) throw error;
                    response.status(201).send('Added Pen Cartridge to Gallery!.');
                });
            });
        }
        else if (type == "utility") {
            pool.query('SELECT * FROM (SELECT U_ID FROM Utility ORDER BY U_ID DESC) AS A LIMIT 1', (error, result) => {
                const id = result[0].UC_ID + 1;
                const uType = request.body.stats.utilityType;
                pool.query('INSERT INTO Utility (U_ID, U_Name, U_Manufacturer, U_Type) VALUES (?, ?, ?, ?)', [id, name, manufacturer, pcType], (error, result) => {
                    if (error) throw error;
                    response.status(201).send('Added Utility to Gallery!.');
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
                    response.status(201).send('Added Mechanical Pencil to Gallery!.');
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
                    response.status(201).send('Added Fountain Pen to Gallery!.');
                });
            });
        }
        else if (type == "cartridgePen") {
            pool.query('SELECT * FROM (SELECT CP_ID FROM CartridgeP ORDER BY CP_ID DESC) AS A LIMIT 1', (error, result) => {
                const id = result[0].CP_ID + 1;
                const material = request.body.stats.material;
                pool.query('INSERT INTO CartridgeP (CP_ID, CP_Name, CP_Manufacturer, CP_Material) VALUES (?, ?, ?, ?)', [id, name, manufacturer, material], (error, result) => {
                    if (error) throw error;
                    response.status(201).send('Added Cartridge Pen to Gallery!.');
                });
            });
        }
        else if (type == "woodPencil") {
            pool.query('SELECT * FROM (SELECT WP_ID FROM WoodP ORDER BY WP_ID DESC) AS A LIMIT 1', (error, result) => {
                const id = result[0].WP_ID + 1;
                const material = request.body.stats.material;
                pool.query('INSERT INTO WoodP (WP_ID, WP_Name, WP_Manufacturer, WP_Material) VALUES (?, ?, ?, ?)', [id, name, manufacturer, material], (error, result) => {
                    if (error) throw error;
                    response.status(201).send('Added Wood Pencil to Gallery!.');
                });
            });
        }
    });

    app.put('/gallery', (request, response) => {
        const type = request.body.basicAtts.type;
        const name = request.body.basicAtts.itemName;
        const manufacturer = request.body.basicAtts.manufacturer;
        const id = request.body.basicAtts.itemId;
        if (type == "lead") {
            const size = request.body.stats.size;
            pool.query('UPDATE Lead SET L_Name = ?, L_Manufacturer = ?, L_Size = ? WHERE L_ID = ?', [name, manufacturer, size, id], (error, result) => {
                if (error) throw error;
                response.status(200).send('Updated Lead!');
            });
        }
        else if (type == "replacements") {
            const rtype = request.body.stats.replacementType;
            pool.query('UPDATE Replacements SET R_Name = ?, R_Manufacturer = ?, R_Type = ? WHERE R_ID = ?', [name, manufacturer, rtype, id], (error, result) => {
                if (error) throw error;
                response.status(200).send('Updated Replacement!');
            });
        }
        else if (type == "ink") {
            const color = request.body.stats.color;
            pool.query('UPDATE Ink SET I_Name = ?, I_Manufacturer = ?, I_Color = ? WHERE I_ID = ?', [name, manufacturer, color, id], (error, result) => {
                if (error) throw error;
                response.status(200).send('Updated Ink!');
            });
        }
        else if (type == "penCartridge") {
            const pcType = request.body.stats.cartridgeType;
            pool.query('UPDATE Pen_Cartridge SET PC_Name = ?, PC_Manufacturer = ?, PC_Type = ? WHERE PC_ID = ?', [name, manufacturer, pcType, id], (error, result) => {
                if (error) throw error;
                response.status(200).send('Updated Pen Cartridge!');
            });
        }
        else if (type == "utility") {
            const uType = request.body.stats.utilityType;
            pool.query('UPDATE Utility SET U_Name = ?, U_Manufacturer = ?, U_Type = ? WHERE U_ID = ?', [name, manufacturer, uType, id], (error, result) => {
                if (error) throw error;
                response.status(200).send('Updated Utility!');
            });
        }
        else if (type == "mechanicalPencil") {
            const material = request.body.stats.material;
            const size = request.body.stats.leadSize;
            pool.query('UPDATE MechanicalP SET MP_Name = ?, MP_Manufacturer = ?, MP_Material = ?, MP_Lead_Size = ? WHERE MP_ID = ?', [name, manufacturer, material, size, id], (error, result) => {
                if (error) throw error;
                response.status(200).send('Updated Mechanical Pencil! with name ' + name);
            });
        }
        else if (type == "fountainPen") {
            const material = request.body.stats.material;
            const inkType = request.body.stats.inkType;
            pool.query('UPDATE FountainP SET FP_Name = ?, FP_Manufacturer = ?, FP_Material = ?, FP_Ink_Type = ? WHERE FP_ID = ?', [name, manufacturer, material, inkType, id], (error, result) => {
                if (error) throw error;
                response.status(200).send('Updated Fountain Pen!');
            });
        }
        else if (type == "cartridgePen") {
            const material = request.body.stats.material;
            pool.query('UPDATE CartridgeP SET CP_Name = ?, CP_Manufacturer = ?, CP_Material = ? WHERE CP_ID = ?', [name, manufacturer, material, id], (error, result) => {
                if (error) throw error;
                response.status(200).send('Updated Cartridge Pen!');
            });
        }
        else if (type == "woodPencil") {
            const material = request.body.stats.material;
            pool.query('UPDATE WoodP SET WP_Name = ?, WP_Manufacturer = ?, WP_Material = ? WHERE WP_ID = ?', [name, manufacturer, material, id], (error, result) => {
                if (error) throw error;
                response.status(200).send('Updated Wood Pencil!');
            });
        }
    });

    /*
   ██████  ██████  ██      ██      ███████  ██████ ████████ ██  ██████  ███    ██ ███████
  ██      ██    ██ ██      ██      ██      ██         ██    ██ ██    ██ ████   ██ ██
  ██      ██    ██ ██      ██      █████   ██         ██    ██ ██    ██ ██ ██  ██ ███████
  ██      ██    ██ ██      ██      ██      ██         ██    ██ ██    ██ ██  ██ ██      ██
   ██████  ██████  ███████ ███████ ███████  ██████    ██    ██  ██████  ██   ████ ███████
  */

    app.get('/collection/:username/totalCount', (request, response) => {
        pool.query('select U_ID from user where U_Name = ?', request.params.username, (error, result) => {
            const uid = result[0].U_ID;
            pool.query('select user.U_ID, count(distinct OC_U.U_ID) + count(distinct OC_R.R_ID) + count(distinct OC_L.L_ID) + count(distinct OC_PC.PC_ID) + count(distinct OC_I.I_ID) + count(distinct IC_FP.FP_ID) + count(distinct IC_CP.CP_ID) + count(distinct IC_MP.MP_ID) + count(distinct IC_WP.WP_ID) total_count from user left join Other_Collection on user.OC_ID = Other_Collection.OC_ID  left join OC_R on OC_R.OC_ID = Other_Collection.OC_ID left join OC_L on OC_L.OC_ID = Other_Collection.OC_ID left join OC_I on OC_I.OC_ID = Other_Collection.OC_ID left join OC_U on OC_U.OC_ID = Other_Collection.OC_ID left join OC_PC on OC_PC.OC_ID = Other_Collection.OC_ID left join Implement_Collection on user.IC_ID = Implement_Collection.IC_ID left join IC_WP on IC_WP.IC_ID = Implement_Collection.IC_ID left join IC_MP on IC_MP.IC_ID = Implement_Collection.IC_ID left join IC_FP on IC_FP.IC_ID = Implement_Collection.IC_ID left join IC_CP on IC_CP.IC_ID = Implement_Collection.IC_ID where user.U_ID = ? group by user.U_ID;', uid, (error, result) => {
                if (error) throw error;
                console.log(result);
                response.status(200).send({ collectionCount: result[0].total_count });
            });
        });
    });

    app.get('/collection/:username', (request, response) => {
        /*console.log("Params:");
        console.log(request.params);
        console.log();
        console.log("Body");
        console.log(request.body);
        console.log();*/
        console.log("GET on /collection/"+request.params.username+" Query:", request.query);
        var aggregate = [];
        pool.query('select U_ID from user where U_Name = ?', request.params.username, (error, result) => {
            const uid = result[0].U_ID;
            pool.query('SELECT IC_ID, OC_ID FROM user WHERE U_ID = ?', uid, (error, result) => {
                const iid = result[0].IC_ID;
                const oid = result[0].OC_ID;
                pool.query('SELECT * FROM (Implement_Collection natural join IC_FP natural join FountainP) WHERE Implement_Collection.IC_ID = ?', iid, (error, result) => {
                    var frontend = result.map((item, i) => ({
                        basicAtts: {
                            itemName: item.FP_Name,
                            itemId: item.FP_ID,
                            manufacturer: item.FP_Manufacturer,
                            type: "fountainPen",
                        },
                        stats: {
                            material: item.FP_Material,
                            inkType: item.FP_Ink_Type,
                        }
                    }));
                    for (i = 0; i < frontend.length; i++) {
                        if (request.query.fountainPens == 'true') aggregate.push(frontend[i]);

                    }
                    pool.query('SELECT * FROM (Implement_Collection natural join IC_CP natural join CartridgeP) WHERE Implement_Collection.IC_ID = ?', iid, (error, result) => {
                        frontend = result.map((item, i) => ({
                            basicAtts: {
                                itemName: item.CP_Name,
                                itemId: item.CP_ID,
                                manufacturer: item.CP_Manufacturer,
                                type: "cartridgePen",
                            },
                            stats: {
                                material: item.CP_Material,
                            }
                        }));
                        for (i = 0; i < frontend.length; i++) {
                            if (request.query.cartridgePens == 'true') aggregate.push(frontend[i]);
                        }
                        pool.query('SELECT * FROM (Implement_Collection natural join IC_MP natural join MechanicalP) WHERE Implement_Collection.IC_ID = ?', iid, (error, result) => {
                            frontend = result.map((item, i) => ({
                                basicAtts: {
                                    itemName: item.MP_Name,
                                    itemId: item.MP_ID,
                                    manufacturer: item.MP_Manufacturer,
                                    type: "mechanicalPencil",
                                },
                                stats: {
                                    material: item.MP_Material,
                                    leadSize: item.MP_Lead_Size,
                                }
                            }));
                            for (i = 0; i < frontend.length; i++) {
                                if (request.query.mechanicalPencils == 'true') aggregate.push(frontend[i]);
                            }
                            pool.query('SELECT * FROM (Implement_Collection natural join IC_WP natural join WoodP) WHERE Implement_Collection.IC_ID = ?', iid, (error, result) => {
                                frontend = result.map((item, i) => ({
                                    basicAtts: {
                                        itemName: item.WP_Name,
                                        itemId: item.WP_ID,
                                        manufacturer: item.WP_Manufacturer,
                                        type: "woodPencil",
                                    },
                                    stats: {
                                        material: item.WP_Material,
                                    }
                                }));
                                for (i = 0; i < frontend.length; i++) {
                                    if (request.query.woodPencils == 'true') aggregate.push(frontend[i]);
                                }
                                pool.query('select * from (Other_Collection natural join OC_L natural join Lead) WHERE Other_Collection.OC_ID = ?', oid, (error, result) => {
                                    frontend = result.map((item, i) => ({
                                        basicAtts: {
                                            itemName: item.L_Name,
                                            itemId: item.L_ID,
                                            manufacturer: item.L_Manufacturer,
                                            type: "lead",
                                        },
                                        stats: {
                                            size: item.L_Size,
                                        }
                                    }));
                                    for (i = 0; i < frontend.length; i++) {
                                        if (request.query.lead == 'true') aggregate.push(frontend[i]);
                                    }
                                    pool.query('select * from (Other_Collection natural join OC_I natural join Ink) where Other_Collection.OC_ID = ?', oid, (error, result) => {
                                        frontend = result.map((item, i) => ({
                                            basicAtts: {
                                                itemName: item.I_Name,
                                                itemId: item.I_ID,
                                                manufacturer: item.I_Manufacturer,
                                                type: "ink",
                                            },
                                            stats: {
                                                color: item.I_Color,
                                            }
                                        }));
                                        for (i = 0; i < frontend.length; i++) {
                                            if (request.query.ink == 'true') aggregate.push(frontend[i]);
                                        }
                                        pool.query('select * from (Other_Collection natural join OC_R natural join Replacements) where Other_Collection.OC_ID = ?', oid, (error, result) => {
                                            frontend = result.map((item, i) => ({
                                                basicAtts: {
                                                    itemName: item.R_Name,
                                                    itemId: item.R_ID,
                                                    manufacturer: item.R_Manufacturer,
                                                    type: "replacements",
                                                },
                                                stats: {
                                                    replacementType: item.R_Type,
                                                }
                                            }));
                                            for (i = 0; i < frontend.length; i++) {
                                                if (request.query.replacements == 'true') aggregate.push(frontend[i]);
                                            }
                                            pool.query('select * from (Other_Collection natural join OC_PC natural join Pen_Cartridge) where Other_Collection.OC_ID = ?', oid, (error, result) => {
                                               frontend = result.map((item, i) => ({
                                                   basicAtts: {
                                                       itemName: item.PC_Name,
                                                       itemId: item.PC_ID,
                                                       manufacturer: item.PC_Manufacturer,
                                                       type: "penCartridge",
                                                   },
                                                    stats: {
                                                        cartridgeType: item.PC_Type,
                                                    }
                                                }));
                                                for (i = 0; i < frontend.length; i++) {
                                                    if (request.query.penCartridge == 'true') aggregate.push(frontend[i]);
                                                }
                                                pool.query('select * from (Other_Collection natural join OC_U natural join Utility) where Other_Collection.OC_ID = ?', oid, (error, result) => {
                                                    frontend = result.map((item, i) => ({
                                                        basicAtts: {
                                                            itemName: item.U_Name,
                                                            itemId: item.U_ID,
                                                            manufacturer: item.U_Manufacturer,
                                                            type: "utility",
                                                        },
                                                        stats: {
                                                            utilityType: item.U_Type,
                                                        }
                                                    }));
                                                    if (request.query.utility == 'true') {
                                                        for (i = 0; i < frontend.length; i++) {
                                                            aggregate.push(frontend[i]);
                                                        }
                                                    }
                                                    if (error) throw error;
                                                    console.debug("Aggregate result");
                                                    console.debug(aggregate);
                                                    console.debug();
                                                    response.send(aggregate);
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });

    //get specific item in collection by username
    app.get('/collection/:u_name/item', (request, response) => {
        const id = request.body.itemID;
        const type = request.body.type;
        if (type == "mechanicalPencil") {
            pool.query('select * from MechanicalP where MP_ID = ?', id, (error, result) => {
                if (error) throw error;
                result.map((item, i) => ({
                    basicAtts: {
                        itemName: item.MP_Name,
                        itemId: item.MP_ID,
                        manufacturer: item.MP_Manufacturer,
                        stats: {
                            material: item.MP_Material,
                            leadSize: item.MP_Lead_Size,
                        }
                    }
                }));
                response.send(result);
            });
        }
        else if (type == "woodPencil") {
            pool.query('select * from WoodP where WP_ID = ?', id, (error, result) => {
                if (error) throw error;
                result.map((item, i) => ({
                    basicAtts: {
                        itemName: item.WP_Name,
                        itemId: item.WP_ID,
                        manufacturer: item.WP_Manufacturer,
                        stats: {
                            material: item.WP_Material,
                        }

                    }
                }));
                response.send(result);
            });
        }
        else if (type == "fountainPen") {
            pool.query('select * from FountainP where FP_ID = ?', id, (error, result) => {
                if (error) throw error;
                result.map((item, i) => ({
                    basicAtts: {
                        itemName: item.FP_Name,
                        itemId: item.FP_ID,
                        manufacturer: item.FP_Manufacturer,
                        stats: {
                            material: item.FP_Material,
                            inkType: item.FP_Ink_Type,
                        }
                    }
                }));
                response.send(result);
            });
        }
        else if (type == "cartridgePen") {
            pool.query('select * from CartridgeP where CP_ID = ?', id, (error, result) => {
                if (error) throw error;
                result.map((item, i) => ({
                    basicAtts: {
                        itemName: item.CP_Name,
                        itemId: item.CP_ID,
                        manufacturer: item.CP_Manufacturer,
                        stats: {
                            material: item.CP_Material,
                        }
                    }
                }));
                response.send(result);
            });
        }
        else if (type == "ink") {
            pool.query('select * from Ink where I_ID = ?', id, (error, result) => {
                if (error) throw error;
                result.map((item, i) => ({
                    basicAtts: {
                        itemName: item.I_Name,
                        itemId: item.I_ID,
                        manufacturer: item.I_Manufacturer,
                        stats: {
                            color: item.I_Color,
                        }

                    }
                }));
                response.send(result);
            });
        }
        else if (type == "lead") {
            pool.query('select * from Lead where L_ID = ?', id, (error, result) => {
                if (error) throw error;
                result.map((item, i) => ({
                    basicAtts: {
                        itemName: item.L_Name,
                        itemId: item.L_ID,
                        manufacturer: item.L_Manufacturer,
                        stats: {
                            leadSize: item.L_Size,
                        }

                    }
                }));
                response.send(result);
            });
        }
        else if (type == "replacements") {
            pool.query('select * from Replacements where R_ID = ?', id, (error, result) => {
                if (error) throw error;
                result.map((item, i) => ({
                    basicAtts: {
                        itemName: item.R_Name,
                        itemId: item.R_ID,
                        manufacturer: item.R_Manufacturer,
                        stats: {
                            replacementType: item.R_Type,
                        }

                    }
                }));
                response.send(result);
            });
        }
        else if (type == "utility") {
            pool.query('select * from Utility where U_ID = ?', id, (error, result) => {
                if (error) throw error;
                result.map((item, i) => ({
                    basicAtts: {
                        itemName: item.U_Name,
                        itemId: item.U_ID,
                        manufacturer: item.U_Manufacturer,
                        stats: {
                            utilityType: item.U_Type,
                        }

                    }
                }));
                response.send(result);
            });
        }
        else if (type == "penCartridge") {
            pool.query('select * from Pen_Cartridge where PC_ID = ?', id, (error, result) => {
                if (error) throw error;
                result.map((item, i) => ({
                    basicAtts: {
                        itemName: item.PC_Name,
                        itemId: item.PC_ID,
                        manufacturer: item.PC_Manufacturer,
                        stats: {
                            cartridgeType: item.PC_Type,
                        }

                    }
                }));
                response.send(result);
            });
        }
    });

    app.post('/collection/:u_name/item', (request, response) => {
        //todo, create item and add immediately (see npp)
        const name = request.body.basicAtts.itemName;
        const type = request.body.basicAtts.type;
        const manufacturer = request.body.basicAtts.manufacturer;
        pool.query('select U_ID from user where U_Name = ?', request.params.u_name, (error, result) => {
            const uid = result[0].U_ID;
            if (type == "mechanicalPencil") {
                const material = request.body.stats.material;
                const size = request.body.stats.leadSize;
                pool.query('select IC_ID from user where U_ID = ?', uid, (error, result) => {
                    const iid = result[0].IC_ID;
                    pool.query('SELECT * FROM(SELECT MP_ID FROM MechanicalP ORDER BY MP_ID DESC) AS A LIMIT 1', (error, result) => {
                        const id = result[0].MP_ID + 1;
                        pool.query('insert into MechanicalP (MP_ID, MP_Name, MP_Manufacturer, MP_Material, MP_Lead_Size) values (?, ?, ?, ?, ?)', [id, name, manufacturer, material, size], (error, result) => {
                            pool.query('insert into IC_MP (IC_ID, MP_ID) values (?, ?)', [iid, id], (error, result) => {
                                if (error) throw error;
                                response.send("Mechanical Pencil created and added!");
                            });
                        });
                    });
                });
            }
            else if (type == "woodPencil") {
                const material = request.body.stats.material;
                pool.query('select IC_ID from user where U_ID = ?', uid, (error, result) => {
                    const iid = result[0].IC_ID;
                    pool.query('SELECT * FROM(SELECT WP_ID FROM WoodP ORDER BY WP_ID DESC) AS A LIMIT 1', (error, result) => {
                        const id = result[0].WP_ID + 1;
                        pool.query('insert into WoodP (WP_ID, WP_Name, WP_Manufacturer, WP_Material) values (?, ?, ?, ?)', [id, name, manufacturer, material], (error, result) => {
                            pool.query('insert into IC_WP (IC_ID, WP_ID) values (?, ?)', [iid, id], (error, result) => {
                                if (error) throw error;
                                response.send("Wood Pencil created and added!");
                            });
                        });
                    });
                });
            }
            else if (type == "cartridgePen") {
                const material = request.body.stats.material;
                pool.query('select IC_ID from user where U_ID = ?', uid, (error, result) => {
                    const iid = result[0].IC_ID;
                    pool.query('SELECT * FROM(SELECT CP_ID FROM CartridgeP ORDER BY CP_ID DESC) AS A LIMIT 1', (error, result) => {
                        const id = result[0].CP_ID + 1;
                        pool.query('insert into CartridgeP (CP_ID, CP_Name, CP_Manufacturer, CP_Material) values (?, ?, ?, ?)', [id, name, manufacturer, material], (error, result) => {
                            pool.query('insert into IC_CP (IC_ID, CP_ID) values (?, ?)', [iid, id], (error, result) => {
                                if (error) throw error;
                                response.send("Cartridge Pen created and added!");
                            });
                        });
                    });

                });
            }
            else if (type == "fountainPen") {
                const material = request.body.stats.material;
                const inktype = request.body.stats.inkType;
                pool.query('select IC_ID from user where U_ID = ?', uid, (error, result) => {
                    const iid = result[0].IC_ID;
                    pool.query('SELECT * FROM(SELECT FP_ID FROM FountainP ORDER BY FP_ID DESC) AS A LIMIT 1', (error, result) => {
                        const id = result[0].FP_ID + 1;
                        pool.query('insert into FountainP (FP_ID, FP_Name, FP_Manufacturer, FP_Material, FP_Ink_Type) values (?, ?, ?, ?, ?)', [id, name, manufacturer, material, inktype], (error, result) => {
                            pool.query('insert into IC_FP (IC_ID, FP_ID) values (?, ?)', [iid, id], (error, result) => {
                                if (error) throw error;
                                response.send("Fountain Pen created and added!");
                            });
                        });
                    });
                });
            }
            else if (type == "lead") {
                const size = request.body.stats.leadSize;
                pool.query('select OC_ID from user where U_ID = ?', uid, (error, result) => {
                    const oid = result[0].OC_ID;
                    pool.query('SELECT * FROM(SELECT L_ID FROM Lead ORDER BY L_ID DESC) AS A LIMIT 1', (error, result) => {
                        const id = result[0].L_ID + 1;
                        pool.query('insert into Lead (L_ID, L_Name, L_Manufacturer, L_Size) values (?, ?, ?, ?)', [id, name, manufacturer, size], (error, result) => {
                            pool.query('insert into OC_L (OC_ID, L_ID) values (?, ?)', [oid, id], (error, result) => {
                                if (error) throw error;
                                response.send("Lead created and added!");
                            });
                        });
                    });
                });
            }
            else if (type == "ink") {
                const color = request.body.stats.color;
                pool.query('select OC_ID from user where U_ID = ?', uid, (error, result) => {
                    const oid = result[0].OC_ID;
                    pool.query('SELECT * FROM(SELECT I_ID FROM Ink ORDER BY I_ID DESC) AS A LIMIT 1', (error, result) => {
                        const id = result[0].L_ID + 1;
                        pool.query('insert into Ink (I_ID, I_Name, I_Manufacturer, I_Color) values (?, ?, ?, ?)', [id, name, manufacturer, color], (error, result) => {
                            pool.query('insert into OC_I (OC_ID, I_ID) values (?, ?)', [oid, id], (error, result) => {
                                if (error) throw error;
                                response.send("Ink created and added!");
                            });
                        });
                    });
                });
            }
            else if (type == "utility") {
                const uType = request.body.stats.utilityType;
                pool.query('select OC_ID from user where U_ID = ?', uid, (error, result) => {
                    const oid = result[0].OC_ID;
                    pool.query('SELECT * FROM(SELECT U_ID FROM Utility ORDER BY U_ID DESC) AS A LIMIT 1', (error, result) => {
                        const id = result[0].U_ID + 1;
                        pool.query('insert into Utility (U_ID, U_Name, U_Manufacturer, U_Type) values (?, ?, ?, ?)', [id, name, manufacturer, uType], (error, result) => {
                            pool.query('insert into OC_U (OC_ID, U_ID) values (?, ?)', [oid, id], (error, result) => {
                                if (error) throw error;
                                response.send("Utility created and added!");
                            });
                        });
                    });
                });
            }
            else if (type == "replacement") {
                const rType = request.body.stats.replacementType;
                pool.query('select OC_ID from user where U_ID = ?', uid, (error, result) => {
                    const oid = result[0].OC_ID;
                    pool.query('SELECT * FROM(SELECT R_ID FROM Replacements ORDER BY R_ID DESC) AS A LIMIT 1', (error, result) => {
                        const id = result[0].R_ID + 1;
                        pool.query('insert into Replacements (R_ID, R_Name, R_Manufacturer, R_Type) values (?, ?, ?, ?)', [id, name, manufacturer, rType], (error, result) => {
                            pool.query('insert into OC_R (OC_ID, R_ID) values (?, ?)', [oid, id], (error, result) => {
                                if (error) throw error;
                                response.send("Replacement created and added!");
                            });
                        });
                    });
                });
            }
            else if (type == "penCartridge") {
                const cType = request.body.stats.cartridgeType;
                pool.query('select OC_ID from user where U_ID = ?', uid, (error, result) => {
                    const oid = result[0].OC_ID;
                    pool.query('SELECT * FROM(SELECT PC_ID FROM Pen_Cartridge ORDER BY PC_ID DESC) AS A LIMIT 1', (error, result) => {
                        const id = result[0].PC_ID + 1;
                        pool.query('insert into Pen_Cartridge (PC_ID, PC_Name, PC_Manufacturer, PC_Type) values (?, ?, ?, ?)', [id, name, manufacturer, cType], (error, result) => {
                            pool.query('insert into OC_PC (OC_ID, PC_ID) values (?, ?)', [oid, id], (error, result) => {
                                if (error) throw error;
                                response.send("Cartridge created and added!");
                            });
                        });
                    });


                });
            }
        });
    });

    app.delete('/collection/:u_name/item', (request, response) => {
        const id = request.query.itemId;
        const type = request.query.type;
        pool.query('select U_ID from user where U_Name = ?', request.params.u_name, (error, result) => {
            const uid = result[0].U_ID;
            if (type == "mechanicalPencil") {
                pool.query('select IC_ID from user where U_ID = ?', uid, (error, result) => {
                    const iid = result[0].IC_ID;
                    pool.query('delete from IC_MP where IC_ID = ? AND MP_ID = ?', [iid, id], (error, result) => {
                        if (error) throw error;
                        response.send("Mechanical Pencil removed from collection.");
                    });
                });
            }
            else if (type == "woodPencil") {
                pool.query('select IC_ID from user where U_ID = ?', uid, (error, result) => {
                    const iid = result[0].IC_ID;
                    pool.query('delete from IC_WP where IC_ID = ? AND WP_ID = ?', [iid, id], (error, result) => {
                        if (error) throw error;
                        response.send("Wood Pencil removed from collection.");
                    });
                });
            }
            else if (type == "cartridgePen") {
                pool.query('select IC_ID from user where U_ID = ?', uid, (error, result) => {
                    const iid = result[0].IC_ID;
                    pool.query('delete from IC_CP where IC_ID = ? AND CP_ID = ?', [iid, id], (error, result) => {
                        if (error) throw error;
                        response.send("Cartridge Pen removed from collection.");
                    });
                });
            }
            else if (type == "fountainPen") {
                pool.query('select IC_ID from user where U_ID = ?', uid, (error, result) => {
                    const iid = result[0].IC_ID;
                    pool.query('delete from IC_FP where IC_ID = ? AND FP_ID = ?', [iid, id], (error, result) => {
                        if (error) throw error;
                        response.send("Fountain Pen removed from collection.");
                    });
                });
            }
            else if (type == "lead") {
                pool.query('select OC_ID from user where U_ID = ?', uid, (error, result) => {
                    const oid = result[0].OC_ID;
                    pool.query('delete from OC_L where OC_ID = ? AND L_ID = ?', [oid, id], (error, result) => {
                        if (error) throw error;
                        response.send("Lead removed from collection.");
                    });
                });
            }
            else if (type == "ink") {
                pool.query('select OC_ID from user where U_ID = ?', uid, (error, result) => {
                    const oid = result[0].OC_ID;
                    pool.query('delete from OC_I where OC_ID = ? AND I_ID = ?', [oid, id], (error, result) => {
                        if (error) throw error;
                        response.send("Ink removed from collection.");
                    });
                });
            }
            else if (type == "utility") {
                pool.query('select OC_ID from user where U_ID = ?', uid, (error, result) => {
                    const oid = result[0].OC_ID;
                    pool.query('delete from OC_U where OC_ID = ? AND U_ID = ?', [oid, id], (error, result) => {
                        if (error) throw error;
                        response.send("Utility removed from collection.");
                    });
                });
            }
            else if (type == "replacement") {
                pool.query('select OC_ID from user where U_ID = ?', uid, (error, result) => {
                    const oid = result[0].OC_ID;
                    pool.query('delete from OC_R where OC_ID = ? AND R_ID = ?', [oid, id], (error, result) => {
                        if (error) throw error;
                        response.send("Replacement removed from collection.");
                    });
                });
            }
            else if (type == "penCartridge") {
                pool.query('select OC_ID from user where U_ID = ?', uid, (error, result) => {
                    const oid = result[0].OC_ID;
                    pool.query('delete from OC_PC where OC_ID = ? AND PC_ID = ?', [oid, id], (error, result) => {
                        if (error) throw error;
                        response.send("Pen Cartridge removed from collection.");
                    });
                });
            }
        });
    });

}
module.exports = router;
