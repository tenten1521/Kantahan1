"use client";
import { useState, useRef } from "react";
import { FaHeart, FaMusic, FaUserCircle } from 'react-icons/fa';

const ProfilePage = () => {
  const [profileImage, setProfileImage] = useState<string | ArrayBuffer | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null); // Reference to the file input field

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      if (event.target) {
        setProfileImage(event.target.result);
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const [isHovered, setIsHovered] = useState(false);

  const handleIconHover = () => {
    setIsHovered(!isHovered);
  };

  const handleImageReset = () => {
    setProfileImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset the value of the file input field
    }
  };

  return (
    <div className="flex flex-col items-start justify-center py-12 ml-4">
      <div className="w-40 h-40 rounded-full overflow-hidden mb-4">
        <div
          className={`flex items-center justify-center w-full h-full bg-gray-300 ${
            isHovered ? 'hover:bg-gray-400' : ''
          }`}
          onMouseEnter={handleIconHover}
          onMouseLeave={handleIconHover}
          onClick={() => {
            if (fileInputRef.current) {
              fileInputRef.current.click(); // Trigger the file input field
            }
          }}
        >
          {profileImage ? (
            <img src={profileImage as string} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <FaUserCircle className={`text-5xl text-white ${isHovered ? 'text-gray-600' : ''}`} />
          )}
        </div>
        <input
          type="file"
          id="profile-image-upload"
          className="hidden"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageUpload}
        />
      </div>
      <h2 className="text-3xl font-semibold text-white mb-4">Lucius Artorius Castus</h2>
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-start gap-4 mb-8">
          <div className="flex items-center gap-1 text-white">
            <FaHeart />
            <span className="text-xl">236</span>
          </div>
          <div className="flex items-center gap-1 text-white">
            <FaMusic />
            <span className="text-xl">512</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
