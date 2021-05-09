
//Use the D3 library to read in samples.json.
//create the graph.
function bargraph(id_input){
    //Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
    //json data gets read.
    d3.json("samples.json").then((importData) =>{
        //selecting the sample section from samples.js
        var dataSamples=importData.samples;
        //id_input coming from the dropdown menue
        var dataId = dataSamples.filter(d=> d.id == id_input);
        var otu_ids=dataId[0].otu_ids;
        var otu_lables= dataId[0].otu_labels;
        var otu_values = dataId[0].sample_values;
        

        var trace={
            x: otu_values.slice(0,10).reverse(),
            y: otu_ids.slice(0,10).map(d => "OTU "+d).reverse(),
            text: otu_lables.slice(0,10).reverse(),
            type: "bar",
            orientation: "h"
        };
        var layout = {
            title: "Bacteria"
        };
        var data = [trace];
        Plotly.newPlot("bar", data, layout);
    });
 
};

function bubbleChart(id_input){

};

//adding values to the dropdown menue.
d3.json("samples.json").then((data) => {
    var names = data.names;
    console.log(names);
    //names.forEach((name) => {
    var num=d3.select("#selDataset").selectAll("option").data(names)
    .enter().append("option").property("value", d =>d).text(d=>d);
    console.log(num);
      // });
      
     //bargraph(data.names[0]);
    
});
//adding the data to sample-metadata.
console.log(num);
d3.select("#sample-metadata").selectAll("lu").append("lu");
function table(id_input){
    

};

//using the event lestner from the html file to select the value.
function optionChanged(value) {
    console.log(value);
    bargraph(value);
    bubbleChart(value);
        
    
};



