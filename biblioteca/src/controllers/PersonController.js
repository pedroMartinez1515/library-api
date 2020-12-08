const db = require("../config/database");
module.exports = {
    async index(request, h) {
        try {
            const { rows } = await db.query(
                "SELECT * FROM person",
            );

            return { body: { person: rows } };

        } catch (err) {
            console.log(err.stack || err.message || err);
            return h.response(err.message).code(500);
        }
    },

    async byId(request, h) {
        try {
            const { id } = request.params;

            const { rows } = await db.query(
                "SELECT * FROM person WHERE id = ($1)",
                [id]
            );
            return rows
        } catch (err) {
            console.log(err.stack || err.message || err);
            return h.response(err.message).code(500);
        }
    },

    async create(request, h) {
        {
            try {
                const { name, cpf, birthdate, fulladdress } = request.payload;
                await db.query(
                    "INSERT INTO person (name, cpf, birthdate, fulladdress) VALUES ($1, $2, $3, $4)",
                    [name, cpf, birthdate, fulladdress]
                );

                return { message: "Pessoa criada com sucesso!" };

            } catch (err) {
                console.log(err.stack || err.message || err);
                return h.response(err.message).code(500);
            }

        };
    },

    async update(request, h) {
        try {
            const { name, cpf, birthdate, fulladdress } = request.payload;
            const { id } = request.params;

            const { rows: person } = await db.query(
                "SELECT * FROM person WHERE id = ($1)",
                [id]
            );

            if (!person.length) throw new Error(`Person with the id ${id} is not created`);

            await db.query(
                `UPDATE person SET 
            name = '${name || person[0].name}',
            birthdate = '${birthdate || person[0].birthdate}',
            fulladdress = '${fulladdress || person[0].fulladdress}',
            cpf = '${cpf || person[0].cpf}'
            WHERE id = '${id}' `,
            );

            return { message: 'Pessoa atualizada com sucesso!' }

        } catch (err) {
            console.log(err.stack || err.message || err);
            return h.response(err.message).code(500);
        }
    },

    async delete(request, h) {
        try {
            const { id } = request.params;

            const { rows: deleteQuery } = await db.query(
                "DELETE FROM person WHERE id = ($1)",
                [id]
            );

            return { message: "Pessoa deletada com sucesso." };

        } catch (err) {
            return h.response(err.message).code(500);
        }
    }
}