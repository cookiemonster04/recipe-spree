const fs = require('fs');

//Reads layer1.json which contains ingredients
fs.readFile('./layer1.json', 'utf8', function read(err,data)
{
    if (err)
        throw(err);
    const content = data;
    processFile(content);
});


function processFile(content)
{
    const recipe = JSON.parse(content);
    let containsIngredient = [];
    //Enter ingredient names here
    const keywords = ["cheese", "Cheese", "cheddar", "Gruyere"];
    //Loops through each individual recipe
    for (let i = 0; i < 1000; i++)
    {
        const itemID = recipe[i].id;
        //Searches each ingredient in the recipe for the keywords
        recipe[i].ingredients.every(element => 
            {
                const ingredient = JSON.stringify(element);
                if (keywords.some(keyword => ingredient.includes(keyword))) 
                {
                    containsIngredient.push(itemID);
                    return false;
                }
                return true;
            });
    }
    //Prints an array of recipe IDs that contain the desired ingredient to a txt file
    fs.writeFile('./ingredients/' + keywords[0] + '.txt', JSON.stringify(containsIngredient), err =>
    {
        if (err)
            return;
        console.log('Created ' + keywords[0] + '.txt');
    });
}