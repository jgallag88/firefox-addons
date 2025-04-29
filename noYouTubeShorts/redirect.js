// YouTube Shorts can be viewed as normal videos, instead of in the inferior
// Shorts player. To get the normal video player, rewrite the url from
//
//     https://www.youtube.com/shorts/<video_id>
//
// to 
//
//     https://www.youtube.com/watch?v=<video_id>
//
function redirectShortsToWatch(details) {
  const url = new URL(details.url);
  const shortsMatch = url.pathname.match(/^\/shorts\/([a-zA-Z0-9_-]+)/);

  if (!shortsMatch) {
    return {};
  }

  const videoId = shortsMatch[1];
  return { redirectUrl: `https://www.youtube.com/watch?v=${videoId}` };
}

browser.webRequest.onBeforeRequest.addListener(
    redirectShortsToWatch,
    {urls:["*://www.youtube.com/*"], types:["main_frame"]},
    ["blocking"]
);
