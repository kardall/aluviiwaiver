@For /R "F:\aluviiscraper\renamed\" %%G In (*.html) Do  @"%ProgramFiles%\PDF24\pdf24-DocTool.exe" -convertToPDF -noProgress -profile default/medium -webOptimized -outputFile "%%~nG_.pdf" "%%G"
