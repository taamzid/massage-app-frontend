import logo from "../../../../assets/logos/logo.svg";
import QuickLinks from "../../../../components/shared/QuickLinks/QuickLinks";


const PrivacyPolicy = () => {
    return(
        <div
          style={{ fontFamily: "Poppins, sans-serif" }}
          className="bg-[#EEF2F5] p-6 lg:w-[80%] mx-auto"
        >
            <h2 className="text-[#152A16] font-[500] text-[30px] leading-[40px] mb-4">Privacy <br />Policy</h2>
            <img src={logo} alt="Zentitood" />

            <div className="text-[15px] font-[400] my-6 text-justify leading-[30px]">
                <p className="mb-5">Zentitood is committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your personal information. By using our services, you consent to the practices described in this policy.</p>
            

                <p className="font-[500] mt-5">1. Information We Collect</p>
                <div className="flex items-start gap-3 ml-5">
                    <div className="w-1 h-1 rounded-full bg-black mt-3"></div>
                    <p>Personal Information: When you create an account, book an appointment, or contact us, we collect information such as your name, email address, phone number, and payment details.</p>
                </div>
                <div className="flex items-start gap-3 ml-5">
                    <div className="w-1 h-1 rounded-full bg-black mt-3"></div>
                    <p>Usage Data: We collect information about how you use our services, including your IP address, browser type, access times, and pages viewed.</p>
                </div>

                <p className="font-[500] mt-5">2. How We Use Your Information</p>
                <div className="flex items-start gap-3 ml-5">
                    <div className="w-1 h-1 rounded-full bg-black mt-3"></div>
                    <p>To Provide Services: We use your personal information to facilitate bookings, process payments, and communicate with you about your appointments.</p>
                </div>
                <div className="flex items-start gap-3 ml-5">
                    <div className="w-1 h-1 rounded-full bg-black mt-3"></div>
                    <p>To Improve Our Services: We analyze usage data to improve the functionality and user experience of Zenitood.</p>
                </div>
                <div className="flex items-start gap-3 ml-5">
                    <div className="w-1 h-1 rounded-full bg-black mt-3"></div>
                    <p>Marketing Communications: With your consent, we may send you promotional materials and updates about our services. You can opt out at any time.</p>
                </div>

                <p className="font-[500] mt-5">3. Data Security</p>
                <div className="flex items-start gap-3 ml-5">
                    <div className="w-1 h-1 rounded-full bg-black mt-3"></div>
                    <p>We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction..</p>
                </div>
                <div className="flex items-start gap-3 ml-5">
                    <div className="w-1 h-1 rounded-full bg-black mt-3"></div>
                    <p>While we strive to protect your information, no method of transmission over the internet or electronic storage is 100% secure. Therefore, we cannot guarantee its absolute security.</p>
                </div>

                <p className="font-[500] mt-5">4. Contact Us</p>
                <div className="flex items-start gap-3 ml-5">
                    <div className="w-1 h-1 rounded-full bg-black mt-3"></div>
                    <p>If you have any questions or concerns about this Privacy Policy, please contact us at privacy <span className="text-[#156BCA] underline">zentitood@gmail.com</span></p>
                </div>
                
                <p className="mt-5">
                    By using Zenitood, you acknowledge that you have read, understood, and agree to be bound by these terms and conditions.
                </p>
            </div>

            <QuickLinks />
        </div>
    )
}

export default PrivacyPolicy;