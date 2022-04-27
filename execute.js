/**
 * zennプログラム実行
 * @return APIリクエストのデータ
 */
function executeQiitaPostman() {
  var posts = getQiitaPosts();
  if (posts === "error") {
    return;
  }

  pasteQiitaToSS(posts);
  postQiita.sort(3, false);
  broadcastQiita();
}

/**
 * zennプログラム実行
 * @return APIリクエストのデータ
 */
function executeZennPostman() {
  var posts = getZennPosts();
  if (posts === "error") {
    return;
  }

  pasteZennToSS(posts);
  postQiita.sort(2, false);
  broadcastZenn();
}

/**
 * qiita記事を取得する
 * @return APIリクエストのデータ
 */
function getQiitaPosts() {
  const d = dayjs.dayjs(new Date());
  const dd = d.add(-7, "day");
  var term = dd.format("YYYY-MM-DD");
  var REQUEST_URL = `https://qiita.com/api/v2/items?page=1&per_page=100&query=created%3A%3E${term}+stocks%3A%3E10`;

  try {
    var response = UrlFetchApp.fetch(REQUEST_URL);
    return JSON.parse(response.getContentText());
  } catch (e) {
    return "error";
  }
}

/**
 * zenn記事を取得する
 * @return APIリクエストのデータ
 */
function getZennPosts() {
  var REQUEST_URL = `https://zenn-api.netlify.app/.netlify/functions/trendTech`;

  try {
    var response = UrlFetchApp.fetch(REQUEST_URL);
    return JSON.parse(response.getContentText());
  } catch (e) {
    return "error";
  }
}

/**
 * qiitaスプレッドシートに記事を貼り付ける
 * @param [] posts 投稿
 */
function pasteQiitaToSS(posts) {
  var insertPosts = [];
  for (var i = 1; i < posts.length; i++) {
    insertPosts.push([
      posts[i]["title"],
      posts[i]["url"],
      posts[i]["likes_count"],
    ]);
  }

  targetShtQiita.getRange(1, 1, insertPosts.length, 3).clear();
  targetShtQiita.getRange(1, 1, insertPosts.length, 3).setValues(insertPosts);
  targetShtQiita
    .getRange(1, 1, insertPosts.length, 3)
    .setHorizontalAlignment("left");
  targetShtQiita
    .getRange(1, 1, insertPosts.length, 3)
    .setVerticalAlignment("middle");
}

/**
 * zennスプレッドシートに記事を貼り付ける
 * @param [] posts 投稿
 */
function pasteZennToSS(posts) {
  var insertPosts = [];
  for (var i = 1; i < posts.length; i++) {
    insertPosts.push([posts[i]["title"], posts[i]["likedCount"]]);
  }

  targetShtZenn.getRange(1, 1, insertPosts.length, 2).clear();
  targetShtZenn.getRange(1, 1, insertPosts.length, 2).setValues(insertPosts);
  targetShtZenn
    .getRange(1, 1, insertPosts.length, 2)
    .setHorizontalAlignment("left");
  targetShtZenn
    .getRange(1, 1, insertPosts.length, 2)
    .setVerticalAlignment("middle");
}
