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
        ChatWindow.input_element = $('<input id="cw-input" placeholder="chat here..."></input>');
        ChatWindow.output_element = $('<textarea id="cw-area"></textarea>');

        $(ChatWindow.element).append(ChatWindow.output_element);
        $(ChatWindow.element).append(ChatWindow.input_element);
        $(element).append(ChatWindow.element);
    }

    static put(msg) {

        var hist = $(ChatWindow.output_element).val();
        $(ChatWindow.output_element).val(hist + '\n' + msg);
    }

    static clear() {

        $(ChatWindow.output_element).val('');
    }

    // variables
    static element;
    static input_element;
    static output_element;
}