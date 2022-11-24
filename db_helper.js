const oracledb = require('oracledb');
const { dbConnector } = require('./db.js');
const { DbStatusEnum } = require("./db_status.js");
const { TypeCheck } = require("../utils/type_check.js");

export const dbHelper = (() => {
    const _generateWildcard = (data) => {
        switch (data.length) {
            case 1:
                return "(:1)";
            case 2:
                return "(:1, :2)";
            default:
                var wildcard = "";

                for (const index in data) {
                    console.log(index);
                    if (index === 0) {
                        wildcard += "(:1, ";
                        console.log(wildcard);
                        continue;
                    }
                    if (index === data.length - 1) {
                        wildcard += `:${index + 1}\)`;
                        console.log(wildcard);
                        continue;
                    }
                    wildcard += `:${index + 1}, `;
                    console.log(wildcard);
                }

                return wildcard;
        }
    };

    const _columnsToString = (columns) => {
        switch (data.length) {
            case 1:
                return `(${columns[0]})`;
            case 2:
                return `(${columns[0]}, ${columns[1]})`;
            default:
                var temp = "";

                for (const index in data) {
                    if (index === 0) {
                        temp += `(${columns[index]}, `;
                        console.log(temp);
                        continue;
                    }
                    if (index === data.length - 1) {
                        temp += `${columns[index]})`
                        console.log(temp);
                        continue;
                    }
                    temp += `${columns[index]}, `;
                    console.log(temp);
                }

                return temp;
        }
    }

    return {
        /**
         * @author Jang Seongho
         * 
         * @function
         * @type {arrow function}
         * 
         * @param { String } table
         * @param { Array<String>? } columns
         * @param { Array<T> } data
         * 
         * @description
         * The insert function to the oracle db.
         * 
         * @returns { DbStatusEnum.notInitialized }
         * if db connected 
         * 
         * @returns { DbStatusEnum.typeError }
         * if the type of parameter isn't matched
         * 
         * @returns { bool }
         * * isConnected(): get the server is connected oracle-db.
         * 
         * @throws {'oracledb get connection is failed'} the server fails connect to oracle-db.
         */
        insert: async (table, columns, data) => {
            if (!dbConnector.isConnected()) {
                return {
                    ...DbStatusEnum.notInitialized
                };
            }

            if (TypeCheck.getType(table) !== "String") {
                return {
                    ...DbStatusEnum.typeError
                };
            }

            let isColumnsNull = false;

            if (columns !== null) {
                isColumnsNull = true;
            }

            if (!isColumnsNull && TypeCheck.getType(columns) !== "Array") {
                return {
                    ...DbStatusEnum.typeError
                };
            }

            if (TypeCheck.getType(data) !== "Array") {
                return {
                    ...DbStatusEnum.typeError
                };
            }

            let sql;

            if (isColumnsNull) {
                sql = `INSERT INTO ${table} VALUES ${_generateWildcard(data)}`;
                console.log(sql);
                try {
                    // await dbConnector.connection.execute(sql, data);
                    return {
                        ...DbStatusEnum.success
                    };
                } catch (e) {
                    return {
                        ...DbStatusEnum.dbError
                    };
                }
            }

            if (columns.length !== data.length) {
                return {
                    ...DbStatusEnum.parameterLengthNotMatched
                };
            }

            sql = `INSERT INTO ${table} ${_columnsToString(columns)} VALUES ${_generateWildcard(data)}`;
            try {
                // await dbConnector.connection.execute(sql, data);
                return {
                    ...DbStatusEnum.success
                };
            } catch (e) {
                return {
                    ...DbStatusEnum.dbError
                };
            }
        },
        insertMany: async (table, columns, data) => {
            // Insert some rows

            const sql = `INSERT INTO nodetab VALUES (:1, :2)`;

            const binds =
                [[1, "First"],
                [2, "Second"],
                [3, "Third"],
                [4, "Fourth"],
                [5, "Fifth"],
                [6, "Sixth"],
                [7, "Seventh"]];

            await connection.executeMany(sql, binds);
        }
    };
})();
