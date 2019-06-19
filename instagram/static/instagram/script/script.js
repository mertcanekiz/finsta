// $('.like-btn').click(function(event) {
//     post_id = event.target.dataset.post_id;
//     $.post('/like', {post_id: post_id}, function(result) {
//         alert(result);
//     });
// });

$(document).ready(function() {
    let csrftoken = $.cookie('csrftoken');
    function csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }
    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });

    function likePost(id, callback) {
        $.ajax({
            type: 'POST',
            url: '/like',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({
                id: id,
            }),
            success: callback
        });
    }

    $('.like-btn').click(function() {
        let btn = $(this);
        let id = btn.data('id');
        $.ajax({
            type: 'POST',
            url: '/like',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({
                id: id,
            }),
            success: function(result) {
                if (result.likeCount > 0) {
                    if (result.liked) {
                        btn.html('<i class="fas fa-heart"></i> ' + result.likeCount);
                    } else {
                        btn.html('<i class="far fa-heart"></i> ' + result.likeCount);
                    }
                } else {
                    btn.html('<i class="far fa-heart"></i>');
                }
            }
        });
        // likePost(id);
    });

    $('.card-img-top').click(function(e) {
        e.preventDefault();
    })

    $('.card-img-top').dblclick(function() {
        let id = $(this).data('id');
        let btn = $('#like-btn-' + id);
        console.log('#like-btn-' + id);
        $.ajax({
            type: 'POST',
            url: '/like',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({
                id: id,
            }),
            success: function(result) {
                if (result.likeCount > 0) {
                    if (result.liked) {
                        btn.html('<i class="fas fa-heart"></i> ' + result.likeCount);
                    } else {
                        btn.html('<i class="far fa-heart"></i> ' + result.likeCount);
                    }
                } else {
                    btn.html('<i class="far fa-heart"></i>');
                }
            }
        });
    })
});