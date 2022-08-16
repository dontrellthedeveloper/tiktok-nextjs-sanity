import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import { MdFavorite } from 'react-icons/md';
import { NextPage } from 'next';
import Link from 'next/link';
import useAuthStore from '../store/authStore';
import {BsFillChatDotsFill} from "react-icons/bs";
import {Video} from "../types";

// interface IProps {
//     likes: any[];
//     flex: string;
//     handleLike: () => void;
//     handleDislike: () => void;
// }

interface IProps {
    post: Video
}


interface IProps {
    isPostingComment: Boolean;
    comment: string;
    setComment: Dispatch<SetStateAction<string>>;
    addComment: (e: React.FormEvent) => void;
    comments: any[];
}

interface IComment {
    comment: string;
    length?: number;
    _key: string;
    postedBy: { _ref?: string; _id?: string };
}




const CommentButton = ({postCard}: any, {comments}: IProps) => {
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
            <div className='mt-2 flex flex-col justify-center items-center cursor-pointer'>
                {/*{alreadyLiked ? (*/}
                <Link href={`/detail/${postCard._id}`}>
                    <button className='bg-primary rounded-full p-2 md:p-4 text-black'
                        // onClick={handleDislike}

                    >
                        <BsFillChatDotsFill className=' text-lg md:text-2xl '/>
                    </button>
                </Link>


                {/*{alreadyLiked && (*/}
                    <p className='text-xs mt-0.5 font-semibold '>{postCard.comments?.length || 0}</p>
                {/*)}*/}

            </div>
        </div>
    );
};

export default CommentButton;
