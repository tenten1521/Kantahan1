"use client";
import { useState, useRef } from "react";
import { FaHeart, FaMusic, FaUserCircle } from 'react-icons/fa';

const ProfilePage = () => {
  const [profileImage, setProfileImage] = useState<string | ArrayBuffer | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null); // Reference to the file input field

  const [heartCount, setHeartCount] = useState(236);
  const [musicCount, setMusicCount] = useState(512);

  const incrementHeartCount = () => {
    setHeartCount(heartCount + 1);
  };

  const incrementMusicCount = () => {
    setMusicCount(musicCount + 1);
  };

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
    <div className="flex flex-col items-start justify-start h-fit bg-gradient-to-b from-pink-800 p-6 py-12 ml-4 rounded-xl">
      <div className="w-80 h-80 rounded-full overflow-hidden mb-4">
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
            <div className="relative w-full h-full">
              <img src={profileImage as string} alt="Profile" className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  type="button"
                  className="text-white bg-black bg-opacity-40 rounded-full p-2 hover:bg-opacity-60"
                  onClick={handleImageReset}
                >
                  Choose photo
                </button>
              </div>
            </div>
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
      <div className="flex flex-row items-center">
      <div className="flex flex-col items-center gap-4 mb-8">
        <div className={`flex items-center gap-1 text-white ${isHovered ? 'cursor-pointer' : ''}`} onClick={incrementHeartCount}>
          <button
                  type="button"
                  className="text-white bg-black bg-opacity-40 rounded-full p-2 hover:bg-opacity-60"
                >
                  <FaHeart />
                </button>
          <span className="text-xl">{heartCount}</span>
        </div>
        <div className={`flex items-center gap-1 text-white ${isHovered ? 'cursor-pointer' : ''}`} onClick={incrementMusicCount}>
          <button
                  type="button"
                  className="text-white bg-black bg-opacity-40 rounded-full p-2 hover:bg-opacity-60"
                >
                  <FaMusic />
                </button>
          <span className="text-xl">{musicCount}</span>
        </div>
      </div>
    </div>

    </div>
  );
};

export default ProfilePage;
