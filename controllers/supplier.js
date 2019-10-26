var express = require('express');
var router = express.Router();
var supplierModel = require.main.require('./models/supplierModel');
var bookModel = require.main.require('./models/bookModel');
var validationRules = require.main.require('./validation_rules/rules');
var asyncValidator = require('async-validator-2');

router.get('/home', (req, res)=> {
    res.render('supplier/home');
});

router.get('/profile', (req, res)=> {
    var supplier = supplierModel.getSupplier(req.session.supplier, (result)=> {
        if(!result){
            res.send("invalid!");
        }
        else {
            console.log(result);
            res.render('supplier/profile', {res: result});
        }
    });
});

router.get('/books-library', (req, res)=> {
    bookModel.getUnborrowedBooks((result)=> {
        if(!result){
            res.send("Invalid");
        }
        else {
            console.log(result);
            res.render('supplier/books-library', {res: result, errs: []});
        }
    });
});

router.post('/books-library', (req, res)=> {
    var searchBy = req.body.searchBy;
    var word = req.body.word;
    bookModel.searchBy(searchBy, word, (result)=> {
        if(!result){
            res.render('supplier/books-library', {res: [], errs: [{message: "No results found!"}]});
        }
        else {
            console.log(result);
            res.render('supplier/books-library', {res: result, errs: []})
        }
    });
});

router.get('/profile/edit', (req, res)=> {
    var supplier = supplierModel.getSupplier(req.session.supplier, (result)=> {
        if(!result){
            res.send("invalid");
        }
        else {
            console.log(result);
            res.render('supplier/profile-edit', {res: result, errs: []});
        }
    });
});

router.post('/profile/edit', (req, res)=> {
    var rules = validationRules.suppliers.update;
    var validator = new asyncValidator(rules);
    var data = {
      supplier_id: req.body.supplier,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address
    };

    validator.validate(data, (errors, fields)=> {
        if(!errors){
            supplierModel.updateSupplier(data, (result)=> {
                if(!result){
                    res.send('invalid');
                }
                else {
                    res.redirect('/supplier/profile');
                }
            });
        }
        else {
            console.log(fields);
            res.render('supplier/profile-edit', {errs: errors, res: []});
        }
    });
});

router.get('/changepass', (req, res)=> {
    var supplier = supplierModel.getSupplier(req.session.supplier, (result)=> {
        if(!result){
            res.send("invalid!");
        }
        else {
            console.log(result);
            res.render('supplier/change-password', {res: result, errs: [], success: []});
        }
    });
});

router.post('/changepass', (req, res)=> {
    var rules = validationRules.suppliers.changePassword;
    var validator = new asyncValidator(rules);
    var data = {
      oldPassword: req.body.oldPassword,
      newPassword: req.body.newPassword,
      confirmPassword: req.body.confirmPassword
    };

    if(req.body.password == req.body.oldPassword){
        validator.validate(data, (errors, fields)=> {
            if(!errors){
                if(req.body.newPassword == req.body.confirmPassword){
                    supplierModel.updatePassword(req.body.newPassword, req.body.supplier_id, (result)=> {
                        if(!result){
                            res.send('invalid');
                        }
                        else {
                            res.render('supplier/change-password', {errs:[], res: [], success: [{message: "Password changed successfully"}]});
                        }
                    });
                }
                else {
                    res.render('supplier/change-password', {errs:[{message: "Your new passwords don't match!"}], res: [], success: []});
                }
            }
            else {
                console.log(fields);
                res.render('supplier/change-password', {errs: errors, res: [], success: []});
            }
        });
    }
    else {
        res.render('supplier/change-password', {errs: [{message: "Your old passsword does not match!"}], res: [], success: []});
    }

});

router.get('/books/add', (req, res)=> {
    res.render('supplier/books-add', {errs: [], success: [], data: []});
});

router.post('/books/add', (req, res)=> {
    console.log(req.query)
    var id = req.query.request_id;
    var data = {
        genre: req.query.genre,
        title: req.query.title,
        author: req.query.author,
        publisher: req.body.publisher,
        edition: req.query.edition,
        isbn: req.body.isbn,
        pages: req.body.pages
    };
    var rules = validationRules.books.create;
    var validator = new asyncValidator(rules);

    validator.validate(data, (errors, fields)=> {
        if(!errors){
            bookModel.createBook(data, (result)=> {
                if(!result){
                    res.send("Invalid");
                }
                else {
                    console.log(result);
                    res.render('supplier/books-add', {errs: [], success: [{message: "Book added successfully!"}], data: []});
                }
            });
        }
        else {
            console.log(fields);
            res.render('supplier/books-add', {errs: errors, success: [], data});
        }
        bookModel.deleteBookRequest(id,(result)=> {
            if(!result){
                if(!result){
                    res.send("Invalid");
                }
                else{
                    console.log(result);
                    res.redirect('/supplier/books/requested');
                }
            }
        });
    });
});

router.get('/books/requested', (req, res)=> {
    bookModel.getAdminRequestedBooks((result)=> {
        if(!result){
            res.send("Invalid");
        }
        else {
            console.log(result);
            res.render('supplier/books-requested', {res: result, errs: []});
        }
    });
});

router.post('/books/requested', (req, res)=> {
    var searchBy = req.body.searchBy;
    var word = req.body.word;
    bookModel.bookAdminRequestSearch(searchBy, word, (result)=> {
        if(!result){
            res.render('supplier/books-requested', {res: [], errs: [{message: "No results found!"}]});
        }
        else {
            console.log(result);
            res.render('supplier/books-requested', {res: result, errs: []})
        }
    });
});



module.exports = router;
