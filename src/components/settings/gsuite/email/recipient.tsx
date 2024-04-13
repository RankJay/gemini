import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input"

function EmailInput() {
    const [recEmail, setEmail] = useState('');

    useEffect(() => {
        console.log("Email updated:", recEmail);
    }, [recEmail]); 

    const handleInputChange = (event: any) => {
        setEmail(event.target.value);
    };

    const handleInputBlur = () => {
        console.log("Final email on blur:", recEmail);
    };

    return (
        <Input
            type="email"
            value={recEmail}
            onChange={handleInputChange}
            onBlur={handleInputBlur}  
            placeholder="Recipient Email"
        />
    );
}

export default EmailInput;
