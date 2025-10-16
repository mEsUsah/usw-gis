<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>USW - AIM Week 2</title>
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
</head>
<body class="w-full max-w-4xl mx-auto">
    <header class="flex flex-row gap-4 lg:gap-8 items-center">
        <img src="/favicon.svg" alt="Logo for USW coursework by Stanley Skarshaug" class="h-24 lg:h-32">
        <div class="pr-2">
            <h1 class="text-xl lg:text-4xl font-medium">GIS and the Spatial Web</h1>
            <p class="text-md lg:text-xl">Google Maps API</p>
        </div>
    </header>
    <main class="m-4 lg:m-8">
        <h2 class="text-lg lg:text-2xl font-medium">Tutorials</h2>
        <p class=" mb-4">Tutorials and coursework during my USW studies autumn 2025</p>
        <ul>
            <?php
                $files = scandir(__DIR__);
                foreach ($files as $file) {
                    // only list visible files, not directories and only files with the htm extension
                    if (!is_dir($file) && substr($file, 0, 1) !== '.' && pathinfo($file, PATHINFO_EXTENSION) === 'htm') {
                        
                        // Load the HTML file and get the title tag in the file
                        $dom = new DOMDocument();
                        $internalErrors = libxml_use_internal_errors(true);
                        $dom->loadHTMLFile($file);
                        $titleTags = $dom->getElementsByTagName('title');

                        // If there is a title tag, use its content as the link text, otherwise use the filename
                        $title = $titleTags->length > 0 ? $titleTags->item(0)->textContent : $file;
                        ?>
                        <li>🎯<a href="<?php echo $file; ?>" class="text-red-500 hover:underline"><?php echo $title; ?></a></li>
                        <?php
                    }
                }
            ?>
        </ul>
    </main>
</body>
</html>
