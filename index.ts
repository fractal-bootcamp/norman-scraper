import * as cheerio from "cheerio";
import * as fs from "fs";

import axios from "axios";

const url = [process.argv[2]];
const count = [process.argv[3]];
const depth = Number([process.argv[4]]);

const getLinks = (url, count, depth) => {
  //base case

  if (depth === 0) {
    return;
  }

  //decrement depth
  depth--;

  if (url[0].startsWith("http") == false) {
    url = "https://news.ycombinator.com";
  }

  //fetch data from url
  axios.get(url).then((response) => {
    const $ = cheerio.load(response.data);

    $("script").remove();
    $(".vector-header").remove();
    $("nav").remove();
    $("#p-lang-btn").remove();
    $(".infobox").remove();
    $('[rel="stylesheet"]').remove();

    const links = [];

    // Select all anchor tags and extract href attributes
    $("a").each((index, element) => {
      const link = $(element).attr("href");
      // Make sure the href attribute exists and is not empty
      if (links.length < count && link && link.trim() !== "") {
        links.push(link);
      }
    });

    console.log(links);

    for (let i = 0; i < links.length; i++) {
      console.log(links.length);
      getLinks(links[i], count, depth);
    }
  });
};

getLinks(url, count, depth);

/*  console.log($.root().html() === $.html());

  console.log($.html());

  console.log($.root().html());
  console.log($("div"));

  console.log($("div").html());
  console.log($("div").text());

  console.log($.html().length);
  console.log(response.headers["content-length"]);

  //JSON is javascript built in
  const json = JSON.parse("{}");
  const string = JSON.stringify(json);
  */

/*

Fetch HTML Content []done
Implement a function that takes a URL as input and fetches the HTML content from that URL. []done
Log the size of the fetched HTML content in kilobytes. []done
Process HTML Content:

Use a library to parse and manipulate the HTML content. [done]

Clean up the HTML by removing certain elements such as:



script tags  $('script').remove(); [done]
Elements with the class .vector-header  $('.vector-header').remove [done]
nav tags    $('nav').remove(); [done]
Elements with the ID #p-lang-btn   $('#p-lang-btn').remove() [done]
Elements with the class .infobox  $('.infobox').remove() [done]
Ensure all stylesheet links (link rel="stylesheet") are filtered out  $('[rel="stylesheet"]').remove() [done]

Perhaps remove more?

Save Processed HTML 

Save the cleaned HTML content to a file in an output directory. [done]

Ensure the output directory exists; create it if it does not. [done]


Extract Links:
Limit the number of extracted links per page to a configurable number (e.g., 10).  [done]

get <a> tags and put them in a sepearate file?
recursively, with depth specified?

params: url, depth
as arguments

catch errors
console log loaded, size, and links processed

bash node script.js https://example.com --depth 2 --per-page 10

Traversal Depth:
Implement functionality to traverse links up to a specified depth from the initial page.
Depth should be a configurable parameter.
Command-Line Interface:
The script should be runnable from the command line and take a URL and a depth as an argument.
If no URL is provided, the script should log an error message and exit.
Logging:
Log meaningful messages at various steps, such as when a page is being loaded, the size of the fetched HTML, and the links being processed.
Example Usage:
bash node script.js https://example.com --depth 2 --per-page 10
Additional Considerations:
Handle edge cases and potential errors gracefully, such as network issues or invalid URLs.





    const directoryPath = "./output";

    // Check if the directory exists
    if (!fs.existsSync(directoryPath)) {
      // If it doesn't exist, create the directory
      fs.mkdirSync(directoryPath);

      console.log(`Directory '${directoryPath}' created.`);
    } else {
      console.log(`Directory '${directoryPath}' already exists.`);
    }

  
    fs.writeFile("./output/test2.html", links, (err) => {
      if (err) {
        console.error(err);
      } else {
        // file written successfully
      }
    });

*/

//handle baseurl
