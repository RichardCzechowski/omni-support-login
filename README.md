# Omni Support Login helper

## Installation

Copy the extension files to a folder
Go to your extensions
Enable developer mode in the top right
Click "Load unpacked"
Select the folder containing the extension files

## Add to managed devices

Get the extension ID from the extension page by clicking on "Details"
Copy that into the command below

```
sudo defaults write /Library/Managed\ Preferences/com.google.Chrome ExtensionInstallForcelist -array "YOUR_EXTENSION_ID;https://clients2.google.com/service/update2/crx"
```

## Remove from managed devices

```
sudo defaults write /Library/Managed\ Preferences/com.google.Chrome ExtensionInstallForcelist -array ""
```
