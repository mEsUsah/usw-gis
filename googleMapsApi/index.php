<?php
    require __DIR__ . '/../scripts/getHtmlFiles.php';
    $files = getHtmlFiles(__DIR__);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>USW GIS | Google Maps API</title>
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
</head>
<body class="w-full max-w-4xl mx-auto flex flex-col h-screen">
    <header class="flex flex-row gap-4 lg:gap-8 items-center">
        <img src="/favicon.svg" alt="Logo for USW coursework by Stanley Skarshaug" class="h-24 lg:h-32">
        <div class="pr-2">
            <h1 class="text-xl lg:text-4xl font-medium">GIS and the Spatial Web</h1>
            <p class="text-md lg:text-xl">Google Maps API</p>
        </div>
    </header>
    <main class="m-4 lg:m-8 flex-grow">
        <h2 class="text-lg lg:text-2xl font-medium">Tutorials</h2>
        <p class=" mb-4">Tutorials and coursework during my USW studies autumn 2025</p>
        <ul>
            <?php
                foreach ($files as $file) {
                ?>
                    <li>🎯<a href="<?php echo $file['file']; ?>" class="text-[#DE0832] hover:underline"><?php echo $file['title']; ?></a></li>
                <?php
                }
            ?>
        </ul>
    </main>
    <footer class="bg-[#DE0832] text-white py-8">
        <p class="text-center">USW coursework by Stanley Skarshaug</p>
    </footer>
</body>
</html>