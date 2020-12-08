const db = require("../config/database");
module.exports = {
    async index(request, h) {
        try {
            const { rows } = await db.query(
                "SELECT * FROM book",
            );

            return { body: { books: rows } };

        } catch (err) {
            console.log(err.stack || err.message || err);
            return h.response(err.message).code(500);
        }
    },

    async byId(request, h) {
        const id = request.params.id;

        const { rows } = await db.query(
            "SELECT * FROM book WHERE id = ($1)",
            [id]
        );
        return rows
    },

    async create(request, h) {
        {
            try {
                const { title, author, isbn, copycode } = request.payload;
                const { rows } = await db.query(
                    "INSERT INTO book (title, author, isbn, copycode) VALUES ($1, $2, $3, $4)",
                    [title, author, isbn, copycode]
                );

                return { message: "Livro criado com sucesso!" };

            } catch (err) {
                console.log(err.stack || err.message || err);
                return h.response(err.message).code(500);
            }

        };
    },

    async update(request, h) {
        try {
            const { title, author, isbn, copycode } = request.payload;
            const { id } = request.params;

            const { rows: book } = await db.query(
                "SELECT * FROM book WHERE id = ($1)",
                [id]
            );

            await db.query(
                `UPDATE book SET 
            title = '${title || book[0].title}',
            author = '${author || book[0].author}',
            isbn = '${isbn || book[0].isbn}',
            copycode = '${copycode || book[0].copycode}'
            WHERE id = '${id}' `,
            );

            return { message: 'Livro atualizado com sucesso!' }

        } catch (err) {
            console.log(err.stack || err.message || err);
            return h.response(err.message).code(500);
        }
    },

    async delete(request, h) {
        try {
            const { id } = request.params;

            const { rows: deleteQuery } = await db.query(
                "DELETE FROM book WHERE id = ($1)",
                [id]
            );

            return { message: "Livro deletado com sucesso." };

        } catch (err) {
            return h.response(err.message).code(500);
        }
    }
}