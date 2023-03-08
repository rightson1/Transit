import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Custom404 = () => {
    const router = useRouter();
    return (<>
        <div class="face">
            <div class="band">
                <div class="red"></div>
                <div class="white"></div>
                <div class="blue"></div>
            </div>
            <div class="eyes"></div>
            <div class="dimples"></div>
            <div class="mouth"></div>
        </div>

        <h1>Oops! Something went wrong!</h1>
        <div class="btn" onClick={() => router.push('/')} >Return to Home</div>
    </>)
};

export default Custom404
