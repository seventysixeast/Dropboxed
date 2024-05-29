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
        toast.error("You have already verified your email id. Please login.");
      }
    } catch (error) {
      toast.error("You have already verified your email id. Please login.");
    }
  };

  return (
    <div></div>
  );
};

export default VerifyEmail;