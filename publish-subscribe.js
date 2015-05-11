'use strict';

var pubsub = {};

(function(myObject) {
    var topics = {};
    var subUid = -1;
    myObject.publish = function (topic, data) {
        if(!topics[topic]) {
            return false;
        }
        var subscribers = topics[topic];
        var len = subscribers ? subscribers.length : 0;
        for(var i = 0; i<len; i++) {
            subscribers[i].func(topic, data);
        }
        return this;
    };
    myObject.subscribe = function (topic, func) {
        if (!topics[topic]) {
            topics[topic] = [];
        }
        var token = (++subUid).toString();
        topics[topic].push({
            token: token,
            func: func
        });
        return token;
    };
    myObject.unsubscribe = function (token) {
        for(var topic in topics) {
            var subscribers = topics[topic];
            if (subscribers) {
                for(var i = 0; i < subscribers.length; i++) {
                    if (subscribers[i].token === token) {
                        subscribers.splice(i, 1);
                        return token;
                    }
                }
            }
        }
        return this;
    };

}(pubsub));


// Demo of the publish/subscribe pattern

var messageLogger = function (topic, data) {
    console.log("Logging: " + topic + ": ", data);
};


var subscriber1 = pubsub.subscribe("inbox/newMessage", messageLogger);

pubsub.publish("inbox/newMessage", "hello world");
pubsub.publish("inbox/newMessage", {a: 1, b: 2});
pubsub.publish("inbox/newMessage", {sender: 'abc@example.com',
                                    body: 'How are you today?'});
pubsub.unsubscribe(subscriber1);
pubsub.publish("inbox/newMessage", {msg: 'are you still there?'});
