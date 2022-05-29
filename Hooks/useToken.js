import axios from "axios";
import { useEffect, useState } from "react"

const useToken = user => {
    const [token, setToken] = useState('');
    useEffect(() => {
        const getToken = async () => {
            const currentUser = {
                email: user?.user?.email,
                name: user?.user?.displayName
            }

            if (user?.user?.email) {
                fetch(`http://localhost:5000/users/${user?.user?.email}`, {
                    method: "PUT",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(currentUser),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log("data inside useToken", data);
                        const accessToken = data.token;
                        localStorage.setItem("accessToken", accessToken);
                        setToken(accessToken);
                    });
            }
        }
        getToken();
    }, [user]);
    return [token];
}

export default useToken;