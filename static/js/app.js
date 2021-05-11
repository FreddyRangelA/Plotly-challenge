
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


d3.json("samples.json").then((importDataB) =>{
    //selecting the sample section from samples.js
    var dataSamples=importDataB.samples;
    //console.log(dataSamples);
    //id_input coming from the dropdown menue
    var dataId = dataSamples.filter(d=> d.id == 940);
    //console.log(dataId);
    var otu_ids_b=dataId[0].otu_ids;
    //console.log(otu_ids_b);
    var otu_lables_b= dataId[0].otu_labels;
    //console.log(otu_lables_b);
    var otu_values_b = dataId[0].sample_values;
    //console.log(otu_values_b);

    var trace1 ={
        x:otu_ids_b,
        y:otu_values_b,
        //text:otu_lables_b,
        // mode:'markers',
        // marker:{
        //     size:otu_values_b,
        //     sizemode:'area',
        //     color:otu_ids_b,
        //     colorscale: "Earth"
        // }
    };

    var data = [trace1];
    var layout={
        title:'bubble chart',
        showlegend: true,
        hovermode: "closest",
        height: 600,
        width: otu_values_b,
        xaxis: {
            title: "OTU Id"
        }
    };

    Plotly.newPlot("bubble",[data],layout);

});


function bubbleChart(id_input){

    

};

//adding values to the dropdown menue.
d3.json("samples.json").then((data) => {
    var names = data.names;
    //console.log(names);
    //names.forEach((name) => {
    d3.select("#selDataset").selectAll("option").data(names)
    .enter().append("option").property("value", d =>d).text(d=>d);
    //console.log(num);
      // });
      
     //bargraph(data.names[0]);
    
});
//adding the data to sample-metadata.


function table(id_input){
    //console.log(id_input);
    
    
    d3.json("samples.json").then((dataNum)=>{
        var num=dataNum.metadata;
        var dataIdNum = num.filter(d=> d.id == id_input);
        var resultNum=dataIdNum[0];
        panelBody=d3.select(".panel-body");
        panelBody.html("");
        Object.entries(resultNum).forEach(([key,value])=>{
            
            d3.select(".panel-body").append("p").text(`${key}:${value}`);
            

        });
        
        //console.log(id_input);
    });

    
    

};


//using the event lestner from the html file to select the value.
function optionChanged(value) {
    //console.log(value);
    bargraph(value);
    bubbleChart(value);
    table(value);
        
    
};



