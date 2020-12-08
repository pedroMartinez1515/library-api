const db = require("../config/database");
const moment = require('moment');
const { get } = require('lodash');
const months = require('../mocks/months');
module.exports = {
    async showBooksByCity() {
        try {
            const { rows: query } = await db.query(
                "select distinct idbookcopy from rentedbookcity where city = 'São Paulo'"
            );
            
            let booksArray = [];

            let resultsCount = 0;

            for (let month of months) {
                for (let result of query) {
                    const { rows: book } = await db.query(
                        "select count(idbookcopy) from rentedbookcity where idbookcopy = $1 and month = $2",
                        [result.idbookcopy, month]
                    );

                    const { rows: bookTitle } = await db.query(
                        "select title from bookcopy where id = $1",
                        [result.idbookcopy]
                    );

                    if (book[0].count < 1) continue;

                    booksArray.push({ title: bookTitle[0].title, count: book[0].count, month });
                };

                resultsCount++;
                if (resultsCount > 3) {
                    resultsCount = 0;
                    continue;
                };
                console.log(resultsCount)
            }

            return { booksArray }

            return { delayedBooks: [booksArray[0], booksArray[1], booksArray[2]] }
        } catch (err) {
            console.log(err.stack || err.message || err);
        }
    }
}