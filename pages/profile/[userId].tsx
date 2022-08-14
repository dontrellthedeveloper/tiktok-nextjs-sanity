import React, {useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import { GoVerified } from 'react-icons/go';
import axios from 'axios';

import VideoCard from '../../components/VideoCard';
import NoResults from '../../components/NoResults';
import { IUser, Video } from '../../types';
import { BASE_URL } from '../../utils';
import Link from "next/link";
import {HiVolumeOff, HiVolumeUp} from "react-icons/hi";
import {BsFillPauseFill, BsFillPlayFill} from "react-icons/bs";


interface IProps {
    data: {
        user: IUser;
        userVideos: Video[];
        userLikedVideos: Video[];
    };
}


const Profile = ({ data }: IProps) => {
    const [showUserVideos, setShowUserVideos] = useState<Boolean>(true);
    const [videosList, setVideosList] = useState<Video[]>([]);


    const { user, userVideos, userLikedVideos } = data;
    const videos = showUserVideos ? 'border-b-2 border-black' : 'text-gray-400';
    const liked = !showUserVideos ? 'border-b-2 border-black' : 'text-gray-400';

    useEffect(() => {
        const fetchVideos = async () => {
            if (showUserVideos) {
                setVideosList(userVideos);
            } else {
                setVideosList(userLikedVideos);
            }
        };

        fetchVideos();
    }, [showUserVideos, userLikedVideos, userVideos]);



    return (
        <div className='w-full'>
            <div className='flex gap-6 md:gap-10 mb-4 bg-white w-full'>
                <div className='w-16 h-16 md:w-32 md:h-32'>
                    <Image
                        width={120}
                        height={120}
                        layout='responsive'
                        className='rounded-full'
                        src={user.image}
                        alt='user-profile'
                    />
                </div>
                <div className='flex flex-col justify-center'>
                    <div className='text-md md:text-2xl font-bold tracking-wider flex gap-2 items-center justify-center lowercase'>
                        <span>{user.userName.replaceAll(' ', '')} </span>
                        <GoVerified className='text-blue-400 md:text-xl text-md' />
                    </div>
                    <p className='text-sm font-medium'> {user.userName}</p>
                </div>
            </div>
            <div>
                <div className='flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full'>
                    <p className={`text-xl font-semibold cursor-pointer ${videos} mt-2`} onClick={() => setShowUserVideos(true)}>
                        Videos
                    </p>
                    <p className={`text-xl font-semibold cursor-pointer ${liked} mt-2`} onClick={() => setShowUserVideos(false)}>
                        Liked
                    </p>
                </div>
                <div className='
                            {/*flex */}
                            {/*flex-wrap */}
                            {/*block */}
                            {/*gap-6 */}
                            md:justify-start'>
                    {videosList.length > 0 ? (
                        videosList.map((post: Video, idx: number) => (
                            <VideoCard key={idx} post={post} />


                        // <div className='flex flex-col border-b-2 border-gray-200 pb-6'>
                        //     <div>
                        //         <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded '>
                        //             <div className='md:w-16 md:h-16 w-10 h-10'>
                        //                 <Link href={`/profile/${post.postedBy._id}`}>
                        //                     <>
                        //                         <Image
                        //                             width={62}
                        //                             height={62}
                        //                             className=' rounded-full'
                        //                             src={post.postedBy?.image}
                        //                             alt='user-profile'
                        //                             layout='responsive'
                        //                         />
                        //                     </>
                        //                 </Link>
                        //             </div>
                        //             <div>
                        //                 <Link href={`/profile/${post.postedBy._id}`}>
                        //                     <div className='flex items-center gap-2'>
                        //                         <p className='flex gap-2 items-center md:text-md font-bold text-primary'>
                        //                             {post.postedBy.userName}{' '}
                        //                             <GoVerified className='text-blue-400 text-md' />
                        //                         </p>
                        //                         <p className='capitalize font-medium text-xs text-gray-500 hidden md:block'>
                        //                             {post.postedBy.userName}
                        //                         </p>
                        //                     </div>
                        //                 </Link>
                        //                 <Link href={`/detail/${post._id}`}>
                        //                     <p className='mt-2 mb-5 font-normal '>{post.caption}</p>
                        //                 </Link>
                        //                 {/*<Link href={`/detail/${post._id}`}>*/}
                        //                 {/*    <p className='mt-2 mb-5 font-normal '>#Photography #West Coast #LA</p>*/}
                        //                 {/*</Link>*/}
                        //             </div>
                        //         </div>
                        //     </div>
                        //     <div className='lg:ml-20 flex gap-4 relative'>
                        //         <div className='rounded-3xl'
                        //              onMouseEnter={() => setIsHover(true)}
                        //              onMouseLeave={() => setIsHover(false)}
                        //         >
                        //
                        //             <Link href={`/detail/${post._id}`}>
                        //                 <video
                        //                     loop
                        //                     src={post.video.asset.url}
                        //                     ref={videoRef}
                        //                     onClick={onVideoPress}
                        //                     onMouseOver={videoHoverOn}
                        //                     onMouseOut={videoHoverOff}
                        //                     className='
                        //         {/*lg:w-[600px]*/}
                        //         h-[300px]
                        //         md:h-[400px]
                        //         lg:h-[528px]
                        //         {/*w-[200px] */}
                        //         w-full
                        //         rounded-2xl cursor-pointer bg-gray-100'
                        //                 ></video>
                        //             </Link>
                        //
                        //             {isHover && (
                        //             <div className='absolute bottom-6 cursor-pointer
                        //                             {/*left-8 */}
                        //                             left-4
                        //                             {/*md:left-14 */}
                        //                             lg:left-4 flex gap-20
                        //                             {/*lg:justify-between*/}
                        //                             w-[100px] md:w-[50px] lg:w-[600px] p-3'>
                        //                 {playing ? (
                        //                     <button onClick={onVideoPress}>
                        //                         <BsFillPauseFill className='text-white text-2xl lg:text-3xl' />
                        //                     </button>
                        //                 ) : (
                        //                     <button onClick={onVideoPress}>
                        //                         <BsFillPlayFill className='text-white text-2xl lg:text-4xl' />
                        //                     </button>
                        //                 )}
                        //                 {isVideoMuted ? (
                        //                     <button onClick={() => setIsVideoMuted(false)}>
                        //                         <HiVolumeOff className='text-white text-2xl lg:text-2xl' />
                        //                     </button>
                        //                 ) : (
                        //                     <button onClick={() => setIsVideoMuted(true)}>
                        //                         <HiVolumeUp className='text-white text-2xl lg:text-2xl' />
                        //                     </button>
                        //                 )}
                        //             </div>
                        //             )}
                        //         </div>
                        //     </div>
                        // </div>
                        ))
                    ) : (
                        <NoResults
                            text={`No ${showUserVideos ? '' : 'Liked'} Videos Yet`}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export const getServerSideProps = async ({
    params: { userId },
}: {
    params: { userId: string };
}) => {
    const res = await axios.get(`${BASE_URL}/api/profile/${userId}`);

    return {
        props: { data: res.data },
    };
};
export default Profile;
