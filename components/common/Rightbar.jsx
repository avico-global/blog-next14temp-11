import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Button from './Button'
import MarkdownIt from 'markdown-it'
import { sanitizeUrl } from '../lib/myFun'

const md = new MarkdownIt()

export default function Rightbar({
  about_me = {},
  blog_list = [],
  imagePath
}) {
  const content = md.render(about_me.value || '')
  const lastFiveBlogs = blog_list.slice(-5)

  return (
    <div className='flex flex-col sm:flex-row lg:flex-col gap-4'>
      <div className='space-y-6'>
        {lastFiveBlogs.map((post, index) => (
          <div key={index}>
            <Link
              href={`/${encodeURI(sanitizeUrl(post.article_category))}/${encodeURI(sanitizeUrl(post.title))}`}
              title={post.title || "Article"}
            >
              <article className='flex gap-5 pb-5 border-b border-gray-300 group cursor-pointer'>
                <div className='relative w-[100px] aspect-square'>
                  <div className='absolute left-1 top-1 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm z-10'>
                    {index + 1}
                  </div>
                  <div className='w-full h-full rounded-[4px] overflow-hidden'>
                    <Image 
                      src={`${imagePath}/${post.image}`}
                      alt={post.title}
                      title={post.title}
                      height={200}
                      width={200}
                      className='object-cover w-full h-full group-hover:scale-105 transition-transform duration-300'
                    />
                  </div>
                </div>

                <div className='flex-1 flex flex-col justify-between'>
                  <h3 className='font-medium leading-snug group-hover:text-gray-600 transition-colors'>
                    {post.title}
                  </h3>
                  <div className='flex items-center gap-2 text-sm'>
                    <span className='font-medium'>{post.article_category}</span>
                    <span className='text-gray-300'>•</span>
                    <span className='text-gray-600'>{post.published_at}</span>
                  </div>
                </div>
              </article>
            </Link>
          </div>
        ))}
      </div>

      <div className='border bg-gray-100 w-full top-0 rounded-lg px-5 pb-5 flex flex-col gap-3'>
        <div className='flex items-center gap-2 py-5'>
          <Image 
            src={`${imagePath}/${about_me.file_name}`}
            alt="About me"
            title="About me"
            height={200}
            width={200}
            unoptimized 
            className='w-full h-full object-cover aspect-square rounded-[4px]'
          />
        </div>
        <h3 className='text-lg font-bold text-center'>About Me</h3>
        <div className='text-gray-600 text-center' dangerouslySetInnerHTML={{ __html: content }} />
        
      </div>
    </div>
  )
}
