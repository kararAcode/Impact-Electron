function createDashboardUI(featurePermissions, onToggleChange) {
    const dashboard = document.createElement('div');
    dashboard.id = 'drawing-permissions-dashboard';
    dashboard.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        z-index: 9999;
        font-family: Arial, sans-serif;
        min-width: 300px;
        display: none; /* Initially hidden */
    `;

    dashboard.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
            <h2 style="margin: 0; color: #333;">Feature Controls</h2>
            <button id="close-dashboard" style="background: none; border: none; cursor: pointer; font-size: 20px; color: #666;">×</button>
        </div>
        <div id="features-container" style="margin-bottom: 15px;">
            ${createFeatureToggles(featurePermissions)}
        </div>
        <div style="margin-top: 10px; font-size: 12px; color: #666;">
            Press Ctrl/Cmd + Shift + E to toggle dashboard
        </div>
    `;

    // Add to the document first
    document.body.appendChild(dashboard);

    // Now add event listeners after the element is in the DOM
    const closeButton = dashboard.querySelector('#close-dashboard');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            dashboard.style.display = 'none';
        });
    }

    // Add toggle switch listeners
    Object.keys(featurePermissions).forEach(feature => {
        const toggle = dashboard.querySelector(`#toggle-${feature}`);
        if (toggle) {
            toggle.addEventListener('change', (e) => {
                onToggleChange(feature, e.target.checked);
            });
        }
    });

    return dashboard;
}

function createFeatureToggles(featurePermissions) {
    const features = [
        { 
            id: 'drawing', 
            label: 'Drawing Tools', 
            description: 'Enable/disable drawing capabilities in all activities' 
        },
        { 
            id: 'sandbox', 
            label: 'Sandbox Mode', 
            description: 'Enable/disable sandbox environment for safe code execution' 
        }
    ];

    return features.map(feature => `
        <div style="margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #eee;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                <label style="font-weight: bold; color: #333;">${feature.label}</label>
                <label class="switch">
                    <input type="checkbox" id="toggle-${feature.id}" ${featurePermissions[feature.id] ? 'checked' : ''}>
                    <span class="slider round"></span>
                </label>
            </div>
            <div style="font-size: 12px; color: #666;">${feature.description}</div>
        </div>
    `).join('') + `
        <style>
            .switch {
                position: relative;
                display: inline-block;
                width: 50px;
                height: 24px;
            }
            .switch input {
                opacity: 0;
                width: 0;
                height: 0;
            }
            .slider {
                position: absolute;
                cursor: pointer;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: #ccc;
                transition: .4s;
            }
            .slider:before {
                position: absolute;
                content: "";
                height: 16px;
                width: 16px;
                left: 4px;
                bottom: 4px;
                background-color: white;
                transition: .4s;
            }
            input:checked + .slider {
                background-color: #4CAF50;
            }
            input:checked + .slider:before {
                transform: translateX(26px);
            }
            .slider.round {
                border-radius: 24px;
            }
            .slider.round:before {
                border-radius: 50%;
            }
        </style>
    `;
}

module.exports = {
    createDashboardUI
}; 