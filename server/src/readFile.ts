const fileSystem = require('fs');
const parse = require('csv-parse');

export const csvData: any[] = [];

fileSystem.createReadStream('src/file.csv')
    .pipe(
        parse({
            delimiter: ';'
        }),
    )
    .on('data', function (dataRow: any) {
        csvData.push(dataRow);
    });