import * as cheerio from "cheerio";
import axios from "axios";

axios
  .get("https://news.ycombinator.com/front?day=2024-06-23")
  .then((response) => {
    console.log(response.headers);
    const $ = cheerio.load(response.data);
    console.log($("a").text());
    console.log($.html());
    console.log($.root().html());
  });
