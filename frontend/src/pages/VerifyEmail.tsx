import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { verifyEmail } from '../services/authService';

const VerifyEmail: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      verifyEmail(token)
        .then(() => {
          toast.success("E-posta başarıyla doğrulandı!");
          navigate("/login"); // Başarılıysa login sayfasına yönlendir
        })
        .catch((error) => {
          console.error("Doğrulama hatası:", error);
          toast.error("E-posta doğrulaması başarısız oldu.");
          navigate("/login"); // Hata olursa yine login sayfasına yönlendir
        });
    } else {
      toast.error("Geçersiz doğrulama bağlantısı!");
      navigate("/login");
    }
  }, [location, navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>E-posta doğrulama işlemi yapılıyor...</h2>
    </div>
  );
};

export default VerifyEmail;
