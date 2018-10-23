/**
 * Common function to make ajax calls
 * @param {string} url URL to make AJAX call
 * @param {object} data Data to pass with ajax
 * @param {string} method HTTP Method to use
 * @returns {object} response data
 */
function callAjax(url, data, method, callback) {
    // Setting default value to the method variable
    if (typeof(method) === 'undefined') {
        method = 'GET';
    } else {
        method = method.toUpperCase();
    }
    // Creating XHR object
    var xhttp = new XMLHttpRequest();

    // Defining readyState callback function
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Returns callback function with response data
            return callback(false, this.responseText)
        } else if (this.readyState == 4 && this.status != 200) {
            // Returns callback function with error status as true
            return callback(true, null)
        }
    };

    // Convert object in a query string styled string
    var payload = formatPayload(data)

    // Append data in url if GET request
    if (method === 'GET') {
        url += '&' + payload
    }

    // Makes AJAX call
    xhttp.open(method, url);

    // send data in body if POST request
    if (method === 'POST') {
        xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhttp.send(payload);
    } else {
        xhttp.send()
    }
}

/**
 * Convert object into a query string
 * @param {object} obj AJAX data
 * @returns {string}
 */
function formatPayload(obj) {
    var str = [];
    // Looping object
    for (var p in obj){
        // Checking if property exits in the object
        if (obj.hasOwnProperty(p)) {
            // converting into key=value format sting and push it into an array
            str.push(p + "=" + obj[p]);
        }
    }
    // Converts array into string with & as separator
    return str.join("&");
}