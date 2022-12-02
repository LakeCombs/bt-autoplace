/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React from "react";
import { justHoverAnimation } from "../utils/animation";
const { motion } = require("framer-motion");

const AboutUsCard = ({ name, position, img }) => {
	return (
		<motion.div
			variants={justHoverAnimation}
			initial="initial"
			whileHover="hover"
			className="flex flex-col rounded-md m-3 p-3 shadow-lg">
			<Image
				height="200px"
				width="200px"
				className="min-w-full h-full object-cover rounded-md text-sm bg-slate-400"
				alt={name}
				src={img}
			/>
			<h2 className="mt-2 text-base">{name}</h2>
			<h4 className="mt-1 text-sm max-w-full">{position}</h4>
		</motion.div>
	);
};

export default AboutUsCard;
