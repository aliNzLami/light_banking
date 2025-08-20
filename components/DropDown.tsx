'use client'

import React, { useState, useRef, useEffect } from 'react';

function Dropdown({ options, placeholder, afterClick= () => {}  }: DropDownProps) {
    
    interface refPropos {
        contains: any;
    }

    // ------------------------ STATE ------------------------ //
    const [selectedOption, setSelectedOption] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<refPropos | any>(null);
    const isDarkMode = document.body.getAttribute('class')?.includes("darkMode");


    // ------------------------ FUNCTIONS ------------------------ //
    const handleToggle = () => setIsOpen(prev => !prev);

    const handleSelect = (option: string) => {
        afterClick(option);
        setIsOpen(false);
        // setSelectedOption(option)
    };

    const closeDropDown = () => {
        if (!isOpen) return;

        const handleClickOutside = (event: any) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }

    // ------------------------ EFFECTS ------------------------ //
    useEffect(() => {
        closeDropDown()
    }, [isOpen]);

    return (
        <div ref={dropdownRef} style={{ position: 'relative' }}>
            <div
                className='dropDownPlaceHolder'
                style={{
                    border: '1px solid #ccc',
                    padding: '8px',
                    cursor: 'pointer',
                    // backgroundColor: `'#fff'`,
                    fontSize: '16px'
                }}
                onClick={handleToggle}
            >
                {selectedOption ? selectedOption : placeholder}
            </div>

            {isOpen && (
                <ul
                    className='dropDownList'
                    style={{
                        listStyle: 'none',
                        margin: 0,
                        padding: 0,
                        border: '1px solid #000',
                        overflowY: 'auto',
                        // backgroundColor: '#fff',
                        position: 'absolute',
                        width: 'max-content',
                        zIndex: 1,
                        top: '100%', // position below the toggle div
                    }}
                >
                    {
                        options.map((option: string) => (
                            <li
                                className='dropDownItem'
                                key={option}
                                style={{
                                    padding: '15px 8px',
                                    cursor: 'pointer',
                                    borderBottom: '1px solid #ccc',
                                }}
                                onClick={() => handleSelect(option)}
                            >
                                {option}
                            </li>
                        ))
                    }
                </ul>
            )}
        </div>
    )
}

export default Dropdown;