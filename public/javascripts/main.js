$(document).ready(function() {
    $.get('/api/projects', function(data) {
        if (data) {
            for (var i = 0; i < data.length; i++) {
                $("#portfolios").append(
                    format(data[i], data[i].id));
            }

        }
    });

    $('#btnLogin').on("click", function() {
        var username = $('#username').val();
        var password = $('#password').val();
        var searchString = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/;
        var searchFoundInUsername = searchString.test(username); // returns true if finds invalid characters in Username
        var searchFoundInPassword = searchString.test(password); //returns true if finds invalid characters in Username
        if (searchFoundInUsername == false &&
            searchFoundInPassword == false) {
            $.ajax({
                url: '/admin/login',
                type: 'POST',
                data: {
                    username: username,
                    password: password
                },
                success: function fn_login_success() {
                    window.location =
                        '/admin?result=loggedin';
                }
            });
        }
    });

    $("#portfolios").on("click", '.image-portfolio', function(event) {
        $("#portfolios").hide();
        var id = this.id;
        $.get('/api/portfolio_desc/' + id, function(data) {
            if (data) {
                $(".portfolio_details").append(
                    formatPortfolio(data[0]));
            }
        });
    });
    $(".portfolio_details").on("click", 'button', function(event) {
        $(".portfolio_details").empty();
        $("#portfolios").show();
    });
});



function formatPortfolio(data) {
    var newDate = $.format.date(data.date, "D MMM,yyyy");
    return '<h5>' + data.title + ' </h5> <br> <img src="/images/portfolio/' +
        data.image +
        '" alt=""> <p> Description:' + data.description +
        ' </p> <p> Service: <strong> ' + data.service +
        '</strong></p> <p>Client:<strong>' + data.client +
        '</strong> </p> <p>Date: <strong>' + newDate +
        '</strong> </p> <button class="btnClose" type="button"> Close </button>';
}


function format(data, id) {
    return '<div class="col-sm-4 portfolio-item"> \
            <a  class="portfolio-link" data-toggle="modal"> \
                <img id="' +
    id + '" src="/images/portfolio/' +
        data.image +
        '" class="img-responsive image-portfolio" alt=""> \
            </a></div>';
}
