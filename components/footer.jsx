import React from 'react';
import NextLink from 'next/link';
import ReactWhatsapp from 'react-whatsapp';
import { ScaleOnHoverAnimation } from '../utils/animation';
const { motion } = require('framer-motion');
import { InstagramOutlined, FacebookOutlined } from '@ant-design/icons';

const Footer = () => {
  return (
    <div className="w-full px-5 pt-10 pb-2 mt-5 primary-blue-bg md:px-20 p">
      <div className="flex flex-row flex-wrap items-start justify-between w-full">
        <NextLink href={'/'} passHref>
          <div className="flex flex-row items-end w-auto">
            <h1 className="text-2xl font-extrabold text-white">BT</h1>
            <h4 className="text-white">Autoplace </h4>
          </div>
        </NextLink>

        {/* <div className="flex flex-col justify-start mt-3 mb-3 md:mb-0 md:mt-0 ">
          <h3 className="text-white">DOWNLOAD BTautoplace</h3>

          <div className="flex flex-row w-auto">
            <div className="flex flex-row items-start px-2 py-1 mr-2 bg-white rounded-lg">
              <Image width={20} height={20} src={ps} alt="" lazyloading />
              <div className="ml-1">
                <h4 className="text-sm">Download on the</h4>{' '}
                <h3 className="text-sm font-bold">Play Store</h3>
              </div>
            </div>

            <div className="flex flex-row items-start px-2 py-1 bg-white rounded-lg">
              <Image width={20} height={20} src={as} alt="" lazyloading />
              <div className="ml-1">
                <h4 className="text-sm">Download on the</h4>{' '}
                <h3 className="text-sm font-bold">App Store</h3>
              </div>
            </div>
          </div>
        </div> */}
      </div>
      <div className="flex flex-wrap justify-between w-full mt-4 md:w-3/4">
        <div className="text-white">
          <motion.h2 animate="animate" className="mb-3 text-sm font-semibold">
            About us
          </motion.h2>
          <NextLink href="/aboutus" passHref>
            <motion.h5
              variants={ScaleOnHoverAnimation}
              initial="initial"
              whileHover="hover"
              animate="animate"
              className="mt-3 text-sm hover:cursor-pointer hover:font-bold"
            >
              About us
            </motion.h5>
          </NextLink>
          <NextLink href="termsandconditions" passHref>
            <motion.h5
              variants={ScaleOnHoverAnimation}
              initial="initial"
              whileHover="hover"
              animate="animate"
              className="mt-3 text-sm hover:cursor-pointer hover:font-bold"
            >
              Terms and Conditions
            </motion.h5>
          </NextLink>

          <motion.h2
            variants={ScaleOnHoverAnimation}
            initial="initial"
            whileHover="hover"
            animate="animate"
            className="mt-3 text-sm hover:cursor-pointer hover:font-bold"
          >
            Privacy Policy
          </motion.h2>
        </div>

        <div className="text-white">
          <motion.h2 className="mb-3 text-sm font-semibold">Support</motion.h2>

          <motion.h5
            variants={ScaleOnHoverAnimation}
            initial="initial"
            whileHover="hover"
            animate="animate"
            className="mt-3 text-sm hover:cursor-pointer hover:font-bold"
          >
            Contact Us
          </motion.h5>

          <motion.h5
            variants={ScaleOnHoverAnimation}
            initial="initial"
            whileHover="hover"
            animate="animate"
            className="mt-3 text-sm hover:cursor-pointer hover:font-bold"
          >
            +2348065280371
          </motion.h5>

          <motion.h5
            variants={ScaleOnHoverAnimation}
            initial="initial"
            whileHover="hover"
            animate="animate"
            className="mt-3 text-sm hover:cursor-pointer hover:font-bold"
          >
            <ReactWhatsapp
              number={
                process.env.NEXT_PUBLIC_WHATAPP_NUMBER || '	+2348065280371'
              }
            >
              Chat Support
            </ReactWhatsapp>
          </motion.h5>
        </div>

        <div className="text-white">
          <h2 className="mb-3 text-sm font-semibold">Follow us on</h2>

          <motion.h5
            variants={ScaleOnHoverAnimation}
            initial="initial"
            whileHover="hover"
            animate="animate"
            className="mt-3 text-sm hover:cursor-pointer hover:font-bold"
          >
            <a href="_https://www.facebook.com/nnmadi.ikedife">
              <FacebookOutlined style={{ fontSize: '15px' }} />
            </a>
          </motion.h5>
          <motion.h5
            variants={ScaleOnHoverAnimation}
            initial="initial"
            whileHover="hover"
            animate="animate"
            className="mt-3 text-sm hover:cursor-pointer hover:font-bold"
          >
            <a href="https://instagram.com/nmsgroupng?igshid=YmMyMTA2M2Y=">
              <InstagramOutlined style={{ fontSize: '15px' }} />
            </a>
          </motion.h5>
        </div>
      </div>
      <div className="flex flex-row justify-center py-3 mt-5 bg-transparent p text-white">
        <p className=" md:text-[10px] text-[8px]">
          All rights reserved &copy; Bt-Autoplace
        </p>
      </div>
    </div>
  );
};

export default Footer;
