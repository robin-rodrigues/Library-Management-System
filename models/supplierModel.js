var db = require.main.require('./models/config');

var validateSupplier = (email, password, callback) => {
    var sql = "SELECT * FROM suppliers WHERE email = ? AND password = ?";
    db.executeQuery(sql, [email, password], function(result) {
        callback(result[0]);
    });
};

var createSupplier = (supplier, callback) => {
    var sql = "INSERT INTO suppliers VALUES(supplier_id, ?, ?, ?, ?, ?)";
    db.executeQuery(sql, [supplier.name, supplier.phone, supplier.email, supplier.password, supplier.address], function(result) {
        callback(result);
    });
};

var getSupplier = (id, callback) => {
    var sql = "SELECT * FROM suppliers WHERE supplier_id=?";
    db.executeQuery(sql, [id], function(result) {
        callback(result[0]);
    });
};

var updateSupplier = (supplier, callback) => {
    var sql = "UPDATE suppliers SET name = ?, email = ?, phone = ?, address = ? WHERE supplier_id = ?";
    db.executeQuery(sql, [supplier.name, supplier.email, supplier.phone, supplier.address, supplier.supplier_id], function(result) {
        callback(result);
    });
};

var updatePassword = (password, id, callback) => {
    var sql = "UPDATE suppliers SET password = ? WHERE supplier_id = ?";
    db.executeQuery(sql, [password, id], function(result) {
        callback(result);
    });
};

var getAll = (callback) => {
    var sql = "SELECT * FROM suppliers";
    db.executeQuery(sql, null, function(result) {
        callback(result);
    });
};

var searchBy = (searchBy, word, callback) => {
    var sql = "SELECT * FROM suppliers WHERE "+searchBy+" = ?";
    db.executeQuery(sql, [word], function(result) {
        callback(result);
    });
};

// var updateSupplier = (id, supplier, callback) => {
//     var sql = "UPDATE suppliers SET name = ?, email = ?, phone = ?, address = ? WHERE supplier_id = ?";
//     db.executeQuery(sql, [supplier.name, supplier.email, supplier.phone, supplier.address, id], function(result) {
//         callback(result);
//     });
// };

// var deletesupplier = (id, callback) => {
//     var sql = "DELETE FROM suppliers WHERE supplier_id = ?";
//     db.executeQuery(sql, [id], function(result) {
//         callback(result);
//     });
// };
// var getsupplierBorrow = (id, callback) => {
//     var sql = "SELECT * FROM books WHERE supplier_id = ?";
//     db.executeQuery(sql, [id], function(result) {
//         callback(result);
//     });
// };
// var getsupplierHistory = (id, callback) => {
//     var sql = "SELECT issue_date.supplier_id, issue_date.book_id, books.title, books.author, books.publisher, books.edition, books.isbn, issue_date.date FROM issue_date INNER JOIN books ON issue_date.book_id=books.book_id WHERE issue_date.supplier_id=?";
//     db.executeQuery(sql, [id], function(result) {
//         callback(result);
//     });
// };

// var totalBooksBorrowedByCustomer = (id, callback) => {
//     var sql = "SELECT books.*, issue_date.book_id FROM issue_date INNER JOIN books ON issue_date.book_id=books.book_id WHERE issue_date.supplier_id = ?";
//     db.executeQuery(sql, [id], function(result) {
//         callback(result);
//     });
// };

module.exports = {
    validateSupplier,
    createSupplier,
    getSupplier,
    updateSupplier,
    updatePassword,
    getAll,
    searchBy,
    // updateCustomer,
    // deletesupplier,
    // getsupplierBorrow,
    // getsupplierHistory,
    // totalBooksBorrowedByCustomers
};
