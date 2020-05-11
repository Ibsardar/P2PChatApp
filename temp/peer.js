var signal_hub = require('signalhub');
var wrtc_swarm = require('webrtc-swarm');
var stream_set = require('stream-set');
var json_stream = require('duplex-json-stream');

var hub = signal_hub('lock-step-demo', [
    //'https://signalhub-jccqtwhdwc.now.sh' // public free server
    'https://ibsardar.com'
]);

var swarm_max = 4;
var swarm = wrtc_swarm(hub, {maxPeers:swarm_max});
var streams = stream_set();
var id = Math.random();
var seq = 0;
var logs = {};

// mafintosh's example
/*swarm.on('peer', (friend) => {
    console.log('[a friend joined]');
    friend = json_stream(friend);
    streams.add(friend);
    friend.on('data', (data) => {
        if (logs[data.log] <= data.seq) return;
        logs[data.log] = data.seq;
        console.log(data.username + '> ' + data.message);
        streams.forEach((other_friend) => {
            other_friend.write(data);
        })
    });
})
window.chat = (message) => {
    var next = seq++;
    streams.forEach((friend) => {
        friend.write({log:id, seq:seq, username:window.username, message:message});
    })
}
*/

// my version
if (!swarm.WEBRTC_SUPPORT)
    console.log('[p2p is NOT supported in this browser]-[oh no...]');

else
    console.log('[p2p is supported in this browser]-[yay!]');
    
swarm.on('connect', (entity, eid) => {
    
    console.log('* \n* [entity detected]-[id:'+eid+']\n* [swarm size:'+swarm.peers.length+']-[max:'+swarm_max+']\n* ');

});

swarm.on('disconnect', (entity, eid) => {

    console.log('* \n* [entity lost]-[id:'+eid+']\n* [swarm size:'+swarm.peers.length+']-[max:'+swarm_max+']\n* ');

});