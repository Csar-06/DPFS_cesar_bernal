import React from 'react';

const UserList = ({ users = [] }) => {
    return (
        <div className='panel'>
            {users.length > 0 ? (
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>
                            {user}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>users not found</p>
            )}
        </div>
    );
}

export default UserList;
