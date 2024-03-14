import Link from 'next/link';

const Policies = () => {
    return (
        <div className='p-5 text-center h-screen w-full flex flex-col justify-center items-center'>
            <h1 className='text-4xl font-bold mb-5'>
                Policy Directory
            </h1>
            <div>
                <Link href="assets/policies/TermsOfService.docx">
                    <p>Terms of Service</p>
                </Link>
                <Link href="assets/policies/PrivacyPolicy.docx">
                    <p>Privacy Policy</p>
                </Link>
                <Link href="assets/policies/CookiePolicy.docx">
                    <p>Cookie Policy</p>
                </Link>
                <Link href="assets/policies/AcceptableUsePolicy.docx">
                    <p>Acceptable Use Policy</p>
                </Link>
            </div>
        </div>
    );
}

export default Policies