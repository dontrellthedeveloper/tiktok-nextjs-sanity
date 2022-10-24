import type { NextPage } from 'next';
import axios from 'axios';



import VideoCard from '../components/VideoCard';
import { Video } from '../types';
import NoResults from '../components/NoResults';
import {BASE_URL} from "../utils";
import React, {Dispatch, SetStateAction} from "react";

// interface IProps {
//     videos: Video[];
// }




interface IProps {
    videos: Video[];
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




const Home = ({videos, comment, setComment, addComment, comments, isPostingComment}: IProps) => {
    // console.log(videos)
  return (
      <div className='flex flex-col gap-10 videos h-full'>
          {videos.length
              ? videos?.map((video: Video) => (
                  <VideoCard post={video} key={video._id} comment={comment} setComment={setComment} addComment={addComment} comments={comments} isPostingComment={isPostingComment}   />
              ))
              : <NoResults text={`No Videos`} />}
      </div>
  )
}

export default Home;

export const getServerSideProps = async ({
query: { topic },
}: {
    query: { topic: string };
}) => {
    let response = await axios.get(`${BASE_URL}/api/post`);

    if(topic) {
        response = await axios.get(`${BASE_URL}/api/discover/${topic}`);
    }

    return {
        props: { videos: response.data },
    };
};

