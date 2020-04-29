export default async function postData(data, url, signal){
    const post = await fetch(url, {
      method: "POST",
      headers:{
         "Content-Type": "application/json"
      },
      signal: signal,
      body: JSON.stringify(data)
    });
    return post.json();
}
