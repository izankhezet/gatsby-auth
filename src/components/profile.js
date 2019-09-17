import React from 'react';
import SEO from "./seo"
import { getUser } from '../services/auth';

export default function ProfilePage() {
  const { user_display_name } = getUser();
  return (
    <>
      <SEO title="Dashboard - profile" />
      <h1>
        Welcome { user_display_name } to your dashboard
      </h1>
    </>
  )
}
