export default async function postData(data, url){
  const options = {
    method: "POST",
    headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }
  const post = await fetch(url, options);
  return post.json();
}
