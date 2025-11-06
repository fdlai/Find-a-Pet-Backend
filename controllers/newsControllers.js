function getNewsArticles(req, res) {
  return fetch("https://newsapi.org/v2/everything?q=pets&pageSize=75", {
    headers: {
      "X-Api-Key": `${process.env.NEWS_API_KEY}`,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      Promise.reject(res.status);
    })
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json(`Could not get news articles.`);
    });
}

module.exports = { getNewsArticles };
