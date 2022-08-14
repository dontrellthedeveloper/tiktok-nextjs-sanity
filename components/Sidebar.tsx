import React, { useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import GoogleLogin from 'react-google-login';
import { AiFillHome, AiOutlineMenu, AiOutlineHome } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';

import SuggestedAccounts from './SuggestedAccounts';
import Discover from './Discover';
import Footer from './Footer';
import {topics} from "../utils/constants";


const Sidebar = ({href}: any) => {
    const [showSidebar, setShowSidebar] = useState<Boolean>(true)
    const router = useRouter();
    const { topic } = router.query;


    const normalLink = 'flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#ef0a4f] focus:text-gray-400 rounded';
    const activeTopicLink = 'flex items-center gap-3 hover:bg-primary p-2 justify-center xl:justify-start cursor-pointer font-semibold text-[#ef0a4f] rounded';
    const topicLink = 'flex items-center gap-3 hover:bg-primary p-2 justify-center xl:justify-start cursor-pointer font-semibold text-black rounded';


    const userProfile = false;

    return (
        <div>
            <div
                className='block xl:hidden m-2 ml-4 mt-3 text-xl'
                onClick={() => setShowSidebar((prev) => !prev)}
            >
                {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
            </div>

            {showSidebar && (
                <div className='xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3'>
                    <div className='xl:border-b-2 border-gray-200 xl:pb-4'>
                        <Link href='/'>
                            {/*<div className={normalLink}>*/}
                            <div className={router.pathname === '/' ? activeTopicLink : topicLink}>
                                <p className='text-3xl '>
                                    <AiOutlineHome />
                                </p>
                                <span className='capitalize text-md hidden xl:block'>
                                  For You
                                </span>
                            </div>
                        </Link>


                        {/*{topics.slice(0, 1).map((item) => (*/}
                        {/*    <Link href='/'>*/}
                        {/*        <div className={topic === '/' ? topicLink : activeTopicLink}>*/}
                        {/*            <p className='text-3xl'>*/}
                        {/*                <AiOutlineHome />*/}
                        {/*            </p>*/}
                        {/*            <span className='capitalize text-md hidden xl:block'>*/}
                        {/*               For You*/}
                        {/*         </span>*/}
                        {/*        </div>*/}
                        {/*    </Link>*/}
                        {/*))}*/}


                    </div>
                    {!userProfile && (
                        <div className='px-2 py-4 hidden xl:block'>
                            <p className='text-gray-400'>
                                Log in to like and comment on videos.
                            </p>
                            <div className='pr-4'>
                                <GoogleLogin
                                    clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}
                                    render={(renderProps) => (
                                        <button
                                            className='bg-white text-lg text-[#ef0a4f] border-[1px] border-[#ef0a4f] font-semibold px-6 py-3 rounded-md outline-none w-full mt-3 hover:text-white hover:bg-[#ef0a4f]'
                                            onClick={renderProps.onClick}
                                            disabled={renderProps.disabled}
                                        >
                                            Log in
                                        </button>
                                    )}
                                    // onSuccess={(res) => fetchGoogleResponse(res, addUser)}
                                    // onFailure={(res) => fetchGoogleResponse(res, addUser)}
                                    cookiePolicy='single_host_origin'
                                />
                            </div>
                        </div>
                    )}
                    <Discover />
                    <SuggestedAccounts/>
                    <Footer />
                </div>
                )}
        </div>
    );
};

export default Sidebar;
