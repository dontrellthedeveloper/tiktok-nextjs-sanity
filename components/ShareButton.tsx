import React, { useEffect, useState } from 'react';
import { MdFavorite } from 'react-icons/md';
import { NextPage } from 'next';

import useAuthStore from '../store/authStore';
import {BsFillChatDotsFill, IoIosShareAlt} from "react-icons/all";

// interface IProps {
//     likes: any[];
//     flex: string;
//     handleLike: () => void;
//     handleDislike: () => void;
// }


const CommentButton = () => {
    // const [alreadyLiked, setAlreadyLiked] = useState(false);
    // const { userProfile }: any = useAuthStore();
    // let filterLikes = likes?.filter((item: any) => item._ref === userProfile?._id);
    //
    // useEffect(() => {
    //     if (filterLikes?.length > 0) {
    //         setAlreadyLiked(true);
    //     } else {
    //         setAlreadyLiked(false);
    //     }
    // }, [filterLikes, likes]);

    return (
        <div className={`gap-6 flex flex-col-reverse ml-2`}>
            <div className='mt-4 flex flex-col justify-center items-center cursor-pointer'>
                {/*{alreadyLiked ? (*/}
                <div className='bg-primary rounded-full p-2 md:p-4 text-black'
                    // onClick={handleDislike}
                >
                    <IoIosShareAlt className=' text-lg md:text-2xl '/>
                </div>


                {/*{alreadyLiked && (*/}
                {/*    <p className='text-md font-semibold '>{likes?.length || 0}</p>*/}
                {/*)}*/}

            </div>
        </div>
    );
};

export default CommentButton;