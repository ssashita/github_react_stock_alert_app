module.exports=(function(){
    return {
        packMessage: function(message, clientid){
            return JSON.stringify({message: message, 
                fromclientid: clientid});
        },
        unpackMessage: function(payload, recursive){
            let mesg = JSON.parse(payload);
            if (!recursive){
                return mesg;
            }else if ("message" in mesg &&  mesg.message[0] === '{') {
                return this.unpackMessage(mesg.message, true);
            } else {
                return mesg;
            }
        },
        events: {CONNECTED: "Connected", RECEIVED: "Received", 
        SUBSCRIBE: "Subscribed", PUBLISH: "Publish",
        DISCONNECTED: "Disconnected", DELIVERED: "Delivered"}
    }
})();