import mqtt from "./moscaclient";
import constants from "./constants";

// Connect to the channel named "my_bus".
const channel = new BroadcastChannel("my_bus");

mqtt.setBroadcastChannel(channel);

// Listen for messages on "my_bus".
channel.onmessage = function(e) {
  console.log("Received", e.data);
  switch (e.data.cmd) {
    case constants.SUBSCRIBE_TOPIC:
      mqtt.mosca.subscribe(e.data.topic);
      console.log(`SW suscribed to topic ${e.data.topic}`);
      break;
    case constants.UNSUBSCRIBE_TOPIC:
      mqtt.mosca.unsubscribe(e.data.topic);
      console.log(`SW unsuscribed to topic ${e.data.topic}`);
      break;
    default:
      break;
  }
};

export default channel;
