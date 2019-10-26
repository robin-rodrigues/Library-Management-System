var express = require('express');
var router = express.Router();
var userModel = require.main.require('./models/userModel');
var bookModel = require.main.require('./models/bookModel');
var supplierModel = require.main.require('./models/supplierModel');
var validationRules = require.main.require('./validation_rules/rules');
var asyncValidator = require('async-validator-2');

//Homepage route
router.get('/home', (req, res)=> {
    // var users = "";
    userModel.getAll((users)=> {
        if(!users){
            res.send("Invalid");
        }
        else{
            supplierModel.getAll((suppliers)=> {
                if(!suppliers){
                    res.send("Invalid");
                }
                else{
                    bookModel.getAll((books)=> {
                        if(!books){
                            res.send("Invalid");
                        }
                        else {
                            bookModel.getAllBorrowedBooks((borrowed)=> {
                                if(!borrowed){
                                    res.send("invalid");
                                }
                                else {
                                    bookModel.totalBorrowed30((mostBorrowed)=> {
                                        if(!mostBorrowed){
                                            res.send("not valid");
                                        }
                                        else {
                                            bookModel.mostRequestedBook((mostRequested)=> {
                                                if(!mostRequested){
                                                    res.send("nothing here");
                                                }
                                                else {
                                                    bookModel.mostBorrowedBook((mostBorrowedBook)=> {
                                                        if(!mostBorrowedBook){
                                                            res.send("no borrowed books");
                                                        }
                                                        else {
                                                            res.render('admin/home', {usr: users.length, bk: books.length, sup: suppliers.length, brwd: borrowed.length, mb: mostBorrowed.length, mrb: mostRequested, mbb: mostBorrowedBook});
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
        });
      
    }
    });


});

//Admin profile route
router.get('/profile', (req, res)=> {
    var admin = userModel.getUser(req.session.admin, (result)=> {
        if(!result){
            res.send("invalid!");
        }
        else {
            console.log(result);
            res.render('admin/profile', {res: result});
        }
    });
});

//Edit Admin profile routes
router.get('/profile/edit', (req, res)=> {
    var admin = userModel.getUser(req.session.admin, (result)=> {
        if(!result){
            res.send("invalid");
        }
        else {
            console.log(result);
            res.render('admin/profile-edit', {res: result, errs: []});
        }
    });
});

router.post('/profile/edit', (req, res)=> {
    var rules = validationRules.users.update;
    var validator = new asyncValidator(rules);
    var data = {
      user_id: req.body.user_id,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      gender: req.body.gender
    };

    validator.validate(data, (errors, fields)=> {
        if(!errors){
            userModel.updateUser(data, (result)=> {
                if(!result){
                    res.send('invalid');
                }
                else {
                    res.redirect('/admin/profile');
                }
            });
        }
        else {
            console.log(fields);
            res.render('admin/profile-edit', {errs: errors, res: []});
        }
    });
});

//Change password of admin routes
router.get('/changepass', (req, res)=> {
    var admin = userModel.getUser(req.session.admin, (result)=> {
        if(!result){
            res.send("invalid!");
        }
        else {
            console.log(result);
            res.render('admin/change-password', {res: result, errs: [], success: []});
        }
    });
});

router.post('/changepass', (req, res)=> {
    var rules = validationRules.users.changePassword;
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
                    userModel.updatePassword(req.body.newPassword, req.body.user_id, (result)=> {
                        if(!result){
                            res.send('invalid');
                        }
                        else {
                            res.render('admin/change-password', {errs:[], res: [], success: [{message: "Password changed successfully"}]});
                        }
                    });
                }
                else {
                    res.render('admin/change-password', {errs:[{message: "Your new passwords don't match!"}], res: [], success: []});
                }
            }
            else {
                console.log(fields);
                res.render('admin/change-password', {errs: errors, res: [], success: []});
            }
        });
    }
    else {
        res.render('admin/change-password', {errs: [{message: "Your old passsword does not match!"}], res: [], success: []});
    }

});

//Books routes
router.get('/books', (req, res)=> {
    bookModel.getAll((result)=> {
        if(!result){
            res.send("Invalid");
        }
        else {
            console.log(result);
            res.render('admin/books', {res: result, errs: []});
        }
    });
});

router.post('/books', (req, res)=> {
    var searchBy = req.body.searchBy;
    var word = req.body.word;
    bookModel.searchBy(searchBy, word, (result)=> {
        if(!result){
            res.render('admin/books', {res: [], errs: [{message: "No results found!"}]});
        }
        else {
            console.log(result);
            res.render('admin/books', {res: result, errs: []})
        }
    });
});

//Customers display routes
router.get('/customers', (req, res)=> {
    userModel.getAll((result)=> {
        if(!result){
            res.send("Invalid");
        }
        else {
            console.log(result);
            res.render('admin/customers', {res: result, errs: []});
        }
    });
});

router.post('/customers', (req, res)=> {
    var searchBy = req.body.searchBy;
    var word = req.body.word;
    userModel.searchBy(searchBy, word, (result)=> {
        if(!result){
            res.render('admin/customers', {res: [], errs: [{message: "No results found!"}]});
        }
        else {
            console.log(result);
            res.render('admin/customers', {res: result, errs: []})
        }
    });
});

//Adding new customers by admin routes
router.get('/customers/add', (req, res)=> {
    res.render('admin/customers-add', {errs: [], success: [], data: []});
});

router.post('/customers/add', (req, res)=> {
    var data = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        address: req.body.address,
        gender: req.body.gender
    };

    var rules = validationRules.users.create;
    var validator = new asyncValidator(rules);

    validator.validate(data, (errors, fields)=> {
        if(!errors){
            userModel.createUser(data, (result)=> {
                if(!result){
                    res.send("Invalid");
                }
                else {
                    console.log(result);
                    res.render('admin/customers-add', {errs: [], success: [{message: "Customer added successfully!"}], data: []});
                }
            });
        }
        else {
            console.log(fields);
            res.render('admin/customers-add', {errs: errors, success: [], data});
        }
    });
});

//Adding books by admin routes
router.get('/books/add', (req, res)=> {
    res.render('admin/books-add', {errs: [], success: [], data: []});
});

router.post('/books/add', (req, res)=> {
    var data = {
        genre: req.body.genre,
        title: req.body.title,
        author: req.body.author,
        publisher: req.body.publisher,
        edition: req.body.edition,
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
                    res.render('admin/books-add', {errs: [], success: [{message: "Book added successfully!"}], data: []});
                }
            });
        }
        else {
            console.log(fields);
            res.render('admin/books-add', {errs: errors, success: [], data});
        }
    });
});

//Editing book details routes
router.get('/books/edit/:id', (req, res)=> {
    var book = req.params.id;
    bookModel.getBook(book, (result)=> {
        if(result.length == 0){
            res.send("Invalid");
        }
        else {
            res.render('admin/books-edit', {res: result, errs: [], success: []});
        }
    });
});

router.post('/books/edit/:id', (req, res)=> {
    var data = {
        genre: req.body.genre,
        title: req.body.title,
        author: req.body.author,
        publisher: req.body.publisher,
        edition: req.body.edition,
        isbn: req.body.isbn,
        pages: req.body.pages
    };
    var book_id = req.body.book_id;

    var rules = validationRules.books.create;
    var validator = new asyncValidator(rules);

    validator.validate(data, (errors, fields)=> {
        if(!errors){
            bookModel.updateBook(book_id, data, (result)=> {
                if(!result){
                    res.send("Invalid");
                }
                else {
                    console.log(result);
                    res.render('admin/books-edit', {res: result, errs:[], success: [{message: "Book updated successfully!"}]});
                }
            });
        }
        else {
            console.log(fields);
            res.render('admin/books-edit', {res: data, errs: errors, success: []})
        }
    });

});

//Editing customer details routes
router.get('/customers/edit/:id', (req, res)=> {
    var customer = req.params.id;
    userModel.getUser(customer, (result)=> {
        if(result.length == 0){
            res.send("Invalid");
        }
        else {
            res.render('admin/customers-edit', {res: result, errs: [], success: []});
        }
    });
});

router.post('/customers/edit/:id', (req, res)=> {
    var data = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        address: req.body.address,
        gender: req.body.gender
    };
    var customer_id = req.body.user_id;

    var rules = validationRules.users.create;
    var validator = new asyncValidator(rules);

    validator.validate(data, (errors, fields)=> {
        if(!errors){
            userModel.updateCustomer(customer_id, data, (result)=> {
                if(!result){
                    res.send("Invalid");
                }
                else {
                    console.log(result);
                    res.render('admin/customers-edit', {res: result, errs:[], success: [{message: "Customer updated successfully!"}]});
                }
            });
        }
        else {
            console.log(fields);
            res.render('admin/customers-edit', {res: data, errs: errors, success: []});
        }
    });

});

//Getting information about a particular customer route
router.get('/customers/profile/:id', (req, res)=> {
    var id = req.params.id;
    var customer = userModel.getUser(id, (result)=> {
        if(result.length == 0){
            res.send("Invalid");
        }
        else {
            console.log(result);
            res.render('admin/customers-profile', {res: result});
        }
    });
});

//Deleting a customer routes
router.get('/customers/delete/:id', (req, res)=> {
    var id = req.params.id;
    var customer = userModel.getUser(id, (result)=> {
        if(result.length == 0){
            res.send("Invalid");
        }
        else {
            console.log(result);
            res.render('admin/customers-delete', {res: result});
        }
    });
});

router.post('/customers/delete/:id', (req, res)=> {
    var id = req.body.user_id;
    var customer = userModel.deleteUser(id, (result)=> {
        if(result.length == 0){
            res.send("Invalid");
        }
        else {
            console.log(result);
            res.redirect('/admin/customers');
        }
    });
});

//Deleting a book routes
router.get('/books/delete/:id', (req, res)=> {
    var id = req.params.id;
    var book = bookModel.getBook(id, (result)=> {
        if(result.length == 0){
            res.send("Invalid");
        }
        else {
            console.log(result);
            res.render('admin/books-delete', {res: result});
        }
    });
});

router.post('/books/delete/:id', (req, res)=> {
    var id = req.body.book_id;
    var book = bookModel.deleteBook(id, (result)=> {
        if(result.length == 0){
            res.send("Invalid");
        }
        else {
            console.log(result);
            res.redirect('/admin/books');
        }
    });
});

//Issuing a book to member routes
router.get('/books/:id/issue', (req, res)=> {
    userModel.getAll((result)=> {
        if(!result){
            res.send("Invalid");
        }
        else {
            console.log(result);
            res.render('admin/books-issue', {res: result, errs: [], success: []});
        }
    });
});

router.post('/books/:id/issue', (req, res)=> {
    var book_id = req.params.id;
    var customer_id = req.query.user_id;
    var request_id = req.query.request_id;
    bookModel.booksIssuedByCustomer(customer_id, (books)=> {
        if(!books){
            res.send("Invalid");
        }
        else {
            console.log(books.length);
            if(books.length <= 2){
                bookModel.setIssueDate(book_id, customer_id, (result)=> {
                    if(!result){
                        res.send("Invalid");
                    }
                    else {
                        console.log(result);
                    }
                });
                bookModel.issueBook(book_id, customer_id, (result)=> {
                    if(!result){
                        res.send("Invalid");
                    }
                    else {
                        console.log(result);
                        res.redirect('/admin/books');
                    }
                });
            }
            else{
                userModel.getAll((result)=> {
                    if(!result){
                        res.send("Invalid");
                    }
                    else {
                        console.log(result);
                        res.render('admin/books-issue', {res: result, errs: [{message: "This customer has already issued 3 books, please unissue one first!"}], success: []});
                    }
                });
            }
        }
        bookModel.deleteUserBookRequest(request_id,(result)=> {
            if(!result){
                if(!result){
                    res.send("Invalid");
                }
                else{
                    console.log(result);
                    res.redirect('/admin/books/requested');
                }
            }
        });
    });
});

//Displaying issued books routes
router.get('/books/issued', (req, res)=> {
    bookModel.getAll((result)=> {
        if(!result){
            res.send("Invalid!");
        }
        else {
            console.log(result);
            res.render('admin/issued-books', {res: result});
        }
    });
});

router.post('/books/issued', (req, res)=> {
    var book_id = req.body.book_id;
    bookModel.unissueBook(book_id, (result)=> {
        if(!result){
            res.send("Invalid");
        }
        else {
            console.log(result);
            res.redirect('/admin/books');
        }
    });
});

//Displaying requested books routes
router.get('/books/requested', (req, res)=> {
    bookModel.getRequestedBooks((result)=> {
        if(!result){
            res.send("Invalid");
        }
        else {
            console.log(result);
            res.render('admin/books-requested', {res: result, errs: []});
        }
    });
});

router.post('/books/requested', (req, res)=> {
    var searchBy = req.body.searchBy;
    var word = req.body.word;
    bookModel.bookRequestSearch(searchBy, word, (result)=> {
        if(!result){
            res.render('admin/books-requested', {res: [], errs: [{message: "No results found!"}]});
        }
        else {
            console.log(result);
            res.render('admin/books-requested', {res: result, errs: []})
        }
    });
});

//Requesting a book to supplier routes
router.get('/books/request', (req, res)=> {
    res.render('admin/books-request', {errs: [], success: []});
});

router.post('/books/request', (req, res)=> {
    var data = {
        genre: req.body.genre,
        title: req.body.title,
        author: req.body.author,
        edition: req.body.edition
    };

    var rules = validationRules.books.admin_request;
    var validator = new asyncValidator(rules);

    validator.validate(data, (errors, fields)=> {
        if(!errors){
            bookModel.adminBookRequest(data, (result)=> {
                if(result.length == 0){
                    res.send("Invalid");
                }
                else {
                    res.render('admin/books-request', {errs: [], success: [{message: "Your request has been noted, thank you!"}]});
                }
            });
        }
        else {
            console.log(fields);
            res.render('admin/books-request', {errs: errors, success: []});
        }
    });
});

//Suppliers display routes
router.get('/suppliers', (req, res)=> {
    supplierModel.getAll((result)=> {
        if(!result){
            res.send("Invalid");
        }
        else {
            console.log(result);
            res.render('admin/suppliers', {res: result, errs: []});
        }
    });
});

router.post('/suppliers', (req, res)=> {
    var searchBy = req.body.searchBy;
    var word = req.body.word;
    supplierModel.searchBy(searchBy, word, (result)=> {
        if(!result){
            res.render('admin/suppliers', {res: [], errs: [{message: "No results found!"}]});
        }
        else {
            console.log(result);
            res.render('admin/suppliers', {res: result, errs: []})
        }
    });
});

//Adding new suppliers by admin routes
router.get('/suppliers/add', (req, res)=> {
    res.render('admin/suppliers-add', {errs: [], success: [], data: []});
});

router.post('/suppliers/add', (req, res)=> {
    var data = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        address: req.body.address
    };

    var rules = validationRules.suppliers.create;
    var validator = new asyncValidator(rules);

    validator.validate(data, (errors, fields)=> {
        if(!errors){
            supplierModel.createSupplier(data, (result)=> {
                if(!result){
                    res.send("Invalid");
                }
                else {
                    console.log(result);
                    res.render('admin/suppliers-add', {errs: [], success: [{message: "Supplier added successfully!"}], data: []});
                }
            });
        }
        else {
            console.log(fields);
            res.render('admin/suppliers-add', {errs: errors, success: [], data});
        }
    });
});

//Editing supplier details routes
router.get('/suppliers/edit/:id', (req, res)=> {
    var supplier = req.params.id;
    supplierModel.getSupplier(supplier, (result)=> {
        if(result.length == 0){
            res.send("Invalid");
        }
        else {
            res.render('admin/suppliers-edit', {res: result, errs: [], success: []});
        }
    });
});

router.post('/suppliers/edit/:id', (req, res)=> {
    var data = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        address: req.body.address,
    };
    var supplier_id = req.body.supplier_id;

    var rules = validationRules.suppliers.create;
    var validator = new asyncValidator(rules);

    validator.validate(data, (errors, fields)=> {
        if(!errors){
            supplierModel.updateSupplier(supplier_id, data, (result)=> {
                if(!result){
                    res.send("Invalid");
                }
                else {
                    console.log(result);
                    res.render('admin/suppliers-edit', {res: result, errs:[], success: [{message: "Supplier updated successfully!"}]});
                }
            });
        }
        else {
            console.log(fields);
            res.render('admin/suppliers-edit', {res: data, errs: errors, success: []});
        }
    });

});


module.exports = router;
