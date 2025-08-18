// Image Protection JavaScript
// This file contains comprehensive protection against image downloading and saving

(function() {
    'use strict';
    
    // Disable right-click context menu
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });
    
    // Disable drag and drop for images
    document.addEventListener('dragstart', function(e) {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
            return false;
        }
    });
    
    // Disable keyboard shortcuts for saving and developer tools
    document.addEventListener('keydown', function(e) {
        // Disable Ctrl+S (Save)
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            return false;
        }
        // Disable Ctrl+A (Select All)
        if (e.ctrlKey && e.key === 'a') {
            e.preventDefault();
            return false;
        }
        // Disable F12 (Developer Tools)
        if (e.key === 'F12') {
            e.preventDefault();
            return false;
        }
        // Disable Ctrl+Shift+I (Developer Tools)
        if (e.ctrlKey && e.shiftKey && e.key === 'I') {
            e.preventDefault();
            return false;
        }
        // Disable Ctrl+Shift+J (Console)
        if (e.ctrlKey && e.shiftKey && e.key === 'J') {
            e.preventDefault();
            return false;
        }
        // Disable Ctrl+U (View Source)
        if (e.ctrlKey && e.key === 'u') {
            e.preventDefault();
            return false;
        }
        // Disable Ctrl+Shift+C (Element Inspector)
        if (e.ctrlKey && e.shiftKey && e.key === 'C') {
            e.preventDefault();
            return false;
        }
    });
    
    // Disable text selection globally (optional - uncomment if needed)
    // document.onselectstart = function() {
    //     return false;
    // };
    
    // Protection function for images
    function protectImages() {
        const images = document.querySelectorAll('img');
        images.forEach(function(img) {
            // Disable mouse events on images
            img.addEventListener('mousedown', function(e) {
                e.preventDefault();
            });
            
            img.addEventListener('dragstart', function(e) {
                e.preventDefault();
            });
            
            // Disable right-click specifically on images
            img.addEventListener('contextmenu', function(e) {
                e.preventDefault();
                return false;
            });
            
            // Disable touch events on mobile
            img.addEventListener('touchstart', function(e) {
                e.preventDefault();
            });
            
            // Additional protection attributes
            img.setAttribute('draggable', 'false');
            img.setAttribute('ondragstart', 'return false;');
        });
    }
    
    // Run protection when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', protectImages);
    } else {
        protectImages();
    }
    
    // Re-run protection when new images are added dynamically
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1) { // Element node
                        if (node.tagName === 'IMG') {
                            protectImages();
                        } else if (node.querySelectorAll) {
                            const newImages = node.querySelectorAll('img');
                            if (newImages.length > 0) {
                                protectImages();
                            }
                        }
                    }
                });
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    // Disable print screen (limited effectiveness)
    document.addEventListener('keyup', function(e) {
        if (e.key === 'PrintScreen') {
            alert('Screenshots are not allowed on this website.');
        }
    });
    
    // Disable developer tools detection (basic)
    let devtools = false;
    setInterval(function() {
        if (devtools) {
            document.body.innerHTML = '<h1>Developer tools detected. Please close them to continue.</h1>';
        }
    }, 500);
    
    // Basic devtools detection
    const threshold = 160;
    let devtoolsOpen = false;
    
    setInterval(function() {
        if (window.outerHeight - window.innerHeight > threshold || 
            window.outerWidth - window.innerWidth > threshold) {
            if (!devtoolsOpen) {
                devtoolsOpen = true;
                console.clear();
                console.log('Developer tools usage is discouraged on this website.');
            }
        } else {
            devtoolsOpen = false;
        }
    }, 1000);
    
})();
