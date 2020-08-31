<?php


#region Image Uploads
//handle ingredients image inputs
$target_dir = dirname(getcwd())."//Images//";
 
$RecipeName = $_POST["RecipeName"];
$IngredientsImage = $_FILES["IngredientsImage"];
//get file extension 
$Extension = explode(".",$IngredientsImage["name"])[1];
//combine file name and base directory into the target path
$FileName = $RecipeName."IngredientsImage.".$Extension;
echo $FileName;
$IngredientsTargetPath = $target_dir . basename($FileName);

//handle method image inputs
$MethodImage = $_FILES["MethodImage"];
//get file extension 
$Extension = explode(".",$MethodImage["name"])[1];
//combine file name and base directory into the target path
$FileName = $RecipeName."MethodImage.".$Extension;
$MethodTargetPath = $target_dir . basename($FileName);

//check file type and size of images, return true if checks pass
$PassedChecks = false;
if(CheckFile($IngredientsImage,$IngredientsTargetPath) && CheckFile($MethodImage,$MethodTargetPath)) {$PassedChecks = true;}


//if checks passed, move from temp location to file storage
if($PassedChecks === true ){
    if (move_uploaded_file($_FILES["IngredientsImage"]["tmp_name"], $IngredientsTargetPath)) { echo "Ingredients Image Uploaded."; }   
    else { echo "Sorry, there was an error uploading your file."; }

    if (move_uploaded_file($_FILES["MethodImage"]["tmp_name"], $MethodTargetPath)) { echo "Method Image Uploaded."; }   
    else { echo "Sorry, there was an error uploading your file."; }
}
else{
    echo "One or More images failed checks, ensure they are the correct format.";
    return;
}
#endregion
#region Create DB record
$hostname = "sql160.main-hosting.eu";
$username = "u902155560_admin";
$password = "uew6UoDPmnb1";
$databaseName = "u902155560_main";
$connect = mysqli_connect($hostname, $username, $password, $databaseName);

//assemble SQL and submit
$RecipeCategory = $_POST["RecipeCategory"];
$INSERT = "INSERT INTO `Recipes`(`RecipeName`, `RecipeCategory`) VALUES ";
$VALUES = "('".$RecipeName."','".$RecipeCategory."')";
$SQL = $INSERT . $VALUES;
$Result = mysqli_query($connect, $SQL);
#endregion

header('Location: ' . $_SERVER['HTTP_REFERER']);

function CheckFile($Image,$Path){
    if (file_exists($Path)) {
        echo "Sorry, file already exists.";
        return false;
    }
    else if ($Image["size"] > 500000) {
    echo "Sorry, your file is too large.";
    return false;
    }

    $imageFileType = $_FILES['IngredientsImage']['type'];
    if($imageFileType != "image/jpg" && $imageFileType != "image/png" && $imageFileType != "image/jpeg"&& $imageFileType != "image/gif") {
        
        echo $imageFileType;
        echo "Sorry, wrong file type";
        return false;
    }
    return true;
    }
?>