# aluviiwaiver
Signed Waiver Download and Renamer for exporting your signed waivers.

# Getting your Store URL
Load your employee dashboard, and navigate to the "Waiver Management" portal. On this page, change the tab on the top of the list to "Signed Waivers" to show a list of all of your waivers that have been signed.

The Waiver ID column can be sorted so you can see the lowest ID (usually 1) and the highest ID. Make a note of these two minimum and maximum numbers for later.

> Please note, that not all ID's exist inside this range, so you will eventually have a bunch of "Unknown" values in the rename.js script which you will have to delete manually before converting to PDF.

When you double click a waiver it will open the waiver in another tab or window. The URL of this page will show your store name before the aluvii.com for example

```
https://yourstore.aluvii.com
```

Copy the yourstore part of the url for the scrape.js script.

# scrape.js

Line 12, 13 and 14 are the variables for the min, max waiver IDs as well as how many waivers to pull at a time.
> Be careful not to increase this number too high, or it will make aluvii's cloudflare unhappy with you due to too many simultaneous requests.

Line 31 has the yourstore variable you will need to paste your store name into so it can retrieve your signed waivers.

Once these values have been updated, you can then execute the scrape.js with Node:

```
node scrape.js
```

# rename.js

Line 14 contains the directory location to which your Waiver_#.html files have been downloaded to. Usually it's the same folder if you have not changed anything else in the script, so just make sure that the directory is the same as the folder the html files exist in.

Once that is updated, you can then execute the rename.js with Node:

```
node rename.js
```

# Converting to PDF

At this point, you will likely have a bunch of UnknownDate - UnknownFirstName UnknownLastName.html files in the directory. These are just invalid IDs, probably waivers that were never signed, so you can safely delete all of those files before converting them to PDF.

The included batch file has a directory in the script that you need to update to the location of the renamed folder. Edit the file and change the path accordingly.

The tool I have used is called PDF24 which has multiple tools for creating/editing PDF files for free. Including a lot of command line tools, which this batch file uses to process the entire folder, without having prompts.

The default profile is default/medium to save on space. An average file size around 100kb is what you could expect for each signed waiver.

Running the batch file will automatically process every .html file in the renamed folder and convert them into a PDF file of the same name. You can then manage the backup data however you decide.
