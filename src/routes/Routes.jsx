import { createBrowserRouter } from "react-router-dom";
import BookingCheckout from "../authentication/BookingCheckout";
import Checkout from "../authentication/Checkout";
import Login from "../authentication/Login";
import MessageCheckout from "../authentication/MessageCheckout";
import Signup from "../authentication/Signup";
import EmailVerification from "../authentication/TherapistAccount/EmailVerification";
import PhoneVerification from "../authentication/TherapistAccount/PhoneVerification";
import SignUpFormTherapist from "../authentication/forms/SignUpFormTherapist";
import DashboardLayout from "../layout/DashboardLayout";
import TherapistAccountLayout from "../layout/TherapistAccountLayout";
import TherapistLayout from "../layout/TherapistLayout";
import About from "../pages/Dashboard/About/About";
import Favorites from "../pages/Dashboard/Favorites/Favorites";
import Featured from "../pages/Dashboard/Featured/Featured";
import Home from "../pages/Dashboard/Home/Home";
import NewListing from "../pages/Dashboard/Listing/NewListing";
import DetailsPage from "../pages/Dashboard/Listing/components/DetailsPage";
import ProfessionalDetails from "../pages/Dashboard/PersonalDetails/ProfessionalDetails";
import PrivacyPolicy from "../pages/Dashboard/Policies/PrivacyPolicy";
import TermsConditions from "../pages/Dashboard/Policies/TermsConditions";
import Profile from "../pages/Dashboard/Profile/Profile";
import Search from "../pages/Dashboard/Search/Search";
import SearchTherapist from "../pages/Dashboard/Search/components/SearchTherapist";
import TherapistProfile from "../pages/Dashboard/TherapistProfile/TherapistProfile";
import Bookings from "../pages/TherapistDashboard/Bookings";
import License from "../pages/TherapistDashboard/Licence/License";
import MessageInbox from "../pages/TherapistDashboard/MessageInbox/MessageInbox";
import CustomerPrivateRoute from "./CustomerPrivateRoute";
import TherapistPrivateRoute from "./TherapistPrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: (
      <CustomerPrivateRoute>
        <DashboardLayout />
      </CustomerPrivateRoute>
    ),
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "featured",
        element: <Featured />,
      },
      {
        path: "featured/:id",
        element: <DetailsPage />,
      },
      {
        path: "new-listing",
        element: <NewListing />,
      },
      {
        path: `new-listing/:id`,
        element: <DetailsPage />,
      },
      {
        path: "inbox",
        element: <MessageInbox />,
      },
      {
        path: "favorites",
        element: <Favorites />,
      },
      {
        path: "favorites/:id",
        element: <DetailsPage />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "search",
        element: <SearchTherapist />,
      },
      {
        path: `search/:id`,
        element: <DetailsPage />,
      },

      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/therapist",
    element: <TherapistAccountLayout />,
    children: [
      {
        path: "sign-up",
        element: <SignUpFormTherapist />,
      },
      {
        path: "email-verification",
        element: <EmailVerification />,
      },
      {
        path: "phone-verification",
        element: <PhoneVerification />,
      },
      {
        path: "license",
        element: <License />,
      },
      {
        path: "professional-details",
        element: <ProfessionalDetails />,
      },
    ],
  },
  {
    path: "/thp",
    element: (
      <TherapistPrivateRoute>
        <TherapistLayout />
      </TherapistPrivateRoute>
    ),
    children: [
      {
        path: "my-profile",
        element: <TherapistProfile />,
      },
      {
        path: "inbox",
        element: <MessageInbox />,
      },
      {
        path: "booking",
        element: <Bookings />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "terms&conditions",
        element: <TermsConditions />,
      },
      {
        path: "privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "checkout",
        element: <MessageCheckout />,
      },
      {
        path: "booking-checkout/:bookingId",
        element: <BookingCheckout />,
      },
    ],
  },
  {
    path: "/sign-up",
    element: <Signup />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/terms-conditions",
    element: <TermsConditions />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
  },
]);

export default router;
