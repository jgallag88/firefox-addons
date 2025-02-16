var pattern = "*://www.reddit.com/*";

function isShareUrl(url) {
    // 'Share' URLs have the form https://www.reddit.com/r/<subreddit>/s/<id>
    return /^\/r\/[^\/]+\/s\//.test(url.pathname);
}

function redirect(requestDetails) {
    /*
     * old.reddit.com doesn't support share URLs, so need to let the redirect happen
     * before rewritting the URL.
     */
    if (isShareUrl(new URL(requestDetails.url))) {
        return {};
    }

    return {
        redirectUrl: requestDetails.url.replace("://www.reddit.com", "://old.reddit.com")
    };
}

browser.webRequest.onBeforeRequest.addListener(
    redirect,
    {urls:[pattern], types:["main_frame"]},
    ["blocking"]
);

/*
 * If you try to view an image hosted on i.redd.it or preview.redd.it, the reponse will try to redirect to some
 * page with the image embedded if request header specifies that it accepts HTML. This breaks if the above
 * redirection logic is present. Simplest to just not accept HTML, in which case the reponse will contain the
 * image without any redirections.
 */
function modifyReddItHeaders(requestDetails) {
    for (let header of requestDetails.requestHeaders) {
        if (header.name.toLowerCase() === "accept") {
            header.value = "*/*";
	}
    }
    return { requestHeaders: requestDetails.requestHeaders };
}

browser.webRequest.onBeforeSendHeaders.addListener(
    modifyReddItHeaders,
    {urls:["*://i.redd.it/*", "*://preview.redd.it/*"], types:["main_frame"]},
    ["blocking", "requestHeaders"]
);
