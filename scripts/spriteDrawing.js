function spriteDrawing(){

    setInterval(() => {
        let frameDoc = window.frames[1].document;
        
        let tilemapSideBar = $(".tilemap", frameDoc)[0];
        let canvasContainer = $(".image-editor-canvas", frameDoc)[0];

    
        if (!tilemapSideBar && canvasContainer && (!isActivity("Adventure") && !isActivity("Quest"))) {
            canvasContainer.style.pointerEvents = "none";
            canvasContainer.style.cursor = "not-allowed";            
        }
    
    }, 500);
    
    
    function isActivity(text) {

        let title = document.querySelector(".title-container h1");
        return title.textContent.slice(0, text.length) === text;
    }
}

module.exports = {
    spriteDrawing
}