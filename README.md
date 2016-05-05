This is a small HTTP server written in node.js . It accepts a Json array with UPRN values, Loops around the array to call another API . 
Consolidates all the results into an output array . Sends the output array as response. 

Example call :

http://localhost:8080/api/uprns
Make a post call with a json array in request body as below 
{ "UPRNS": ["100021019205", "100021019206"]}

you should get a response back like this. 

[
  "{results: {\"gssCode\":\"E09000011\",\"uprn\":\"100021019205\",\"street\":\"3 Woodmere\",\"town\":\"Eltham\",\"area\":\"Greenwich\",\"postcode\":\"SE9 5NT\"}}",
  "{results: {\"gssCode\":\"E09000011\",\"uprn\":\"100021019206\",\"street\":\"4 Woodmere\",\"town\":\"Eltham\",\"area\":\"Greenwich\",\"postcode\":\"SE9 5NT\"}}"
]

The server accepts a maximum of 100 UPRNS per call and there needs to be atleast one UPRN in the request array with Key 'UPRNS' . 






