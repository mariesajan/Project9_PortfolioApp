$(document).ready(function() {
    var searchParam = window.location.search;
    if (searchParam) {
        var subSearchParam = searchParam.split('=');
        var searchValue = subSearchParam[1];
        $('#info_msg').addClass('alert alert-info');
        if (searchValue == 'success') {
            $('#info_msg').append('<p> Data Submitted <p>');
        } else if (searchValue == 'updated') {
            $('#info_msg').append('<p> Data Updated <p>');
        } else if (searchValue == 'deleted') {
            $('#info_msg').append('<p> Data Deleted <p>');
        } else if (searchValue == 'loggedin') {
            $('#info_msg').append(
                '<p> You are successfully logged in <p>');
        }
    }
    $('a').click(function(event) {
        //event.preventDefault(); //this line is preventing the route
        $('.active').removeClass('active');
        $(this).parent().addClass('active');
    });
    $.get('/api/projects', function(data) {
        var html = '';
        if (data.length != 0) {
            html +=
                '<table class="table table-bordered table-striped"> \
                  <tr> \
                         <th> ID   </th> \
                         <th>   Project Name </th> \
                         <th>    Service</th> \
                         <th>    </th> \
                         <th>    </th> \
                  </tr>';
            for (var i = 0; i < data.length; i++) {
                html += formatTable(data[i]);

            }
            html += '</table>';
            $('.table-container').html(html);
        } else {
            $('.table-container').html(
                "<p> There is no data to be shown </p>"
            );
        }
    });

    $('.table-container').on('click', '#edit', function() {
        var editId = $(this).data('id');
        window.location = '/admin/add_portfolio?id=' + editId;
    });

    $('.table-container').on('click', '#delete', function() {
        var deleteId = $(this).data('id');
        $.ajax({
            type: 'DELETE',
            url: '/admin/delete_portfolio/' + deleteId,
            success: function deleteSuccess() {
                window.location =
                    '/admin?result=deleted';
            }
        });
    });
});

function formatTable(data) {
    return '<tr> \
           <td>' + data.id +
        '</td> \
           <td>' +
        data.title +
        '</td> \
           <td>' + data.service +
        ' </td> \
           <td>   <button id="edit" data-id="' + data.id +
        '" class="btn-primary"> Edit </button>  </td> \
           <td>  <button id="delete" data-id="' +
        data.id + '"class="btn-danger"> Delete </button>  </td> \
    </tr>';
}
