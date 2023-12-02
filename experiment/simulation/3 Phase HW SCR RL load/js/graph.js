function plotData() {
  if (
    values["AC1"]["volt"] != 0 &&
    values["AC1"]["freq"] != 0 &&
    values["AC2"]["volt"] != 0 &&
    values["AC2"]["freq"] != 0 &&
    values["AC3"]["volt"] != 0 &&
    values["AC3"]["freq"] != 0 &&
    values["G1"]["fire1"] != 0 &&
    values["G2"]["fire1"] != 0 &&
    values["G3"]["fire1"] != 0 &&
    values["R1"]["value"] != 0 &&
    values["L1"]["value"] != 0
  ) {
    var graph = document.getElementById("graph-new");
    graph.innerHTML = "";
    graph.style.height = "990px";
    a = generateGraph();
    var mine = document.createElement("div");
    mine.id = "input-waves";
    mine.classList.add("graph-style");
    graph.append(mine);
    Plotly.newPlot(
      "input-waves",
      [
        {
          x: a[1][1],
          y: a[1][0],
          mode: "lines",
          name: "V<sub>R</sub>",
          marker: {
            color: "Red",
          },
        },

        {
          x: a[2][1],
          y: a[2][0],
          mode: "lines",
          name: "V<sub>Y</sub>",
          marker: {
            color: "Orange",
          },
        },
        {
          x: a[3][1],
          y: a[3][0],
          mode: "lines",
          name: "V<sub>B</sub>",
          marker: {
            color: "Blue",
          },
        },
      ],
      {
        title:
          "<b>" +
          values["VM2"]["name"] +
          "/" +
          values["VM5"]["name"] +
          "/" +
          values["VM9"]["name"] +
          "</b>",
        xaxis: { range: [0, 0.061], title: "<b>Time(s)</b>", fixedrange: true },
        yaxis: {
          range: [
            -1 * (a[0][3] + 0.1 * a[0][3] + 1),
            a[0][3] + a[0][3] * 0.1 + 1,
          ],
          title: "<b>Amplitude(V)</b>",
          fixedrange: true,
        },
        margin: { t: 35 },
      },
      { displayModeBar: false }
    );

    mine = document.createElement("div");
    mine.id = "gate1";
    mine.classList.add("graph-style");
    graph.append(mine);
    Plotly.newPlot(
      "gate1",
      [
        {
          x: a[6][1],
          y: a[6][0],
          mode: "lines",
          name: "V<sub>GP1</sub>  ",
          marker: {
            color: "Red",
          },
        },
        {
          x: [0],
          y: [0],
          mode: "lines",
          name: "    ",
          marker: {
            color: "White",
          },
        },
      ],
      {
        title: "<b>" + values["VM3"]["name"] + "</b>",
        xaxis: { range: [0, 0.061], title: "<b>Time(s)</b>", fixedrange: true },
        yaxis: {
          range: [-1, 1.5],
          title: "<b>Gate Pulse</b>",
          fixedrange: true,
        },
        margin: { t: 30 },
      },
      { displayModeBar: false }
    );

    mine = document.createElement("div");
    mine.id = "gate2";
    mine.classList.add("graph-style");
    graph.append(mine);
    Plotly.newPlot(
      "gate2",
      [
        {
          x: a[7][1],
          y: a[7][0],
          mode: "lines",
          name: "V<sub>GP2</sub>  ",
          marker: {
            color: "#d66d1c",
          },
        },
        {
          x: [0],
          y: [0],
          mode: "lines",
          name: "    ",
          marker: {
            color: "White",
          },
        },
      ],
      {
        title: "<b>" + values["VM6"]["name"] + "</b>",
        xaxis: { range: [0, 0.061], title: "<b>Time(s)</b>", fixedrange: true },
        yaxis: {
          range: [-1, 1.5],
          title: "<b>Gate Pulse</b>",
          fixedrange: true,
        },
        margin: { t: 30 },
      },
      { displayModeBar: false }
    );

    mine = document.createElement("div");
    mine.id = "gate3";
    mine.classList.add("graph-style");
    graph.append(mine);
    Plotly.newPlot(
      "gate3",
      [
        {
          x: a[8][1],
          y: a[8][0],
          mode: "lines",
          name: "V<sub>GP3</sub>  ",
          marker: {
            color: "Green",
          },
        },
        {
          x: [0],
          y: [0],
          mode: "lines",
          name: "    ",
          marker: {
            color: "White",
          },
        },
      ],
      {
        title: "<b>" + values["VM10"]["name"] + "</b>",
        xaxis: { range: [0, 0.061], title: "<b>Time(s)</b>", fixedrange: true },
        yaxis: {
          range: [-1, 1.5],
          title: "<b>Gate Pulse</b>",
          fixedrange: true,
        },
        margin: { t: 30 },
      },
      { displayModeBar: false }
    );

    graph_element = document.createElement("div");
    graph_element.id = "output_voltage";
    graph_element.classList.add("graph-style");
    graph.append(graph_element);
    Plotly.newPlot(
      "output_voltage",
      [
        {
          x: a[4][1],
          y: a[4][0],
          mode: "lines",
          name: "V<sub>Load</sub>  ",
          marker: {
            color: "Purple",
          },
        },
        {
          x: [0],
          y: [0],
          mode: "lines",
          name: "",
          marker: {
            color: "White",
          },
        },
      ],
      {
        title: "<b>" + values["VM7"]["name"].toUpperCase() + "</b>",
        xaxis: { range: [0, 0.061], title: "<b>Time(s)</b>", fixedrange: true },
        yaxis: {
          range: [-1 *( 0.1 * a[0][0]+a[0][0]), a[0][0] + 0.1 * a[0][0]],
          title: "<b>Voltage(V)</b>",
          fixedrange: true,
        },
        margin: { t: 35 },
      },
      { displayModeBar: false }
    );

    mine = document.createElement("div");
    mine.id = "output_current";
    mine.classList.add("graph-style");
    graph.append(mine);

    Plotly.newPlot(
      "output_current",
      [
        {
          x: a[5][1],
          y: a[5][0],
          mode: "lines",
          name: "I<sub>L</sub>  ",
          marker: {
            color: "orange",
          },
        },
        {
          x: [0],
          y: [0],
          mode: "lines",
          name: "    ",
          marker: {
            color: "White",
          },
        },
      ],
      {
        title: "<b>" + values["AM1"]["name"] + "</b>",
        xaxis: { range: [0, 0.061], title: "<b>Time(s)</b>", fixedrange: true },
        yaxis: {
          range: [-1 *( 0.1 * a[0][1]), (a[0][1] + 0.1 * a[0][1])],
          title: "<b>Current(A)</b>",
          fixedrange: true,
        },
        margin: { t: 30 },
      },
      { displayModeBar: false }
    );




    mine = document.createElement("div");
    mine.id = "thy1";
    mine.classList.add("graph-style");
    graph.append(mine);
    Plotly.newPlot(
      "thy1",
      [
        {
          x: a[9][1],
          y: a[9][0],
          mode: "lines",
          name: "V<sub>T1</sub>  ",
          marker: {
            color: "red",
          },
        },
        {
          x: [0],
          y: [0],
          mode: "lines",
          name: "    ",
          marker: {
            color: "White",
          },
        },
      ],
      {
        title: "<b>" + values["VM1"]["name"] + "</b>",
        xaxis: { range: [0, 0.061], title: "<b>Time(s)</b>", fixedrange: true },
        yaxis: {
          range: [-1 * (a[0][2] + 0.1 * a[0][2] + 1),(a[0][2] + 0.1 * a[0][2])],
          title: "<b>Voltage(V)</b>",
          fixedrange: true,
        },
        margin: { t: 30 },
      },
      { displayModeBar: false }
    );
    mine = document.createElement("div");
    mine.id = "thy2";
    mine.classList.add("graph-style");
    graph.append(mine);
    Plotly.newPlot(
      "thy2",
      [
        {
          x: a[10][1],
          y: a[10][0],
          mode: "lines",
          name: "V<sub>T2</sub>  ",
          marker: {
            color: "orange",
          },
        },
        {
          x: [0],
          y: [0],
          mode: "lines",
          name: "    ",
          marker: {
            color: "White",
          },
        },
      ],
      {
        title: "<b>" + values["VM4"]["name"] + "</b>",
        xaxis: { range: [0, 0.061], title: "<b>Time(s)</b>", fixedrange: true },
        yaxis: {
          range: [-1 * (a[0][2] + 0.1 * a[0][2] + 1), (a[0][2] + 0.1 * a[0][2])],
          title: "<b>Voltage(V)</b>",
          fixedrange: true,
        },
        margin: { t: 30 },
      },
      { displayModeBar: false }
    );
    mine = document.createElement("div");
    mine.id = "thy3";
    mine.classList.add("graph-style");
    graph.append(mine);
    Plotly.newPlot(
      "thy3",
      [
        {
          x: a[11][1],
          y: a[11][0],
          mode: "lines",
          name: "V<sub>T3</sub>  ",
          marker: {
            color: "Blue",
          },
        },
        {
          x: [0],
          y: [0],
          mode: "lines",
          name: "    ",
          marker: {
            color: "White",
          },
        },
      ],
      {
        title: "<b>" + values["VM8"]["name"] + "</b>",
        xaxis: { range: [0, 0.061], title: "<b>Time(s)</b>", fixedrange: true },
        yaxis: {
          range: [-1 * (a[0][2] + 0.1 * a[0][2] + 1), (a[0][2] + 0.1 * a[0][2])],
          title: "<b>Voltage(V)</b>",
          fixedrange: true,
        },
        margin: { t: 30 },
      },
      { displayModeBar: false }
    );
  }
}

function Reset() {
  window.location.reload();
}

function generateGraph() {
  const ac1aap = parseInt(values["AC1"]["volt"]);
  const ac2app = parseInt(values["AC2"]["volt"]);
  const ac3app = parseInt(values["AC3"]["volt"]);
  const freq = parseInt(values["AC1"]["freq"]);
  const resistance = parseInt(values["R1"]["value"]);
  const inductance = parseInt(values["L1"]["value"]);
  const time_p = 1 / freq;
  const g1fire1 = parseInt(values["G1"]["fire1"]);
  const g2fire1 = parseInt(values["G2"]["fire1"]);
  const g3fire1 = parseInt(values["G3"]["fire1"]);
  var g1time = (g1fire1 / 360) * time_p;
  var g2time = (g2fire1 / 360) * time_p;
  var g3time = (g3fire1 / 360) * time_p;
  var sine1,
    sine2,
    sine3,
    volt = 0,current=0,irms=0,iavg=0,
    vrms = 0,
    vavg = 0,
    max_volt = 0,max_current=0,
    input_sine1 = [],
    input_sine2 = [],
    input_sine3 = [],
    output_voltage = [],
    output_current = [],
    thy1 = [],
    thy2 = [],
    thy3 = [],
    gate1 = [],
    gate2 = [],
    gate3 = [],
    xval = [];
  var volt = 0;
  for (let x = 0; x <= 0.06; x += 0.00005) {
    sine1 = ac1aap * Math.sin(2 * Math.PI * freq * x);
    sine2 = ac2app * Math.sin(2 * Math.PI * freq * x - 2 * (Math.PI / 3));
    sine3 = ac3app * Math.sin(2 * Math.PI * freq * x + 2 * (Math.PI / 3));
    input_sine1.push(sine1);
    input_sine2.push(sine2);
    input_sine3.push(sine3);
    xval.push(x);
    if (x > g1time + time_p) {
      g1time = g1time + time_p;
      g2time = g2time + time_p;
      g3time = g3time + time_p;
    }
    if (g1time <= x && x <= g2time) {
      gate1.push(1);
    } else {
      gate1.push(0);
    }
    if (g2time <= x && x <= g3time) {
      gate2.push(1);
    } else {
      gate2.push(0);
    }
    if (g3time <= x && x <= g1time + time_p) {
      gate3.push(1);
    } else {
      gate3.push(0);
    }
  }
  const rev=`alpha${g1fire1}r${resistance}l${inductance}`;
  for (let i =0;i<1200;i+=1){
    volt=ac1aap*data[rev]["vload"][i];
    current=ac1aap *data[rev]["iload"][i];
    output_voltage.push(volt);
    output_current.push(current);
    thy1.push(ac1aap*data[rev]["vt1"][i]);
    thy2.push(ac1aap*data[rev]["vt2"][i]);
    thy3.push(ac1aap*data[rev]["vt3"][i]);
    vrms=vrms+ volt*volt;
    irms=irms+ current*current;
    iavg=iavg+current;
    vavg=vavg+ volt;
    if(volt>max_volt){
      max_volt=volt;
    }
    if(current>max_current){
      max_current=current;
    }
  }
  vrms = Math.sqrt(vrms / output_voltage.length);
  vavg = vavg / output_voltage.length; 
  irms = Math.sqrt(irms / output_voltage.length);
  iavg = iavg / output_voltage.length;
  
  if (vrms < 1) {
    vrms = parseInt(vrms * 10000) / 10000;
  } else {
    vrms = parseInt(vrms * 100) / 100;
  }
  if (irms < 1) {
    irms = parseInt(irms * 10000) / 10000;
  } else {
    irms = parseInt(irms * 100) / 100;
  }
  if (vavg < 1) {
    vavg = parseInt(vavg * 10000) / 10000;
  } else {
    vavg = parseInt(vavg * 100) / 100;
  }
  if (iavg < 1) {
    iavg = parseInt(iavg * 10000) / 10000;
  } else {
    iavg = parseInt(iavg * 100) / 100;
  }
  values["vavg"] = vavg;
  values["iavg"] = iavg;
  values["vrms"] = vrms;
  values["irms"] = irms;
  return [
    [max_volt, max_current, 2*max_volt,ac1aap],
    [input_sine1, xval],
    [input_sine2, xval],
    [input_sine3, xval],
    [output_voltage, xval],
    [output_current, xval],
    [gate1, xval],
    [gate2, xval],
    [gate3, xval],
    [thy1, xval],
    [thy2, xval],
    [thy3, xval],
  ];
}

