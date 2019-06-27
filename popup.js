chrome.runtime.onMessage.addListener(function (request, sender) {
    console.info("chrome.runtime.onMessage.addListener");
    var orgin_name = request.source;
    if (request.action == "getSource") {
        //这里设置了弹窗内容。
        message.innerText = request.source
        //请求豆瓣api
        var urlBook = "https://douban.uieee.com/v2/book/search?q=" + request.source;
        var xhr = new XMLHttpRequest();
        xhr.timeout = 5000;
        xhr.ontimeout = function (event) {
            alert("请求超时！");
        }
        xhr.open('GET', urlBook);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var bookList = JSON.parse(xhr.responseText);
                var bookInfo = bookList.books[0];
                var title = bookInfo.title;
                var rating = bookInfo.rating;
                var average = rating.average;
                var numRaters = rating.numRaters;
                if (average == "0.0") {
                    average = "评价人数不足";
                }
                var result = title + "\n评分:" + average + "|" + numRaters + "人评价";
                message.innerText = result;
                todouban.href = "https://book.douban.com/subject_search?search_text=" + orgin_name;
            } else {
                console.info(xhr.statusText);
            }
        }
        xhr.send(null)
    }
});

function onWindowLoad() {
    var message = document.querySelector('#message');
    chrome.tabs.executeScript(null, {
        file: "getPagesSource.js"
    }, function () {
        // If you try and inject into an extensions page or the webstore/NTP you'll get an error
        if (chrome.runtime.lastError) {
            message.innerText = '不支持此页面';
        }
    });
}

window.onload = onWindowLoad;