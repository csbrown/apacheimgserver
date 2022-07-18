var imgparser = new DOMParser();

function parse_img_list_page(page) {
    var img_urls = [];
    var rows = page.querySelectorAll("tr");
    for (let i = 3; i < rows.length - 1; i++) {
        var cell = rows[i].querySelectorAll("td")[1];
        var href = cell.querySelector("a").innerHTML;
        img_urls.push(href);
    }
    return img_urls;
}

function get_imgs(url, img_callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var page = imgparser.parseFromString(xhr.responseText, "text/html");
            var img_urls = parse_img_list_page(page).map(x => url + "images/" + x);
            img_callback(img_urls);
        }
    }
    xhr.open('GET', url);
    xhr.send();
}
