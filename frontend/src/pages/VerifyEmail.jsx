import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { verifyUserEmail } from "../api/authApis";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const { verificationToken } = useParams();

  useEffect(() => {
    handleVerifyClick();
  }, []);

  const handleVerifyClick = async (e) => {
    try {
      const res = await verifyUserEmail({ verificationToken: verificationToken });
      if (res.success) {
        toast.success("Email verified successfully");
        navigate("/login");
      } else {
        toast.error("Email verification failed");
      }
    } catch (error) {
      toast.error("Error verifying email. Please try again later.");
    }
  };

  return (
    <div></div>
  );
};

export default VerifyEmail;