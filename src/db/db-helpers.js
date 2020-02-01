'use strict';

async function get(model, column, value) {

    // construct where condition
    let filter = { where: { }};
    filter.where[column] = value;

    try {
        const result = await model.findAll(filter);
        return result.map(website => website.dataValues);
    } catch (error) {
        console.log(`Error when selecting ${model.tableName} where ${column} = ${value}: ${error}`);
        return null;
    }
}

async function insert(model, record) {
    try {
        const result = await model.create(record);
        console.log(`Created a new '${model.tableName}': ${result}`);
        return result.dataValues;
    } catch (error) {
        console.log(`Error when inserting ${model.tableName}: ${error}`);
        return null;
    }
}

async function update(model, whereColumn, whereValue, updateColumn, updateValue) {
    try {

        // construct where condition
        let update = {};
        update[updateColumn] = updateValue;

        let filter = { where: {}};
        filter.where[whereColumn] = whereValue;

        const result = await model.update(update, filter);
        console.log(`Updated ${model.tableName} where ${whereColumn} = ${whereValue}`);
        return result;
    } catch (error) {
        console.log(`Error when updating ${model.tableName} where ${whereColumn} = ${whereValue}: ${error}`);
        return null;
    }
}

async function remove(model, column, value) {

    // construct where condition
    let filter = { where: { }};
    filter.where[column] = value;

    try {
        const result = await model.destroy(filter);
        console.log(`Removed ${model.tableName} where ${column} = ${value}`);
        return result;
    } catch (error) {
        console.log(`Error when removing ${model.tableName} where ${column} = ${value}: ${error}`);
        return null;
    }
}

module.exports = {
    get,
    insert,
    update,
    remove
};