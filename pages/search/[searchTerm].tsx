import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { GoVerified } from 'react-icons/go';
import Link from 'next/link';
import axios from 'axios';

import NoResults from '../../components/NoResults';
import VideoCard from '../../components/VideoCard';
import useAuthStore from '../../store/authStore';
import { BASE_URL } from '../../utils';
import { IUser, Video } from '../../types';

const Search = ({ videos }: { videos: Video[] }) => {
    const [isAccounts, setIsAccounts] = useState(false);
    const { allUsers }: { allUsers: IUser[] } = useAuthStore();

    const router = useRouter();
    const { searchTerm }: any = router.query;

    const accounts = isAccounts ? 'border-b-2 border-black' : 'text-gray-400';
    const isVideos = !isAccounts ? 'border-b-2 border-black' : 'text-gray-400';

    const searchedAccounts = allUsers?.filter((user: IUser) => user.userName.toLowerCase().includes(searchTerm));

    console.log(videos);

    return (
        <div className='w-full  '>
            <div className='flex gap-10 mb-10 border-b-2 border-gray-200 md:fixed z-50 bg-white w-full'>
                <p onClick={() => setIsAccounts(true)} className={`text-xl  font-semibold cursor-pointer ${accounts} mt-2`}>
                    Accounts
                </p>
                <p className={`text-xl font-semibold cursor-pointer ${isVideos} mt-2`} onClick={() => setIsAccounts(false)}>
                    Videos
                </p>
            </div>
            {isAccounts ? (
                <div className='md:mt-16'>

                </div>
            ) : (
                <div className='md:mt-16 flex flex-wrap gap-6 md:justify-start '>
                    {videos.length ? (
                        videos.map((video: Video, idx: number) => (
                            <VideoCard post={video} key={idx} />
                        ))
                    ) : (
                        <NoResults text={`No Video Results for ${searchTerm}`} />
                    )}
                </div>
            )}
        </div>
    );
};

export const getServerSideProps = async ({
params: { searchTerm },
                                         }: {
    params: { searchTerm: string };
}) => {
    const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

    return {
        props: { videos: res.data },
    };
};

export default Search;