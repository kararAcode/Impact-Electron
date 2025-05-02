const { ipcRenderer } = require('electron');
const { createDashboardUI } = require('./featurePermissionsUI');

function featurePermissions() {
    // Load saved permissions from sessionStorage, fallback to true if not set
    let featurePermissions = {
        drawing: sessionStorage.getItem("drawingPermission") !== "false",
        sandbox: sessionStorage.getItem("sandboxPermission") !== "false"
    };

    let dashboard = null;

    function toggleDashboard() {
        if (!dashboard) {
            dashboard = createDashboardUI(featurePermissions, (feature, value) => {
                featurePermissions[feature] = value;
                
                // ✅ Save updated permission to sessionStorage
                sessionStorage.setItem(`${feature}Permission`, String(value));

                if (feature === 'drawing') {
                    setupDrawingObserver();
                } else if (feature === 'sandbox') {
                    applySandboxPermissions();
                }
            });
            document.body.appendChild(dashboard);
        }

        const isVisible = dashboard.style.display !== 'none';
        dashboard.style.display = isVisible ? 'none' : 'block';
    }

    function isActivity(text) {
        const title = document.querySelector(".title-container h1");
        return title && title.textContent.slice(0, text.length) === text;
    }

    function setupDrawingObserver() {
        const makecodeFrame = window.frames[1]?.document;
        if (!makecodeFrame) return;
    
        const observerCallback = () => {
            const tilemapSideBar = $(".tilemap", makecodeFrame)[0];
            const canvasContainer = $(".image-editor-canvas", makecodeFrame)[0];
    
            if (!featurePermissions.drawing && !tilemapSideBar && canvasContainer) {
                canvasContainer.style.pointerEvents = "none";
                canvasContainer.style.cursor = "not-allowed";
            } else if (canvasContainer) {
                canvasContainer.style.pointerEvents = "auto";
                canvasContainer.style.cursor = "default";
            }
        };
    
        const observer = new MutationObserver(observerCallback);
        const fieldEditor = $("#blocks-editor-field-div", makecodeFrame)[0];
        if (fieldEditor) {
            observer.observe(fieldEditor, { subtree: true, childList: true });
        }

        observerCallback(); // 🔥 Immediately apply
    }

    function applySandboxPermissions() {
        const disableElement = (el) => {
            el.style.pointerEvents = "none";
            el.style.opacity = "0.5";
            el.style.cursor = "not-allowed";
        };

        const enableElement = (el) => {
            el.style.pointerEvents = "auto";
            el.style.opacity = "1";
            el.style.cursor = "pointer";
        };

        const sandboxLink = document.querySelector('a[href="/sandbox"]');
        const playtestLink = document.querySelector('a[href="/playtest"]');
        const communityLink = document.querySelector('a[href="/community"]');
        const myStuffLink = document.querySelector('a[href="/mystuff"]');

        if (!featurePermissions.sandbox) {
            if (sandboxLink) disableElement(sandboxLink);
            if (playtestLink) disableElement(playtestLink);
            if (communityLink) disableElement(communityLink);
            if (myStuffLink) disableElement(myStuffLink);
        } else {
            if (sandboxLink) enableElement(sandboxLink);
            if (playtestLink) enableElement(playtestLink);
            if (communityLink) enableElement(communityLink);
            if (myStuffLink) enableElement(myStuffLink);
        }
    }

    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'e') {
            e.preventDefault();
            e.stopPropagation();
            toggleDashboard();
        }
    });

    ipcRenderer.on("open-makecode-editor", () => {
        setupDrawingObserver();
        applySandboxPermissions();
    });

    applySandboxPermissions();
}

module.exports = featurePermissions;
