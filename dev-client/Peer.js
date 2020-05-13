// ========================
//
//  By:     Ibrahim Sardar
//  Proj:   P2PChatApp
//
// ========================

// node imports
var signal_hub = require('signalhub');
var wrtc_swarm = require('webrtc-swarm');
var stream_set = require('stream-set');
var json_stream = require('duplex-json-stream');

// my exports
export { Peer }

class Peer {

    static on_chat(callback = (json) => {}) {

        Peer._on_chat = callback;
    }

    static start(name) {

        var id;

        Peer.name = name;
        Peer.hub = signal_hub('P2P-Chat-App', [
            //'https://signalhub-jccqtwhdwc.now.sh' // public free server
            'https://ibsardar.com'
        ]);
        Peer.swarm = wrtc_swarm(hub, {maxPeers:swarm_max});

        swarm.on('connect', (entity, eid) => {
    
            id = eid;
            console.log('* \n* [entity detected]-[id:'+eid+']\n* [swarm size:'+swarm.peers.length+']-[max:'+Peer.MAX_SWARM+']\n* ');
            entity = json_stream(entity); // convert socket to json_stream
            Peer.streams.add(entity); // add a stream between us and this new entity
            entity.on('data', (json) => {

                Peer._on_chat(json.chat);
                //Peer._on_sim(json.sim);
            });
        });
        
        swarm.on('disconnect', (entity, eid) => {
        
            console.log('* \n* [entity lost]-[id:'+eid+']\n* [swarm size:'+swarm.peers.length+']-[max:'+Peer.MAX_SWARM+']\n* ');
        });

        return id;
    }

    static stop() {

        this.swarm.close();
    }

    static send(topic, json) {

        Peer.streams.forEach((entity) => {
            var data = {}
            data[topic] = json;
            entity.write(data);
        })
    }

    // properties
    static get on() { return Peer.connected; }
    static get off() { return !Peer.connected; }

    // variables
    static name;
    static connected = false;
    static swarm;
    static streams;
    static hub;

    // constants
    static get MAX_SWARM() { return 4; }

    // privates
    static _on_chat;
}