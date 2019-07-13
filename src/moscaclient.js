import constants from "./constants";
var mqtt = require("mqtt");
var utils = require("./messageutils.js");

var moscaurl = constants.moscaConnectionString;

var options = { clientId: "TestClient3421", clean: true, rejectUnauthoried: false };
var client = mqtt.connect(moscaurl, options);

var channel;
const postMessageToChannel = (msg) => {
    if (channel) {
        channel.postMessage(msg);
    } else {
        setTimeout(postMessageToChannel, 100);
    }
};
client.on("connect", () => {
    console.log("client connected:\t", options.clientId);
});
client.on('message', function (topic, mesg, packet) {
    if (mesg.toString()[0] !== '{') {
        console.log("Recieved:= " + mesg + " from ???");
    } else {
        let { message, fromclientid } = utils.unpackMessage(mesg);
        //if(fromclientid != client_Id) {
        console.log("Recieved:= " + message + " from " + fromclientid);
        postMessageToChannel(message);
        showNotification();
        //}
    }
    return true;
    //process.exit();
});


var publish = (alertKeyTopic, data) => {
    client.publish(alertKeyTopic, utils.packMessage(data, options.clientId));
};
export default {
    mosca: client, publish: publish, setBroadcastChannel: (ch) => {
        channel = ch;
    }
};


function showNotification() {
  Notification.requestPermission(function(result) {
    if (result === "granted") {
      navigator.serviceWorker.ready.then(function(registration) {
        registration.showNotification("Vibration Sample", {
          body: "Buzz! Buzz!",
          //icon: '../images/touch/chrome-touch-icon-192x192.png',
          vibrate: [200, 100, 200, 100, 200, 100, 200],
          tag: "vibration-sample"
        });
      });
    }
  });
}
