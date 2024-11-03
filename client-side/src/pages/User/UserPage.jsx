import React, { useContext, useEffect, useState } from 'react';
import UserCard from '~/pages/User/UserCard';
import axios from 'axios';

import { UserContext } from '~/context/UserContextProvider';

const UserPage = () => {
    const { user } = useContext(UserContext);
    
    const [error, setError] = useState('');
    // console.log('Nguoi DUng:', user);
   

    if (error) return <div>{error}</div>;
    if (!user) return <div>Loading...</div>;
    

    return (
        <div>
            {user ? <UserCard UserData={user} /> : <div>Loading...</div>} {/* Display user card or loading */}
        </div>
    );
};


export default UserPage;
