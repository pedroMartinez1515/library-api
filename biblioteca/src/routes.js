const AuthController = require('./controllers/AuthController');
const BookController = require('./controllers/BookController');
const BookCopyController = require('./controllers/BookCopyController');
const PersonController = require('./controllers/PersonController');
const RentController = require('./controllers/RentController');
const showBooksByCity = require('./functions/showBooksByCity');
const showDelayedBooks = require('./functions/showDelayedBooks');
module.exports = [
    // --------------------------- PESSOAS ------------------------------

    { method: 'GET', path: '/person', handler: PersonController.index },

    { method: 'GET', path: '/person/{id}', handler: PersonController.byId },

    { method: 'POST', path: '/person', handler: PersonController.create },

    { method: 'PUT', path: '/person/{id}', handler: PersonController.update },

    { method: 'DELETE', path: '/person/{id}', handler: PersonController.delete },

    // --------------------------- LIVROS ------------------------------

    { method: 'GET', path: '/book', handler: BookController.index },

    { method: 'GET', path: '/book/{id}', handler: BookController.byId },

    { method: 'POST', path: '/book', handler: BookController.create },

    { method: 'PUT', path: '/book/{id}', handler: BookController.update },

    { method: 'DELETE', path: '/book/{id}', handler: BookController.delete },

    // --------------------------- LIVROS CÓPIA ------------------------------

    { method: 'GET', path: '/bookcopy', handler: BookCopyController.index },

    { method: 'GET', path: '/bookcopy/{id}', handler: BookCopyController.byId },

    { method: 'POST', path: '/bookcopy', handler: BookCopyController.create },

    { method: 'PUT', path: '/bookcopy/{id}', handler: BookCopyController.update },

    { method: 'DELETE', path: '/bookcopy/{id}', handler: BookCopyController.delete },

    // --------------------------- CONTROLE DE ALUGUEL ------------------------------
    { method: 'POST', path: '/rent', handler: RentController.rentBook },

    { method: 'POST', path: '/returnbook', handler: RentController.returnBook },

    //------------------------ FUNCIONALIDADES ------------------------------------

    { method: 'GET', path: '/showthreebooks', handler: showDelayedBooks.showDelayedBooks },

    { method: 'GET', path: '/showthreebookspercity', handler: showBooksByCity.showBooksByCity },

    //------------------------ AUTENTICAÇÃO ------------------------------------
    { method: 'POST', path: '/generatetoken', handler: AuthController.generateToken, options: { auth: false } }

    // server.ext('onRequest', auth

]