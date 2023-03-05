//Script used to generate sample JSONs of recipes
const fs = require('fs');

//Reads layer1.json which contains ingredients, instructions, etc.
fs.readFile('../layer1.json', 'utf8', function read(err,data)
{
    if (err)
        throw(err);
    const content = data;
    processFile(content);
});


function processFile(content)
{
    const recipe = JSON.parse(content);
    //Loops through each individual recipe, removes unnecessary attributes
    //Then creates JSON with recipe ID as name
    for (let i = 0; i < 10; i++)
    {
        const itemID = recipe[i].id;
        delete recipe[i].id;
        delete recipe[i].partition;
        recipe[i].image = "";
        fs.writeFile('../individual/' + itemID + '.json', JSON.stringify(recipe[i], null, 2), err =>
        {
            if (err)
                throw err;
            console.log('Created ' + itemID + '.json');
        });
    }
}