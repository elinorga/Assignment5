var populationArray = [ 90000, 150000, 60000, 160000, 110000];
var maxPopulation = 110000;
var isMostPopulated = false;

for(i=0; i < populationArray.length; i++){

    switch(true){
        case(populationArray[i]>maxPopulation):
            console.log("larger");
            break;
        
        case(populationArray[i]<maxPopulation):
            console.log("smaller");
            break;

        case(populationArray[i]===maxPopulation):
            console.log("equals");
            break;
    }
}

((populationArray[populationArray.length-1])< 100000 && (populationArray[populationArray.length-2])< 100000 && (populationArray[populationArray.length-3])< 100000) && (maxPopulation< 100000) || (isMostPopulated === false) ?console.log("Large cities"):console.log("smaller cities");

