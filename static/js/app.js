
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
            title: "Top 10 Bacteria Cultures Found",
        };
        var data = [trace];
        Plotly.newPlot("bar", data, layout);
    });
 
};





function bubbleChart(id_input){
    d3.json("samples.json").then((importDataB) =>{
        //selecting the sample section from samples.js
        var dataSamples=importDataB.samples;
        //console.log(dataSamples);
        //id_input coming from the dropdown menue
        var dataId = dataSamples.filter(d=> d.id == id_input);
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
            text:otu_lables_b,
            mode:'markers',
            marker:{
                 size:otu_values_b,
                 //sizemode:'area',
                 color:otu_ids_b,
                 colorscale: "Earth"
             }
        };
    
        var data = [trace1];
        var layout={
            title:'Bacteria Cultures Per Sample',
            showlegend: false,
            hovermode: "closest",
            height: 900,
            width: otu_ids_b,
            xaxis: {
                title: "OTU Id"
            }
        };
    
        Plotly.newPlot("bubble",data,layout);
    
    });

    

    

};

function gauge(id_input){
    d3.json("samples.json").then((importDatagauge) =>{
        //selecting the sample section from samples.js
        var dataSamples=importDatagauge.metadata;
        console.log(dataSamples);
        //id_input coming from the dropdown menue
        var dataId = dataSamples.filter(d=> d.id == id_input);
        var dataGauge=dataId[0].wfreq;
        console.log(dataGauge);
        var data=[
            {
                domain:{x:[0,1], y:[0,1]},
                value: dataGauge,
                title:{text:`Scrubs per Week`},
                    
                
                type: "indicator",
                mode:"gauge+number+delta",
                delta: { reference: 9 },
                gauge:{
                    axis:{range:[null,9]},
                    threshold:{
                        line:{color:"purple",width:8},
                        thickness:2,
                        steps: [
                            { range: [7,9], color: "cyan" }
                        ],

                        value: dataGauge
                    }
                }
            }
        ];
        var layout={width:600, height:500, margin: { t: 0, b: 0 }};

        Plotly.newPlot('gauge',data,layout);
        // var otu_ids_b=dataId[0].otu_ids;
        // //console.log(otu_ids_b);
        // var otu_lables_b= dataId[0].otu_labels;
        // //console.log(otu_lables_b);
        // var otu_values_b = dataId[0].sample_values;
        // //console.log(otu_values_b);


    });

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
    gauge(value);
        
    
};



