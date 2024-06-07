// import React from 'react';

// const searchInputClasses = "bg-transparent flex-grow outline-none text-white px-4";
// const searchButtonClasses = "bg-zinc-900 text-white rounded-full p-2 ml-2";
// const imageSizeClasses = "w-8 h-8";

// const InputBar = () => {
//     return (
//         <div className="flex flex-col justify-end pb-4 overflow-hidden" style={{ width: '80%' }}>
//             <div className="flex items-center bg-zinc-800 rounded-full p-2 mt-0 ml-10 w-11/12">
//                 <input type="text" className={` ${searchInputClasses}`} placeholder="Search..." />
//                 <button className={searchButtonClasses}>
//                     <img aria-hidden="true" alt="arrow" src="data:image/png;base64,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" className={` ${imageSizeClasses}`} />
//                 </button>
//             </div>
//         </div>
//     );
// }

// export default InputBar;

import React, { useState, useRef } from "react";
import axios from 'axios';

const searchInputClasses =
  "bg-transparent flex-grow outline-none text-white px-4";
const searchButtonClasses = "bg-zinc-900 text-white rounded-full p-2 ml-2";
const imageSizeClasses = "w-8 h-8";

const InputBar = ({ setMessages }) => {
  const [text, setText] = useState("");
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleButtonClick = async () => {
    if (text === "") {
      alert("Please provide a prompt.");
    } else {
      try {
        console.log(text);
        const response = await axios.post('http://127.0.0.1:5000/api/cohorequest', { text });
        console.log('Response from backend:', response.data);

        const newUserMessage = { "usr": text, "res": response.data["response_text"] };

        // Update sessionStorage
        const nextIndex = sessionStorage.length-1;
        sessionStorage.setItem(`message_${nextIndex}`, JSON.stringify(newUserMessage));

        // Update messages state
        setMessages(prevMessages => [...prevMessages, newUserMessage]);
      } catch (error) {
        alert("Error sending text to backend");
      }
      setText('');
    }
  };

  return (
    <div
      className="inputBar flex flex-col justify-end pb-4 overflow-hidden"
      style={{ width: "80%" }}
    >
      <div className="flex items-center bg-zinc-800 rounded-full p-2 mt-0 ml-10 w-11/12">
        <input
          type="text"
          className={searchInputClasses}
          placeholder="Search..."
          value={text}
          onChange={handleInputChange}
          ref={inputRef}
        />
        <button className={searchButtonClasses} onClick={handleButtonClick}>
        <img
            aria-hidden="true"
            alt="arrow"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAALIElEQVR4nO1dCZAdVRV9AaMS4oZGUEurFKTEuGBCVCCAAiol4g4CSVQgUUTAUpYoRmRxQVwwahWKCApGEqJARROR0giFSkgQWQKoEASNwQAOYJz5fc5Lcq07/76pm3ZGM5n5v/v/eadqqqZfz/zpfvfdfZkQMjIyMjIyMjIyMjIyMjIyMjIyMjIyMtoCERkH4BUAPgDgcyQXAVhB8j4A6wA8AeBx/Z7kvQBuInkFgHMAzCqKYo9MqpET4bkkTyB5NYBHScpIvgD8g+RiAHNEZKdMoK0jwpMBzATwcwCxtKl/IbmA5DwA7yM5tdFovEREniMiE0RkRxGZpGskpwE4iuRnlVNI/q1EHMVPARwhIk/KxPlvQjyd5Kkk17pNK0heoyKnr6/vRSPdNCUUgGMALAXAEqFPUoKOecLo6ST5MQCPuQ26DcBsEXlWqzZIucrE4d3uADxM8kMist2YJEyM8Q0k73QbsjzGeIgq8MF+XkSepvdJnkHyEgA3klyjugHAv0yxP2SK/gaSF5P8ZIzx4KFOv25+URTvAPA7dyBuIbl3GCsQkacAuADAZtuAe2OMhw72s42mPvg0gJW26csBfAHAsST3Mx0yyfTHRDUEGo3GriQPUC4DcJ4SB8AG2/TThhJ/RVG8l+SDdjg2Afh81+uXRqOxm53AfsWqm60E8j8jItursgXwWzv939DNV4W/rX9XRJ4aY3wjgAsBPALgeuWMsnhS40DN6mRQAPjNaOivWsI25HHjivtI7uXv6+YAmG0i50bbsFE/oSIyXrkBwM2qQ9SqK4tJktNJ/tWIoib360M3wTagMGIsVqvK3ye5D8nf68ltp/xWPaZOpHHjFH9PfRUAPzOi9A4lVjsO6ogB2Ggv9nUvJkyfzFc/AcCRQyn0NkQBPmge/xc9V6r4JHmRPXsEMCN0MoqieKcSQxU4gLNK93YneSvJq1pp4g7HFDZncaUaBv4eyblGlI36TqETEWM80Impuf6eKmkLZRwfagQRGUfy4xYTm+bvaVwsia+O0yl6+tUvsBf42iBcsz7GeFCoKWKMh9ozvqVErO/aOz3SMdaX6gUTRcoZi7zOMGKsKyvQOoLk3srF6oyWTPKlySTuCD/F/IZ+h89bU+asre8EYiSQfK2FVKanNdV3JB8wopwb6gwNU5gCL/zGF0XxMhMBB4YOQ4zxEA3JeBFlOlCtrk0kXxfqCHW4XLBurveSLWA4J3QoSJ6qCTEfLdDQinHJyloGJC18rsT4Y+nBv0VyYehgSFOhayrgfLc2wcW+Zoc6QeVqsqpijG9O6yT3V3krIs8IHQ4RmWSxtQFRDODwlI0UkR1CXWAhcX2wX5S83Ns0bBK6BGjm9Fd5EWX5e5UMJ4Q6QHWEOXnilTbJjwD4ZegiSDPMskJTyN6UN4Ks0UNY7RM2T8ixxh2rSgr+gXJEtxsQYzzY9GT/5iu3JGOmFtJAk0ZGkFluTQsVflXVM4nITiQ/Q/J0TVyN9udrGEUzmOma5EeNS64JVaK3t/cFll3rLT3gLd7DbTfQTO9+h+TlGtZvdfDSFL76JUWlgVINxNnJWOidQA2nV2WbSzPRVSTTW01VI8qo1mKpo+i5D8C1JimOC1VB66fsIQ53a2cD+HJlDxX6D8oikpemQ9EKoug7ahGFu55TPpxthQbWrPBgsxYXpHWSd5RD1xU82wTTbZe0iigxxjdpgDFdF0XxUjuc60IVUAvKTsQ9aU1Enq01VnUw/6TFRLEqy+V+jeTfzdraPbQb6mcYQS4uhdeXhppA2sApHiSvNC5pf6pXE09GkFPc2rkkzww1grSQKEVRHKa1AF5/GkG2SFe3BSSXGHu+3a0t9A/Y7UQBMEtNa3c90w7pD0O7QXK1EeTlbk2L4KaGGkJaQBRzQPdP15prNw65KbQbqVJdRHZOa2phiMguoaaQFusUq8zcwtBpG1K43Rcyqxk83FCF5RWuAtAYaVPOcL583AnAl4wow2pJsLqyG9z1Lvb5a0MFUU+tt9qUittsLQ7XQyd5Mskfa9Q4VAhrBvrEcH5H8zxq5rvriSayHm/JQ24jQcZtQ/jliqp9F5KXatZzOL8jIs8E0OOudzSCPBFqJLKGy/YTNQ6Uyk3ZPpH17vQM1vq2ulxzvBXPro7wo5WLLO+VDqLUB67rBmnK/GVqnqeaKkeMgfDP1sICqffUQqmTvMtO2kDLsVWwTxkLxHDlsgN5Hy0Jqszs1cJkI8hh7oEW+fRmNxNDAeD9JC9z1zOMQxaEdkPb0uyPD1gm1tQ/L4wBYrjw0enu+izjkLNDu2FdrEqQi9KaKkrlnDAGiKHQ8Ls2/fjQkRFkZqii7tUIclcpldlTh0o+GZoYd44GMSz8vqGUuu6PXqiyH+nnb2uCaoMlqCaVYlxTu5kYCm1V0FY4Z2Ht6orm2t4J1g8tjLMT8R63pl2s54UKQfKyVhJDAeDb3pHUXLpJjCtDVdBciD3Ej9yDTdaa14qLHBqp3boVxDDp8JBvfXN9I9UVlff19b3QyoD+7YOKJP+gBWVVPRea1YXzrWFzVIlhn39EKaio/YnU3vvKJw3ZGAs9GUeXamAH6nzbDRHZWSc+KHdovGm0P18dP9/8qb2StgfVW5ip/MV7p2qBaOM9gD1Dl4Hkfr6O11oV+pN1tXCKtQzf2r5UlxyQ1nXkkdZthS6CNCPaN3s/QyMV9u7adjE+1AFWR6snZFlp9NJqHZERugQAZlkn1YBZq6avEeSkUBfYGIoN1pJwkA++GXuPesFzu2Ezttb60R9FUbzLDuLDmvkMdYKWVSbP3bOuWTo/CB0MaeqJJZrqdWs72DQ6qdsABK/I/1QOOFrOfLVGRkOHguSJ1tw5vhxI1J78qrOdQ8ImvikLNwC8Kq3biNf1vt+7UxCbIRJ1Anfz5T7md2yu/TtZSEFPzp994M3mZenggFeHDgHJqWZB7pvW1K8heb8dvAERVluYbL3DiHJ5ySI5ykYxTQ41B4ApmpL2lZnWvna1EWNFbczc/wetZkxWl3rM/p4SxZpEp9d8IsX68igmAN+0d+ppNBovDh04koKD2ejpheuo6Ekeb9NN9y2tfyrpR18+2omO1GabCXJy6d5kCzlcVgc/RZq6YbHWJ3sFnkx6e4+NvnyoI6GESCNhVXx5nWL6Rpsz769yUhuAIy32doGfkmqh/PlpmlztRmiMkFPoFP0WxXRqgWmYHM2Cude067nMfL1+sOHJWiZK8idJTPkkXFfAdMqGVEjm/RQX+zpRk1sArrOJ1KOe5FInLsb4ViPEGhtrvt0g9QJrjBiP+aBpV0GL6pJJbMrxlLLpKCLjrd7pVhMj2u06bSTesBF7H52KahPtVtgU1O0HmYY3L3HzYAMxuw4Wrr/Q1dnePVR2sSiKPaxN7HY9qZYmPdNk/l4i8jxfj6tipre39/k2Ce5oa9G+1gY4q1iaV1bYpTD6fUYIVeBfHck07dCJIQmdGZIIo7mT6GqcBoso2+D8c+y/56wyJ7PHbWKPcZVOrV6g8aYY49v+13goC4382h2Q27tWRG1lQPK0VElP84Bt/HfLTGHr6zhGc//u7/5TdVhHDLZsNWyw5BlpzJNtUF+qFR6NNjmbyzJjkG6ttabLBuJuGVvO3jpORYg5k76n4x6S31OOsn74yUPpEACvVAfOJlJ/Xyek+s8yn+I6NR7GlJ4Y6Ylmc8r0Mi/StvXLzNclJpZq28PSEZDmuEAd5fFhAF/RuVTWn6IKvCeFZ0ypP2j/uUdF0/n2zwD2rEO9cUZGRkZGRkZGRkZGRkZGRkZGRkZGRhgj+A99qSKv16SVcQAAAABJRU5ErkJggg=="
            className={imageSizeClasses}
          />
        </button>
      </div>
    </div>
  );
};

export default InputBar;
