<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>USW - GIS</title>
    <link rel="icon" type="image/svg+xml" href="favicon.svg">
</head>
<body>
    <h1>GIS and the Spatial Web</h1>
    <p>Work during my USW studies autumn 2025</p>
    <ul>
        <?php
            // list all directories
            $files = scandir(__DIR__);
            foreach ($files as $file) {
                // only list visible directories
                if (is_dir($file) && substr($file, 0, 1) !== '.') {
                    echo '<li><a href="' . $file . '">' . $file . '</a></li>';
                }
            }
        ?>
    </ul>
</body>
</html>
