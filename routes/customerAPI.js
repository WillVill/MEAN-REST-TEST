var Customer = require('../models/customer');

module.exports = function (app) {
app.route('/api/customer/:customer_id')
    .get(function(req,res){
        Customer.findById(req.params.customer_id, function(err, customer){
            if(err)
                res.send(err)

            res.json({customer: customer})
        })
    })
    .put(function(req,res){
        Customer.findOneAndUpdate({firstName: req.params.customer_id}, {lastName:req.body.lastName},
        function(err, newCustomer){
            if(err)
            res.send(err)
            
            res.json({customer: newCustomer})
            })
        })
    .delete(function(req, res){
        Customer.findOneAndRemove({firstName: "John"}, function(err) {
            if(err) throw err;
            
            res.send("user deleted")
        })})

app.post('/api/customer', function(req, res){
 var newCustomer = new Customer({firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, address: req.body.address});
    newCustomer.save(function(err){
            if(err)
                res.send(err)

        res.json({Customer: newCustomer});
        })
    })


app.get('/api/customers', function(req,res){
        Customer.find(function(err, customers){
            if(err)
                res.send(err)

            res.json(customers);
        })
    })


}

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}