# WebProgrammingProject2024

Title: *MyStylist*

**Description:** An app where the user is able to put everything they have of clothes, shoes, accesories and others in one "Virtual wardrobe". Some functionaliteis include:
- Adding items of clothing based on their categories, preference, seasons in which they can be worn...
- Creating outfits from this clothing
- Keeping track of what a user wears
- Giving a statistical rundown of what the user wears the most, which style the user has...
- Basically provides a solution to people who canno't choose what to wear and always forget which clothes they have

# CHANGELOG TIMELINE:

## 10.03.2024: First Milestone:
- Created GitHub repo
- Added the entire frontend components, excluding some
-   Instructions: index.hmtl is the defaul page (MyRundown), along with the whole logIn, register process
-   Style is purposely made to be simple, since the goal of the project is to create a working app, so I decided not to focus much on adding style
-   The other pages work in the according order:
-   MyWardrobe - view of what the user has added in their wardobe
-   MyOutfits - view of the users pre defince outfits
-   MyStats - view of the users style based on the times they have worn certain outfits
-   Add Item / Outfit - adding an item or outfit to the database
-   Log Item - the only WIP thing on the site, since I'm not sure if I will be able to get this to work later on
-   About - general info on the page
- Created PR

Notes: Code is a bit rough since the template I was working with did not suit me so I had to change 90% of the code. Some files were also left (javascript) since I didn't  want to remove a vital function of the template by accident.


## 02. 04. 2024: Second Milestone
- Spapp implemented on the webpage, with base at Index.html
- Log in and Register are not part of spapp as they are different pages completely
- The rest is fully implemented in spapp
- AJAX requests to a temporary JSON api, this was later changed to the database
- There were 2 requests made: One for the wardrobe and one for the outfits
- Both also generate the page description for the outfit or the item of clothing
- Responsiveness of the application was improved
- Navbar switches to an offcanvas element at lower screen size
- There is a bug which makes the navbar dissapear when at really low screen sizes but it hapens rarely, I can't explain it
- The Rundown, Stats and About pages are left really blank as I have decided to do them in the later milestones
- Form validation was implemented using jQuerys validate plugin

Notes: I had bugs with spapp which forced me to use timeouts when generating the descriptions of the items or outfits, but other than that the rest should be fine

## 23. 04. 2024: Third Milestone
- Whole Frontend project is now changed
- Assets - Keeps all the css, js and vendor template necessery files
- Services - The javascript methods made specifically to manipulate the entities in the webpage
- Utils - Repeating functions such as spapp, block UI
- Backend - The whole backend structure for Wardrobe and Outfits:
    - For both clothes and outfits, you can retreive the data from the database, update the data, add new data or delete records from the database. All done using PDO library for PHP.
- Also used Toaster library for cool effects!
- The database consists of 6 tables and 3 entities!

Notes: For the database i had to create some dummy tables which honestly serve no purpose but they fit well in the system. The user entity was not tackled in this milestone since I left it for the later milestones when we will be making the actual LogIn. Also, same goes for Stats, Log Outfit and Rundown, since those will implement specially functionalities. For this mileston, I just did what was necessary to show the connection to the database!!!

## 13. 05. 2024: Fourth Milestone
- OPENApi Swagger implemented at route public/v1/docs/#/
- Most routes have their documentation excluding maybe a few very similar routes
- Implemented Flight::php for all routing to the backend from the frontend using Route - Service - Dao pattern
- Implemented JWT authentication for users to log in and register. Now, every user has their own data: User, Clothes, Styles
- Updated whole project structure: Improved visual design, Implemented functions excluding rundown screen, Cleaned up Code...

Notes: The only page that is left to do is the rundown page. Other than that, the project is pretty much almost complete.

## 04. 06. 2025: Fifth Milestone + Extra Milestone
- Deplyment (Kidn Off, doesn't properly work due to CORS)
- Middleware implemented to intercept all routes and provide authentication
- Full duplex connection from frontend to backend and vice verca (excluding one annoying bug)

## Extra Points Milestion
- HTTP2 Protocal, but it is implemented automatically by DigitalOcean. I couldn't get the SSL certificate to work
- Basic WebSockets Implementation for the get method in the items.