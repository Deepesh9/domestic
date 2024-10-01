import React from 'react';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const { isLoading } = useSelector(state => state.auth);

    return (
        <nav className='flex flex-row gap-x-2 w-full z-20 fixed top-0 left-0 h-12 border-b place-content-center items-center bg-grey-200'>
            {
                isLoading ? <></> : null
            }
        </nav>
    );
};

export default Navbar;
