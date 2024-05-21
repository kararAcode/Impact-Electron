
window.onload = () => {
        


    setInterval(() => {
        
        let tilemapSideBar = document.querySelector(".tilemap");
        let canvasContainer = document.querySelector(".image-editor-canvas");


        if (!tilemapSideBar && canvasContainer && (!isActivity("Adventure") || !isActivity("Quest"))) {
            canvasContainer.style.pointerEvents = "none";
            canvasContainer.style.cursor = "not-allowed";            
        }

    }, 500)


    function isActivity(text) {
        let title = document.querySelector(".title-container h1");
        return title.text().slice(0, text.length) === text;
    }
    
}