/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import {
  FaFacebookSquare,
  FaTwitter,
  FaRedditSquare,
  FaWhatsapp,
  FaInstagramSquare,
} from "react-icons/fa";

const SocialShareBtn = ({ url, title }) => {
  return (
    <div className="w-full flex justify-between">
      <a target="_blank" rel="noreferrer" href="/">
        <FaFacebookSquare className="text-[#3b5998] w-12 h-auto" />
      </a>
      <a
        target="_blank"
        rel="noreferrer"
        href={`https://twitter.com/intent/tweet?url=${url}`}
      >
        <FaTwitter className="text-[#00acee] w-12 h-auto" />
      </a>
      <a
        target="_blank"
        rel="noreferrer"
        href={`http://www.reddit.com/submit?url=${url}&title=${title}`}
      >
        <FaRedditSquare className="text-[#ff4500] w-12 h-auto" />
      </a>
      <a
        target="_blank"
        rel="noreferrer"
        href={`https://api.whatsapp.com/send/?text=${url}`}
      >
        <FaWhatsapp className="text-[#25D366] w-12 h-auto" />
      </a>
      <a target="_blank" rel="noreferrer" href="/">
        <FaInstagramSquare className="text-[#fc42c1] w-12 h-auto" />
      </a>
    </div>
  );
};

export default SocialShareBtn;
