var express = require('express');
var router = express.Router();
var supplierModel = require.main.require('./models/supplierModel');
var validationRules = require.main.require('./validation_rules/rules');
var asyncValidator = require('async-validator-2');

router.get('/', (req, res)=>{
    res.render('suplogin', {errs: []});
});

router.post('/', (req, res)=>{

    var data = {
        email: req.body.email,
        password: req.body.password
    };

    var rules = validationRules.suppliers.login;
    var validator = new asyncValidator(rules);

    validator.validate(data, (errors, fields)=>{
        if(!errors){
            supplierModel.validateSupplier(req.body.email, req.body.password, function(result){
                if(!result){
                  res.render('suplogin', {errs: [{message: 'Invalid email or password'}]});
                }
                else{
                      req.session.supplier = result.supplier_id;
                      res.redirect('/supplier/profile');
                  }
            })
        }
        else {
            console.log(fields);
            res.render('suplogin', {errs: errors});
        }
    });

});

module.exports = router;
