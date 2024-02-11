import React from 'react'
import { Link, Outlet } from 'react-router-dom'
//import { blogdata } from './blogData'

function BlogPage({blogDataStates}) {
  const [blogdata, setBlogdata] = blogDataStates
  return (
    <>
      <h1>Blog</h1>
      {
        blogdata.map((blog, index) => (
          <BlogLink key={index} slug={blog.slug} title={blog.title} />
        ))
      }
      <Outlet />
    </>
  )
}

function BlogLink({slug, title}) {
    return (
        <li>
            <Link to={`/blog/${slug}`}>{title}</Link>
        </li>
    )
}

export default BlogPage