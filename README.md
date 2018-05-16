# Employee-Management-System
(Mean Stack development)
Mongodb v3.6.4
Express
Angular
Node v9.10.1

How to install this website on your local environment?

step1: please download and install npm on your computer and register in path variable of your computer/properties/advanced system settings/advaced/environment variables, so that npm cmd command will be excuted on cmd window

step2: you can simply install angular-cli by using this command, "npm install -g @angular/cli"

step3: You need to install mongodb and 3t application which is GUI for mongodb
      (If you do not know how to install mongodb, then you can download and install msi file from "https://www.mongodb.com/download-center?_ga=2.128617615.2069823477.1526475894-1648796818.1526344068#community")
      You can customize db path when you install mongodb on your computer.
      (ex. E:\Workstation\MEAN\Projects\MozingoDB)
      
step4: From now on, we can have a look at how this website works on local environment and I will tell you how to excute it.
  (let`s imagine that you download this zip source file on the path, "E:\Workstation\MEAN\Projects")
  1. open cmd window(1st) and follow these commands for conecting db
     E:
     cd E:\Workstation\MEAN\Projects\MozingoDB\bin
     mongodb --dbpath "E:\Workstation\MEAN\Projects\MozingoDB"
     
  2. open another cmd window(2nd) and follow these commands for nodejs excution
     E:
     cd E:\Workstation\MEAN\Projects\mozingo
     npm install
     npm install nodemon
     nodemon
     (As a result, you can see some sentences on cmd window which shows db connection successfully)
  3. open another cmd window(3rd) and follow these commands for angualr excution
     E:
     cd E:\Workstation\MEAN\Projects\mozingo\angular-src
     npm install
     ng serve
     
  That`s it.
step5: Now you can see how this site beautiful on your browser "localhost:4200/"
