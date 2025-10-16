<?php

function getHtmlFiles($directory): array
{
    $files = scandir($directory);
    
    $output = [];
    foreach ($files as $file) {
        // only list visible files, not directories and only files with the htm extension
        if (!is_dir($file) && substr($file, 0, 1) !== '.' && pathinfo($file, PATHINFO_EXTENSION) === 'html') {
            
            // Load the HTML file and get the title tag in the file
            $dom = new DOMDocument();
            libxml_use_internal_errors(true);
            $dom->loadHTMLFile($file);
            $titleTags = $dom->getElementsByTagName('title');

            // If there is a title tag, use its content as the link text, otherwise use the filename
            $title = $titleTags->length > 0 ? $titleTags->item(0)->textContent : $file;
            $output[] = [
                'file' => $file,
                'title' => $title
            ];
        }
    }

    // Sort the output array by title
    usort($output, function ($a, $b) {
        return strcmp($a['title'], $b['title']);
    });

    return $output;
}

?>