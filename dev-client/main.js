// ========================
//
//  By:     Ibrahim Sardar
//  Proj:   P2PChatApp
//
// ========================

import { Peer } from './Peer.js';
import { ChatWindow } from './ChatWindow.js';

export { main as chatapp }

class main {

    static init() {

        var body = $('body');
        ChatWindow.init(body, 'chat');
        //SimWindow.init(body, 'sim');

        // chat loop
        Peer.on_chat((json) => {
            var date = new Date();
            var m = date.getMinutes();
            var h = date.getHours() % 12;
            var p = date.getHours() > 12 ? 'pm' : 'am';
            var time = h + ':' + m + ' ' + p;
            ChatWindow.put('[' + json.name + ' at ' + time + ']: ' + json.msg);
        });

        // render loop
        // var time;
        // var render = () => {
        //     requestAnimationFrame(render);
        //     var now = Date.now();
        //     var dt = now - (time || now);
        //     time = now;
        //     SimWindow.render(dt);
        // }
        // render();

        // sim loop
        // time = undefined;
        // var simulate = () => {
        //     requestAnimationFrame(simulate);
        //     var now = Date.now();
        //     var dt = now - (time || now);
        //     time = now;
        //     SimWindow.simulate(dt);
        // }
        // simulate();
    }

    static connect(name) {

        if (Peer.on)
            Peer.stop();
        main.me = Peer.start(name);
    }

    static leave() {

        if (Peer.on)
            Peer.stop();
    }

    static chat(msg) {

        Peer.send('chat', msg);
    }

    static clear() {

        ChatWindow.clear();
        //SimWindow.clear();
    }

    static clear_chat() {

        ChatWindow.clear();
    }

    static clear_sim() {

        //SimWindow.clear();
    }

    static me;
}