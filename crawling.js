const axios = require("axios");
const cheerio = require("cheerio");
const iconv = require("iconv-lite");

const fs = require("fs");

const crawler = async () => {
  const html = await axios.get(
    "https://movie.naver.com/movie/point/af/list.naver",
    {
      responseType: "arraybuffer",
    }
  );
  if (html.status === 200) {
    const content = iconv.decode(html.data, "utf-8").toString();
    const $ = cheerio.load(content);
    const text = $(".title").text();
    fs.writeFileSync("data/data.txt", text.trim());
  }
};

crawler();
