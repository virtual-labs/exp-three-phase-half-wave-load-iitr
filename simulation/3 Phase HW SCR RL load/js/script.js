var correct_connections = [
  ["AC1L", "AC2L"],
  ["AC2L", "AC3L"],
  ["GND4T", "AC3L"],
  ["VM2B", "GND4T"],
  ["VM5B", "GND4T"],
  ["VM9B", "GND4T"],
  ["VM9B", "L1B"],
  ["VM7B", "VM9B"],
  ["AC1R", "THY1L"],
  ["THY1L", "VM1L"],
  ["THY1R", "VM1R"],
  ["THY1R", "AM1L"],
  ["THY1B", "G1L"],
  ["G1L", "VM3L"],
  ["VM3R", "GND1T"],
  ["THY2R", "VM4R"],
  ["THY2L", "VM4L"],
  ["THY2R", "AM1L"],
  ["G2L", "THY2B"],
  ["VM6L", "G2L"],
  ["VM6R", "GND2T"],
  ["AM1R", "R1T"],
  ["AM1R", "VM7T"],
  ["AC3R", "THY3L"],
  ["THY3R", "AM1L"],
  ["AC2R", "THY2L"],
  ["AC1R", "VM2T"],
  ["AC2R", "VM5T"],
  ["AC3R", "VM9T"],
  ["THY3B", "G3L"],
  ["THY3R", "VM8R"],
  ["THY3L", "VM8L"],
  ["G3L", "VM10L"],
  ["VM10R", "GND3T"],
  ["R1B", "L1T"],
];
var resistorids = ["R1-back"];
var inductorids = ["L1-back"];
var acsourceids = ["AC1-back", "AC2-back", "AC3-back"].reverse();
var groundids = ["GND4-back", "GND3-back", "GND2-back", "GND1-back"];
var voltagemids = [
  "VM10-back",
  "VM9-back",
  "VM5-back",
  "VM2-back",
  "VM8-back",
  "VM7-back",
  "VM6-back",
  "VM4-back",
  "VM3-back",
  "VM1-back",
];
var mosfetids = ["THY3-back", "THY2-back", "THY1-back"];
var gateids = ["G3-back", "G2-back", "G1-back"];
var ampids = ["AM1-back"];
var values = {
  R1: {
    name: "Resistor",
    value: 0,
    type: "Resistance: ",
    unit: " Ω",
  },
  L1: {
    name: "Inductor",
    value: 0,
    type: "Resistance: ",
    unit: " mH",
  },

  AC1: {
    name: "AC1",
    volt: 0,
    freq: 50,
    type1: "Voltage: ",
    type2: "Frequency: ",
    unitfreq: " Hz",
    unit: " V",
  },
  AC2: {
    name: "AC2",
    volt: 0,
    freq: 50,
    type1: "Voltage: ",
    type2: "Frequency: ",
    unitfreq: " Hz",
    unit: " V",
  },
  AC3: {
    name: "AC3",
    volt: 0,
    freq: 50,
    type1: "Voltage: ",
    type2: "Frequency: ",
    unitfreq: " Hz",
    unit: " V",
  },

  VM1: { name: "VT1" },
  VM2: { name: "VR" },
  VM3: { name: "VGP1" },
  VM4: { name: "VT2" },
  VM5: { name: "VY" },
  VM6: { name: "VGP2" },
  VM7: { name: "Load Voltage" },
  VM8: { name: "VT3" },
  VM9: { name: "VB" },
  VM10: { name: "VGP3" },
  AM1: { name: "Load Current" },
  GND1: { name: "Ground 1" },
  GND2: { name: "Ground 2" },
  GND3: { name: "Ground 3" },
  GND4: { name: "Ground 4" },
  THY1: { name: "THY1" },
  THY2: { name: "THY2" },
  THY3: { name: "THY3" },
  G1: { name: "Gate Pulse 1", fire1: 0, fire2: 0, unit: "\u00B0" },
  G2: { name: "Gate Pulse 2", fire1: 0, fire2: 0, unit: "\u00B0" },
  G3: { name: "Gate Pulse 3", fire1: 0, fire2: 0, unit: "\u00B0" },
  vrms: 0,
  vavg: 0,
  iavg: 0,
  irms: 0,
};
var endpoints = {};
var user_connection = [];
var wrong_connection = [];
var correct_connections_flag = false;
var new_reading = true;
var combination = {
  G1: { fire1: 0, fire2: 0 },
  G2: { fire1: 0, fire2: 0 },
  G3: { fire1: 0, fire2: 0 },
};
var angle_default = {
  a0: "selected",
  a30: "",
  a45: "",
  a60: "",
  a90: "",
  a120: "",
};
var resistor_defult = {
  r0: "selected",
  r10: "",
  r30: "",
  r50: "",
};
var inductor_defult = {
  i0: "selected",
  i20: "",
  i40: "",
  i60: "",
};
var combination_flag = false;
var endpoints_display = [];
var wrong_connection_popup_flag = true;

var instance = jsPlumb.getInstance({
  ConnectionsDetachable: false,
  Container: "body",
});
instance.bind("ready", () => {
  $("#symbolpalette .ele-img").draggable({
    helper: "clone",
    containment: "body",
    appendTo: "#diagram",
  });
  $("#diagram").droppable({
    drop: (event, ui) => {
      if ($(ui.helper).hasClass("resistor-sym")) {
        var a = resistorids.pop();
        if (a != null) {
          document.getElementById(a).style.visibility = "unset";
          createParticularEnd(a.split("-")[0]);
          endpoints_display.push(a.split("-")[0]);
        } else {
        }
      } else if ($(ui.helper).hasClass("inductor-sym")) {
        var a = inductorids.pop();
        if (a != null) {
          document.getElementById(a).style.visibility = "unset";
          createParticularEnd(a.split("-")[0]);
          endpoints_display.push(a.split("-")[0]);
        } else {
        }
      } else if ($(ui.helper).hasClass("ac-sym")) {
        var a = acsourceids.pop();
        if (a != null) {
          document.getElementById(a).style.visibility = "unset";
          createParticularEnd(a.split("-")[0]);
          endpoints_display.push(a.split("-")[0]);
        } else {
        }
      } else if ($(ui.helper).hasClass("thy-sym")) {
        var a = mosfetids.pop();
        if (a != null) {
          document.getElementById(a).style.visibility = "unset";
          createParticularEnd(a.split("-")[0]);
          endpoints_display.push(a.split("-")[0]);
        } else {
        }
      } else if ($(ui.helper).hasClass("volt-sym")) {
        var a = voltagemids.pop();
        if (a != null) {
          document.getElementById(a).style.visibility = "unset";
          createParticularEnd(a.split("-")[0]);
          endpoints_display.push(a.split("-")[0]);
        } else {
        }
      } else if ($(ui.helper).hasClass("gnd-sym")) {
        var a = groundids.pop();
        if (a != null) {
          document.getElementById(a).style.visibility = "unset";
          createParticularEnd(a.split("-")[0]);
          endpoints_display.push(a.split("-")[0]);
        } else {
        }
      } else if ($(ui.helper).hasClass("amp-sym")) {
        var a = ampids.pop();
        if (a != null) {
          document.getElementById(a).style.visibility = "unset";
          createParticularEnd(a.split("-")[0]);
          endpoints_display.push(a.split("-")[0]);
        } else {
        }
      } else if ($(ui.helper).hasClass("gate-sym")) {
        var a = gateids.pop();
        if (a != null) {
          document.getElementById(a).style.visibility = "unset";
          createParticularEnd(a.split("-")[0]);
          endpoints_display.push(a.split("-")[0]);
        } else {
        }
      }
    },
  });
  //if (component.hasClass("jtk-connector"))
  function createParticularEnd(element_name) {
    var stokwid = "3.5";
    if (element_name == "THY1") {
      var THY1L = instance.addEndpoint("THY1L", {
        anchor: ["Left"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart"],
        maxConnections: 2,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["THY1L"] = THY1L;

      var THY1R = instance.addEndpoint("THY1R", {
        anchor: ["Right"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart"],
        maxConnections: 2,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["THY1R"] = THY1R;

      var THY1B = instance.addEndpoint("THY1B", {
        anchor: ["Bottom"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [5, 5] }],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["THY1B"] = THY1B;
    }
    if (element_name == "THY2") {
      var THY2L = instance.addEndpoint("THY2L", {
        anchor: ["Left"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart"],
        maxConnections: 2,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["THY2L"] = THY2L;

      var THY2R = instance.addEndpoint("THY2R", {
        anchor: ["Right"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart"],
        maxConnections: 2,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["THY2R"] = THY2R;

      var THY2B = instance.addEndpoint("THY2B", {
        anchor: ["Bottom"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [5, 5] }],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["THY2B"] = THY2B;
    }
    if (element_name == "THY3") {
      var THY3L = instance.addEndpoint("THY3L", {
        anchor: ["Left"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart"],
        maxConnections: 2,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["THY3L"] = THY3L;

      var THY3R = instance.addEndpoint("THY3R", {
        anchor: ["Right"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart"],
        maxConnections: 2,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["THY3R"] = THY3R;

      var THY3B = instance.addEndpoint("THY3B", {
        anchor: ["Bottom"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [5, 5] }],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["THY3B"] = THY3B;
    }
    if (element_name == "G1") {
      var G1L = instance.addEndpoint("G1L", {
        anchor: ["Right"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [5, 5] }],
        maxConnections: 2,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["G1L"] = G1L;
    }
    if (element_name == "G2") {
      var G2L = instance.addEndpoint("G2L", {
        anchor: ["Right"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [5, 5] }],
        maxConnections: 2,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["G2L"] = G2L;
    }
    if (element_name == "G3") {
      var G3L = instance.addEndpoint("G3L", {
        anchor: ["Right"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [5, 5] }],
        maxConnections: 2,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["G3L"] = G3L;
    }
    if (element_name == "AM1") {
      var AM1L = instance.addEndpoint("AM1L", {
        anchor: ["Left"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [10, 10] }],
        maxConnections: 3,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      var AM1R = instance.addEndpoint("AM1R", {
        anchor: ["Right"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [10, 10] }],
        maxConnections: 2,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["AM1L"] = AM1L;
      endpoints["AM1R"] = AM1R;
    }
    if (element_name == "VM1") {
      var VM1L = instance.addEndpoint("VM1L", {
        anchor: ["Left"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart"],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      var VM1R = instance.addEndpoint("VM1R", {
        anchor: ["Right"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart"],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["VM1L"] = VM1L;
      endpoints["VM1R"] = VM1R;
    }
    if (element_name == "VM2") {
      var VM2T = instance.addEndpoint("VM2T", {
        anchor: ["Top"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart"],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      var VM2B = instance.addEndpoint("VM2B", {
        anchor: ["Bottom"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart"],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["VM2T"] = VM2T;
      endpoints["VM2B"] = VM2B;
    }
    if (element_name == "VM3") {
      var VM3L = instance.addEndpoint("VM3L", {
        anchor: ["Left"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart"],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      var VM3R = instance.addEndpoint("VM3R", {
        anchor: ["Bottom"],
        isSource: true,
        isTarget: true,
        connector: "Straight",
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["VM3L"] = VM3L;
      endpoints["VM3R"] = VM3R;
    }
    if (element_name == "VM4") {
      var VM4L = instance.addEndpoint("VM4L", {
        anchor: ["Left"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart"],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      var VM4R = instance.addEndpoint("VM4R", {
        anchor: ["Right"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart"],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["VM4L"] = VM4L;
      endpoints["VM4R"] = VM4R;
    }
    if (element_name == "VM5") {
      var VM5T = instance.addEndpoint("VM5T", {
        anchor: ["Top"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart"],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      var VM5B = instance.addEndpoint("VM5B", {
        anchor: ["Bottom"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart"],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["VM5T"] = VM5T;
      endpoints["VM5B"] = VM5B;
    }
    if (element_name == "VM6") {
      var VM6L = instance.addEndpoint("VM6L", {
        anchor: ["Left"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart"],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      var VM6R = instance.addEndpoint("VM6R", {
        anchor: ["Bottom"],
        isSource: true,
        isTarget: true,
        connector: "Straight",
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["VM6L"] = VM6L;
      endpoints["VM6R"] = VM6R;
    }
    if (element_name == "VM7") {
      var VM7T = instance.addEndpoint("VM7T", {
        anchor: ["Top"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart"],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      var VM7B = instance.addEndpoint("VM7B", {
        anchor: ["Bottom"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart"],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["VM7T"] = VM7T;
      endpoints["VM7B"] = VM7B;
    }
    if (element_name == "VM8") {
      var VM8L = instance.addEndpoint("VM8L", {
        anchor: ["Left"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart"],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      var VM8R = instance.addEndpoint("VM8R", {
        anchor: ["Right"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart"],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["VM8L"] = VM8L;
      endpoints["VM8R"] = VM8R;
    }
    if (element_name == "VM9") {
      var VM9T = instance.addEndpoint("VM9T", {
        anchor: ["Top"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart"],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      var VM9B = instance.addEndpoint("VM9B", {
        anchor: ["Bottom"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart"],
        maxConnections: 3,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["VM9T"] = VM9T;
      endpoints["VM9B"] = VM9B;
    }
    if (element_name == "VM10") {
      var VM10L = instance.addEndpoint("VM10L", {
        anchor: ["Left"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart"],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      var VM10R = instance.addEndpoint("VM10R", {
        anchor: ["Right"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [5, 5], gap: 0 }],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["VM10L"] = VM10L;
      endpoints["VM10R"] = VM10R;
    }
    if (element_name == "GND1") {
      var GND1 = instance.addEndpoint("GND1T", {
        endpoint: "Dot",
        anchor: ["Top"],
        isSource: true,
        isTarget: true,
        connector: "Straight",
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["GND1T"] = GND1;
    }
    if (element_name == "GND2") {
      var GND2 = instance.addEndpoint("GND2T", {
        endpoint: "Dot",
        anchor: ["Top"],
        isSource: true,
        isTarget: true,
        connector: "Straight",
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["GND2T"] = GND2;
    }
    if (element_name == "GND3") {
      var GND3 = instance.addEndpoint("GND3T", {
        endpoint: "Dot",
        anchor: ["Top"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [5, 5], gap: 0 }],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["GND3T"] = GND3;
    }
    if (element_name == "GND4") {
      var GND4 = instance.addEndpoint("GND4T", {
        endpoint: "Dot",
        anchor: ["Top"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [10, 10], gap: 0 }],
        maxConnections: 4,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["GND4T"] = GND4;
    }
    if (element_name == "AC1") {
      var AC1L = instance.addEndpoint("AC1L", {
        anchor: ["Left"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [10, 10], gap: 0 }],
        endpoint: "Dot",
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      var AC1R = instance.addEndpoint("AC1R", {
        anchor: ["Right"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [10, 10], gap: 0 }],
        maxConnections: 2,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["AC1L"] = AC1L;
      endpoints["AC1R"] = AC1R;
    }
    if (element_name == "AC2") {
      var AC2L = instance.addEndpoint("AC2L", {
        anchor: ["Left"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [10, 10], gap: 0 }],
        maxConnections: 2,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
        hoverPaintStyle: { fillStyle: "black" },
      });
      var AC2R = instance.addEndpoint("AC2R", {
        anchor: ["Right"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [10, 10], gap: 0 }],
        maxConnections: 2,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["AC2L"] = AC2L;
      endpoints["AC2R"] = AC2R;
    }
    if (element_name == "AC3") {
      var AC3L = instance.addEndpoint("AC3L", {
        anchor: ["Left"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [10, 10], gap: 0 }],
        maxConnections: 2,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
        hoverPaintStyle: { fillStyle: "black" },
      });
      var AC3R = instance.addEndpoint("AC3R", {
        anchor: ["Right"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [10, 10], gap: 0 }],
        maxConnections: 2,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["AC3L"] = AC3L;
      endpoints["AC3R"] = AC3R;
    }
    if (element_name == "R1") {
      var R1T = instance.addEndpoint("R1T", {
        endpoint: "Dot",
        anchor: ["Top"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [10, 10] }],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
        radius: 2,
      });

      var R1B = instance.addEndpoint("R1B", {
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        connector: "Straight",
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["R1T"] = R1T;
      endpoints["R1B"] = R1B;
    }
    if (element_name == "L1") {
      var L1T = instance.addEndpoint("L1T", {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        connector: "Straight",
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
        radius: 2,
      });

      var L1B = instance.addEndpoint("L1B", {
        anchor: ["Bottom"],
        isSource: true,
        isTarget: true,
        connector: "Flowchart",
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["L1T"] = L1T;
      endpoints["L1B"] = L1B;
    }
  }
  function createEnd() {
    var stokwid = "3.5";
    if (endpoints_display.indexOf("THY1") !== -1) {
      var THY1L = instance.addEndpoint("THY1L", {
        anchor: ["Left"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart"],
        maxConnections: 2,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["THY1L"] = THY1L;

      var THY1R = instance.addEndpoint("THY1R", {
        anchor: ["Right"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [150, 150] }],
        maxConnections: 3,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["THY1R"] = THY1R;

      var THY1B = instance.addEndpoint("THY1B", {
        anchor: ["Bottom"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [5, 5] }],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["THY1B"] = THY1B;
    }
    if (endpoints_display.indexOf("THY2") !== -1) {
      var THY2L = instance.addEndpoint("THY2L", {
        anchor: ["Left"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart"],
        maxConnections: 2,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["THY2L"] = THY2L;

      var THY2R = instance.addEndpoint("THY2R", {
        anchor: ["Right"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [150, 150] }],
        maxConnections: 3,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["THY2R"] = THY2R;

      var THY2B = instance.addEndpoint("THY2B", {
        anchor: ["Bottom"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [5, 5] }],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["THY2B"] = THY2B;
    }
    if (endpoints_display.indexOf("THY3") !== -1) {
      var THY3L = instance.addEndpoint("THY3L", {
        anchor: ["Left"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart"],
        maxConnections: 2,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["THY3L"] = THY3L;

      var THY3R = instance.addEndpoint("THY3R", {
        anchor: ["Right"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [150, 150] }],
        maxConnections: 2,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["THY3R"] = THY3R;

      var THY3B = instance.addEndpoint("THY3B", {
        anchor: ["Bottom"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [5, 5] }],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["THY3B"] = THY3B;
    }
    if (endpoints_display.indexOf("G1") !== -1) {
      var G1L = instance.addEndpoint("G1L", {
        anchor: ["Right"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [5, 5] }],
        maxConnections: 2,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["G1L"] = G1L;
    }
    if (endpoints_display.indexOf("G2") !== -1) {
      var G2L = instance.addEndpoint("G2L", {
        anchor: ["Right"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [5, 5] }],
        maxConnections: 2,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["G2L"] = G2L;
    }
    if (endpoints_display.indexOf("G2") !== -1) {
      var G3L = instance.addEndpoint("G3L", {
        anchor: ["Right"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [5, 5] }],
        maxConnections: 2,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["G3L"] = G3L;
    }
    if (endpoints_display.indexOf("AM1") !== -1) {
      var AM1L = instance.addEndpoint("AM1L", {
        anchor: ["Left"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [10, 10] }],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      var AM1R = instance.addEndpoint("AM1R", {
        anchor: ["Right"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [10, 10] }],
        maxConnections: 2,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["AM1L"] = AM1L;
      endpoints["AM1R"] = AM1R;
    }
    if (endpoints_display.indexOf("VM1") !== -1) {
      var VM1L = instance.addEndpoint("VM1L", {
        anchor: ["Left"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart"],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      var VM1R = instance.addEndpoint("VM1R", {
        anchor: ["Right"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart"],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["VM1L"] = VM1L;
      endpoints["VM1R"] = VM1R;
    }
    if (endpoints_display.indexOf("VM2") !== -1) {
      var VM2T = instance.addEndpoint("VM2T", {
        anchor: ["Top"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart"],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      var VM2B = instance.addEndpoint("VM2B", {
        anchor: ["Bottom"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart"],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["VM2T"] = VM2T;
      endpoints["VM2B"] = VM2B;
    }
    if (endpoints_display.indexOf("VM3") !== -1) {
      var VM3L = instance.addEndpoint("VM3L", {
        anchor: ["Left"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart"],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      var VM3R = instance.addEndpoint("VM3R", {
        anchor: ["Right"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart"],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["VM3L"] = VM3L;
      endpoints["VM3R"] = VM3R;
    }
    if (endpoints_display.indexOf("VM4") !== -1) {
      var VM4L = instance.addEndpoint("VM4L", {
        anchor: ["Left"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart"],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      var VM4R = instance.addEndpoint("VM4R", {
        anchor: ["Right"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart"],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["VM4L"] = VM4L;
      endpoints["VM4R"] = VM4R;
    }
    if (endpoints_display.indexOf("VM5") !== -1) {
      var VM5T = instance.addEndpoint("VM5T", {
        anchor: ["Top"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart"],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      var VM5B = instance.addEndpoint("VM5B", {
        anchor: ["Bottom"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart"],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["VM5T"] = VM5T;
      endpoints["VM5B"] = VM5B;
    }
    if (endpoints_display.indexOf("VM6") !== -1) {
      var VM6L = instance.addEndpoint("VM6L", {
        anchor: ["Left"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart"],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      var VM6R = instance.addEndpoint("VM6R", {
        anchor: ["Right"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart"],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["VM6L"] = VM6L;
      endpoints["VM6R"] = VM6R;
    }
    if (endpoints_display.indexOf("VM7") !== -1) {
      var VM7T = instance.addEndpoint("VM7T", {
        anchor: ["Top"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart"],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      var VM7B = instance.addEndpoint("VM7B", {
        anchor: ["Bottom"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart"],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["VM7T"] = VM7T;
      endpoints["VM7B"] = VM7B;
    }
    if (endpoints_display.indexOf("VM8") !== -1) {
      var VM8L = instance.addEndpoint("VM8L", {
        anchor: ["Left"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart"],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      var VM8R = instance.addEndpoint("VM8R", {
        anchor: ["Right"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart"],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["VM8L"] = VM8L;
      endpoints["VM8R"] = VM8R;
    }
    if (endpoints_display.indexOf("VM9") !== -1) {
      var VM9T = instance.addEndpoint("VM9T", {
        anchor: ["Top"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart"],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      var VM9B = instance.addEndpoint("VM9B", {
        anchor: ["Bottom"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart"],
        maxConnections: 3,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["VM9T"] = VM9T;
      endpoints["VM9B"] = VM9B;
    }
    if (endpoints_display.indexOf("VM10") !== -1) {
      var VM10L = instance.addEndpoint("VM10L", {
        anchor: ["Left"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart"],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      var VM10R = instance.addEndpoint("VM10R", {
        anchor: ["Right"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [5, 5], gap: 0 }],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["VM10L"] = VM10L;
      endpoints["VM10R"] = VM10R;
    }
    if (endpoints_display.indexOf("GND1") !== -1) {
      var GND1 = instance.addEndpoint("GND1T", {
        endpoint: "Dot",
        anchor: ["Top"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [5, 5], gap: 0 }],
        maxConnections: 4,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["GND1T"] = GND1;
    }
    if (endpoints_display.indexOf("GND2") !== -1) {
      var GND2 = instance.addEndpoint("GND2T", {
        endpoint: "Dot",
        anchor: ["Top"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [5, 5], gap: 0 }],
        maxConnections: 4,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["GND2T"] = GND2;
    }
    if (endpoints_display.indexOf("GND3") !== -1) {
      var GND3 = instance.addEndpoint("GND3T", {
        endpoint: "Dot",
        anchor: ["Top"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [5, 5], gap: 0 }],
        maxConnections: 4,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["GND3T"] = GND3;
    }
    if (endpoints_display.indexOf("GND4") !== -1) {
      var GND4 = instance.addEndpoint("GND4T", {
        endpoint: "Dot",
        anchor: ["Top"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart"],
        maxConnections: 5,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["GND4T"] = GND4;
    }
    if (endpoints_display.indexOf("AC1") !== -1) {
      var AC1L = instance.addEndpoint("AC1L", {
        anchor: ["Left"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [10, 10], gap: 0 }],
        endpoint: "Dot",
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      var AC1R = instance.addEndpoint("AC1R", {
        anchor: ["Right"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [10, 10], gap: 0 }],
        maxConnections: 2,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["AC1L"] = AC1L;
      endpoints["AC1R"] = AC1R;
    }
    if (endpoints_display.indexOf("AC2") !== -1) {
      var AC2L = instance.addEndpoint("AC2L", {
        anchor: ["Left"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [10, 10], gap: 0 }],
        maxConnections: 2,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
        hoverPaintStyle: { fillStyle: "black" },
      });
      var AC2R = instance.addEndpoint("AC2R", {
        anchor: ["Right"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [10, 10], gap: 0 }],
        maxConnections: 2,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["AC2L"] = AC2L;
      endpoints["AC2R"] = AC2R;
    }
    if (endpoints_display.indexOf("AC3") !== -1) {
      var AC3L = instance.addEndpoint("AC3L", {
        anchor: ["Left"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [10, 10], gap: 0 }],
        maxConnections: 2,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
        hoverPaintStyle: { fillStyle: "black" },
      });
      var AC3R = instance.addEndpoint("AC3R", {
        anchor: ["Right"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [10, 10], gap: 0 }],
        maxConnections: 2,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["AC3L"] = AC3L;
      endpoints["AC3R"] = AC3R;
    }
    if (endpoints_display.indexOf("R1") !== -1) {
      var R1T = instance.addEndpoint("R1T", {
        endpoint: "Dot",
        anchor: ["Top"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [10, 10] }],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
        radius: 2,
      });

      var R1B = instance.addEndpoint("R1B", {
        anchor: ["Bottom"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart"],
        maxConnections: 2,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["R1T"] = R1T;
      endpoints["R1B"] = R1B;
    }
  }

  window.addEventListener("resize", () => {
    instance.repaintEverything();
    if (correct_connections_flag) {
      plotData();
    }
  });

  instance.bind("connection", (conn, event) => {
    var flag = true;
    let eg1 = [String(conn.sourceId), String(conn.targetId)];

    for (var ele of correct_connections) {
      if (
        (ele[0] == eg1[0] && ele[1] == eg1[1]) ||
        (ele[0] == eg1[1] && ele[1] == eg1[0])
      ) {
        flag = false;

        user_connection.push(eg1);

        break;
      }
    }
    if (flag) {
      console.log(conn);
      conn.connection._jsPlumb.paintStyleInUse.stroke = "red";
      wrong_connection.push(eg1);
      if (wrong_connection_popup_flag) {
        openPopup("new-img/404-error.png", "Wrong Connection", "28px");
      } else {
        conn.connection.connector._jsPlumb.paintStyle = "red";
      }
    }
  });

  instance.bind("click", function (conn) {
    let eg1 = [String(conn.sourceId), String(conn.targetId)];
    if (!correct_connections_flag) {
      for (var ele of correct_connections) {
        if (
          (ele[0] == eg1[0] && ele[1] == eg1[1]) ||
          (ele[0] == eg1[1] && ele[1] == eg1[0])
        ) {
          user_connection.pop(eg1);
          break;
        }
      }
      for (var ele of wrong_connection) {
        if (
          (ele[0] == eg1[0] && ele[1] == eg1[1]) ||
          (ele[0] == eg1[1] && ele[1] == eg1[0])
        ) {
          wrong_connection.pop(eg1);
          break;
        }
      }
      instance.deleteConnection(conn);
    }
    return false;
  });
  $("body").on("contextmenu", "#components", (event) => {
    event.preventDefault();
  });

  // context menu for resistor
  $("body").on("contextmenu", "#diagram .resistor", function (event) {
    event.preventDefault();
    $("div.custom-menu").remove();
    window.selectedControl = $(this).attr("id");

    if (correct_connections_flag) {
      $(
        '<div class="custom-menu"><div class="name-element"><div class="name-element"><div style="display: flex; justify-content: end; position: relative;top: -4px;height: 28px; margin-bottom:2px; ;"><button class="submit fa fa-times cross-btn" id="submit-' +
          window.selectedControl +
          '"></button></div></div></div><form action="#" onsubmit="resistorSubmited(' +
          "'" +
          window.selectedControl +
          "'" +
          ')"><div><label for="name-' +
          window.selectedControl +
          '">Name:</label><input type="text" maxlength="5" class="set-input-name" id="name-' +
          window.selectedControl +
          '" style="border-radius: 20px; padding:2px;width: 125px;"  placeholder="  ' +
          values[window.selectedControl]["name"] +
          '" onchange="changeName(' +
          "'" +
          window.selectedControl +
          "'" +
          ',this.value)"/></div><div    class="value-element" style="display: flex; align-items: center; "><label for="value-' +
          window.selectedControl +
          '">Resistance:</label><select class="set-input" style="    margin-left: 3px;border-radius: 20px;padding: 7px;width: 98px;border: 2px solid;" id="value-' +
          window.selectedControl +
          '"><option value="0" ' +
          resistor_defult["r0"] +
          " disabled hidden>0 ohm</option><option " +
          resistor_defult["r10"] +
          ' value="10">10 ohm</option><option ' +
          resistor_defult["r30"] +
          ' value="30">30 ohm</option><option ' +
          resistor_defult["r50"] +
          ' value="50">50 ohm</option></select>  ' +
          '</div><div style="display: flex; justify-content: end; padding-right: 13px"><button type="submit"  class="set-value-btn" style="border-radius: 20px">Set Value</button></div></form></div>'
      )
        .appendTo("body")
        .css({ top: event.pageY + "px", left: event.pageX + 10 + "px" });
    } else {
      $(
        '<div class="custom-menu"><div class="name-element"><div class="name-element"><div style="display: flex; justify-content: end; position: relative;top: -4px;height: 28px; margin-bottom:2px ;"><button class="submit fa fa-times cross-btn" id="submit-' +
          window.selectedControl +
          '"></button></div></div></div><form action="#" onsubmit="DcSubmited(' +
          "'" +
          window.selectedControl +
          "'" +
          ')"><div><label for="name-' +
          window.selectedControl +
          '">Name:</label><input type="text" maxlength="5" class="set-input-name" id="name-' +
          window.selectedControl +
          '" style="border-radius: 20px; padding:2px;width: 125px;"  placeholder="  ' +
          values[window.selectedControl]["name"] +
          '" onchange="changeName(' +
          "'" +
          window.selectedControl +
          "'" +
          ',this.value)"/></div><div    class="value-element" style="    margin-left: 3px;display: flex; align-items: center; "><label for="value-' +
          window.selectedControl +
          '">Resistance:</label><select disabled class="set-input" style="border-radius: 20px;padding: 7px;width: 98px;border: 2px solid;" id="value-volt-' +
          window.selectedControl +
          '"><option value="0" ' +
          resistor_defult["r0"] +
          " disabled hidden>0 ohm </option><option " +
          resistor_defult["r10"] +
          ' value="10">10 ohm</option><option ' +
          resistor_defult["r30"] +
          ' value="30">30 ohm</option><option ' +
          resistor_defult["r50"] +
          ' value="50">50 ohm</option></select>  ' +
          '</div><div style="display: flex; justify-content: end; padding-right: 13px"><button type="submit"  class="set-value-btn" style="border-radius: 20px">Set Name</button></div></form></div>'
      )
        .appendTo("body")
        .css({ top: event.pageY + "px", left: event.pageX + 10 + "px" });
    }

    //context menu for capacitor

    $(".submit").bind("click", function (event) {
      $("div.custom-menu").remove();
    });
  });
  $("body").on("contextmenu", "#diagram .inductor", function (event) {
    event.preventDefault();
    $("div.custom-menu").remove();
    window.selectedControl = $(this).attr("id");

    if (correct_connections_flag) {
      $(
        '<div class="custom-menu"><div class="name-element"><div class="name-element"><div style="display: flex; justify-content: end; position: relative;top: -4px;height: 28px; margin-bottom: 2px ;"><button class="submit fa fa-times cross-btn" id="submit-' +
          window.selectedControl +
          '"></button></div></div></div><form action="#" onsubmit="InductorSubmited(' +
          "'" +
          window.selectedControl +
          "'" +
          ')"><div><label for="name-' +
          window.selectedControl +
          '">Name:</label><input type="text" maxlength="5" class="set-input-name" id="name-' +
          window.selectedControl +
          '" style="border-radius: 20px; padding:2px;width:120px;"  placeholder="  ' +
          values[window.selectedControl]["name"] +
          '" onchange="changeName(' +
          "'" +
          window.selectedControl +
          "'" +
          ',this.value)"/></div><div    class="value-element" style="display: flex; align-items: center; "><label for="value-' +
          window.selectedControl +
          '">Inductance:</label><select class="set-input" style="border-radius: 20px;padding: 7px;width: 98px;border: 2px solid;" id="value-' +
          window.selectedControl +
          '"><option value="0" ' +
          inductor_defult["i0"] +
          " disabled hidden>0 mH</option><option " +
          inductor_defult["i20"] +
          ' value="20">20 mH</option><option ' +
          inductor_defult["i40"] +
          ' value="40">40 mH</option><option ' +
          inductor_defult["i60"] +
          ' value="60">60 mH</option></select>  ' +
          '</div><div style="display: flex; justify-content: end; padding-right: 13px"><button type="submit"  class="set-value-btn" style="border-radius: 20px">Set Value</button></div></form></div>'
      )
        .appendTo("body")
        .css({ top: event.pageY + "px", left: event.pageX + 10 + "px" });
    } else {
      $(
        '<div class="custom-menu"><div class="name-element"><div class="name-element"><div style="display: flex; justify-content: end; position: relative;top: -4px;height: 28px; margin-bottom: 2px ;"><button class="submit fa fa-times cross-btn" id="submit-' +
          window.selectedControl +
          '"></button></div></div></div><form action="#" onsubmit="dcSubmited(' +
          "'" +
          window.selectedControl +
          "'" +
          ')"><div><label for="name-' +
          window.selectedControl +
          '">Name:</label><input type="text" maxlength="5" class="set-input-name" id="name-' +
          window.selectedControl +
          '" style="border-radius: 20px; padding:2px;width:120px;"  placeholder="  ' +
          values[window.selectedControl]["name"] +
          '" onchange="changeName(' +
          "'" +
          window.selectedControl +
          "'" +
          ',this.value)"/></div><div    class="value-element" style="display: flex; align-items: center; "><label for="value-' +
          window.selectedControl +
          '">Inductance:</label><select disabled class="set-input" style="border-radius: 20px;padding: 7px;width: 98px;border: 2px solid;" id="value-volt-' +
          window.selectedControl +
          '"><option value="0" ' +
          inductor_defult["i0"] +
          " disabled hidden>0 mH</option><option " +
          inductor_defult["i20"] +
          ' value="20">20 mH</option><option ' +
          inductor_defult["i40"] +
          ' value="40">40 mH</option><option ' +
          inductor_defult["i60"] +
          ' value="60">60 mH</option></select>  ' +
          '</div><div style="display: flex; justify-content: end; padding-right: 13px"><button type="submit"  class="set-value-btn" style="border-radius: 20px">Set Name</button></div></form></div>'
      )
        .appendTo("body")
        .css({ top: event.pageY + "px", left: event.pageX + 10 + "px" });
    }
    $(".submit").bind("click", function (event) {
      $("div.custom-menu").remove();
    });
  });

  // contextmenu for inductor

  //AC Source

  $("body").on("contextmenu", "#diagram .acsource", function (event) {
    event.preventDefault();
    $("div.custom-menu").remove();
    window.selectedControl = $(this).attr("id");
    if (correct_connections_flag) {
      $(
        '<div class="custom-menu"><div class="name-element"><div class="name-element"><div style="display: flex; justify-content: end; position: relative;top: -4px;height: 28px;margin-bottom: 2px;"><button class="submit fa fa-times cross-btn" id="submit-' +
          window.selectedControl +
          '"></button></div></div></div><form action="#" onsubmit="acSubmited(event,' +
          "'" +
          window.selectedControl +
          "'" +
          ')"><div><label for="name-' +
          window.selectedControl +
          '">Name:</label><input type="text" class="set-input-name" id="name-' +
          window.selectedControl +
          '" style="border-radius: 20px; padding:2px;width: 122px;" maxlength="5" placeholder="  ' +
          values[window.selectedControl]["name"] +
          '" onchange="changeName(' +
          "'" +
          window.selectedControl +
          "'" +
          ',this.value)"/></div><div    class="value-element" style="display: flex; align-items: center; "><label for="value-volt-' +
          window.selectedControl +
          '">Amplitude:</label><input type="number" class="set-input" placeholder="  ' +
          values[window.selectedControl]["volt"] +
          ' Volt" min="1" max="350"  id="value-volt-' +
          window.selectedControl +
          '" /> </div><div class="value-element" style="display: flex; align-items: center; "><label for="value-freq-' +
          window.selectedControl +
          '">Frequency:</label><input type="number" class="set-input" placeholder="  ' +
          values[window.selectedControl]["freq"] +
          ' Hz" min="1" max="60" disabled  id="value-freq-' +
          window.selectedControl +
          '" /> </div><div style="display: flex; justify-content: end; padding-right: 17px"><button type="submit"  class="set-value-btn" style="border-radius: 20px">Set Value</button></div></form></div>'
      )
        .appendTo("body")
        .css({ top: event.pageY + "px", left: event.pageX + 10 + "px" });
    } else {
      $(
        '<div class="custom-menu"><div class="name-element"><div class="name-element"><div style="display: flex; justify-content: end; position: relative;top: -4px;height: 28px;margin-bottom: 2px;"><button class="submit fa fa-times cross-btn" id="submit-' +
          window.selectedControl +
          '"></button></div></div></div><form action="#" onsubmit="acSubmited(event,' +
          "'" +
          window.selectedControl +
          "'" +
          ')"><div><label for="name-' +
          window.selectedControl +
          '">Name:</label><input type="text" class="set-input-name" id="name-' +
          window.selectedControl +
          '" style="border-radius: 20px; padding:2px;width: 122px;     height: 24px;" maxlength="5" placeholder="  ' +
          values[window.selectedControl]["name"] +
          '" onchange="changeName(' +
          "'" +
          window.selectedControl +
          "'" +
          ',this.value)"/></div><div    class="value-element" style="display: flex; align-items: center; "><label for="value-volt-' +
          window.selectedControl +
          '">Amplitude:</label><input type="number" class="set-input"  placeholder="  ' +
          values[window.selectedControl]["volt"] +
          ' Volt" min="1" max="350" disabled id="value-volt-' +
          window.selectedControl +
          '" /> </div><div class="value-element" style="display: flex; align-items: center; "><label for="value-freq-' +
          window.selectedControl +
          '">Frequency:</label><input type="number" class="set-input" placeholder=" 0 Hz" min="1" max="60" disabled  id="value-freq-' +
          window.selectedControl +
          '" /> </div><div style="display: flex; justify-content: end; padding-right: 17px"><button type="submit" class="set-value-btn" style="border-radius: 20px">Set Name</button></div></form></div>'
      )
        .appendTo("body")
        .css({ top: event.pageY + "px", left: event.pageX + 10 + "px" });
    }

    $(".submit").bind("click", function (event) {
      $("div.custom-menu").remove();
    });
  });

  $("body").on("contextmenu", "#diagram .other", function (event) {
    event.preventDefault();
    $("div.custom-menu").remove();
    window.selectedControl = $(this).attr("id");

    $(
      '<div class="custom-menu"><div class="name-element"><div style="display: flex; justify-content: end;position: relative;top: -4px;height: 28px;margin-bottom: 2px;"><button class="submit fa fa-times cross-btn"></button></div><label for="name-' +
        window.selectedControl +
        '">Name:</label><input type="text"  id="name-' +
        window.selectedControl +
        '" class="set-input-name" style="width: 125px;" maxlength="5" placeholder="   ' +
        values[window.selectedControl]["name"] +
        '" onchange="changeName(' +
        "'" +
        window.selectedControl +
        "'" +
        ',this.value)"/><div style="display: flex; justify-content: end; padding-right: 13px;"><div><button class="submit set-value-btn" style="border-radius: 20px">Set Name</button></div></div>'
    )
      .appendTo("body")
      .css({ top: event.pageY + "px", left: event.pageX + 10 + "px" });
    $(".submit").bind("click", function (event) {
      $("div.custom-menu").remove();
    });
  });

  $("body").on("contextmenu", "#diagram .otr", function (event) {
    event.preventDefault();
    $("div.custom-menu").remove();
    window.selectedControl = $(this).attr("id");

    $(
      '<div class="custom-menu"><div class="name-element"><div style="display: flex; justify-content: end;position: relative;top: -4px;height: 28px;margin-bottom: 2px;"><button class="submit fa fa-times cross-btn"></button></div><label for="name-' +
        window.selectedControl +
        '">Name:</label><input type="text"  id="name-' +
        window.selectedControl +
        '" class="set-input-name" style="width: 125px;" maxlength="2" placeholder="   ' +
        values[window.selectedControl]["name"] +
        '" onchange="changeName(' +
        "'" +
        window.selectedControl +
        "'" +
        ',this.value)"/><div style="display: flex; justify-content: end; padding-right: 13px;"><div><button class="submit set-value-btn" style="border-radius: 20px">Set Name</button></div></div>'
    )
      .appendTo("body")
      .css({ top: event.pageY + "px", left: event.pageX + 10 + "px" });
    $(".submit").bind("click", function (event) {
      $("div.custom-menu").remove();
    });
  });

  $("body").on("contextmenu", "#diagram .thy", function (event) {
    event.preventDefault();
    $("div.custom-menu").remove();
    window.selectedControl = $(this).attr("id");

    $(
      '<div class="custom-menu"><div class="name-element"><div style="display: flex; justify-content: end;position: relative;top: -4px;height: 28px;margin-bottom: 2px;"><button class="submit fa fa-times cross-btn"></button></div><label for="name-' +
        window.selectedControl +
        '">Name:</label><input type="text"  id="name-' +
        window.selectedControl +
        '" class="set-input-name" style="width: 125px;" maxlength="4" placeholder="   ' +
        values[window.selectedControl]["name"] +
        '" onchange="changeName(' +
        "'" +
        window.selectedControl +
        "'" +
        ',this.value)"/><div style="display: flex; justify-content: end; padding-right: 13px;"><div><button class="submit set-value-btn" style="border-radius: 20px">Set Name</button></div></div>'
    )
      .appendTo("body")
      .css({ top: event.pageY + "px", left: event.pageX + 10 + "px" });
    $(".submit").bind("click", function (event) {
      $("div.custom-menu").remove();
    });
  });

  $("body").on("contextmenu", "#diagram .vload", function (event) {
    event.preventDefault();
    $("div.custom-menu").remove();
    window.selectedControl = $(this).attr("id");

    $(
      '<div class="custom-menu"><div class="name-element"><div style="display: flex; justify-content: end;position: relative;top: -4px;height: 28px;margin-bottom: 2px;"><button class="submit fa fa-times cross-btn"></button></div><label for="name-' +
        window.selectedControl +
        '">Name:</label><input type="text"  id="name-' +
        window.selectedControl +
        '" class="set-input-name" style="width: 125px;" maxlength="6" placeholder="   ' +
        values[window.selectedControl]["name"] +
        '" onchange="changeName(' +
        "'" +
        window.selectedControl +
        "'" +
        ',this.value)"/><div style="display: flex; justify-content: end; padding-right: 13px;"><div><button class="submit set-value-btn" style="border-radius: 20px">Set Name</button></div></div>'
    )
      .appendTo("body")
      .css({ top: event.pageY + "px", left: event.pageX + 10 + "px" });
    $(".submit").bind("click", function (event) {
      $("div.custom-menu").remove();
    });
  });
  $("body").on("contextmenu", "#diagram .gatepulse", function (event) {
    event.preventDefault();
    $("div.custom-menu").remove();
    window.selectedControl = $(this).attr("id");

    if (combination_flag) {
      $(
        '<div class="custom-menu" style="width: 193px;"><div class="name-element"><div class="name-element"><div style="display: flex; justify-content: end; position: relative;top: -4px;height: 28px;margin-bottom: 2px;"><button class="submit fa fa-times cross-btn" id="submit-' +
          window.selectedControl +
          '"></button></div></div></div><form action="#" onsubmit=" gateSubmitted(event,' +
          "'" +
          window.selectedControl +
          "'" +
          ')"><div><label style="color:white;" for="name-' +
          window.selectedControl +
          '">Name:</label><input type="text" class="set-input-name" id="name-' +
          window.selectedControl +
          '" style="border-radius: 20px; padding:2px;width: 140px;" maxlength="5"  placeholder="  ' +
          values[window.selectedControl]["name"] +
          '" onchange="changeName(' +
          "'" +
          window.selectedControl +
          "'" +
          ',this.value)"/></div><div    class="value-element" style="display: flex; align-items: center; "><label for="value-volt-' +
          window.selectedControl +
          '">Starting&nbsp;Angle:</label><input disabled type="number" min="0" max="999" class="set-input" style="width: 74px;" placeholder="  ' +
          values[window.selectedControl]["fire1"] +
          values[window.selectedControl]["unit"] +
          '" id="value-fire1-' +
          window.selectedControl +
          '" /> </div><div class="value-element" style="display: flex; align-items: center; "><label for="value-freq-' +
          window.selectedControl +
          '">Ending&nbsp;Angle:</label><input disabled type="number" min="0" max="999" class="set-input" placeholder="  ' +
          values[window.selectedControl]["fire2"] +
          values[window.selectedControl]["unit"] +
          '"  id="value-fire2-' +
          window.selectedControl +
          '" /> </div><div style="display: flex; justify-content: end; padding-right: 5px"><button type="submit"  class="set-value-btn" style="border-radius: 20px">Set Name</button></div></form></div>'
      )
        .appendTo("body")
        .css({ top: event.pageY + "px", left: event.pageX + 10 + "px" });
    } else {
      $(
        '<div class="custom-menu" style="width: 193px;"><div class="name-element"><div class="name-element"><div style="display: flex; justify-content: end; position: relative;top: -4px;height: 28px;margin-bottom: 2px;"><button class="submit fa fa-times cross-btn" id="submit-' +
          window.selectedControl +
          '"></button></div></div></div><form action="#"><div><label for="name-' +
          window.selectedControl +
          '">Name:</label><input type="text" class="set-input-name" id="name-' +
          window.selectedControl +
          '" style="border-radius: 20px; padding:2px;width: 140px;" maxlength="5" placeholder="  ' +
          values[window.selectedControl]["name"] +
          '" onchange="changeName(' +
          "'" +
          window.selectedControl +
          "'" +
          ',this.value)"/></div><div    class="value-element" style="display: flex; align-items: center; "><label for="value-volt-' +
          window.selectedControl +
          '">Starting&nbsp;Angle:</label><input type="number" class="set-input" style="width: 74px;" placeholder="  ' +
          values[window.selectedControl]["fire1"] +
          values[window.selectedControl]["unit"] +
          '" min="1" max="100" disabled id="value-fire1-' +
          window.selectedControl +
          '" /> </div><div class="value-element" style="display: flex; align-items: center; "><label for="value-freq-' +
          window.selectedControl +
          '">Ending&nbsp;Angle:</label><input type="number" class="set-input" placeholder="  ' +
          values[window.selectedControl]["fire2"] +
          values[window.selectedControl]["unit"] +
          '" min="100" max="900" disabled id="value-fire2-' +
          window.selectedControl +
          '" /> </div><div style="display: flex; justify-content: end; padding-right: 5px"><button type="submit"  class="submit set-value-btn" style="border-radius: 20px">Set Name</button></div></form></div>'
      )
        .appendTo("body")
        .css({ top: event.pageY + "px", left: event.pageX + 10 + "px" });
    }
    $(".submit").bind("click", function (event) {
      $("div.custom-menu").remove();
    });
  });
  $("body").on("contextmenu", "#diagram .gatepulse2", function (event) {
    event.preventDefault();
    $("div.custom-menu").remove();
    window.selectedControl = $(this).attr("id");

    if (combination_flag) {
      $(
        '<div class="custom-menu" style="width: 193px;"><div class="name-element"><div class="name-element"><div style="display: flex; justify-content: end; position: relative;top: -4px;height: 28px;margin-bottom: 2px;"><button class="submit fa fa-times cross-btn" id="submit-' +
          window.selectedControl +
          '"></button></div></div></div><form action="#" onsubmit=" gateSubmitted2(event,' +
          "'" +
          window.selectedControl +
          "'" +
          ')"><div><label style="color:white;" for="name-' +
          window.selectedControl +
          '">Name:</label><input type="text" class="set-input-name" id="name-' +
          window.selectedControl +
          '" style="border-radius: 20px; padding:2px;width: 140px;" maxlength="5"  placeholder="  ' +
          values[window.selectedControl]["name"] +
          '" onchange="changeName(' +
          "'" +
          window.selectedControl +
          "'" +
          ',this.value)"/></div><div    class="value-element" style="display: flex; align-items: center; "><label for="value-volt-' +
          window.selectedControl +
          '">Starting&nbsp;Angle:</label><input disabled type="number" min="0" max="999" class="set-input" style="width: 74px;" placeholder="  ' +
          values[window.selectedControl]["fire1"] +
          values[window.selectedControl]["unit"] +
          '" id="value-fire1-' +
          window.selectedControl +
          '" /> </div><div class="value-element" style="display: flex; align-items: center; "><label for="value-freq-' +
          window.selectedControl +
          '">Ending&nbsp;Angle:</label><input disabled type="number" min="0" max="999" class="set-input" placeholder="  ' +
          values[window.selectedControl]["fire2"] +
          values[window.selectedControl]["unit"] +
          '"  id="value-fire2-' +
          window.selectedControl +
          '" /> </div><div style="display: flex; justify-content: end; padding-right: 5px"><button type="submit"  class="set-value-btn" style="border-radius: 20px">Set Name</button></div></form></div>'
      )
        .appendTo("body")
        .css({ top: event.pageY + "px", left: event.pageX + 10 + "px" });
    } else {
      $(
        '<div class="custom-menu" style="width: 193px;"><div class="name-element"><div class="name-element"><div style="display: flex; justify-content: end; position: relative;top: -4px;height: 28px;margin-bottom: 2px;"><button class="submit fa fa-times cross-btn" id="submit-' +
          window.selectedControl +
          '"></button></div></div></div><form action="#"><div><label for="name-' +
          window.selectedControl +
          '">Name:</label><input type="text" class="set-input-name" id="name-' +
          window.selectedControl +
          '" style="border-radius: 20px; padding:2px;width: 140px;" maxlength="5" placeholder="  ' +
          values[window.selectedControl]["name"] +
          '" onchange="changeName(' +
          "'" +
          window.selectedControl +
          "'" +
          ',this.value)"/></div><div    class="value-element" style="display: flex; align-items: center; "><label for="value-volt-' +
          window.selectedControl +
          '">Starting&nbsp;Angle:</label><input type="number" class="set-input" style="width: 74px;" placeholder="  ' +
          values[window.selectedControl]["fire1"] +
          values[window.selectedControl]["unit"] +
          '" min="1" max="100" disabled id="value-fire1-' +
          window.selectedControl +
          '" /> </div><div class="value-element" style="display: flex; align-items: center; "><label for="value-freq-' +
          window.selectedControl +
          '">Ending&nbsp;Angle:</label><input type="number" class="set-input" placeholder="  ' +
          values[window.selectedControl]["fire2"] +
          values[window.selectedControl]["unit"] +
          '" min="100" max="900" disabled id="value-fire2-' +
          window.selectedControl +
          '" /> </div><div style="display: flex; justify-content: end; padding-right: 5px"><button type="submit"  class="submit set-value-btn" style="border-radius: 20px">Set Name</button></div></form></div>'
      )
        .appendTo("body")
        .css({ top: event.pageY + "px", left: event.pageX + 10 + "px" });
    }
    $(".submit").bind("click", function (event) {
      $("div.custom-menu").remove();
    });
  });

  $("body").on("contextmenu", "#diagram .gatepulse1", function (event) {
    event.preventDefault();
    $("div.custom-menu").remove();
    window.selectedControl = $(this).attr("id");

    if (correct_connections_flag) {
      $(
        '<div class="custom-menu" style="width: 193px;"><div class="name-element"><div class="name-element"><div style="display: flex; justify-content: end; position: relative;top: -4px;height: 28px;margin-bottom: 2px;"><button class="submit fa fa-times cross-btn" id="submit-' +
          window.selectedControl +
          '"></button></div></div></div><form action="#" onsubmit="firstGateSubmitted(event,' +
          "'" +
          window.selectedControl +
          "'" +
          ')"><div><label style="color:white;" for="name-' +
          window.selectedControl +
          '">Name:</label><input type="text" class="set-input-name" id="name-' +
          window.selectedControl +
          '" style="border-radius: 20px; padding:2px;width: 140px;" maxlength="5" placeholder="  ' +
          values[window.selectedControl]["name"] +
          '" onchange="changeName(' +
          "'" +
          window.selectedControl +
          "'" +
          ',this.value)"/></div><div    class="value-element" style="display: flex; align-items: center; "><label for="value-fire1-' +
          window.selectedControl +
          '">Starting&nbsp;Angle:</label><select class="set-input" style="border-radius: 20px;padding: 7px;width: 93px;border: 2px solid;" id="value-fire1-' +
          window.selectedControl +
          '"><option value="0" ' +
          angle_default["a0"] +
          " disabled hidden>0\u00B0 </option><option " +
          angle_default["a30"] +
          ' value="30">30\u00B0 </option><option ' +
          angle_default["a45"] +
          ' value="45">45\u00B0 </option><option ' +
          angle_default["a60"] +
          ' value="60">60\u00B0 </option><option  ' +
          angle_default["a90"] +
          ' value="90">90\u00B0 </option><option ' +
          angle_default["a120"] +
          ' value="120">120\u00B0 </option></select>' +
          '</div><div class="value-element" style="display: flex; align-items: center; "><label for="value-fire2-' +
          window.selectedControl +
          '">Ending&nbsp;Angle:</label><input type="number" min="1" max="240" class="set-input" placeholder="  ' +
          values[window.selectedControl]["fire2"] +
          values[window.selectedControl]["unit"] +
          '" id="value-fire2-' +
          window.selectedControl +
          '" /> </div><div style="display: flex; justify-content: end; padding-right: 5px"><button type="submit"  class="set-value-btn" style="border-radius: 20px">Set Value</button></div></form></div>'
      )
        .appendTo("body")
        .css({ top: event.pageY + "px", left: event.pageX + 10 + "px" });
    } else {
      $(
        '<div class="custom-menu" style="width: 193px;"><div class="name-element"><div class="name-element"><div style="display: flex; justify-content: end; position: relative;top: -4px;height: 28px;margin-bottom: 2px;"><button class="submit fa fa-times cross-btn" id="submit-' +
          window.selectedControl +
          '"></button></div></div></div><form action="#" ><div><label for="name-' +
          window.selectedControl +
          '">Name:</label><input type="text" class="set-input-name" id="name-' +
          window.selectedControl +
          '" style="border-radius: 20px; padding:2px;width: 140px;" maxlength="5"  placeholder="  ' +
          values[window.selectedControl]["name"] +
          '" onchange="changeName(' +
          "'" +
          window.selectedControl +
          "'" +
          ',this.value)"/><div    class="value-element" style="display: flex; align-items: center; "><label for="value-volt-' +
          window.selectedControl +
          '">Starting&nbsp;Angle:</label><select disabled class="set-input" style="border-radius: 20px;padding: 7px;width: 93px;border: 2px solid;" id="value-fire1-' +
          window.selectedControl +
          '"><option value="0" ' +
          angle_default["a0"] +
          " disabled hidden>0\u00B0 </option><option " +
          angle_default["a30"] +
          ' value="30">30\u00B0 </option><option ' +
          angle_default["a45"] +
          ' value="45">45\u00B0 </option><option ' +
          angle_default["a60"] +
          ' value="60">60\u00B0 </option><option  ' +
          angle_default["a90"] +
          ' value="90">90\u00B0 </option><option ' +
          angle_default["a120"] +
          ' value="120">120\u00B0 </option></select>' +
          '</div><div class="value-element" style="display: flex; align-items: center; "><label for="value-freq-' +
          window.selectedControl +
          '">Ending&nbsp;Angle:</label><input type="number" class="set-input" placeholder="  ' +
          values[window.selectedControl]["fire2"] +
          values[window.selectedControl]["unit"] +
          '" min="100" max="900" disabled id="value-fire2-' +
          window.selectedControl +
          '" /> </div><div style="display: flex; justify-content: end; padding-right: 5px"><button type="submit"  class="submit set-value-btn" style="border-radius: 20px">Set Name</button></div></form></div>'
      )
        .appendTo("body")
        .css({ top: event.pageY + "px", left: event.pageX + 10 + "px" });
    }
    $(".submit").bind("click", function (event) {
      $("div.custom-menu").remove();
    });
  });

  $("body").on("contextmenu", "#diagram .ground1", function (event) {
    event.preventDefault();
    $("div.custom-menu").remove();
    window.selectedControl = $(this).attr("id");

    $(
      '<div class="custom-menu"><div class="name-element"><div style="display: flex; justify-content: end;position: relative;top: -4px;height: 28px;margin-bottom: 2px;"><button class="submit fa fa-times cross-btn"></button></div><label for="name-' +
        window.selectedControl +
        '">Name:</label><input type="text" maxlength="4" id="name-' +
        window.selectedControl +
        '" class="set-input-name" style="width: 125px;" placeholder="   ' +
        values[window.selectedControl]["name"] +
        '" onchange="changeName(' +
        "'" +
        window.selectedControl +
        "'" +
        ',this.value)"/><div style="display: flex; justify-content: end; padding-right: 13px;"><div><button class="submit set-value-btn" style="border-radius: 20px">Set Name</button></div></div>'
    )
      .appendTo("body")
      .css({ top: event.pageY + "px", left: event.pageX + 10 + "px" });
    $(".submit").bind("click", function (event) {
      $("div.custom-menu").remove();
    });
  });
  $("body").on("contextmenu", "#diagram .ground2", function (event) {
    event.preventDefault();
    $("div.custom-menu").remove();
    window.selectedControl = $(this).attr("id");

    $(
      '<div class="custom-menu"><div class="name-element"><div style="display: flex; justify-content: end;position: relative;top: -4px;height: 28px;margin-bottom: 2px;"><button class="submit fa fa-times cross-btn"></button></div><label for="name-' +
        window.selectedControl +
        '">Name:</label><input type="text" maxlength="7" id="name-' +
        window.selectedControl +
        '" class="set-input-name" style="width: 125px;" placeholder="   ' +
        values[window.selectedControl]["name"] +
        '" onchange="changeName(' +
        "'" +
        window.selectedControl +
        "'" +
        ',this.value)"/><div style="display: flex; justify-content: end; padding-right: 13px;"><div><button class="submit set-value-btn" style="border-radius: 20px">Set Name</button></div></div>'
    )
      .appendTo("body")
      .css({ top: event.pageY + "px", left: event.pageX + 10 + "px" });
    $(".submit").bind("click", function (event) {
      $("div.custom-menu").remove();
    });
  });
});

function changeName(name, value) {
  values[name]["name"] = value.toUpperCase();
  var ele = name + "-name";
  $("#" + ele).text(values[name]["name"]);
  if (correct_connections_flag) {
    plotData();
  }
}
function makeDefault() {
  $("#" + "G1-value").text(
    values["G1"]["fire1"] +
      values["G1"]["unit"] +
      " " +
      values["G1"]["fire2"] +
      values["G1"]["unit"]
  );
  $("#" + "G2-value").text(
    values["G2"]["fire1"] +
      values["G2"]["unit"] +
      " " +
      values["G2"]["fire2"] +
      values["G2"]["unit"]
  );
  $("#" + "G3-value").text(
    values["G3"]["fire1"] +
      values["G3"]["unit"] +
      " " +
      values["G3"]["fire2"] +
      values["G3"]["unit"]
  );
  var graph = document.getElementById("graph-new");
  graph.innerHTML = "";
  graph.style.height = "0px";
}
function makeCombination(alpha) {
  values["G1"]["fire1"] = alpha;
  values["G1"]["fire2"] = alpha + 120;
  values["G2"]["fire1"] = alpha + 120;
  values["G2"]["fire2"] = alpha + 240;
  values["G3"]["fire1"] = alpha + 240;
  values["G3"]["fire2"] = alpha + 360;
}
function firstGateSubmitted(e, name) {
  e.preventDefault();
  var fire1 = parseInt(document.getElementById("value-fire1-" + name).value);
  var fire2 = parseInt(document.getElementById("value-fire2-" + name).value);
  console.log(fire1, fire2);
  if (!Number.isNaN(fire1) && !Number.isNaN(fire2)) {
    if (fire1 >= fire2) {
      openPopup(
        "new-img/404-warning.png",
        "Firing angle must be in increasing order ",
        "25px"
      );
    } else {
      if (fire2 != fire1 + 120) {
        openPopup(
          "new-img/404-warning.png",
          "Firing angle must be at an interval of 120°",
          "23px"
        );
      } else {
        makeDefault();
        var alpha = fire1;
        makeCombination(alpha);
        values["G1"]["fire1"] = fire1;
        values["G1"]["fire2"] = fire2;
        combination_flag = true;
        $("#" + "G1-value").text(
          values[name]["fire1"] +
            values[name]["unit"] +
            " " +
            values[name]["fire2"] +
            values[name]["unit"]
        );
        new_reading = true;
      }
    }
  } else if (!Number.isNaN(fire1)) {
    openPopup("new-img/404-warning.png", "Enter Ending Angle", "28px");
  } else if (!Number.isNaN(fire2)) {
    openPopup("new-img/404-warning.png", "Enter Starting Angle", "28px");
  }
  document.getElementById("submit-" + name).click();

  if (correct_connections_flag) {
    plotData();
  }
}

function gateSubmitted(e, name) {
  e.preventDefault();
  var fire1 = parseInt(document.getElementById("value-fire1-" + name).value);
  var fire2 = parseInt(document.getElementById("value-fire2-" + name).value);
  if (!Number.isNaN(fire1) && !Number.isNaN(fire2)) {
    if (fire1 >= fire2) {
      openPopup(
        "new-img/404-warning.png",
        "Firing angle must be in increasing order ",
        "25px"
      );
    } else {
      if (fire1 == combination[name]["fire1"]) {
        if (fire2 == combination[name]["fire2"]) {
          values[name]["fire1"] = fire1;
          values[name]["fire2"] = fire2;
          $("#" + name + "-value").text(
            values[name]["fire1"] +
              values[name]["unit"] +
              " " +
              values[name]["fire2"] +
              values[name]["unit"]
          );
        } else {
          openPopup(
            "new-img/404-warning.png",
            "Firing angle must be at an interval of 120°",
            "23px"
          );
        }
      } else {
        openPopupbutton(
          "new-img/404-warning.png",
          `Firing angle must be at an interval of 120° w.r.t ${
            values["G" + (parseInt(name[1]) - 1)]["name"]
          }`,
          "21px"
        );
        console.log("hello");
      }
    }
  } else if (!Number.isNaN(fire1)) {
    openPopup("new-img/404-warning.png", "Enter Ending Angle", "28px");
  } else if (!Number.isNaN(fire2)) {
    openPopup("new-img/404-warning.png", "Enter Starting Angle", "28px");
  }
  document.getElementById("submit-" + name).click();

  if (correct_connections_flag) {
    plotData();
  }
}
function acSubmited(e, name) {
  e.preventDefault();
  var volt = document.getElementById("value-volt-" + name).value;
  var ele;
  if (volt != "") {
    new_reading = true;
    values["AC1"]["volt"] = volt;
    values["AC2"]["volt"] = volt;
    values["AC3"]["volt"] = volt;
    $("#" + "AC1-volt").text(values["AC1"]["volt"] + values[name]["unit"]);
    $("#" + "AC2-volt").text(values["AC2"]["volt"] + values[name]["unit"]);
    $("#" + "AC3-volt").text(values["AC3"]["volt"] + values[name]["unit"]);
    $("#" + "AC1-freq").text(values["AC1"]["freq"] + values[name]["unitfreq"]);
    $("#" + "AC2-freq").text(values["AC2"]["freq"] + values[name]["unitfreq"]);
    $("#" + "AC3-freq").text(values["AC3"]["freq"] + values[name]["unitfreq"]);
  }
  var freq = document.getElementById("value-freq-" + name).value;
  if (freq != "") {
    new_reading = true;
    values["AC1"]["freq"] = freq;
    values["AC2"]["freq"] = freq;
    values["AC3"]["freq"] = freq;
    $("#" + "AC1-freq").text(values["AC1"]["freq"] + values[name]["unitfreq"]);
    $("#" + "AC2-freq").text(values["AC2"]["freq"] + values[name]["unitfreq"]);
    $("#" + "AC3-freq").text(values["AC3"]["freq"] + values[name]["unitfreq"]);
  }
  document.getElementById("submit-" + name).click();
  if (correct_connections_flag) {
    plotData();
  }
}
function InductorSubmited(name) {
  var a = document.getElementById("value-" + name).value;
  if (a != 0) {
    new_reading = true;
    values[name]["value"] = a;
    var ele = name + "-value";
    new_reading = true;
    $("#" + ele).text(values[name]["value"] + values[name]["unit"]);
    var k = "i" + values["L1"]["value"];
    for (i in inductor_defult) {
      if (i == k) {
        inductor_defult[i] = "selected";
      } else {
        inductor_defult[i] = "";
      }
    }
  }
  document.getElementById("submit-" + name).click();

  if (correct_connections_flag) {
    plotData();
  }
  return false;
}
function resistorSubmited(name) {
  var a = document.getElementById("value-" + name).value;
  if (a != 0) {
    new_reading = true;
    values[name]["value"] = a;
    var ele = name + "-value";
    new_reading = true;
    $("#" + ele).text(values[name]["value"] + values[name]["unit"]);
    var k = "r" + values["R1"]["value"];
    for (i in resistor_defult) {
      if (i == k) {
        resistor_defult[i] = "selected";
      } else {
        resistor_defult[i] = "";
      }
    }
  }
  document.getElementById("submit-" + name).click();

  if (correct_connections_flag) {
    plotData();
  }
  return false;
}
function resisSubmited(e, name) {
  e.preventDefault();
  var a = document.getElementById("value-" + name).value;
  if (a != "") {
    values["R1"]["value"] = a;
    new_reading = true;
    $("#" + "R1-value").text(values["R1"]["value"] + values["R1"]["unit"]);
  }
  document.getElementById("submit-" + name).click();

  if (correct_connections_flag) {
    plotData();
  }
  return false;
}
function gateSubmitted2(e, name) {
  e.preventDefault();
  var fire1 = parseInt(document.getElementById("value-fire1-" + name).value);
  var fire2 = parseInt(document.getElementById("value-fire2-" + name).value);
  if (!Number.isNaN(fire1) && !Number.isNaN(fire2)) {
    if (fire1 >= fire2) {
      openPopup(
        "new-img/404-warning.png",
        "Firing angle must be in increasing order ",
        "25px"
      );
    } else {
      if (fire1 == combination[name]["fire1"]) {
        if (fire2 == combination[name]["fire2"]) {
          values[name]["fire1"] = fire1;
          values[name]["fire2"] = fire2;
          $("#" + name + "-value").text(
            values[name]["fire1"] +
              values[name]["unit"] +
              " " +
              values[name]["fire2"] +
              values[name]["unit"]
          );
        } else {
          openPopup(
            "new-img/404-warning.png",
            "Firing angle must be at an interval of 120°",
            "23px"
          );
        }
      } else {
        openPopupbutton(
          "new-img/404-warning.png",
          `Firing angle must be at an interval of 60° w.r.t ${values["G1"]["name"]}`,
          "21px"
        );
      }
    }
  } else if (!Number.isNaN(fire1)) {
    openPopup("new-img/404-warning.png", "Enter Ending Angle", "28px");
  } else if (!Number.isNaN(fire2)) {
    openPopup("new-img/404-warning.png", "Enter Starting Angle", "28px");
  }
  document.getElementById("submit-" + name).click();

  if (correct_connections_flag) {
    plotData();
  }
}
function firstGateSubmitted(e, name) {
  e.preventDefault();
  var fire1 = parseInt(document.getElementById("value-fire1-" + name).value);
  var fire2 = parseInt(document.getElementById("value-fire2-" + name).value);
  console.log(fire1, fire2);
  if (fire1 != 0 && !Number.isNaN(fire2)) {
    if (fire1 >= fire2) {
      openPopup(
        "new-img/404-warning.png",
        "Firing angle must be in increasing order ",
        "25px"
      );
    } else {
      if (fire2 != fire1 + 120) {
        openPopup(
          "new-img/404-warning.png",
          "Firing angle must be at an interval of 120°",
          "23px"
        );
      } else {
        var alpha = fire1;
        makeCombination(alpha);
        values["G1"]["fire1"] = fire1;
        values["G1"]["fire2"] = fire2;
        combination_flag = true;
        makeDefault();
        new_reading = true;
        var k = "a" + values["G1"]["fire1"];
        for (i in angle_default) {
          if (i == k) {
            angle_default[i] = "selected";
          } else {
            angle_default[i] = "";
          }
        }
      }
    }
  } else if (fire1 != 0) {
    openPopup("new-img/404-warning.png", "Enter Ending Angle", "28px");
  } else if (!Number.isNaN(fire2)) {
    openPopup("new-img/404-warning.png", "Enter Starting Angle", "28px");
  }
  document.getElementById("submit-" + name).click();

  if (correct_connections_flag) {
    plotData();
  }
}
function instchange() {
  document.getElementById("inst").classList.toggle("inst-display");
}

$(document).ready(function () {
  $("#data").on("click", function () {
    $("#readings").show();
  });
});
document.getElementById("check1").addEventListener("click", () => {
  if (wrong_connection.length == 0) {
    if (user_connection.length < 35) {
      openPopup(
        "new-img/404-warning.png",
        "Please make all the connections",
        "28px"
      );
    } else {
      openPopup(
        "new-img/404-tick.png",
        "Well Done! All Connections are Connected",
        "23px"
      );
      correct_connections_flag = true;
    }
  } else {
    openPopup(
      "new-img/404-warning.png",
      "Wrong connection present in the circuit",
      "25px"
    );
  }
});
var count = 1;
function showreadings() {
  if (correct_connections_flag) {
    if (
      values["AC1"]["volt"] != 0 &&
      values["AC1"]["freq"] != 0 &&
      values["AC2"]["volt"] != 0 &&
      values["AC2"]["freq"] != 0 &&
      values["AC3"]["volt"] != 0 &&
      values["AC3"]["freq"] != 0 &&
      values["G2"]["fire1"] != 0 &&
      values["G3"]["fire1"] != 0 &&
      values["R1"]["value"] != 0 &&
      values["L1"]["value"] != 0
    ) {
      if (new_reading) {
        if (count < 11) {
          document.getElementById("Taken_reading").style.display = "block";
          var a = document.getElementById("tab");
          var b = a.innerHTML;
          str = `<tr><td>${count}</td><td>${values["vrms"]}</td><td>${values["irms"]}</td><td>${values["vavg"]}</td><td>${values["iavg"]}</td></tr>`;
          a.innerHTML = b + str;
          count = count + 1;
          new_reading = false;
        } else {
          openPopup(
            "new-img/404-warning.png",
            "You can only add 10 readings in the table",
            "22px"
          );
        }
      }
    }
  }
}
