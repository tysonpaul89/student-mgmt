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
    private $rootPath = __DIR__ . DIRECTORY_SEPARATOR;
    /**
     * Get a student data
     */
    public function getStudentData()
    {

    }

    /**
     * Gets all student data
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
     * Writes student data into JSON file
     */
    private function setStudentJson()
    {

    }

    /**
     * Gets student json full file path
     * @return string
     */
    private function getStudentJsonPath() {
        return $studentJsonPath = $this->rootPath . 'data' .
            DIRECTORY_SEPARATOR . 'student.json';
    }

    /**
     * Open given file and returns the content
     * @param $fileName File name to open
     * @return Array
     */
    private function getJsonFileContents($fileName, $converToJson = true) {
        // Opening file in read and write mode
        $file = fopen($fileName, 'a+');
        // read file contents and set it into a $data
        $data = fread($file, filesize($fileName));
        // Closes the file
        fclose($file);

        // Returns the file content
        if ($converToJson) {
            return json_decode($data, true);
        } else {
            return $data;
        }

    }
}