import React from 'react'
import { Footer } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { BsFacebook , BsTwitter , BsInstagram, BsGithub } from 'react-icons/bs';

export default function Footercomp() {
  return (
    <Footer container className='border-t-8 mt-5 border-teal-500'>
        <div className="w-full max-w-7xl m-auto">
            <div className="grid justify-between sm:flex md:grid-col-1">
                <div className="mt-5">
                <Link to= '/' className=' text-center whitespace-nowrap text-xl sm:text-xl font-semibold dark:text-white '>
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Bilal</span>
        Blogs
        </Link>
                </div>
                <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3">
                    <div>
                    <Footer.Title title='about'/>
                    <Footer.LinkGroup col>
                        <Footer.Link href='#'>
                            Projects
                        </Footer.Link>
                    </Footer.LinkGroup>
                    <Footer.LinkGroup col>
                        <Footer.Link href='#'>
                            Bilal Blogs
                        </Footer.Link>
                    </Footer.LinkGroup>
                    </div>
                    <div>
                    <Footer.Title title='Follow Us'/>
                    <Footer.LinkGroup col>
                        <Footer.Link href='#'>
                            Github
                        </Footer.Link>
                    </Footer.LinkGroup>
                    <Footer.LinkGroup col>
                        <Footer.Link href='#'>
                            Discord
                        </Footer.Link>
                    </Footer.LinkGroup>
                    </div>
                    <div>
                    <Footer.Title title='Legal'/>
                    <Footer.LinkGroup col>
                        <Footer.Link href='#'>
                            Privacy and Policy
                        </Footer.Link>
                    </Footer.LinkGroup>
                    <Footer.LinkGroup col>
                        <Footer.Link href='#'>
                            Terms &amp; conditions
                        </Footer.Link>
                    </Footer.LinkGroup>
                    </div>
                   
                </div>
            </div>
            <Footer.Divider/>
            <div className='w-full sm:flex sm:items-center sm:justify-between'>
                <Footer.Copyright href='#' by="Bilal blogs" year={new Date().getFullYear()}/>
                <div className='flex gap-6 sm:mt-0 mt-4 sm:justify-center'>
                    <Footer.Icon href='#' icon={BsFacebook}/>
                    <Footer.Icon href='#' icon={BsInstagram}/>
                    <Footer.Icon href='#' icon={BsTwitter}/>
                    <Footer.Icon href='#' icon={BsGithub}/>
                </div>
            </div>
        </div>
    </Footer>
  )
}
