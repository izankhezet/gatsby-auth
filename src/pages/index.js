import React, { useState, } from "react"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => {
  const [posts, setPosts] = useState({
    data: [],
    message: null,
  });

  const onClick = async () => {
    try {
      let res = await await fetch('http://127.0.0.1:4444/posts', {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "include", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            //"Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
      })
      let data = await res.json();
      console.log('--------------------');
      console.log(data);
      if(data.status==='OK') {
        setPosts({data: data.posts})
      }
      else setPosts({message: data.errors[0]})
    } catch ({message}) {
      setPosts({message})
    }
  }
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <button onClick={onClick}>load post</button>
      {
        posts.message
         ? <h4>{posts.message}</h4>
         : posts.data.map(({id, title, content}) => (
            <li key={id}>
              <h4>{title}</h4>
              <p>{content}</p>
            </li>
          ))
      }
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
    </Layout>
  )
}

export default IndexPage
