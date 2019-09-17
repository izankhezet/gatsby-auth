import React from 'react';
import SEO from "./seo"
import { getUser } from '../services/auth';

export default function ProfilePage() {
  const { user_display_name } = getUser();
  const onFetchMoreDetails = async () => {
    try {
      let { id, token } = getUser();
      let _res = await fetch(`https://api.aalladine.com/wp-json/wp/v2/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(await _res.json())
    } catch (error) {
      console.log(error) 
      alert(error.message)     
    }
  }
  return (
    <>
      <SEO title="Dashboard - profile" />
      <h1>
        Welcome { user_display_name } to your dashboard
      </h1>
      <button onClick={onFetchMoreDetails}>Get User Details</button>
    </>
  )
}
