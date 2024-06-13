import Link from "next/link";


import { FaGithub, FaLinkedin, FaTwitter, FaEnvelopeOpen } from 'react-icons/fa'

const socials = [
  { icon: <FaGithub />, path: "https://www.github.com/mmolalekan" },
  { icon: <FaLinkedin />, path: "https://linkedin.com/in/abdulmuhaymin-olalekan-464020143/" },
  { icon: <FaEnvelopeOpen />, path: "mailto:abdulmuhayminolalekan@gmail.com" },
  { icon: <FaTwitter />, path: "https://twitter.com/mm_olalekan" },
]

const Social = ({ containerStyles, iconStyles }) => {
  return (
    <div className={containerStyles}>
      {socials.map((item, index) => {
        return (
          <Link key={index} href={item.path} className={iconStyles}>
            {item.icon}
          </Link>
        )
      })}
    </div>
  );
};

export default Social;