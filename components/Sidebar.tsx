import React, { useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
// import GoogleLogin from 'react-google-login';
import {GoogleLogin, useGoogleLogin} from '@react-oauth/google';

import { AiFillHome, AiOutlineMenu, AiOutlineHome } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';

import SuggestedAccounts from './SuggestedAccounts';
import Discover from './Discover';
import Footer from './Footer';
import {topics} from "../utils/constants";
import Image from "next/image";
import {GoVerified} from "react-icons/go";
import useAuthStore from "../store/authStore";
import {createOrGetUser} from "../utils";


const Sidebar = ({href}: any) => {
    const [showSidebar, setShowSidebar] = useState<Boolean>(true)
    const router = useRouter();
    const { topic } = router.query;




    const normalLink = 'flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#ef0a4f] focus:text-gray-400 rounded';
    const activeTopicLink = 'flex items-center gap-3 hover:bg-primary p-2 justify-center xl:justify-start cursor-pointer font-semibold text-[#ef0a4f] rounded';
    const topicLink = 'flex items-center gap-3 hover:bg-primary p-2 justify-center xl:justify-start cursor-pointer font-semibold text-black rounded';


    // const userProfile = false;
    const { userProfile, addUser, removeUser }: any = useAuthStore();

    const login = useGoogleLogin({
        onSuccess: response => createOrGetUser(response, addUser)
    });

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
                            <div className={router.asPath === '/' ? activeTopicLink : topicLink}>
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
                    {/*{!userProfile && (*/}
                    {!userProfile && (
                        <div>
                        {/*<div className='px-2 py-4 hidden xl:block'>*/}
                            {/*<p className='text-gray-400 mt-2'>*/}
                            {/*    Log in to like and comment on videos.*/}
                            {/*</p>*/}
                            {/*<div className='pr-4'>*/}
                                {/*<GoogleLogin*/}
                                {/*    clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}*/}
                                {/*    render={(renderProps) => (*/}
                                {/*        <button*/}
                                {/*            className='bg-white text-lg text-[#ef0a4f] border-[1px] border-[#ef0a4f] font-semibold px-6 py-3 rounded-md outline-none w-full mt-3 hover:text-white hover:bg-[#ef0a4f]'*/}
                                {/*            onClick={renderProps.onClick}*/}
                                {/*            disabled={renderProps.disabled}*/}
                                {/*        >*/}
                                {/*            Log in*/}
                                {/*        </button>*/}
                                {/*    )}*/}
                                {/*    // onSuccess={(res) => fetchGoogleResponse(res, addUser)}*/}
                                {/*    // onFailure={(res) => fetchGoogleResponse(res, addUser)}*/}
                                {/*    cookiePolicy='single_host_origin'*/}
                                {/*/>*/}

                                        {/*<button*/}
                                        {/*    className='bg-white text-lg text-[#ef0a4f] border-[1px] border-[#ef0a4f] font-semibold px-6 py-3 rounded-md outline-none w-full mt-3 hover:text-white hover:bg-[#ef0a4f]'*/}
                                        {/*    onClick={() => login()}*/}
                                        {/*>*/}
                                        {/*    Log in*/}
                                        {/*</button>*/}


                                {/*<GoogleLogin*/}
                                {/*    onSuccess={(response) => createOrGetUser(response, addUser) }*/}
                                {/*    onError={() => console.log('Login Failed')}*/}
                                {/*/>*/}
                            {/*</div>*/}
                        </div>
                        // <div>
                        //
                        // </div>
                    // ) : (
                    //     <div className='flex gap-3 p-2 mt-4 cursor-pointer font-semibold rounded '>
                    //         <div className='md:w-16 md:h-16 w-10 h-10'>
                    //             <Link href={`/profile/${userProfile._id}`}>
                    //                 <>
                    //                     <Image
                    //                         width={62}
                    //                         height={62}
                    //                         className=' rounded-full'
                    //                         src={userProfile.image}
                    //                         alt='user-profile'
                    //                         layout='responsive'
                    //                     />
                    //                 </>
                    //             </Link>
                    //         </div>
                    //         <div>
                    //             <Link href={`/profile/${userProfile._id}`}>
                    //                 <>
                    //                     <div className='flex items-center gap-2'>
                    //                         <p className='flex gap-2 items-center md:text-md font-bold text-primary lowercase text-lg'>
                    //                             {/*{post.postedBy.userName}{' '}*/}
                    //                             {userProfile.userName.replace(/\s+/g, '')}{' '}
                    //                             <GoVerified className='text-[#50d4ec] text-md' />
                    //                         </p>
                    //
                    //                     </div>
                    //                     <p className='capitalize font-medium text-xs text-gray-500 hidden md:block'>
                    //                         {userProfile.userName}
                    //                     </p>
                    //                 </>
                    //             </Link>
                    //             {/*<Link href={`/detail/${post._id}`}>*/}
                    //             {/*    <p className='mt-2 mb-5 font-normal '>{post.caption}</p>*/}
                    //             {/*</Link>*/}
                    //         </div>
                    //     </div>
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
