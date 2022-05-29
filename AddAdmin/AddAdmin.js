import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../../Shared/Loading/Loading';
import User from '../User/User';

const AddAdmin = () => {
    const { data: users, isLoading, refetch } = useQuery('users', () => fetch('https://vast-tor-89247.herokuapp.com/users', {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <div class="overflow-x-auto">
                <table class="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Email</th>
                            <th>Contact</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <User
                                key={user._id}
                                newUser={user}
                                refetch={refetch}
                                index={index}
                            ></User>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AddAdmin;