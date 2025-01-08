import logo from "../../../assets/logos/logo.svg";
import QuickLinks from "../../../components/shared/QuickLinks/QuickLinks";


const TermsConditions = () => {
    return(
        <div
          style={{ fontFamily: "Poppins, sans-serif" }}
          className="bg-[#EEF2F5] lg:p-6 lg:w-[80%] mx-auto"
        >
            <h2 className="text-[#152A16] font-[500] text-[30px] leading-[40px] mb-4">Terms & <br />Conditions of Service</h2>
            <img src={logo} alt="Zentitood" />

            <div className="text-[15px] font-[400] my-6 text-justify leading-[30px]">
                <p><span className="font-[500]">Effective Date:</span> July 2, 2024</p>
                <p className="text-[15px]">Welcome to Zentitood! By using our services, you agree to comply with and be bound by the following terms and conditions. Please read them carefully.</p>

                <p className="font-[500] mt-5">1. Acceptance of Terms</p>
                <div className="flex items-start gap-3 ml-5">
                    <div className="w-1 h-1 rounded-full bg-black mt-3"></div>
                    <p>By accessing and using Zentitood, you accept and agree to be bound by these terms and conditions and our Privacy Policy. If you do not agree, please do not use our services.</p>
                </div>

                <p className="font-[500] mt-5">2. Services Provided</p>
                <div className="flex items-start gap-3 ml-5">
                    <div className="w-1 h-1 rounded-full bg-black mt-3"></div>
                    <p>Zenitood connects users with massage therapists. We are a platform for booking appointments and do not provide the massage services ourselves. All services are rendered by independent therapists.</p>
                </div>

                <p className="font-[500] mt-5">3. User Responsibility</p>
                <div className="flex items-start gap-3 ml-5">
                    <div className="w-1 h-1 rounded-full bg-black mt-3"></div>
                    <p>You must be at least 18 years old to use our services.</p>
                </div>
                <div className="flex items-start gap-3 ml-5">
                    <div className="w-1 h-1 rounded-full bg-black mt-3"></div>
                    <p>You are responsible for providing accurate information when creating an account and booking appointments.</p>
                </div>
                <div className="flex items-start gap-3 ml-5">
                    <div className="w-1 h-1 rounded-full bg-black mt-3"></div>
                    <p>You agree to use Zenitood for lawful purposes only.</p>
                </div>

                <p className="font-[500] mt-5">4. Payment and Cancellation</p>
                <div className="flex items-start gap-3 ml-5">
                    <div className="w-1 h-1 rounded-full bg-black mt-3"></div>
                    <p>Payment for services is made through the Zenitood platform.</p>
                </div>
                <div className="flex items-start gap-3 ml-5">
                    <div className="w-1 h-1 rounded-full bg-black mt-3"></div>
                    <p>Cancellations must be made at least 24 hours before the scheduled appointment to avoid charges.</p>
                </div>

                <p className="font-[500] mt-5">5. Liability</p>
                <div className="flex items-start gap-3 ml-5">
                    <div className="w-1 h-1 rounded-full bg-black mt-3"></div>
                    <p>Zenitood is not liable for any injury, loss, or damage resulting from the services provided by the therapists.</p>
                </div>
                <div className="flex items-start gap-3">
                    <div className="w-1 h-1 rounded-full bg-black mt-3 ml-5"></div>
                    <p>We do not guarantee the availability, quality, or suitability of any therapist listed on our platform.</p>
                </div>

                <p className="font-[500] mt-5">6. Contact Information</p>
                <div className="flex items-start gap-3 ml-5">
                    <div className="w-1 h-1 rounded-full bg-black mt-3"></div>
                    <p>For any questions or concerns regarding these terms, please contact us at support <span className="text-[#156BCA] underline">zentitood@gmail.com</span></p>
                </div>
                
                <p className="mt-5">
                    By using Zenitood, you acknowledge that you have read, understood, and agree to be bound by these terms and conditions.
                </p>
            </div>

            <QuickLinks />
        </div>
    )
}

export default TermsConditions;