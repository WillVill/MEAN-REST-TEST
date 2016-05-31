var customer = require('../models/customer');

var router = express.Router();

router.route('/api/customer/:customer_id')
    .get(function(req,res){
        User.findById(req.params.customer_id, function(err, customer){
            if(err)
                res.send(err)

            console.log(customer)
            res.json(customer)
        })
    })
    .put(function(req,res){
        customer.findById(req.params.customer_id, function(err, customer){
            if(err)
            res.send(err)

            customer = req.customer;

            customer.save(function(err){
                if(err)
                    res.send(err)

                res.json({message: 'customer updated'})
            })
        })
    })
    .delete(function(req, res){
        customer.remove({
            _id: req.params.customer_id
        }, function(req, bear){
            if(err)
                res.send(err)

            console.log(bear)
            res.json({message: 'Customer added'})
        })
    })

router.post('/api/customer', function(req, res){
        customer.save(function(err){
            if(err)
                res.send(err)

            res.json({ message: 'Customer added' });
        })
    })


router.get('/api/customers', function(req,res){
        customer.find(function(err, customers){
            if(err)
                res.send(err)

            console.log(customers);
            res.json(customers);
        })
    })


router.get('/username/:firstName', function(req,res){
        User.findOne(req.params.firstName, function(err, customer){
            if(err)
                res.send(err)

            console.log(customer)
            res.json(customer)
        })
    })

