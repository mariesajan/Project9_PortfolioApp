var data = '';

$(document).ready(function() {
    if (window.location.search) {
        // For Edit Portfolio
        var dataId = window.location.search;
        var subDataId = dataId.split('=');
        $('.head h2').html('Edit Portfolio');
        $('#btnSubmit').hide();
        $('#btnUpdate').show();
        $('#btnUpdate').attr('data-id', subDataId[1]);

        $.ajax({
            url: '/api/projects/edit/' + subDataId[1],
            type: 'GET',
            success: function fn_populate_edit(data) {
                $('#title').val(data.title);
                $('#description').val(data.description);
                $('#service').val(data.service);
                $('#client').val(data.client);
                var formattedDate = $.format.date(data.date,
                    'yyyy-MM-dd');
                $('#date').val(formattedDate);
            }
        });
    } else {
        // For Add Portfolio
        $('#btnUpdate').hide();
        $('#btnSubmit').show();
    }

    //Below code not necessary for Add Portfolio and Dashboard tabs since we are making active in html itself.
    $('a').click(function(event) {
        //event.preventDefault();
        $('.active').removeClass('active');
        $(this).parent().addClass('active');
    });

    $("#btnUpdate").on("click", function() {
        // Database Updation for Edit
        var updateId = $(this).data('id');
        var dataValue = validateFields();
        if (data != false) {
            // if no validation error,then entered values will be there in the datavariable
            $.ajax({
                url: '/admin/update_portfolio/' +
                    updateId,
                type: 'POST',
                data: dataValue,
                success: fn_success_update()
            });
        }
    });

    $("#btnSubmit").on("click", function() {
        // Database Updation for Add
        var dataValue = validateFields();
        if (data != false) {
            // if no validation error,then entered values will be there in the datavariable
            $.ajax({
                type: 'POST',
                url: '/admin/add_portfolio',
                data: dataValue,
                success: fn_handle_error()
            });
        }
    });
});

//Function for validating each fields. Checking if empty
function validateFields() {
    $('.error').remove();
    var title = $("#title").val();
    var description = $("#description").val();
    var service = $("#service").val();
    var client = $("#client").val();
    var date = $("#date").val();
    var portfolio_image = $('#portfolio_image').val();
    if (portfolio_image == '') {
        portfolio_image = 'noImage.png';
    } else {
        console.log('the portfolio_image is... ',portfolio_image);
        portfolio_image = portfolio_image.split('\\').pop();
    }
    if (title == '') {
        $('#title').after(
            '<span class="error">Please enter the title</span>'
        );
    } else if (description == '') {
        $('#description').after(
            '<span class="error">Please enter the description</span>'
        );
    } else if (service == '') {
        $('#service').after(
            '<span class="error">Please enter the service</span>'
        );
    } else if (client == '') {
        $('#client').after(
            '<span class="error">Please enter the client</span>'
        );
    } else if (date == '') {
        $('#date').after(
            '<span class="error">Please select the date</span>'
        );
    } else {
        data = {
                title: title,
                description: description,
                service: service,
                client: client,
                image: portfolio_image,
                date: date
            }
            // returning the user entered data after checking all the validations.
        return data;
    }
    // if there is validation error, then returns false.
    return false;
}

function fn_success_update() {
    window.location = '/admin?result=updated';
}

function fn_handle_error() {
    //window.location.href = '/views/admin.html?result=success';
    window.location.href = '/admin?result=success';
}
