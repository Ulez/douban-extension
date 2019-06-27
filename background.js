chrome.webNavigation.onCommitted.addListener(onCommitted, {
    url: [
        {hostEquals: 'www.example.org'},
        {urlPrefix: 'https://example.org/'},
        {urlMatches: '^https://(www\\.)?example.org/.*$'},
    ],
});

function onCommitted(info) {
    console.info("onCommitted");
    // const xhr = new XMLHttpRequest();
    // xhr.onload = () => {
    //     console.log('%d:%d', info.tabId, info.frameId, info.url, xhr.responseText);
    // };
    // xhr.open('POST', 'http://localhost:5000/');
    // xhr.send(info.url);
}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == "loading") {
        var url = 'https://book.douban.com';
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                console.info("xhr.response");
                console.info(xhr.response);
            }
        }
        xhr.open('GET', url, true);
        xhr.send('');

        // var request = new XMLHttpRequest();
        //
        // request.open("POST", "https://www.baidu.com/", true);
        // request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        // request.send(JSON.stringify({denny: 1, mark: 1, johnny: 0}));
        // var xhr = new XMLHttpRequest();
        // xhr.timeout = 3000;
        // xhr.ontimeout = function (event) {
        //     alert("请求超时！");
        // }
        // xhr.open('POST', 'https://www.baidu.com/');
        // xhr.onreadystatechange = function () {
        //     if (xhr.readyState == 4 && xhr.status == 200) {
        //         alert(xhr.responseText);
        //     }
        //     else {
        //         alert(xhr.statusText);
        //     }
        // }
    }
});