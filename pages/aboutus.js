import React from 'react';
import AboutUsCard from '../components/AboutUsCard';
import Layout from '../components/Layout';
import { parent1 } from '../utils/animation';
const { motion } = require('framer-motion');

const AboutUs = () => {
  return (
    <Layout title={'About us'}>
      <motion.div
        variants={parent1}
        initial="initial"
        animate="animate"
        className="flex flex-col items-center justify-center w-full py-10"
      >
        <h1 className="text-lg">About us</h1>

        <h2 className="w-3/4 pt-10 text-sm leading-7 text-center md:w-1/2 md:text-base">
          We are a tech company that leverages on technology to deliver auto
          spare parts products ranging from auto batteries, solar batteries,
          tyres and other auto spare sparts. <br />
          We also provide services ranging from software development, data
          science and machine learning, software testing, tech training and
          cyber security.
          <br /> We have our location in trade fair complex, idumota and ago
          Palace way.
        </h2>

        <h1 className="mt-10">Meet the Team</h1>
        <div className="flex flex-wrap justify-around w-full px-10 mt-8 md:w-4/5">
          <AboutUsCard
            name="Gozie Igbokwe"
            position="Digital marketer"
            img={
              'https://res.cloudinary.com/venture-square/image/upload/v1669977663/samples/btautoplace/WhatsApp_Image_2022-12-02_at_11.14.31_AM_hn79ej.jpg'
            }
          />

          <AboutUsCard
            name="Ikedife Nnamdi"
            position="Data scientist/Business analyst"
            img={
              'https://res.cloudinary.com/venture-square/image/upload/v1669977662/samples/btautoplace/WhatsApp_Image_2022-12-02_at_11.20.38_AM_b464cm.jpg'
            }
          />

          <AboutUsCard
            name="Mrs Chukwuma Ifey"
            position="General administration"
            img={
              'https://res.cloudinary.com/venture-square/image/upload/v1669977782/samples/btautoplace/WhatsApp_Image_2022-12-02_at_10.55.53_AM_dvlqlk.jpg'
            }
          />
          <AboutUsCard
            name="Rebecca"
            position="UI/UX designer"
            img={
              'https://res.cloudinary.com/venture-square/image/upload/v1669977746/samples/btautoplace/WhatsApp_Image_2022-12-02_at_11.31.59_AM_rcub6b.jpg'
            }
          />
        </div>
      </motion.div>
    </Layout>
  );
};

export default AboutUs;
