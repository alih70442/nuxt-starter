class ClipBoard {

    static copy(text) {
        $('body').prepend(`<p class="js-copyNode" style="opacity: 0; position:fixed;">${text}</p>`)
        const copyNode = $('body').children().first().get(0);

        var range = document.createRange();
        range.selectNode(copyNode);
        window.getSelection().addRange(range);

        try {
            document.execCommand('copy');
        } catch (err) {
            console.log(err);
        }

        window.getSelection().removeAllRanges();
        copyNode.remove();
    }

    // static paste() {
    // $('body').prepend(`<textarea class="js-pasteNode" style="opacity: 0; position:fixed;"></textarea>`)
    // const pasteNode = $('body').children().first();

    // var pasteText = document.querySelector(".js-pasteNode");
    // console.log(pasteText);
    // pasteText.focus();
    // document.execCommand("paste");

    // console.log(pasteText.textContent);

    // return pasteNode.text();
    // }

    static clear() {
        ClipBoard.copy('');
    }
}