const { ipcRenderer } = require('electron');

function spriteDrawing(){


    ipcRenderer.on("open-makecode-editor", setupObsever);

    function setupObsever() {

        let observer = new MutationObserver(() => {
            let makecodeFrame = window.frames[1].document; // refers to the makecode editor iframe embedded in impact

            let tilemapSideBar = $(".tilemap", makecodeFrame)[0];
            let canvasContainer = $(".image-editor-canvas", makecodeFrame)[0];
    
        
            if (!tilemapSideBar && canvasContainer && (!isActivity("Adventure") && !isActivity("Quest"))) {
                canvasContainer.style.pointerEvents = "none";
                canvasContainer.style.cursor = "not-allowed";            
            }
        });

        let makecodeFrame = window.frames[1].document; // refers to the makecode editor iframe embedded in impact

        let fieldEditor = $("#blocks-editor-field-div", makecodeFrame)[0];
        observer.observe(fieldEditor, {subtree: true, childList: true});

        console.log("new Update");



    }
    
    function isActivity(text) {
        let title = document.querySelector(".title-container h1");
        return title.textContent.slice(0, text.length) === text;
    }
}

module.exports = {
    spriteDrawing
};