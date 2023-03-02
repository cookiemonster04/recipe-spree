//Script used to add image urls to the sample JSONs
const fs = require('fs');

//Reads layer1.json which contains ingredients, instructions, etc.
fs.readFile('../layer2.json', 'utf8', function read(err,data)
{
    if (err)
        throw(err);
    const content = data;
    processFile(content);
});

function processFile(content)
{
    const recipe = JSON.parse(content); 
    //Loops through each individual recipe
    //Recipes in layer1 and layer2 aren't in the same order, so all of the layer1 JSONS have to be
    //made before the images can be appended. If the recipe cannot be found for a particular image,
    //the program just returns
    for (let i = 0; i < 10; i++)
    {
        const itemID = recipe[i].id;
        fs.readFile('../individual/' + itemID + '.json', 'utf8', function read(err,data)
        {
            if (err)
                return;
            const originalRecipe = JSON.parse(data);
            originalRecipe.image = recipe[i].images[0].url;
            fs.writeFile('../individual/' + itemID + '.json', JSON.stringify(originalRecipe, null, 2), err =>
            {
                if (err)
                    return;
                console.log('Modified ' + itemID + '.json');
            });
        });
    }
}