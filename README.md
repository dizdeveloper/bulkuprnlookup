This is a small HTTP server written in node.js . It accepts a Json array with UPRN values, Loops around the array to call another API . 
Consolidates all the results into an output array . Sends the output array as response. 

Make a post call with a json array in request body as below 
{ "UPRNS": ["100021019205", "100021019206"]}



