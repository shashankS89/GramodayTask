const Report = require('./db');

exports.createRep = async (req,res,next) => {
    try {
        const rep = await Report.findOne({
            cmdtyID: req.body.cmdtyID,
            marketID: req.body.marketID
        });
        if(!rep)
        {
            const newRep = await Report.create({
                userID: req.body.userID,
                cmdtyName: req.body.cmdtyName,
                cmdtyID: req.body.cmdtyID,
                marketID: req.body.marketID,
                convFctr: req.body.convFctr,
                marketType: req.body.marketType,
                marketName: req.body.marketName,
                priceUnit: req.body.priceUnit,
                price: req.body.price / req.body.convFctr,
                users: [req.body.userID]
            });

            res.status(200).json({
                status : 'success',
                reportId: newRep._id
           });
        }
        else
        {
            rep.priceUnit = "kg";
            rep.price = rep.price + req.body.price / req.body.convFctr;
            rep.price = rep.price / 2;
            rep.users.push(req.body.userID);

            await rep.save();

            res.status(200).json({
            status: 'success',
            reportId: rep._id
            });
        }
    } 
    catch (err) {
            res.status(404).json({
                status: 'fail',
                message: err.message
            })
    }
};

exports.getRep = async (req,res) => {
    try {
        const rep = await Report.findById(req.query.reportsId)
            if(rep){
               res.status(200).json({
                cmdtyName: rep.cmdtyName,
                cmdtyID: rep.cmdtyID,
                marketID: rep.marketID,
                marketName: rep.marketName,
                users: rep.users,
                timestamp: rep.timestamps,
                priceUnit: rep.priceUnit,
                price: rep.price
                
               });
            }
            else
            {
                throw new Error();
            }

    } catch (err) {
        res.status(400).json({ 
            status: 'fail', 
            message: err.message
        });
    }  
};