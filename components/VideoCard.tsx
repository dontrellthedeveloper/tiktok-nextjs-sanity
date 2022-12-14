import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from 'react';
import {NextPage} from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import { BsPlay } from 'react-icons/bs';

import { Video } from '../types';
import LikeButton from "./LikeButton";
import axios from "axios";
import {BASE_URL} from "../utils";
import useAuthStore from "../store/authStore";
import CommentButton from "./CommentButton";
import ShareButton from "./ShareButton";

interface IProps {
    post: Video
}


interface IProps {
    isPostingComment: Boolean;
    comment: string;
    setComment: Dispatch<SetStateAction<string>>;
    addComment: (e: React.FormEvent) => void;
    comments: IComment[];
}

interface IComment {
    comment: string;
    length?: number;
    _key: string;
    postedBy: { _ref?: string; _id?: string };
}


const VideoCard: NextPage<IProps> = ({post, comments}) => {
    const [isHover, setIsHover] = useState(false);
    const [postCard, setPostCard] = useState(post);
    const [playing, setPlaying] = useState(false);
    const [isVideoMuted, setIsVideoMuted] = useState(false);
    // const videoRef = useRef<HTMLVideoElement>(null);
    const videoRef2 = useRef<HTMLVideoElement>(null);
    const { userProfile }: any = useAuthStore();



    const handleLike = async (like: boolean) => {
        if (userProfile) {
            const {data} = await axios.put(`${BASE_URL}/api/like`, {
                userId: userProfile._id,
                postId: post._id,
                like
            });
            setPostCard({ ...post, likes: data.likes });
        }
    };




    const onVideoPress = () => {
        if (playing) {
            videoRef2?.current?.pause();
            setPlaying(false);
        } else {
            videoRef2?.current?.play();
            setPlaying(true);
        }
    }


    const videoHoverOn = () => {
        videoRef2?.current?.play();
        setPlaying(true);
    };

    const videoHoverOff = () => {
        videoRef2?.current?.pause();
        setPlaying(false);
    }

    useEffect(() => {
        let options = {
            rootMargin: "0px",
            // threshold: [0.25, 0.75]
            threshold: [0.90, 1]
        };

        let handlePlay = (entries: any, observe: any) => {
            entries.forEach((entry: any) => {
                if (entry.isIntersecting) {
                    videoRef2?.current?.play();
                } else {
                    videoRef2?.current?.pause();
                }
            });
        };

        let observer = new IntersectionObserver(handlePlay, options);

        observer.observe(videoRef2?.current!);
    });

    useEffect(() => {
        if (videoRef2?.current) {
            videoRef2.current.muted = isVideoMuted;
        }
    }, [isVideoMuted]);



    // const onVideoPress = () => {
    //     if (playing) {
    //         videoRef?.current?.pause();
    //         setPlaying(false);
    //     } else {
    //         videoRef?.current?.play();
    //         setPlaying(true);
    //     }
    // }
    //
    //
    // const videoHoverOn = () => {
    //     videoRef?.current?.play();
    //     setPlaying(true);
    // };
    //
    // const videoHoverOff = () => {
    //     videoRef?.current?.pause();
    //     setPlaying(false);
    // }
    //
    //
    //
    // useEffect(() => {
    //     if (videoRef?.current) {
    //         videoRef.current.muted = isVideoMuted;
    //     }
    // }, [isVideoMuted]);

    return (
        <div className='flex flex-col border-b-2 border-gray-200 pb-6'>
            <div>
                <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded '>
                    <div className='md:w-16 md:h-16 w-10 h-10'>
                        <Link href={`/profile/${postCard.postedBy._id}`}>
                            <>
                                <Image
                                    width={62}
                                    height={62}
                                    className=' rounded-full'
                                    src={postCard.postedBy?.image}
                                    alt='user-profile'
                                    layout='responsive'
                                />
                            </>
                        </Link>
                    </div>
                    <div>
                        <Link href={`/profile/${postCard.postedBy._id}`}>
                            <div className='flex items-center gap-2'>
                                <p className='flex gap-2 items-center md:text-md font-bold text-primary lowercase text-lg'>
                                    {/*{post.postedBy.userName}{' '}*/}
                                    {postCard.postedBy.userName.replace(/\s+/g, '')}{' '}
                                    <GoVerified className='text-[#50d4ec] text-md' />
                                </p>
                                <p className='capitalize font-medium text-xs text-gray-500 hidden md:block'>
                                    {postCard.postedBy.userName}
                                </p>
                            </div>
                        </Link>
                        <Link href={`/detail/${postCard._id}`}>
                            <p className='mt-2 mb-5 font-normal '>{postCard.caption}</p>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='lg:ml-20 flex gap-4 relative'>
                <div className='rounded-3xl'
                     // onMouseEnter={() => setIsHover(true)}
                     // onMouseLeave={() => setIsHover(false)}
                >

                    <Link href={`/detail/${postCard._id}`}>
                            <video
                                loop
                                src={postCard?.video?.asset.url}
                                ref={videoRef2}
                                onClick={onVideoPress}
                                controls
                                // onMouseOver={videoHoverOn}
                                // onMouseOut={videoHoverOff}
                                autoPlay
                                className='
                                {/*lg:w-[600px]*/}
                                h-[300px]
                                md:h-[400px]
                                lg:h-[528px]
                                {/*w-[200px] */}
                                w-full
                                rounded-2xl cursor-pointer bg-gray-100'
                            ></video>
                    </Link>

                    {/*{isHover && (*/}
                    {/*    <div className='absolute bottom-6 cursor-pointer*/}
                    {/*    /!*left-8 *!/*/}
                    {/*    left-4*/}
                    {/*    /!*md:left-14 *!/*/}
                    {/*    lg:left-4 flex gap-20*/}
                    {/*    /!*lg:justify-between*!/*/}
                    {/*    w-[100px] md:w-[50px] lg:w-[600px] p-3'>*/}
                    {/*        {playing ? (*/}
                    {/*            <button onClick={onVideoPress}>*/}
                    {/*                <BsFillPauseFill className='text-white text-2xl lg:text-3xl' />*/}
                    {/*            </button>*/}
                    {/*        ) : (*/}
                    {/*            <button onClick={onVideoPress}>*/}
                    {/*                <BsFillPlayFill className='text-white text-2xl lg:text-3xl' />*/}
                    {/*            </button>*/}
                    {/*        )}*/}
                    {/*        {isVideoMuted ? (*/}
                    {/*            <button onClick={() => setIsVideoMuted(false)}>*/}
                    {/*                <HiVolumeOff className='text-white text-2xl lg:text-2xl' />*/}
                    {/*            </button>*/}
                    {/*        ) : (*/}
                    {/*            <button onClick={() => setIsVideoMuted(true)}>*/}
                    {/*                <HiVolumeUp className='text-white text-2xl lg:text-2xl' />*/}
                    {/*            </button>*/}
                    {/*        )}*/}
                    {/*    </div>*/}
                    {/*)}*/}
                </div>
                <div className='flex flex-col-reverse'>
                    <ShareButton/>
                    <CommentButton
                        comments={postCard.comments}
                        postCard={postCard}
                    />
                    <LikeButton
                        likes={postCard.likes}
                        flex='flex'
                        handleLike={() => handleLike(true)}
                        handleDislike={() => handleLike(false)}
                        // handleLike={() =>{}}
                        // handleDislike={() => {}}
                    />

                </div>


            </div>
        </div>
    );
};

export default VideoCard;
