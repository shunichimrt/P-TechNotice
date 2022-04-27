/**
 * Qiita上位５記事を配信
 * @param message ストック数順に上位５記事
 */
function broadcastQiita() {
  let message = "今日のQiita５選";
  var postQiita = targetShtQiita.getRange(1, 1, 5, 3).getValues();
  for (var i = 0; i < postQiita.length; i++) {
    message =
      message +
      "\n\n" +
      postQiita[i][0] +
      "\nURL:　" +
      postQiita[i][1] +
      "\nストック数:　" +
      postQiita[i][2] +
      "";
  }

  UrlFetchApp.fetch("https://api.line.me/v2/bot/message/broadcast", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + ACCESS_TOKEN,
    },
    payload: JSON.stringify({
      messages: [
        {
          type: "text",
          text: message,
        },
      ],
    }),
  });
}

/**
 * Zenn上位５記事を配信
 * @param message いいね数順に上位５記事
 */
function broadcastZenn() {
  let message = "今日のZenn５選";
  var postZenn = targetShtZenn.getRange(1, 1, 5, 3).getValues();
  for (var i = 0; i < postZenn.length; i++) {
    message =
      message + "\n\n" + postZenn[i][0] + "\nいいね数:　" + postZenn[i][1] + "";
  }
  message = message + "\n\nhttps://zenn.dev/";

  UrlFetchApp.fetch("https://api.line.me/v2/bot/message/broadcast", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + ACCESS_TOKEN,
    },
    payload: JSON.stringify({
      messages: [
        {
          type: "text",
          text: message,
        },
      ],
    }),
  });
}
