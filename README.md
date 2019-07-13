# react_stock_alert_app
Minimalist React and Material-UI PWA (Progressive Web App) for setting Stock alerts and getting alert  notifications

## Overview
As the description above says, this uses a minimal set of features and ideas of React app programming alongwith the React Material UI module, in order to create a Web app for setting, displaying and deleting stock alerts, and alerting the user with Browser notification when the alert condition is met. Currently, the app supports only Stock price based alerts. The back end server code for this app is not included in this codebase. The app is configured to use a service worker which is connected to a messaging server based on the MQTT protocol. Again, the MQTT server code is not part of this codebase. When the user sets an alert, the service worker subscribes to the relevant topic corresponding to this alert with the MQTT server. When the stock price condition mentioned in the alert is met, the server publishes a message to the alert topic in the MQTT server (this is in the back end and not part of this codebase), and the subscribed service worker on this web client receives that message, in response to which it requests the browser to show a notification about the alert.

## Typical User workflow
* The first time a user visits the web app url,she will see a log in dialog as follows:

![Alt text](stockpallogin.png)

* Once the user is done with logging in, she will see the following dashboard with a list (empty first time) of stock alerts already set by the user

![Alt text](alertdashboard.png)

The '+' icon button in the above dashboard enables creation of a new stock alert. Every alert row in the listing has a delete icon (dustbin icon) which when clicked deletes the alert. The following dialog appears when the create icon button is clicked

![Alt text](createalertdialog.png)

In this create alert dialog, the first input field is for adding the stock symbol name. This field supports auto suggestion. When the user types more than 3 letters, the auto suggestion kicks in and she is shown a list of possible symbols to choose from.

![Alt text](selectsymbol.png)

Once the user is done filling the information, clicking ok creates a new alert

![Alt text](createalertpressok.png)

Later in time, if and when this alert condition is hit on the server, the latter communicates this event to the client side via the MQTT server mentioned earlier. This communication message is received by the service worker, which then requests the browser to notify the user via a notification dialog as follows:

![Alt text](alerthitnotification.png)
