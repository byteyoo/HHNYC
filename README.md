## Clarity: Health Insights

## Inspiration
Currently despite there being great devices out there to measure health, it is often difficult for physicians to make use of this data. Data is fragmented, not time sensitive and often noisy. Correlations are often missed leading to serious health consequences. We looked to find a solution to combine all this vital data, bringing feedback to patients and physicians.

## What it does
Clarity begins by analyzing historical sets of bio-metric data, including demographics. This data is analyzed IBM Watson SPSS to create base health profiles. We trained our real-time data and compared the history of activity with sleeping, steps, walking distance, heart rate and environmental conditions through the ST Micro Nucleo board.


![ST Micro Nucleo](http://i.imgur.com/Lxnqx3E.jpg)


This data is all segmented by timestamp, data points are then flagged for interesting metrics. Users receive alert messages through IBM Bluemix and Twilio.


![Node-RED](http://i.imgur.com/8PxcFFr.png)


The ST Micro sends data out to IBM Bluemix and stores it's data through a Cloudant database. Through this data, physicians will be able to make better treatment decisions for their patients.

We used Angular2 to show a real-time dashboard so that doctors and patients can see any potential problems. The peaks in the data are flagged on the screen.

## How we built it
We imported Saj's Samsung S-Health data for a one month period, saving heart-rate, walk distance, steps and sleep schedule. We filtered the data by the time stamp and daily activity level. We hooked up an ST Microelectronics Nucleo board together with sensors and uploaded the data onto IBM Bluemix.
![Bluemix Setup](http://i.imgur.com/xkP892d.png)
This data was pushed through Node-RED. The data is analyzed through javascript, if an alert happens, a message is sent through the Twilio SMS service.

## Meet the Team
![team](http://i.imgur.com/HQqCB2z.jpg?1)
* [David Maiman](https://twitter.com/prince_david)
* [Asheik Hussain](https://github.com/ashehussain)
* [Saj Arora](https://github.com/aroraenterprise)
* [Steven (Dong Woo) Yoo](https://github.com/byteyoo)
