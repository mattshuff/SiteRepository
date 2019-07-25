<?php
 $hostname = "localhost";
 $username = "root";
 $password = "";
 $databaseName = "recipeappdb";

 $connect = mysqli_connect($hostname, $username, $password, $databaseName);
 $sql = "SELECT * FROM `recipes`";
 $result = $connect->query($sql);
 
 if ($result->num_rows > 0) {
     // output data of each row
     while($row = $result->fetch_assoc()) {
         echo $row["RecipeName"]. "*";
     }
 } else {
     echo "0 results";
 }
 ?>

