function metadata(sample) {
    d3.json("samples.json").then(function(data1) {
        console.log(data1);
        var info = d3.select("#sample-metadata");
        selection.html("");
        Object.entries(data1).forEach(([key, value]) => {
            var box = info.append("p");
            box.text(key + ": " + value);
        });
    });
}
function charts(sample) {
    d3.json("samples.json").then(function(data2) {
        console.log(data2);
        var trace1 = [{
            values: data2.sample_values.slice(0, 10),
            labels: data2.otu_ids.slice(0, 10),
            hovertext: data2.otu_labels.slice(0,10),
        }];
        
        var bar = [trace1];
        Plotly.newPlot('bar', bar);
        
        var trace2 = {
  
          x: data2.otu_ids,
          y: data2.sample_values,
          hovertext: data2.otu_labels,
          mode: 'markers',
          text: data2.otu_labels,
          marker: {
              color: data2.otu_ids,
              size: data2.sample_values,
            }
        };
  
        var bubble = [trace2];
        Plotly.newPlot('bubble', bubble);
    });
  
} 

function init() {
    var dropdown = d3.select("#selDataset");
    d3.json("samples.json").then(function(data3) {
        console.log(data3);
        data3.forEach((sample) => {
            dropdown.append("option").text(sample).property("value", sample);
        });
        var default1 = data3[0];
        charts(default1);
        metadata(default1);
    });
}
  
function filtered(newdefault) {
    charts(newdefault);
    metadata(newdefault);
}

init();