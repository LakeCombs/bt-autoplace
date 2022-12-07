/* eslint-disable react/no-unescaped-entities */
import React from "react";
import dynamic from "next/dynamic";
import Layout from "../components/Layout";
import { motion } from "framer-motion";
import { parent1 } from "../utils/animation";

const TermAndCondition = () => {
	return (
		<Layout title="terms and contition">
			<motion.div
				variants={parent1}
				initial="initial"
				animate="animate"
				className="flex flex-col items-center justify-center w-full px-10 pt-10">
				<h1 className="md:text-[30px] text-[20px] ">Terms of Service</h1>
				<hr className="w-full mt-5 mb-5" />
				<p className="text-start  text-[13px]">
					<span className="text-[14px] text-center flex justify-center w-full">
						BATTERY & TYRE AUTOPLACE TERMS AND CONDITIONS <br />
						Effective date: November 11, 2022 <br />
						These terms and conditions apply to You, the user of this website
						<br />
						(including any sub-domains, unless expressly excluded by their own
						terms and conditions),
						<br /> and Nnamdi Ikedife, the owner and operator of the following
						website: Battery & Tyre Autoplace, with the the following URL web
						address: btautoplace.com.
						<br /> PLEASE READ THE TERMS AND CONDITIONS CAREFULLY as they affect
						Your legal right. <br />
						<br />
					</span>
					1. Definitions <br />
					"Parties" means both You (the user of the Service) and the Owner of
					this Service. "Content" means any content, writing, images,
					audiovisual content or other information published on this Service.
					<br /> "Materials" means any materials, information, or documentation
					that we may provide to You in connection with Your use of the Products
					including documentation, data, information developed for any use, and
					other materials which may assist in Your use of the Goods or Service.
					<br />
					"Terms" means these terms and conditions.
					<br /> "Service" means the website including all pages, sub-pages, all
					blogs, forums and other connected internet content whatsoever.
					<br />
					"Products" means the goods and products both tangible and intangible
					offered on the Website.
					<br />
					"Services" means the services offered on the Website. <br />
					<br />
					2. About this Battery & Tyre Autoplace <br />
					The Website is an online and physical store located in Idumota and
					Tradefair that engages in the sale of the following Products and
					Services: Solar Battery, Truck Battery, Car Battery, Truck Tyre Car,
					Tyre This Website is comprised of various web pages operated by
					BTautoplace team. <br />
					This Service is offered to You upon Your acceptance of the Terms,
					conditions, and notices hereinafter contained. Your use of this
					Service constitutes Your agreement to all the Terms contained herein.
					<br />
					<br />
					3. Agreement <br />
					a. By using this Website, You acknowledge that You have reviewed, and
					considered the Terms of this Agreement and understand same and agree
					to be bound by it. <br />
					If You do not agree with these Terms or do not intend to be bound by
					them, You must quit the use of this Website immediately.
					<br /> In addition, when using these services, You shall be subject to
					any posted guidelines or rules applicable to such services.
					Accordingly, any participation in this Service shall constitute
					acceptance of this Agreement.
					<br />
					<br /> 4. Acceptable Use
					<br /> a. We may provide You with other items in connection with Your
					use of this Service. <br />
					b. We hereby grant You the license to use our Service for Your
					personal, non-commercial use to retrieve, display and view the Content
					on a computer screen.
					<br />
					c. The license created under these Terms is limited, non-exclusive,
					non-transferable and revocable. <br />
					d. You agree that You will not use the Contents or Materials for any
					other purposes which may be contrary to your license to use this
					Service.
					<br /> e. Any unauthorized use by You shall terminate the permission
					or license granted by this Website. <br />
					<br />
					5. Prohibited Use <br />
					a. You are expressly prohibited from collecting, downloading, copying
					or otherwise communicating with other Users from the Website.
					<br />
					b. You agree not to use the Service in the following manner: <br />
					(I). to harass, abuse or threaten others or otherwise violate any
					person's legal rights; <br />
					(II). to perpetrate fraud; <br />
					(III). to create or transmit unnecessary spam to any person or URL;{" "}
					<br />
					(IV). to post, transmit or cause to be posted or transmitted, any
					communication or solicitation designed to obtain password, account, or
					private information of other Users or persons; <br />
					(V). to post copyrighted content that does not belong to You and
					without obtaining the prior consent of the author; <br />
					(VI). to use a robot, spider, scraper, or other automated means to
					access this Service without obtaining the prior consent of the Owner;
					<br />
					(VII). to engage in or create any unlawful gambling, sweepstakes, or
					scheme; <br />
					(VIII). publishing or distributing any obscene or defamatory material;
					<br />
					(IX). using this Service in any way that impacts user access to the
					Website; <br />
					(X). to engage in an advertisement or solicit any User to buy or sell
					products or services without obtaining the prior consent of the Owner;
					<br />
					(XI). disseminating computer viruses or other software; <br />
					(XII). violating any intellectual property rights of the Owner or any
					third party; <br />
					(XIII). to use the Website or any of the Services for illegal spam
					activities. <br />
					c. Additionally, you agree that You will not do as follows: (I).
					interfere or attempt to interfere with the proper working of this
					Website; or
					<br /> (II). bypass any measures we may use to prevent or restrict
					access to this Website; <br />
					(III). to interfere with or circumvent the security features of this
					Service; <br />
					(IV). to damage, disable, overburden or impair this Service or any
					other person's use of this Service. <br />
					(V). to use this Service contrary to the applicable laws and
					regulations or in a way that causes, or may cause harm to this
					Website, any person, or business entity. We reserve the right to
					terminate Your use of the Service for violating any of the prohibited
					uses. <br />
					<br />
					6. Intellectual Property Ownership <br />
					a. You agree that we retain ownership of all Content included on the
					Website (text, graphics, video, software, data, page layout, images,
					and any other information capable of being stored in a computer) other
					than the contents uploaded by users. <br />
					b. You are granted a limited license only, subject to the restrictions
					provided in this Terms, nothing on this Website shall be construed as
					granting any license or right to use any trademark or logo displayed
					on the Website without obtaining the prior written consent of the
					Owner. <br />
					c. You hereby agree not to reproduce or distribute the Owner's
					intellectual property or use the intellectual property for any
					unlawful purpose. <br /> <br />
					7. User Account <br />
					a. You may be required to register with us to have access to our
					Products and Service. <br />
					b. You will be required to provide certain personal information, which
					includes but is not limited to Your name, user name, email address,
					and password. The information provided must be correct and accurate.
					<br />
					c. This personal information must not be disseminated to anyone and
					when You discover that Your information has been compromised, You
					agree to notify us immediately. You also acknowledge that You are
					responsible for the security of Your personal information and that the
					Owner does not accept liability for the security of Your account as
					You agree to be responsible for maintaining the confidentiality of
					Your passwords or other account identifiers which You choose and all
					activities under Your account. <br />
					d. The Owner reserves the right to terminate Your account where You
					have provided false inaccurate or incorrect information. <br />
					e. It is at the sole discretion of the Owner to terminate the account
					or refuse to sell any Product or Services to any User at any time and
					for any reason. <br />
					<br />
					8. Sale of Goods/Services <br />
					a. The Website may offer Products or Services for sale. The Owner
					undertakes to give accurate information about the description of the
					Products and Services. However, the Owner does not guarantee the
					reliability of any information relating to the Products and Services.
					<br />
					b. We reserve the right to refuse to sell the Products and Services on
					the Website at our sole discretion. <br />
					c. If You are not satisfied with Your purchase, the following applies
					to You: If upon delivery, you discover any minor defect on our
					product: you are required to return it for exchange within 2(two)
					weeks of purchase. That is, a 2(two) week's warranty on every product
					purchased. <br />
					<br />
					9. Payment and Billing <br />
					a. The total price will also include the taxes applicable on the date
					of purchase. <br />
					b. The total price of the Products and Services including all
					applicable taxes are included upon the confirmation of Your order.
					<br />
					<br /> 10. Delivery/Shipping of Products <br />
					a. We do not make deliveries outside Nigeria. <br />
					b. We use the following delivery services to deliver our Products:
					________ <br />
					c. The Products purchased will be delivered to the address You provide
					within the following period: 24 hours within Lagos and 48 hours
					outside Lagos (within Nigeria). The Products may be delivered in
					installments. <br />
					d. If nobody is available to take the delivery, You are required to
					contact us. <br />
					<br />
					11. Performance of Services Upon payment for our Services.
					<br /> We may offer You the opportunity to book a time and date for
					the performance of the Services. The Services will be performed within
					a reasonable time. If You have any questions regarding the time and
					date for the performance, contact us. <br />
					<br />
					12. Privacy Policy To use our Service
					<br /> We require that You provide certain personal information, by
					using our Service, You hereby grant the Owner the authority of the
					Owner to use Your personal information. <br />
					a. Information we collect and use: <br />
					For registered users: You provide personal information, such as Your
					name, user name, email address, or billing information if You register
					for an account with the Service. <br />
					We may also require other information in relation to but not limited
					to the following: receiving notifications by text message or email
					about marketing; receiving general emails from Us; commenting on our
					Content on our Website; and the purchases You make. <br />
					For unregistered users: We will collect passive information from all
					registered and unregistered users. <br />
					This information includes cookies, IP address information, location
					information, and certain browser information. Sales and billing
					information: We may collect Your credit and/or debit card information,
					which includes Your card number, password, etc, Your billing address,
					Your contact address, and other information required for Your
					purchases. <br />
					User experience: <br />
					From time to time we may also request certain Personal Data that may
					be necessary to improve our Service and the Products and Services we
					offer for sale on the Website. <br />
					We may also receive information from external applications You use to
					access our Service or information through various web technologies,
					such as cookies, log files, and clear gifts with Your permission.{" "}
					<br />
					b. How we use the information:
					<br /> We use Your information to provide personalized service to You.
					We also use it to help monitor and improve the Service we offer. We
					may also track certain information received to improve our marketing.
					We will only use Your personal data for the purpose it was intended
					for and with Your permission. <br />
					c. How to protect Your information: We will use administrative
					security measures to reduce the risks of loss or misuse. While the
					security of Your information is paramount to us, we cannot guarantee
					its absolute security. If You choose to terminate Your account, Your
					personal information will be deleted immediately. <br />
					<br />
					13. Links to Third-Party Sites/Services <br />
					The website may contain links to other websites. These Linked Sites
					are not under our control and You agree that we are not liable for the
					contents of any Linked Sites or links contained in any Linked Site.
					<br />
					<br />
					14. Electronic Communications
					<br /> You consent to receive electronic communications and You agree
					that all agreements, notices, disclosures, and other communications we
					provide to You electronically, via email, and on this Website, satisfy
					any legal requirements that communications must be in writing. <br />
					<br />
					15. Reverse Engineering and Security You hereby agree as follows:{" "}
					<br />
					(I). not to reverse engineer or permit the reverse engineering or
					disassemble any code or software from or on the Website or Services;
					and <br />
					(II). not to violate the Security of the Website or other Services
					through any unauthorized access, circumvention of encryption, or other
					security tools, data mining, or interference with any host User or
					network.
					<br />
					<br />
					16. Change to Service <br />
					a. You accept that the Owner may vary, alter, amend, or update the
					Content or Services, Products, and Services at any time and without
					Your consent. <br />
					b. You also agree that the Products and Services may not be available
					at all times and this may be as a result of the maintenance or for any
					other reason and we shall not be held liable for the failure to
					provide this Service. <br />
					<br />
					17. Indemnification <br />
					You hereby agree to indemnify the Owner, its employees, agents; and
					third parties from and against all liabilities, costs, demands, causes
					of action, damages; and expenses (including reasonable attorney's
					fees) arising out of Your use or inability to use, Your violation of
					any rights of a third party and Your violation of applicable laws,
					rules or regulation. <br />
					<br />
					18. No Warranties You agree that You use this Website solely at Your
					risk as the Owner does not warrant the accuracy of the contents of
					this Website. You assume all the risk of viewing, reading, or
					downloading the contents of this Website. <br />
					The Owner expressly disclaims all express and implied warranties such
					as implied warranty of merchantability as the Owner makes no
					warranties that the Website or other Services will be accurate,
					error-free, secure or uninterrupted. <br />
					The Owner makes no warranty about the suitability, reliability,
					availability, timeliness, and accuracy of the information, Contents,
					Products, Services, and other materials contained herein for any
					purpose. <br />
					The Owner hereby disclaims all warranties and conditions with regard
					to the information, software, Products, related graphics and
					materials, including all implied warranties or conditions of
					merchantability, fitness for a particular purpose, title, and
					non-infringement. <br />
					You also agree that the Owner and its affiliates shall not be liable
					for any direct, indirect, punitive, and all consequential damages or
					any damages whatsoever including, but not limited to damages for loss
					of use, data, or profits, the failure to provide Services or for any
					information, software, Products, Services, related graphics and
					materials obtained through this Website, or otherwise arising out of
					the use of this Website, whether based on contract, negligence, strict
					liability, or otherwise.
					<br />
					<br /> 19. Service Interruptions <br />
					The Owner may from time to time interrupt Your access or use of this
					Website to perform some maintenance or emergency services and You
					agree that the Owner shall not be held liable for any damage, or loss
					that may arise thereof. <br />
					<br />
					20. Termination/Restriction of Access <br />
					The Owner reserves the right to, at its sole discretion, terminate
					Your access to this Website and the related Service or any part
					thereof at any time, for any reason, and without notice. <br />
					The Owner shall have the right to terminate or terminate/suspend Your
					account for violating the Terms of this Service. <br />
					If You register with us, You may terminate this Service at any time by
					issuing a prior notice to us. Once this is done, You will no longer be
					bound by the provisions of these Terms. <br />
					<br />
					21. General Provisions <br />
					a. Assignment: The Owner shall be permitted to assign, and transfer
					its rights and/or obligations under these Terms. However, You shall
					not be permitted to assign or transfer any rights and/or obligations
					under these Terms. <br />
					b. Entire Agreement: These Terms, disclaimers, and any other agreement
					relating to the use of this Website constitutes the entire agreement
					and shall supersede any other agreement. <br />
					c. Separate Agreements: You may have other legal agreements with us.
					Those agreements are separate from these Terms. These Terms are not
					intended to alter, amend, revise or replace the terms of the other
					agreement. <br />
					d. Applicable law: These Terms may be governed and construed in
					accordance with the Laws, regulations, or guidelines of The Federal
					Republic of Nigeria and other treaties, or regulations which is
					applicable in Nigeria.
				</p>
			</motion.div>
		</Layout>
	);
};

export default dynamic(() => Promise.resolve(TermAndCondition), { ssr: false });
