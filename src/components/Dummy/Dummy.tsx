import { useState } from "react";

type UserDetails = {
    name: string,
    age: string,
}

export default function Dummy() {
    const [userDetails, setUserDetails] = useState<UserDetails>({
        name: '',
        age: '',
    });
    const [errors, setErrors] = useState({});
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setUserDetails(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
        
    }

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("User Submitted:", userDetails);
        console.log("Errors:", errors)
        if (!userDetails.name.trim) {
            setErrors(prev => ({
                ...prev,
                [userDetails.name]: 'User name is required'
            }))
        }
        setUserDetails({
            name: '',
            age: '',
        })
    }

    return (
        <div style={{ padding: '24px' }}>
            <h1 style={{ marginBottom: '24px' }}>User Form</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '20%', gap: '10px' }} >
                <input
                    type="text"
                    name="name"
                    value={userDetails.name}
                    placeholder="Enter your name..."
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="age"
                    value={userDetails.age}
                    placeholder="Enter your age..."
                    onChange={handleChange}
                />
                <button>Continue</button>
            </form>
        </div>
    )
}