import React from 'react';
import SEO from "./seo"
import { getUser } from '../services/auth';

export default function ProfilePage() {
  const { name } = getUser();
  return (
    <>
      <SEO title="Dashboard - profile" />
      <h1>
        Welcome { name } to your dashboard
      </h1>
    </>
  )
}
