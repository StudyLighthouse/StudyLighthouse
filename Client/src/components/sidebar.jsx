import React, { useState } from 'react';

const inputClasses = 'w-full p-2 mb-2 bg-zinc-800 text-white rounded border border-white';
const buttonClasses = 'w-full mb-2 bg-600 text-white rounded';
const thickBorderButtonClasses = 'w-full mb-2 bg-black text-white rounded border-4 border-black';
const activeButtonClasses = 'w-full mb-2 bg-600 text-white rounded border border-white';
const hoverActiveButtonClasses = 'hover:bg-black active:bg-black';

const ChatComponent = () => {
    const [activeButton, setActiveButton] = useState(null);

    const handleButtonClick = (buttonId) => {
        setActiveButton(buttonId === activeButton ? null : buttonId);
    };

    return (
        <div className="chatComponent bg-black flex flex-col" style={{ width: '20%' }}>
            <div className="bg-zinc-800 p-4 flex-grow overflow-y-auto">
                <div className="mb-4">
                    <label className="block text-white mb-2">Enter the name:</label>
                    <input
                        type="text"
                        placeholder="Enter a name to save the chat as"
                        className={inputClasses}
                    />
                    <button className={thickBorderButtonClasses}>SAVE</button>
                </div>
                <div className="mb-4">
                    <label className="block text-white mb-2">Chat History:</label>
                    <button
                        className={`${activeButton === 1 ? activeButtonClasses : buttonClasses} ${hoverActiveButtonClasses}`}
                        onClick={() => handleButtonClick(1)}
                    >
                        Capitals
                    </button>
                    <button
                        className={`${activeButton === 2 ? activeButtonClasses : buttonClasses} ${hoverActiveButtonClasses}`}
                        onClick={() => handleButtonClick(2)}
                    >
                        Capitals
                    </button>
                    <button
                        className={`${activeButton === 3 ? activeButtonClasses : buttonClasses} ${hoverActiveButtonClasses}`}
                        onClick={() => handleButtonClick(3)}
                    >
                        Capitals
                    </button>
                </div>
                <div className="block text-white mb-2">
                    <label className="block text-white mb-2">Save the chat here:</label>
                    <button className={thickBorderButtonClasses}>POST</button>
                </div>
            </div>
        </div>
    );
};

export default ChatComponent;
