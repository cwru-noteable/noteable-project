# Frontend
## Tools
* **React.js** for Component Architecture.
* **axios** for HTTP requests.
## Installation
1. Rename src/login.js to src/Login.js (the capital "L" is important and gets lost in translation for some reason)
2. `npm install`
3. `npm start`
## Architecture
* Navigation
  * LogOutButton
  * MyCollectionButton
  * BrowseButton
  * InfoButton
* Info
  * Instructions
* Login
  * UsernameField
  * PasswordField
  * NoAccountButton
* Register
  * UsernameField
  * PasswordField
  * ConfirmPasswordField
  * CreateAccountButton
  * CancelButton
* Collection
  * CollectionTable
    * CollectionTableRow
    * CollectionTableColumn
  * CollectionFilter
    * CollectionFilterAttribute
      * CollectionFilterAttributeLabel
      * CollectionFilterAttributeValue
* Browse
  * BrowseTable
    * BrowseTableRow
    * BrowseTableColumn
  * BrowseFilter
    * BrowseFilterAttribute
      * BrowseFilterAttributeLabel
      * BrowseFilterAttributeValue
* Item
  * ItemAttribute
    * ItemAttributeLabel
    * ItemAttributeValue
  * ItemEditButton
  * ItemDeleteButton
## Tips
* For quick development testing, use `python3 -m http.server [portNumber]` (`portNumber`=8000 by default) from the command line to start a little server in the current directory. You can then see the result by visiting `localhost:portNumber` from a web browser.
