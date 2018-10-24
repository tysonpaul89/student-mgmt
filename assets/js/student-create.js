// To execute the content after page load,
// equivalent to $(document).ready() in jquery
document.addEventListener("DOMContentLoaded", function(event) {
    // Setting AJAX parameters
    var url = 'backend.php?func=getCountryData';
    var data = null;
    var method = 'GET'

    // Gets country data using AJAX
    callAjax(url, data, 'GET', processGetCountryResponse);
});

/**
 * To populate state options when user select a country
 * @param {object} thisObj Country DOM
 */
function onCountryChange(thisObj) {
    country = thisObj.value.trim();
    // Resetting District on country change
    document.getElementById('district').innerHTML
        = '<option value="">Select District</option>'

    // Setting AJAX parameters
    var url = 'backend.php?func=getStateData';
    var data = {country: country};
    var method = 'GET'

    // Gets state data using AJAX
    callAjax(url, data, 'GET', processGetStateResponse);
}

/**
 * To populate district options when user select a state
 * @param {object} thisObj Country DOM
 */
function onStateChange(thisObj) {
    state = thisObj.value.trim();
    // Setting AJAX parameters
    var url = 'backend.php?func=getDistrictData';
    var data = {state: state};
    var method = 'GET'

    // Gets district data using AJAX
    callAjax(url, data, 'GET', processGetDistrictResponse);
}

/**
 * Ajax callback function to load country options
 * @param {boolean} error Error status
 * @param {string} response Ajax Response data
 * @returns none
 */
var processGetCountryResponse = function (error, response) {
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
            var countryOptionHtml = '<option value="">Select Country</option>';
            for(var i=0; i < response.length; i++) {
                countryOptionHtml +=
                    '<option value="' + response[i].key + '">'+
                    response[i].value + '</option>'

            }

            // Adding student list html code into DOM
            document.getElementById('country').innerHTML
                = countryOptionHtml;
        }
    } catch (error) { // alert message to user
        console.error(err)
        alert(errorMessage);
    }
}

/**
 * Ajax callback function to load state options
 * @param {boolean} error Error status
 * @param {string} response Ajax Response data
 * @returns none
 */
var processGetStateResponse = function (error, response) {
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
            var stateOptionHtml = '<option value="">Select State</option>';
            for(var i=0; i < response.length; i++) {
                stateOptionHtml +=
                    '<option value="' + response[i].key + '">'+
                    response[i].value + '</option>'

            }

            // Adding state options html code into DOM
            document.getElementById('state').innerHTML = stateOptionHtml;
        }
    } catch (error) { // alert message to user
        console.error(err)
        alert(errorMessage);
    }
}

/**
 * Ajax callback function to load district options
 * @param {boolean} error Error status
 * @param {string} response Ajax Response data
 * @returns none
 */
var processGetDistrictResponse = function (error, response) {
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
            var districtOptionHtml = '<option value="">Select District</option>';
            for(var i=0; i < response.length; i++) {
                districtOptionHtml +=
                    '<option value="' + response[i].key + '">'+
                    response[i].value + '</option>'

            }

            // Adding district options html code into DOM
            document.getElementById('district').innerHTML = districtOptionHtml;
        }
    } catch (error) { // alert message to user
        console.error(err)
        alert(errorMessage);
    }
}