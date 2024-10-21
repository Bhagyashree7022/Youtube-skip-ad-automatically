// script.js

// Debounce variables to prevent rapid consecutive executions
let skipAdTimeout;
let hideOverlayAdsTimeout;

// Function to skip skippable video ads
function skipAd() {
    try {
        const skipButtons = document.getElementsByClassName("ytp-ad-skip-button");
        if (skipButtons.length > 0) {
            console.log("Ad detected. Attempting to skip.");
            skipButtons[0].click();
            console.log("Ad skipped successfully.");
        } else {
            console.log("No skippable ad detected.");
        }
    } catch (error) {
        console.error("Error skipping ad:", error);
    }
}

// Function to hide overlay ads
function hideOverlayAds() {
    try {
        const overlayAds = document.getElementsByClassName("ytp-ad-overlay-container");
        if (overlayAds.length > 0) {
            overlayAds[0].style.display = 'none';
            console.log("Overlay ad hidden.");
        } else {
            console.log("No overlay ad detected.");
        }
    } catch (error) {
        console.error("Error hiding overlay ad:", error);
    }
}

// Debounced function wrappers to limit execution frequency
function debouncedSkipAd() {
    if (skipAdTimeout) clearTimeout(skipAdTimeout);
    skipAdTimeout = setTimeout(skipAd, 500); // 500ms debounce
}

function debouncedHideOverlayAds() {
    if (hideOverlayAdsTimeout) clearTimeout(hideOverlayAdsTimeout);
    hideOverlayAdsTimeout = setTimeout(hideOverlayAds, 500); // 500ms debounce
}

// Initial checks in case an ad is already playing
skipAd();
hideOverlayAds();

// Create a MutationObserver to monitor DOM changes in real-time
const observer = new MutationObserver((mutations) => {
    for (let mutation of mutations) {
        if (mutation.type === 'childList' || mutation.type === 'attributes') {
            debouncedSkipAd();
            debouncedHideOverlayAds();
        }
    }
});

// Configuration for the observer: watch for added/removed child nodes and attribute changes
const config = {
    childList: true,
    subtree: true,
    attributes: false
};

// Start observing the document body for changes
observer.observe(document.body, config);