
<div style="font-family: 'Nunito Sans', sans-serif; font-size: 20px;text-align: justify;">

### **Introduction**

A three-phase half-wave controlled rectifier is an electrical circuit used for converting alternating current (AC) into direct current (DC) by controlling the flow of current through a load. It is called a half-wave rectifier because it rectifies only one half of the input waveform.<br>

Here's an explanation of the working principle of a three-phase half-wave controlled rectifier:<br>

1. <b>Input:</b> The rectifier is connected to a three-phase AC power source. The AC voltage waveform consists of three phases: phase A, phase B, and phase C.<br>

2. <b>Rectification:</b> Each phase of the AC source is connected to a thyristor, forming a thyristor bridge. The diodes allow current flow in one direction and block it in the other direction. When the input voltage is positive in one phase, the corresponding thyristor conducts provided that gate trigger is given, allowing current to flow through the load connected to the output side of the bridge.<br>

3. <b>Control:</b> In a controlled rectifier, the current flow through the thyristor (also known as a silicon-controlled rectifier or SCR). The thyristor acts as a switch that can be turned on or off depending on the control signal applied to its gate.<br>

4. <b>Triggering:</b> To control the rectification process, the thyristors are triggered at specific points in the input waveform. Triggering is achieved by applying a pulse signal to the gate of the thyristor at the desired firing angle. The firing angle determines the portion of the input waveform during which the thyristor conducts current.<br>

5. <b>Conduction:</b> Once triggered, the thyristor turns on and allows current to flow through the load until the end of the half-cycle or until the thyristor is turned off.<br>

6. <b>Commutation:</b> When the input waveform crosses zero or becomes negative, the natural commutation occurs, turning off the conducting thyristor. This happens because the forward voltage across the thyristor drops below its holding voltage.<br>

7. <b>Output:</b> The load connected to the output of the rectifier receives a pulsating DC voltage, which consists of positive half-cycles. The output voltage waveform is the result of rectifying only one half of the input waveform.<br>

By controlling the firing angle of the thyristors, the average output voltage can be varied, enabling the regulation of power delivered to the load.

It's important to note that the three-phase half-wave controlled rectifier is a simplified configuration and may require additional components, such as filters and smoothing capacitors, to reduce ripple and provide a smoother DC output.
Overall, the three-phase half-wave controlled rectifier provides a means to convert three-phase AC power to pulsating DC power by controlling the firing of thyristors in each phase.

### **1. Three Phase Half Wave Controlled Rectifier - R Load**<br>

<center><img src="images\R load circuit.png" alt="R load circuit" height="250" width="450" style="mix-blend-mode: darken"></center>
<center><b>Fig. 1 Three Phase Half Wave SCR with R Load</b></center><br>

<center><img src="images\R load waveform.png" alt="Input waveform" height="400" width="400" style="mix-blend-mode: darken; -webkit-filter:contrast(150%);"></center>
<center><b>Fig. 2 Waveforms of Three Phase Half Wave SCR with R Load</b></center><br>

The circuit consist of a delta star transformer and 3 thyristors T1, T2, T3 which are connected on the secondary star connected winding and a resistive load.
When a V<sub>a</sub> is positive, T<sub>1</sub> becomes forward biased and conducts. During the negative cycle of V<sub>a</sub>, T<sub>1</sub> turns off. 
Similarly T<sub>2</sub> and T<sub>3</sub> conducts only during the positive cycles of V<sub>b</sub> and V<sub>c</sub> respectively.
The average output voltage can be varied by varying the firing angles of the thyristors. The waveforms show the output voltage for various firing angles.
In the waveform, V<sub>a</sub> is denoted as V<sub>an</sub>, V<sub>b</sub> as V<sub>bn</sub> and V<sub>c</sub> as V<sub>cn</sub>.<br>
The expression for average and rms of output voltage and current are,<br>
For &alpha; < 30&deg;<br>

<center>

$V_{o} = \frac {1}{\frac {2\pi}{3}} \int_{\alpha+\frac {\pi}{6}}^{\alpha+\frac {5\pi}{6}} V_{mp}\, sinwt\, dwt \,=\,\frac {3\sqrt 3}{2\pi}\,V_{mp}\,cos\alpha\,=\,\frac {3}{2\pi}\,V_{ml}\,cos\alpha.......(1)$

</center>

<center>

$I_{o}\,=\,\frac {V_{o}}{R}\,=\,\frac {3}{2\pi R}\,V_{ml}\,cos\alpha.......(2)$

</center>

<center>

$V_{o(rms)} = \left[ \frac {1}{\frac {2\pi}{3}} \int_{\alpha+\frac {\pi}{6}}^{\alpha+\frac {5\pi}{6}} V_{mp}^2\, sin^2wt\, dwt \right]^{1/2}$

</center>

<center>

$V_{o(rms)} = \sqrt {3} V_{mp} \left[ \frac {1}{6} + \frac {\sqrt {3}}{8\pi} cos2\alpha \right]^{1/2}\,=\,V_{ml} \left[ \frac {1}{6} + \frac {\sqrt {3}}{8\pi} cos2\alpha \right]^{1/2}.......(3)$

</center>

<center>

$I_{o(rms)}\,=\,\frac {V_{o(rms)}}{R}\,=\,\frac {\sqrt {3} V_{mp}}{R} \left[ \frac {1}{6} + \frac {\sqrt {3}}{8\pi} cos2\alpha \right]^{1/2}.......(4)$

</center>

For &alpha; > 30&deg;<br>

<center>

$V_{o} = \frac {1}{\frac {2\pi}{3}} \int_{\alpha+\frac {\pi}{6}}^{\pi} V_{mp}\, sinwt\, dwt \,=\,\frac {3}{2\pi}\,V_{mp}\,[1+cos(\alpha+30^{\circ})]......(5)$

</center>

<center>

$I_{o} = \frac {V_{o}}{R} \,=\,\frac {3}{2\pi R}\,V_{mp}\,[1+cos(\alpha+30^{\circ})]  .......(6)$

</center>

<center>

$V_{o(rms)} = \left[ \frac {1}{\frac {2\pi}{3}} \int_{\alpha+\frac {\pi}{6}}^{\pi} V_{mp}^2\, sin^2wt\, dwt \right]^{1/2}$

</center>

<center>

$V_{o(rms)} = \frac {\sqrt {3} V_{mp}}{2\sqrt {\pi}} \left[ \left(\frac {5\pi}{6} - \alpha \right) +\frac {1}{2} sin(2\alpha\,+\,\frac {\pi}{3})\right]^{1/2}.......(7)$

</center>

<center>

$I_{o(rms)}\,=\,\frac {V_{o(rms)}}{R}\,=\,\frac {\sqrt {3} V_{mp}}{2\sqrt {\pi}R} \left[ \left(\frac {5\pi}{6} - \alpha \right) +\frac {1}{2} sin(2\alpha\,+\,\frac {\pi}{3})\right]^{1/2}.......(8)$

</center>


### **2. Three Phase Half Wave Controlled Rectifier - RL Load**

<center><img src="images\RL load circuit.png" alt="1 phase controlled bridge rectifier" height="250"
            width="500" style="mix-blend-mode: darken; -webkit-filter:contrast(120%);"></center>
        
<center><b>Fig. 3 Three Phase Half Wave SCR with RL Load</b></center><br>

<center><img src="images\RL load waveform.png" alt="Input waveform" height="600" width="550" style="mix-blend-mode: darken; -webkit-filter:contrast(180%);"></center>
<center><b>Fig. 4 Waveforms of Three Phase Half Wave SCR with RL Load</b></center><br>

The circuit consist of a delta transformer and 3 thyristors T<sub>1</sub>, T<sub>2</sub>, T<sub>3</sub> which are connected on the secondary star connected winding and a RL load.
When V<sub>a</sub> is positive, T<sub>1</sub> becomes forward biased and conducts. During the negative cycle of V<sub>a</sub>, the current through T<sub>1</sub> is not zero due to inductor 
present in the load. So T<sub>1</sub> will remian ON during the negative cycle of V<sub>a</sub>. When V<sub>b</sub> is positive, T<sub>2</sub> is triggered and the load current gets transferred 
from T<sub>1</sub> to T<sub>2</sub>. At this instant, T<sub>1</sub> turns OFF. During the negative cycle of V<sub>b</sub>, the current through T<sub>2</sub> is not zero due to inductor present in the load.
So T<sub>2</sub> will remain ON during the negative cycle of V<sub>b</sub>. When T<sub>3</sub> is triggered during positive cycle of V<sub>c</sub>, the load current is transferred from T<sub>2</sub> to T<sub>3</sub>.
At this instant, T<sub>2</sub> turns OFF. Similarly, T<sub>3</sub> conducts during the negative cycle of V<sub>c</sub> and turns OFF when T<sub>1</sub> is triggered. The average output voltage can be varied by varying the firing 
angles of the thyristors. The waveforms shows the output voltage for various firing angles. In the waveform, V<sub>a</sub> is denoted as V<sub>an</sub>, V<sub>b</sub> as V<sub>bn</sub>, V<sub>c</sub> as V<sub>cn</sub>.<br>
The average and rms of bridge output voltage and current is,<br>
<center>

$V_{o} = \frac {1}{\frac {2\pi}{3}} \int_{\alpha+\frac {\pi}{6}}^{\alpha+\frac {5\pi}{6}} V_{mp}\, sinwt\, dwt \,=\,\frac {3\sqrt 3}{2\pi}\,V_{mp}\,cos\alpha\,=\,\frac {3}{2\pi}\,V_{ml}\,cos\alpha.......(9)$

</center>

<center>

$I_{o}\,=\,\frac {V_{o}}{R}\,=\,\frac {3}{2\pi R}\,V_{ml}\,cos\alpha.......(10)$

</center>

<center>

$V_{o(rms)} = \left[ \frac {1}{\frac {2\pi}{3}} \int_{\alpha+\frac {\pi}{6}}^{\alpha+\frac {5\pi}{6}} V_{mp}^2\, sin^2wt\, dwt \right]^{1/2}$

</center>

<center>

$V_{o(rms)} = \sqrt {3} V_{mp} \left[ \frac {1}{6} + \frac {\sqrt {3}}{8\pi} cos2\alpha \right]^{1/2}\,=\,V_{ml} \left[ \frac {1}{6} + \frac {\sqrt {3}}{8\pi} cos2\alpha \right]^{1/2}.......(11)$

</center>

<center>

$I_{o(rms)}\,=\,\frac {V_{o(rms)}}{R}\,=\,\frac {\sqrt {3} V_{mp}}{R} \left[ \frac {1}{6} + \frac {\sqrt {3}}{8\pi} cos2\alpha \right]^{1/2}.......(12)$

</center>


### **Advantages of Three Phase Half Wave SCR**

1. Three-phase rectifiers are known for their high efficiency in converting AC power to DC power. The half-wave controlled rectifier configuration allows for efficient power conversion by utilizing only half of the AC input waveform, resulting in reduced power loss.<br>

2. Reduced ripple content: The three-phase input of the rectifier provides a more continuous and balanced waveform, resulting in reduced ripple content in the output DC voltage. This leads to improved output voltage stability and reduced voltage fluctuations, which is beneficial for applications that require a steady DC supply.<br>

3. Three-phase rectifiers inherently have lower harmonic distortion compared to single-phase rectifiers. The balanced three-phase input waveform helps to minimize the generation of harmonics, which can cause interference and inefficiency in electrical systems. Lower harmonic distortion contributes to improved power quality and reduced stress on the electrical components.<br>

4. Three-phase systems are capable of delivering higher power compared to single-phase systems. The three-phase half-wave controlled rectifier can handle larger power loads, making it suitable for applications that require high-power DC supplies, such as industrial motor drives, power supplies for electric vehicles, and large-scale battery charging systems.<br>

5. The use of three-phase power distribution provides redundancy and improved reliability in electrical systems. In case of a fault or failure in one phase, the other two phases can continue to deliver power, ensuring uninterrupted operation. This increased reliability is crucial for critical applications where downtime can be costly.<br>

6. Three-phase rectifiers offer better power factor correction capabilities compared to single-phase rectifiers. Power factor correction helps to reduce reactive power and improve the overall power efficiency of the system. By utilizing three-phase power, the rectifier can achieve improved power factor performance, resulting in reduced electricity consumption and improved energy efficiency.<br>

### **Disadvantages of Three Phase Half Wave SCR**

1. The half-wave controlled rectifier can only utilize half of the input waveform, resulting in a lower average output voltage compared to full-wave rectifiers. This reduces the overall efficiency of the rectification process.<br>

2. The rectified output waveform of a half-wave controlled rectifier contains significant harmonic distortion. This can lead to increased electromagnetic interference (EMI) and reduced power quality in the electrical system.<br>

3. The rectifier draws current from the AC supply discontinuously, causing a poor power factor. This can result in increased line losses and decreased overall system efficiency. Power factor correction techniques may be necessary to compensate for this drawback.<br>

4. The half-wave controlled rectifier is not suitable for driving inductive loads, such as motors, due to its intermittent output waveform. Inductive loads require a continuous and smooth DC voltage for proper operation. This limitation restricts its applicability in many industrial and power system applications.<br>

5. The output voltage of the rectifier is influenced by changes in the input voltage, load impedance, and firing angle control. Achieving precise voltage regulation can be challenging, especially when operating with varying load conditions.<br>

6. The use of power electronic devices like thyristors or diodes in the rectifier circuit exposes them to high-voltage transients during switching operations. This can lead to increased stress on these components, potentially reducing their reliability and requiring additional protective measures.<br>
        
7. The control circuitry required for managing the firing angle of the rectifier adds complexity to the overall system design. It requires additional control and feedback mechanisms to achieve proper operation, making it more intricate and potentially more expensive to implement.<br>

8. The combination of low output voltage, poor power factor, and increased harmonic content results in reduced overall efficiency for the half-wave controlled rectifier compared to other rectifier topologies. This can lead to increased power losses and energy wastage.<br>

### **Applications of Three Phase Half Wave SCR**

1. Motor Drives<br>

2. Welding Equipment<br>

3. Power Quality Control<br>

4. Battery Charging Systems<br>

5. Power Supplies <br>


</div>