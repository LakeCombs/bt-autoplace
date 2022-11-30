/* eslint-disable @next/next/no-img-element */
import React from "react";
import image from "../public/locklock.svg";
import Image from "next/image";

const PremiumService = () => {
	return (
		<div>
			<div>
				<img height={50} width={50} src={image} alt="" />
			</div>
			<div>
				<h3>Quality Products</h3>
				<h5></h5>
			</div>
		</div>
	);
};

export default PremiumService;
