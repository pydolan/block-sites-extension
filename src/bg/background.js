'use strict';

var settings = new Store("settings", {
  "blocked_sites": ""
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  var url = new URL(tab.url)
  var domain = url.hostname;
  var www_domain;
  if (domain.substr(0, 4) == "www.") {
    www_domain = domain;
    domain = domain.slice(4);
  }
  else {
    www_domain = "www." + domain;
  }
  var blocked_sites = settings.get('blocked_sites').split(/\s*,\s*/);

  // console.log("blocked_sites: " + blocked_sites);
  // console.log("domain: " + domain + ", www_domain: " + www_domain);
  if (blocked_sites.indexOf(domain) != -1 || blocked_sites.indexOf(www_domain) != -1) {
    chrome.tabs.update(
      tab.id,
      {url: chrome.extension.getURL('src/blocked.html?url=' + encodeURIComponent(url))}
    );
  }
});
