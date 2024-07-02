const axios = require('axios')

const cookie = 'CH-prefers-color-scheme=light; _gcl_au=1.1.889664710.1719799580; _fbp=fb.1.1719799580677.857504285250722404; __ssid=71343fb7771f3b92ebdb545f1b3dce5; sessionKey=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; lastActiveOrg=c7918834-a23f-4e4c-832c-e43e3e536e73; intercom-device-id-lupk8zyo=d5539e36-11e9-449c-8aa3-d042743b0324; activitySessionId=eafbde5a-d235-436a-bc63-dbfb18f18ed0; __cf_bm=tLTcsc5igkgflM8aP90szmb0CjBdyU7p6AuN2Y6aRTc-1719900443-1.0.1.1-xl0IEdoUrX9sle3gzQdqGGQMZdAirfLhp8rQ4ny_xOYtAmfhoI64w1LTUW7BTw38zUrAZ.3uIOKf.cHRw_p.0Q; cf_clearance=shKmWy7aG3bo3jGQnXup3zpahBSqtpw7nHdatlTldU4-1719901324-1.0.1.1-Ftz_wcnkFoYLp_KqM.d23c2ZTSJh2o0gszvCU1QIzgPc.2rXQ7rKpeTKSRjWdArEOXiBlysc4iCtfipMtFcVPQ; _rdt_uuid=1719799580843.69b0c61e-4927-4c56-b518-abfa1f5f3931; intercom-session-lupk8zyo=SE50UW5CNnZic1Iwd1JrcVNNalpESUhQbzRwTjdNbTBhakJHWVhWQy9sTUZXaitud2t0QTc3bVNnWFlZNkRzUS0tMzNSRm5UVFliZHBMYUxlR0hoaFlSZz09--64bb621a89650e83d89e60d1736c15fa80b20868'

const headers = {
  "Content-Type": "application/json",
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/115.0',
  'Accept-Language': 'en-US,en;q=0.5',
  'Referer': 'https://claude.ai/chats',
  'Sec-Fetch-Dest': 'empty',
  'Sec-Fetch-Mode': 'cors',
  'Sec-Fetch-Site': 'same-origin',
  'Connection': 'keep-alive',
  'Cookie': cookie,
  };
const org = 'c7918834-a23f-4e4c-832c-e43e3e536e73'
const uuid = '4da4d77d-c227-413a-ab22-7e2755a57b1e'//'8bfe03ba-35b4-48cb-aeaf-3fe5ee327dbe'//'8bfe03ba-35b4-48cb-aeaf-3fe5ee327dbe'
const url = `https://claude.ai/api/organizations/${org}/chat_conversations/${uuid}/completion`;

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

async function getCompletion(file) {
  try {
    const payload = JSON.stringify({
      attachments: [],
      files: [],
      prompt: file,
      rendering_mode: 'raw',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });

    const response = await axios.default({
      url,
      method: 'post',
      headers,
      data: payload,
      withCredentials: true,
      proxy: {
        host: '127.0.0.1',
        port: '7890',
        protocol: 'http'
      },
    })

    if (response.status === 200) {
      const { data } = response
      let responseText = ''
      let streams = data.split('\n').filter(v => v.includes('data:'))

      for (let s of streams) {
        let jsonStr = s.replace('data:', '').trim()
        try {
          let jsonObj = JSON.parse(jsonStr)
          if (jsonObj && jsonObj.completion) {
            responseText += jsonObj.completion
          }
          // console.log(responseText)
        } catch (err) {
          // ignore error
          console.log(jsonStr)
        }
      }
      return responseText
    }
  } catch (error) {
    console.error(error)
  }
}


module.exports = {
  getCompletion,
  sleep
}