import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast, ToastContainer } from 'react-toastify';
import auth from '../../../firebase.init';

const User = ({ newUser, refetch, index }) => {
    const { email, role, phone } = newUser;
    const [user] = useAuthState(auth);
    const makeAdmin = () => {
        fetch(`https://vast-tor-89247.herokuapp.com/user/admin/${email}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if (res.status === 403) {
                    toast.error('Failed to Make an admin');
                }
                return res.json()
            })
            .then(data => {
                if (data.modifiedCount > 0) {
                    refetch();
                    toast.success(`Successfully made an admin`);
                }

            })
    }
    const removeAdmin = () => {
        fetch(`https://vast-tor-89247.herokuapp.com/user/removeAdmin/${email}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if (res.status === 403) {
                    toast.error(`Failed to Remove from admin`);
                }
                return res.json()
            })
            .then(data => {
                if (data.modifiedCount > 0) {
                    refetch();
                    toast.success(`Successfully removed as admin`);
                }

            })
    }
    return (
        <tr>
            <th>{index + 1}</th>
            <td>{email}</td>
            <td>{phone}</td>
            <td>{role !== 'admin' && <button onClick={makeAdmin} class="button-33">Make Admin</button>}</td>
            <td>{role === 'admin' &&<button onClick={() => removeAdmin()} class="button-33">Remove Admin</button>}</td>
            <ToastContainer></ToastContainer>
        </tr>
    );
};

export default User;