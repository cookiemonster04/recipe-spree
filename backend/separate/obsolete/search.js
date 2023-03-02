const fs = require('fs');

/*testDesired = ["chicken", "potato"];
testUndesired = ["onion"];

search(testDesired, testUndesired);*/

let recommended = [];
let recommendedIDs = [];


function search(desired, undesired)
{
    addScore(desired);
    removeUndesired(undesired);
    console.log(recommended);
}

function addScore(desired)
{
    let ingredients = [];
    desired.forEach(element =>
        {
            const data = JSON.parse(fs.readFileSync('../ingredients/' + element + '.txt', 'utf8', function read(err,data){}));
            ingredients.push(data);
            data.forEach(ID =>
                {
                    if (recommendedIDs.includes(ID))
                    {
                        recommended[recommendedIDs.indexOf(ID)].score++;
                    }
                    else
                    {
                        let recipe = {id:ID, score:1};
                        recommended.push(recipe);
                        recommendedIDs.push(ID);                       
                    }
                })
        })
}

function removeUndesired(undesired)
{
    let ingredients = [];
    undesired.forEach(element =>
        {
            const data = JSON.parse(fs.readFileSync('../ingredients/' + element + '.txt', 'utf8', function read(err,data){}));
            ingredients.push(data);
            data.forEach(ID =>
                {
                    const index = recommendedIDs.indexOf(ID);
                    if (index >= 0)
                    {
                        recommended.splice(index, 1);
                        recommendedIDs.splice(index, 1);
                    }
                })
        })
    recommended.sort((a, b) => (a.score > b.score) ? -1 : 1);
}