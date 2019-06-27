// @author Rob W <http://stackoverflow.com/users/938089/rob-w>
// Demo: var serialized_html = DOMtoString(document);

function DOMtoString(document_root) {
    //每次点击图标显示；
    var name = getElementByClassName("sku-name", document_root);
    var book = name[0].firstChild.textContent;
    book = book.replace(/^\s+|\s+$/g, "");
    //获取到书名；
    console.info("book=" + book);




    return book;
}

function getElementByClassName(classnames, document) {
    var objArray = new Array();//定义返回对象数组
    var tags = document.getElementsByTagName("*");//获取页面所有元素
    var index = 0;
    for (var i in tags) {
        if (tags[i].nodeType == 1) {
            if (tags[i].getAttribute("class") == classnames) { //如果某元素的class值为所需要
                objArray[index] = tags[i];
                index++;
            }
        }
    }
    return objArray;
}

function getBookNameFromHtml(str) {
    var reg = new RegExp("<div class=\"sku-name\">([\\s\\S]*)</div>"); //正则表达式
    var bb = str.match(reg)[1];
    //去掉两头空格
    bb = bb.replace(/^\s+|\s+$/g, "");
    alert(bb);
    console.log(bb);
    return bb;
}

chrome.runtime.sendMessage({
    action: "getSource",
    source: DOMtoString(document)
});