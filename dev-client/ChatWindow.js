// ========================
//
//  By:     Ibrahim Sardar
//  Proj:   P2PChatApp
//
// ========================

// my exports
export { ChatWindow }

class ChatWindow {

    static init(element, new_element_id) {

        ChatWindow.element = $('<div id="'+new_element_id+'" class="container"></div>');
        ChatWindow.input_element = $('<input id="cw-input"></input>');
        ChatWindow.output_element = $('<textarea id="cw-area"></textarea>');

        $(ChatWindow.element).append(ChatWindow.output_element);
        $(ChatWindow.element).append(ChatWindow.input_element);
        $(element).append(ChatWindow.element);
    }

    static put() {}

    static clear() {}

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