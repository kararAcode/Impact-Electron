const { ipcRenderer } = require('electron');

function spriteDrawing(){


    ipcRenderer.on("open-makecode-editor", setupObsever);

    function setupObsever() {
        const makecodeFrame = window.frames[1].document; // refers to the makecode editor iframe embedded in impact

        const observer = new MutationObserver(() => {
            const makecodeFrame = window.frames[1].document; // refers to the makecode editor iframe embedded in impact

            const tilemapSideBar = $(".tilemap", makecodeFrame)[0];
            const canvasContainer = $(".image-editor-canvas", makecodeFrame)[0];
    
        
            if (!tilemapSideBar && canvasContainer && (!isActivity("Adventure"))) {
                canvasContainer.style.pointerEvents = "none";
                canvasContainer.style.cursor = "not-allowed";            
            }
        });


        const fieldEditor = $("#blocks-editor-field-div", makecodeFrame)[0];
        observer.observe(fieldEditor, {subtree: true, childList: true});


    }
    
    function isActivity(text) {
        const title = document.querySelector(".title-container h1");
        return title.textContent.slice(0, text.length) === text;
    }
}

module.exports = spriteDrawing;