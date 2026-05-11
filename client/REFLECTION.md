# REFLECTION.md — Project Proposal

## Project Name
**Rose Bud Thorn** (**rbt.**)

---

## Q1 - Scope Decisions

The final scope of the website is very close to what is outlined in BRIEF.md. The main reason for this is I had a very clear vision of what I wanted to accomplish and felt that it would be manageable for the expectations of this project and was able to accomplish everything I wanted to for the application. In addition, some of the details from the brief are somewhat open ended and leave some creative freedom to logisitcal aspects of the project, but the main focus was creating a nice self journaling and reflection app that focused on aesthetics and a growth mindset. A stretch goal for the project was to add more filtering options for the garden view. 

## Q2 - Technical Challenge

The hardest technical challenge that occured was determining the most optimal functionality to have the website behave the way I wanted. Essentially, there was a lot of trial and error that occured in early stages determining what exact components needed to be produced, and how each of the components will interact with one another from one page to the next. Originally, I wanted to create an individial footer component, but found that the design and made for the footer on Canva would be better to be imported directly since the website did not need to have routerlinks at footer. 

## Q3 - AI and Vibe Coding

Having the ability to vibe code for this assignment definitely helped with developing a full stack web application in a significantly faster timeline than without it, but I found it most helpful with creating basis components that I can then alter to function the exact way I wanted, but having basic structure helps guide the technical and design process in their own way. I found it extremely difficult however, to use Claude to assist in design decision, often choosing wrong fonts, colors, and generating designs that went against the vision I had for the application. 

## Q4 - Architecture

When a user clicks "Save" on the Today page, Vue collects the rose, bud, thorn text, chosen adjective, and color into a payload and sends it as a POST /api/entries request with the user's JWT in the Authorization header. Express receives the request, the auth middleware verifies the token to identify the user, and the entry controller writes a new document to the entries collection in MongoDB Atlas, keyed to that user's ID and today's date. MongoDB confirms the save, Express returns the new entry as JSON, and the Vue front-end uses the response to render the user's unique rose in the garden grid, all without a page reload.

## Q5 - Two More Weeks

I accomplished a lot of what I feel the scope for this application needs. That being said if I had more time to work on the application, I would add more sorting features where your garden can be sorted by adjective, color, month, and potentially even year. In addition adding some sort of sharing capabilites would be a strong future goal, and with that I would focus on an image export that users could send to othr people through text and it relate to that person being a highlight from their day, etc. 