var express = require('express');
var router = express.Router();
var supplierModel = require.main.require('./models/supplierModel');
var validationRules = require.main.require('./validation_rules/rules');
var asyncValidator = require('async-validator-2');

router.get('/', (req, res)=>{
    res.render('supsignup', {errs: []});
});

router.post('/', (req, res)=>{

    var data = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      password: req.body.password
    };

    var rules = validationRules.suppliers.create;
    var validator = new asyncValidator(rules);

    validator.validate(data, (errors, fields)=>{
        if(!errors){
            supplierModel.createSupplier(data, function(result){
                if(result){
                    console.log(result);
                    res.redirect('/suplogin');
                }
                else {
                    console.log(result);
                    res.send('Invalid');
                }
            });
        }
        else {
            console.log(fields);
            res.render('supsignup', {errs: errors});
        }
    });

});


module.exports = router;