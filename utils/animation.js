export const parent1 = {
	initial: {
		opacity: 0,
		y: "50px",
	},
	animate: {
		opacity: 1,
		y: 0,
		transition: {
			delay: 2,
			type: "spring",
			duration: 4,
			mass: 0.4,
			damping: 80,
			when: "beforeChildren",
			staggerChildren: 5,
		},
		whileInView: {
			opacity: 0,
			y: "50px",
		},
	},
};

export const scaleohHover = {
	initial: {
		scale: 1,
	},
	animate: {},
	hover: {
		scale: 1.1,
		transition: "spring",
		duration: 1,
		stiffness: 250,
		originX: 0,
	},
};

export const slideInRight = {
	initial: { x: "100vw" },
	animate: {
		x: 0,
		transition: {
			type: "spring",
			duration: 4,
			mass: 3,
			damping: 10,
		},
	},
};

export const ScaleOnHoverAnimation = {
	initial: { scale: 1 },
	hover: {
		scale: 1.1,
		originX: 0,
		transition: {
			stiffness: 300,
			type: "spring",
		},
	},
};

export const animateSVG = {
	initial: {
		rotate: -100,
	},
	animate: {
		rotate: 0,
		transition: { duration: 1 },
	},
};

export const animateSVGPath = {
	initial: {
		opacity: 0,
		pathLength: 0,
	},
	animate: {
		opacity: 1,
		pathLength: 1,
		transition: {
			duration: 2,
			ease: "easeInOut",
		},
	},
};

export const slideInRightAnimation = {
	initial: {
		x: "50vw",
		scale: 1.2,
	},
	animate: {
		x: 0,
		y: 0,
		scale: 1,
		transition: {
			duration: 1.2,
			ease: "easeInOut",
		},
	},
};

export const slideInLeftAnimation = {
	initial: {
		x: "-50vw",
		scale: 1.2,
	},
	animate: {
		x: 0,
		y: 0,
		scale: 1,
		transition: {
			duration: 1.2,
			ease: "easeInOut",
		},
	},
};

export const tableContentAnimation = {
	initial: {
		y: 30,
		opacity: 0,
	},
	animate: {
		y: 0,
		opacity: 1,
		transition: {
			duration: 1.2,
			ease: "easeIn",
		},
	},
};

export const justHoverAnimation = {
	initial: {
		scale: 1,
	},

	hover: {
		scale: 1.2,
		transition: {
			type: String,
			duration: 0.5,
			// stiffness: 2000,
			// dampness: 10,
		},
	},
};

export const pulseAnimation = {
	initial: {
		scale: 1,
	},
	animate: {
		scale: 1.1,
		boxShadow: "0px 0px 5px rgb(225, 225, 225)",
		transition: {
			yoyo: Infinity,
			duration: 1,
		},
	},

	hover: {
		scale: 1.1,
	},
};

export const appearOnlyAnimation = {
	initial: {
		opacity: 0,
	},
	animate: {
		opacity: 1,
		transition: {
			delay: 1,
			duration: 2,
		},
	},
};

export const zoomOutAnimation = {
	inital: {
		scale: 1,
	},
	hover: {
		scale: 0.9,
		transition: {
			stiffness: 350,
			type: "spring",
		},
	},
};
