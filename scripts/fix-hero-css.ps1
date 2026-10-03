$file = 'src\assets\css\pages.css'
$content = [System.IO.File]::ReadAllText($file)

$bad = '.hero-slide {\n  position: absolute;\n  inset: 0;\n  opacity: 0;\n  visibility: hidden;\n  transition: opacity 1.2s ease-in-out, visibility 0s 1.2s;\n}'

$good = ".hero-slide {`r`n  position: absolute;`r`n  inset: 0;`r`n  opacity: 0;`r`n  visibility: hidden;`r`n  transition: opacity 1.2s ease-in-out, visibility 0s 1.2s;`r`n}"

if ($content.Contains($bad)) {
    $fixed = $content.Replace($bad, $good)
    [System.IO.File]::WriteAllText($file, $fixed)
    Write-Host "Fixed."
} else {
    $lines = $content -split "`n"
    Write-Host "Line 58 raw:"
    Write-Host $lines[57]
}
