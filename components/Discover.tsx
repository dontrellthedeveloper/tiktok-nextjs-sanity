import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { topics } from '../utils/constants';
import {AiFillHome, AiOutlineHome} from "react-icons/ai";

const activeTopicStyle = 'xl:border-2 hover:bg-primary xl:border-[#ef0a4f] px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-[#ef0a4f]';
const topicStyle = 'xl:border-2 hover:bg-primary xl:border-gray-300 px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-black';

const normalLink = 'flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#ef0a4f] rounded';

const activeTopicLink = 'flex items-center gap-3 hover:bg-primary p-2 justify-center xl:justify-start cursor-pointer font-semibold text-[#ef0a4f] rounded';
const topicLink = 'flex items-center gap-3 hover:bg-primary p-2 justify-center xl:justify-start cursor-pointer font-semibold text-black rounded';

const Discover = () => {
    const router = useRouter();
    const { topic } = router.query;

    return (
        <div className='xl:border-b-2 xl:border-gray-200 pb-6'>
            <p className='text-gray-500 font-semibold m-3 mt-4 hidden xl:block'>
                Popular Topics
            </p>
            {/*<div className='flex gap-3 flex-wrap'>*/}
            {/*    {topics.map((item) => (*/}
            {/*        <Link href={`/?topic=${item.name}`} key={item.name}>*/}
            {/*            <div className={topic === item.name ? activeTopicStyle : topicStyle}>*/}
            {/*              <span className='font-bold text-2xl xl:text-md '>*/}
            {/*                {item.icon}*/}
            {/*              </span>*/}
            {/*              <span className={`font-medium text-md hidden xl:block capitalize`}>*/}
            {/*                {item.name}*/}
            {/*              </span>*/}
            {/*            </div>*/}
            {/*        </Link>*/}
            {/*    ))}*/}
            {/*</div>*/}

            {topics.map((item) => (
                <Link href={`/?topic=${item.name}`} key={item.name}>
                    <div className={topic === item.name ? activeTopicLink : topicLink}>
                        <p className='text-3xl'>
                            {item.icon}
                        </p>
                        <span className='capitalize text-md hidden xl:block'>
                            {item.name}
                        </span>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default Discover;
