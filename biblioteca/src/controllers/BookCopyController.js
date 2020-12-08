const db = require("../config/database");
module.exports = {
    async index(request, h) {
        try {
            const { rows } = await db.query(
                "SELECT * FROM bookcopy",
            );

            return { body: { person: rows } };

        } catch (err) {
            console.log(err.stack || err.message || err);
            return h.response(err.message).code(500);

        }
    },

    async byId(request, h) {
        const id = request.params.id;

        const { rows } = await db.query(
            "SELECT * FROM bookcopy WHERE id = ($1)",
            [id]
        );
        return rows
    },

    async create(request, h) {
        {
            try {
                const { idbook } = request.payload;

                const { rows: book } = await db.query(
                    "SELECT * FROM book where id = ($1)",
                    [idbook]
                );

                const { rows } = await db.query(
                    "INSERT INTO bookcopy (title, author, isbn, copycode) VALUES ($1, $2, $3, $4)",
                    [book[0].title + '-' + 'cópia', book[0].author, book[0].isbn, book[0].copycode]
                );

                return { message: "Cópia criada com sucesso!" };

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

            const { rows: bookcopy } = await db.query(
                "SELECT * FROM bookcopy WHERE id = ($1)",
                [id]
            );

            await db.query(
                `UPDATE bookcopy SET 
            title = '${title || bookcopy[0].title}',
            author = '${author || bookcopy[0].author}',
            isbn = '${isbn || bookcopy[0].isbn}',
            copycode = '${copycode || bookcopy[0].copycode}'
            WHERE id = '${id}' `,
            );

            return { message: 'Cópia atualizada com sucesso!' }

        } catch (err) {
            console.log(err.stack || err.message || err);
            return h.response(err.message).code(500);
        }
    },

    async delete(request, h) {
        try {
            const { id } = request.params;

            const { rows: deleteQuery } = await db.query(
                "DELETE FROM bookcopy WHERE id = ($1)",
                [id]
            );

            return { message: "Cópia deletada com sucesso." };

        } catch (err) {
            return h.response(err.message).code(500);
        }
    }
}