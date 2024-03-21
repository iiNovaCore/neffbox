
function createPopup(contentDiv, onClose) {
    if (typeof contentDiv == "string") {
        let div = document.createElement("h1");
        div.innerText = div;
        contentDiv = div;
    }
    /*
    <div class="modal-overlay show-modal">
        <div class="modal">
            <span class="closebtn"><i class="fa-solid fa-x"></i></span>
            <h1>hey</h1>
        </div>
    </div>
    */

    /*
<div class="modal-overlay show-modal">  <!--this is for joining via url and the game not detecting a username -->
        <div class="modal">
            <span class="closebtn"><i class="fa-solid fa-x"></i></span>
            <h1>Room (roomid)</h1>
            <p>please set a username before joining!</p>
            <input type="text" name="username" id="username" placeholder="username">
            <button onclick="onSaveUser()">save</button>
        </div>
    </div>
    */
    const modalOverlay = document.createElement("div");
    modalOverlay.classList.add("modal-overlay", "show-modal");
    const modal = document.createElement("div");
    modal.classList.add("modal");
    const closeBtn = document.createElement("span");
    closeBtn.classList.add("closebtn");
    closeBtn.innerHTML = `<i class="fa-solid fa-x"></i>`
    closeBtn.onclick = function() {
        modalOverlay.remove();
        if (onClose) onClose();
    }
    modal.appendChild(closeBtn)
    modal.appendChild(contentDiv)
    modalOverlay.appendChild(modal);
    document.body.insertBefore(modalOverlay, document.body.firstChild)
}
