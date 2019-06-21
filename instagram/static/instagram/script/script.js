// $.cookie()
function getCookie(item) {
    let name = item + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// $(document).ready()
function ready(fn) {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

let csrftoken;

function requestJSON(url, data, success)
{
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            success(xhr.response);
        }
    }
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('X-CSRFToken', csrftoken);
    xhr.send(JSON.stringify(data));
}

// $(document).ready()
ready(function() {
    csrftoken = getCookie('csrftoken');
    let likeButtons = document.getElementsByClassName('like-btn');
    Array.prototype.forEach.call(likeButtons, function(btn) {
        btn.onclick = function() {
            let id = btn.getAttribute('data-id');
            let likeCount = document.getElementById('like-count-' + id);
            requestJSON('/like', {id: id}, function() {
                result = JSON.parse(xhr.response);
                if (result.liked) {
                    btn.innerHTML = '<i class="fas text-danger fa-heart"></i>';
                } else {
                    btn.innerHTML = '<i class="fa-thin far text-dark fa-heart"></i>';
                }
                likeCount.innerHTML = result.likeCount + ' likes';
            });
        }
    });

    let images = document.getElementsByClassName("card-img-top");
    Array.prototype.forEach.call(images, function(img) {
        img.onclick = function(event) {
            event.preventDefault();
        }

        img.ondblclick = function(event) {
            let id = img.getAttribute("data-id");
            let btn = document.getElementById("like-btn-" + id);
            let likeCount = document.getElementById('like-count-' + id);
            requestJSON('/like', {id: id}, function(response) {
                result = JSON.parse(response);
                if (result.liked) {
                    btn.innerHTML = '<i class="fas text-danger fa-heart"></i>';
                } else {
                    btn.innerHTML = '<i class="fa-thin far text-dark fa-heart"></i>';
                }
                likeCount.innerHTML = result.likeCount + ' likes';
            });
        }
    });
});