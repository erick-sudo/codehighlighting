function updateCode(textarea) {
    let code = textarea.previousElementSibling.firstChild

    let text = textarea.value

    //Handling the final newlines
    if(text[text.length-1] === '\n') { //Checking if the last character is a newline character
        text+=" "
    }

    //Update code
    code.innerHTML = text

    //systeax Highlighting
    Prism.highlightElement(code);
}

function syncScroll(editing) {
    /* Scroll result to scroll coords of event - sync with textarea */
    let highlighting = editing.previousElementSibling
    // Get and set x and y
    highlighting.scrollTop = editing.scrollTop;
    highlighting.scrollLeft = editing.scrollLeft;
}

function checkTab(element, event) {
    let code = element.value

    if(event.key === "Tab") {
        //Tab key has been pressed
        event.preventDefault() //Preventing the normal behaviour

        let beforeTab = code.slice(0, element.selectionStart) //This the text before the tab
        let afterTab = code.slice(element.selectionEnd, element.value.length) //This is the text after the tab

        let cursorPosition = element.selectionEnd +1 //Where the cursor moves after tab - moving gorwar by 1 character to after tab
        element.value = beforeTab + "\t" + afterTab //Adding the tab character

        //Moving the cursor
        element.selectionStart = cursorPosition
        element.selectionEnd = cursorPosition

        updateCode(element.value)  //Updating the text to inclide the indent
    }
}