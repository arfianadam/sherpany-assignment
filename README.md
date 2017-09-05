# Sherpany test assignment
This app is running on http://sherpany.arfianadam.com

This is a simple page where users can create a new agenda. It is only a static page so nothing will be saved. Here are some required features:

- Navigate between sections (details and agenda)
- Edit the name of the agenda
- Create agenda items
- Switch between main agenda item and sub agenda item by clicking `Enter` on keyboard when the new agenda input is in focus (you can check the number on the left to determine where you are now)
- Upload file modal, you can drag and drop files on the blue box. File without `.pdf` extension will be ignored
- Uploaded files (not really uploaded) will show on the modal
- You can select items to add to certain agenda item
- The selection of agenda item will automatically match the first checked file or if it is the only file checked
- The matching will prioritize on the number on the filename (if it has any) then on the filename
- Items added will appear beside the corresponding agenda items

## Running the site
Install the dependencies
```
npm install
```
Run the dev server
```
npm run dev
```