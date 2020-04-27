export default async function postData(data, url, signal){
  try {
    const post = await fetch(url, {
      method: "POST",
      headers:{
         "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    console.log(post);
    return post.json();
  } catch (e) {
    console.log(e);
  }
}
