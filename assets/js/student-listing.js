// To execute the content after page load,
// equivalent to $(document).ready() in jquery
document.addEventListener("DOMContentLoaded", function(event) {
    // Setting AJAX parameters
    var url = 'backend.php?func=getAllStudentData';
    var data = null;
    var method = 'GET'

    // Gets all student data by using AJAX
    callAjax(url, data, 'GET', processGetAllStudentResponse);
});

/**
 * Ajax callback function to load student list
 * @param {boolean} error Error status
 * @param {string} response Ajax Response data
 * @returns none
 */
var processGetAllStudentResponse = function (error, response) {
    var errorMessage = 'Sorry! An error occurred during the process.'+
        ' Please try again later';

    // alerts error message to user
    if (error) {
        alert(errorMessage);
    }

    try {
        response = JSON.parse(response)

        if (response.error !== 'undefined' && response.error) {
            alert(errorMessage);
        } else {
            var studentListHtml = '';
            for(var i=0; i < response.length; i++) {
                studentListHtml +=
                '<tr>\
                    <td>' + response[i].name + '</td>\
                    <td>' + response[i].age + '</td>\
                    <td>' + response[i].email + '</td>\
                    <td class="action-td">\
                        <a class="btn btn-green"\
                            href="view.html?id=' + response[i].id + '">\
                            View\
                        </a>\
                        <a class="btn btn-blue"\
                            href="edit.html?id=' + response[i].id + '">\
                            Edit\
                        </a>\
                        <a class="btn btn-red delete-student"\
                            href="#"\
                            onclick="deleteStudent('+ response[i].id +')">\
                            Delete\
                        </a>\
                    </td>\
                </tr>'
            }

            // Adding student list html code into DOM
            document.getElementById('student-list-tbody').innerHTML
                = studentListHtml;
        }
    } catch (error) { // alert message to user
        console.error(err)
        alert(errorMessage);
    }
}

/**
 * Delete button click event function
 * @param {integer} studentId
 */
function deleteStudent(studentId) {
    deleteMessage = 'Are you sure about deleting this student?'+
        '(id=' + studentId + ')';
    if (confirm(deleteMessage)) {
        console.log('TODO: Delete student data and refresh page')
    }
}