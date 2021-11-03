const fetch = require("node-fetch");

const handler = async function (event) {
  let params = [];
  for (const [key, value] of Object.entries(event.queryStringParameters)) {
    if (key !== "url") {
      params.push(`${key}=${value}`);
    }
  }
  const url = `https://brillar-sklep.pl/webapi/rest/${event.queryStringParameters.url}/?${params.join("&")}`;

  try {
    const response = await fetch(url, {
      method: event.httpMethod,
      headers: {
        Authorization: event.headers.authorization,
      },
    });
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: JSON.stringify(response.statusText) };
    }
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ data }),
    };
  } catch (error) {
    // output to netlify function log
    console.log(error);
    return {
      statusCode: 500,
      // Could be a custom message or object i.e. JSON.stringify(err)
      body: JSON.stringify({ msg: error.message }),
    };
  }
};

module.exports = { handler };
