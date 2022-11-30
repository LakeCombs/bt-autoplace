import React from "react";
import AboutUsCard from "../components/AboutUsCard";
import Layout from "../components/Layout";
import PremiumService from "../components/PremiumServiceOption";
import { parent1 } from "../utils/animation";
const { motion } = require("framer-motion");

const AboutUs = () => {
	return (
		<Layout title={"About us"}>
			<motion.div
				variants={parent1}
				initial="initial"
				animate="animate"
				className="w-full flex py-10 justify-center flex-col items-center">
				<h1 className="text-lg">About us</h1>

				<h2 className=" w-3/4 md:w-1/2 md:text-base mt-10 text-sm leading-7 text-center">
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
				<div className="mt-8 md:w-4/5 w-full flex flex-wrap justify-around px-10">
					<AboutUsCard
						name="Gozie Igbokwe"
						position="Digital marketer"
						img={""}
					/>

					<AboutUsCard
						name="Ikedife Nnamdi"
						position="Data scientist/Business analyst"
						img={""}
					/>

					<AboutUsCard
						name="Mrs Chukwuma Ifey"
						position="General administration"
						img={""}
					/>
					<AboutUsCard name="Rebecca" position="UI/UX designer" img={""} />
				</div>
			</motion.div>
		</Layout>
	);
};

export default AboutUs;
