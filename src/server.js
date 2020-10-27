const { request, gql } = require('graphql-request');
const { json2csv } = require('json-2-csv');

function printCSV(ships){
    json2csv(ships, (err, csv) => {
        if(err){
            throw err;
        }
        console.log(csv);
    });
}

function filterData(ships){
    const filteredData = ships
    .filter((ship) => ship.active === true )
    .map((ship) => {
        let n = {
            nave: ship.name,
            missao: ship.missions[ship.missions.length - 1].name
        }
        return n;
    });
    return filteredData;
}

function querySpacex(){
    const query = gql`
        {
            ships {
                active
                name
                missions {
                    name
                }
            }  
        }
    `;

    request('https://api.spacex.land/graphql/', query)
    .then((data) => {
        printCSV(filterData(data['ships']));
    });
}

querySpacex();

