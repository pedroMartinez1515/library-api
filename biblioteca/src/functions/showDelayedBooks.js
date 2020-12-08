const db = require("../config/database");
const moment = require('moment');
const { get } = require('lodash');
module.exports = {
    async showDelayedBooks() {
        try {
            const { rows: delayedBooks } = await db.query(
                "select distinct idbookcopydelayed from rentdelay"
            );

            let booksArray = [];

            for (let book of delayedBooks) {
                const { rows: result } = await db.query(
                    'select count(idbookcopydelayed) from rentdelay where idbookcopydelayed = $1',
                    [book.idbookcopydelayed]
                );

                const { rows: detailedBook } = await db.query(
                    'select * from bookcopy where id = $1',
                    [book.idbookcopydelayed]
                );
                booksArray.push({ delays: result[0].count, title: detailedBook[0].title, bookCopyId: book.idbookcopydelayed });
            };

            booksArray = booksArray.sort((a, b) => a.count > b.count ? -1 : 1);

            return { delayedBooks: [booksArray[0], booksArray[1], booksArray[2]] }
        } catch (err) {
            console.log(err.stack || err.message || err);
        }
    }
}