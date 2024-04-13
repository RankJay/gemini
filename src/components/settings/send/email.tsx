import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";

function EmailInput() {
    const [recEmail, setEmail] = useState('');

    useEffect(() => {
        console.log("Email updated:", recEmail);
    }, [recEmail]); // Only re-run the effect if 'email' changes

    const handleInputChange = (event: any) => {
        setEmail(event.target.value);
    };

    const handleInputBlur = () => {
        // This can be used to perform actions when the user finishes typing
        console.log("Final email on blur:", recEmail);
    };

    return (
        <Input
            type="email"
            value={recEmail}
            onChange={handleInputChange}
            onBlur={handleInputBlur}  // Optionally capture when user leaves the input field
            placeholder="Recipient Email"
        />
    );
}

export default EmailInput;
