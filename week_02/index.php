<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>USW - AIM Week 2</title>
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
</head>
<body>
    <h1>GIS and the Spatial Web</h1>
    <p>Work during my USW studies autumn 2025</p>
    <p>Week 2 (2025.09.29 - 2025.10.05)</p>
    <ul>
        <?php
            $files = scandir(__DIR__);
            foreach ($files as $file) {
                // only list visible files, not directories and only files with the htm extension
                if (!is_dir($file) && substr($file, 0, 1) !== '.' && pathinfo($file, PATHINFO_EXTENSION) === 'htm') {
                    echo '<li><a href="' . $file . '">' . $file . '</a></li>';
                }
            }
        ?>
    </ul>
</body>
</html>
