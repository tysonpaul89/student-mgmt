<?php
/**
 * Backend for Student Management System
 */

if (!empty($_GET['func'])) {
    // Creating class object
    $studentObj = new StudentManagement();

    // Check if class method exists and its callable
    if (method_exists($studentObj, $_GET['func']) &&
        is_callable(array($studentObj, $_GET['func']))
    ) {
        // Calling class function
        call_user_func(array($studentObj, $_GET['func']));
    } else { // Sending error message if given function name is not callable
        echo json_encode([
            'error' => true,
            'message' => 'Method not found',
            'data' => null
        ]);
    }
}

class StudentManagement {
    // Sets web root path
    private $rootPath = __DIR__ . DIRECTORY_SEPARATOR;

    /**
     * Get a student data
     * @return string
     */
    public function getStudentData()
    {

    }

    /**
     * Gets all student data
     * @return string
     */
    public function getAllStudentData()
    {
        // Gets all student data from json file
        $studentData = $this->getJsonFileContents(
            $this->getStudentJsonPath(), // Filename with full path
            false // flag to return data as JSON string
        );
        echo $studentData;
    }

    /**
     * Gets country data
     * @return string
     */
    public function getCountryData()
    {
        // Gets all location data
        $locationData = $this->getAllLocationData();
        echo json_encode($locationData['country']);
    }

    /**
     * Gets state data of given country
     * @return string
     */
    public function getStateData()
    {
        // Error response json
        $errorResponse = json_encode([
            'error' => true,
            'message' => 'Requested state data not found',
            'data' => null
        ]);

        if (!empty($_GET['country'])) {
            $countryKey = strtoupper(trim($_GET['country']));
            // Gets all location data
            $locationData = $this->getAllLocationData();
            if (!empty($locationData['state'][$countryKey])) {
                echo json_encode($locationData['state'][$countryKey]);
            } else { // Sends error response if country not found
                echo $errorResponse;
            }
        } else {
            // Sends error response if country data is not
            // passed in query sting
            echo $errorResponse;
        }
    }

    /**
     * Gets district data of given state
     * @return string
     */
    public function getDistrictData()
    {
        $errorResponse = json_encode([
            'error' => true,
            'message' => 'Requested district data not found',
            'data' => null
        ]);

        // Checks if state data is passed in the query string
        if (!empty($_GET['state'])) {
            $stateKey = strtoupper(trim($_GET['state']));
            // Gets all location data
            $locationData = $this->getAllLocationData();
            if (!empty($locationData['district'][$stateKey])) {
                echo json_encode($locationData['district'][$stateKey]);
            } else { // Sends error response if state not found
                echo $errorResponse;
            }
        } else {
            // Sends error response if state data is not
            // passed in query sting
            echo $errorResponse;
        }
    }


    /**
     * Writes student data into JSON file
     */
    private function setStudentJson()
    {

    }

    /**
     * Gets all location data from json file
     */
    private function getAllLocationData() {
         // Gets all location data from json file
         return $this->getJsonFileContents(
            $this->getLocationJsonPath() // Filename with full path
        );
    }

    /**
     * Gets student json full file path
     * @return string
     */
    private function getStudentJsonPath()
    {
        return $this->rootPath . 'data' .
            DIRECTORY_SEPARATOR . 'student.json';
    }

    /**
     * Gets location json full file path
     * @return string
     */
    private function getLocationJsonPath()
    {
        return $this->rootPath . 'data' .
            DIRECTORY_SEPARATOR . 'location.json';
    }

    /**
     * Open given file and returns the content
     * @param $fileName File name to open
     * @return Array
     */
    private function getJsonFileContents($fileName, $convertToJson = true) {
        // Opening file in read and write mode
        $file = fopen($fileName, 'a+');
        // read file contents and set it into a $data
        $data = fread($file, filesize($fileName));
        // Closes the file
        fclose($file);

        // Returns the file content
        if ($convertToJson) {
            return json_decode($data, true);
        } else {
            return $data;
        }

    }
}