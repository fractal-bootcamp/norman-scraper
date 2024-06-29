import * as cheerio from "cheerio";
import * as fs from "fs";

import axios from "axios";

const url = process.argv[2];
const count = process.argv[3];
const depth = Number([process.argv[4]]);

const baseUrl = structuredClone(url);

const getLinks = (url, count, depth) => {
  //base case

  if (depth === 0) {
    return;
  }

  //decrement depth
  depth--;

  //check for redirects and subdomains
  if (url.startsWith("http") === false) {
    axios.get(baseUrl + url).then((response) => {
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

      for (let i = 0; i < links.length; i++) {
        getLinks(links[i], count, depth);
      }
      console.log(links);
    });
  } else {
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

      for (let i = 0; i < links.length; i++) {
        getLinks(links[i], count, depth);
      }
      console.log(links);
    });
  }
};

getLinks(url, count, depth);
