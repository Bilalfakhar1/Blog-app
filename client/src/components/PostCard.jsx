import React from 'react'
import {Link} from 'react-router-dom'
export default function PostCard({post}) {
  return (
    <div className='group relative border h-[400px] w-full overflow-hidden rounded-lg
    sm:w-[400px] border-teal-500 hover:border-2 transition-all'>
      <Link to={`/post/${post.slug}`}>
        <img src={post.image} alt={post.title} className='h-[260px] w-full object-cover group-hover:h-[200px]
         transition-all duration-300 z-20' />
      </Link>
      <div className="p-3 flex flex-col gap-2">
        <p className='text-lg font-semibold line-clamp-2'>{post.title}</p>
        <span className='text-sm'>{post.category}</span>
        <Link className='z-10 group-hover:bottom-0 absolute bottom-[-200px]
        left-0 right-0 border border-teal-500 hover:bg-teal-500 hover:text-white
        transition-all duration-300 text-center rounded-md !rounded-t-none py-2' to={`/post/${post.slug}`}>
            Read Article
        </Link>
      </div>
    </div>
  )
}
