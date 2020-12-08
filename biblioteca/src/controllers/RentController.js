const db = require("../config/database");
const moment = require('moment');
const { get } = require('lodash');
module.exports = {
    async rentBook(request, h) {
        try {
            const { idbookcopy, personcpf, city } = request.payload;

            //verificar se a pessoa que vai alugar o livro ja atrasou 2x
            const { rows: rentVerify } = await db.query(
                "SELECT * FROM rentcontrol where idbookcopy = ($1)",
                [idbookcopy]
            );

            if (get(rentVerify, '[0].isrented') == true) return { message: 'Esse livro já está emprestado.' };


            const { rows: verifyDelay } = await db.query(
                "SELECT * FROM rentdelay where personcpf = ($1)",
                [personcpf]
            );

            if (verifyDelay.length > 1) return { message: 'Essa pessoa não pode pegar mais livros emprestados!' }

            const { rows: rentBook } = await db.query(
                "INSERT INTO rentcontrol(idbookcopy, personcpf, rentday, returndate, city, isrented ) VALUES($1, $2, $3, $4, $5, true)",
                [idbookcopy, personcpf, moment().format('YYYY-MM-DD'), moment().add(14, 'days').format('YYYY-MM-DD'), city]
            );

            const { rows: rentedBookCity } = await db.query(
                "INSERT INTO rentedbookcity(idbookcopy, city, month) VALUES($1, $2, $3)",
                [idbookcopy, city, moment().format('MMMM')]
            );

            return { message: 'Livro emprestado com sucesso!' }
        } catch (err) {
            console.log(err.stack || err.message || err)
        }
    },

    async returnBook(request, h) {
        try {
            let { idbookcopy, returndate } = request.payload;

            returndate = moment(returndate, 'DD-MM-YYYY').format('YYYY-MM-DD');

            const { rows: returnVerify } = await db.query(
                "SELECT * FROM rentcontrol where idbookcopy = ($1)",
                [idbookcopy]
            );

            if (!get(returnVerify, '[0].isrented')) return { message: 'Esse livro já foi devolvido' };

            const infos = get(returnVerify, '[0]');

            if (get(returnVerify, '[0].returndate') != returndate) {
                const { rows: insertIntoDelayedTable } = await db.query(
                    "INSERT INTO rentdelay(personcpf, idbookcopydelayed, citydelayed, datedelayed) VALUES($1, $2, $3, $4)",
                    [infos.personcpf, infos.idbookcopy, infos.city, returndate]
                );
            }

            const { rows: returnBook } = await db.query(
                "DELETE FROM rentcontrol WHERE idbookcopy = $1",
                [idbookcopy]
            );

            return { message: "Livro devolvido com sucesso!" }

        } catch (err) {
            console.log(err.stack || err.message || err)
            return err.message
        }
    }
}