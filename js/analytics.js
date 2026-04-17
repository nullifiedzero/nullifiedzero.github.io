// Analytics Tracking Script - Merged Console Logging & Professor's GA4 Tracking Logic
(function() {
    // 1. Initialize GA4 DataLayer and Scripts dynamically
    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = "https://www.googletagmanager.com/gtag/js?id=G-MWKK6GQXQL"; 
    document.head.appendChild(gaScript);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
        dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', 'G-MWKK6GQXQL'); // Connects standard Pageview configuration

    // Backup console logs navigation 
    console.log("[Analytics] Path loaded: " + window.location.pathname);

    // 2. Track Navigation explicitly for link clicks
    document.addEventListener("click", function (event) {
        let target = event.target.closest("a");
        if (target) {
            gtag("event", "link_click", {
                event_category: "navigation",
                event_label: target.href
            });
        }
    });

    // 3. Track Form Actions & Button Clicks
    document.addEventListener('click', function (event) {
        // Track generic buttons or submit inputs
        if (event.target.tagName === 'BUTTON' || (event.target.tagName === 'INPUT' && (event.target.type === 'submit' || event.target.type === 'button'))) {
            const actionLabel = event.target.innerText || event.target.value || "Icon/Unnamed Button";
            console.log("[Analytics] Form Action / Button Triggered: " + actionLabel);
            
            gtag("event", "button_click", {
                event_category: "engagement",
                event_label: actionLabel
            });
        }
    });

    // Capture form submissions directly
    document.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent page reload for demo contexts
        
        const formObj = event.target;
        console.log("[Analytics] Form Submitted on: " + window.location.pathname);
        
        gtag("event", "form_submit", {
            event_category: "engagement",
            event_label: "form_submission_" + window.location.pathname
        });
    });

    // 4. Track Time Spent
    const startTime = Date.now();
    window.addEventListener('beforeunload', function () {
        const timeSpent = Math.round((Date.now() - startTime) / 1000);
        console.log("[Analytics] Time spent on " + window.location.pathname + ": " + timeSpent + " seconds");
        
        gtag("event", "time_on_page", {
            event_category: "engagement",
            value: timeSpent
        });
    });

    // 5. Scroll Depth Tracking
    let scrollTracked = { 25: false, 50: false, 75: false, 100: false };
    window.addEventListener("scroll", function () {
        let scrollPercent = Math.round(
            (window.scrollY + window.innerHeight) / document.body.scrollHeight * 100
        );

        [25, 50, 75, 100].forEach(percent => {
            if (scrollPercent >= percent && !scrollTracked[percent]) {
                scrollTracked[percent] = true;
                gtag("event", "scroll_depth", {
                    event_category: "engagement",
                    event_label: percent + "%"
                });
            }
        });
    });

    // Video Tracking
    const videoElements = document.querySelectorAll("video");
    videoElements.forEach(video => {
        video.addEventListener("play", () => {
            console.log("[Analytics] Video Played/Resumed");
            gtag("event", "video_play", { event_category: "media" });
        });
        video.addEventListener("pause", () => {
            console.log("[Analytics] Video Paused");
            gtag("event", "video_pause", { event_category: "media" });
        });
        video.addEventListener("ended", () => {
            console.log("[Analytics] Video Completed");
            gtag("event", "video_complete", { event_category: "media" });
        });
    });

    // 6. Page Visibility Tracking
    document.addEventListener("visibilitychange", function () {
        if (document.hidden) {
            gtag("event", "tab_hidden", { event_category: "engagement" });
        } else {
            gtag("event", "tab_visible", { event_category: "engagement" });
        }
    });

    // 7. Error Tracking via JavaScript
    window.addEventListener("error", function (event) {
        gtag("event", "javascript_error", {
            event_category: "error",
            event_label: event.message
        });
    });

})();
