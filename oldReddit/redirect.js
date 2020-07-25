var pattern = "*://www.reddit.com/*";

function redirect(requestDetails) {
    return {
        redirectUrl: requestDetails.url.replace("://www.reddit.com", "://old.reddit.com")
    };
}

browser.webRequest.onBeforeRequest.addListener(
    redirect,
    {urls:[pattern], types:["main_frame"]},
    ["blocking"]
);
