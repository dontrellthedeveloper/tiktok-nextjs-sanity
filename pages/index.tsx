import type { NextPage } from 'next';
import axios from 'axios';
import { Video } from '../types';

interface IProps {
    videos: Video[];
}


const Home = ({videos}: IProps) => {
    console.log(videos)
  return (
      <div className='text-3xl'>
        Tiktok
      </div>
  )
}

export default Home;

export const getServerSideProps = async () => {
    const {data} = await axios.get(`http://localhost:3000/api/post`);


    return {
        props: {
            videos: data
        }
    }
};

