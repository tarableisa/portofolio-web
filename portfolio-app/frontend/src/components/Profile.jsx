import React, { useState, useEffect } from 'react';
import { portfolioAPI } from '../services/api';
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter, FaFacebook, FaYoutube, FaGlobe, FaEnvelope } from 'react-icons/fa';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [socialLinks, setSocialLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, socialRes] = await Promise.all([
          portfolioAPI.getProfile(),
          portfolioAPI.getSocialLinks()
        ]);
        
        // ViewSet returns list, so we take the first item
        const profileData = profileRes.data[0] || null;
        console.log('Profile data:', profileData); // Debug log
        setProfile(profileData);
        setSocialLinks(socialRes.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!profile) return <div className="error">No profile data found</div>;

  // Helper function to get full image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    // If already a full URL, return as is
    if (imagePath.startsWith('http')) return imagePath;
    // Otherwise, prepend backend URL
    return `http://localhost:8000${imagePath}`;
  };

  // Helper function to get social media icon
  const getSocialIcon = (platform) => {
    const platformLower = platform.toLowerCase();
    
    if (platformLower.includes('github')) return <FaGithub />;
    if (platformLower.includes('linkedin')) return <FaLinkedin />;
    if (platformLower.includes('instagram')) return <FaInstagram />;
    if (platformLower.includes('twitter') || platformLower.includes('x.com')) return <FaTwitter />;
    if (platformLower.includes('facebook')) return <FaFacebook />;
    if (platformLower.includes('youtube')) return <FaYoutube />;
    if (platformLower.includes('email') || platformLower.includes('mail')) return <FaEnvelope />;
    
    // Default icon for unknown platforms
    return <FaGlobe />;
  };

  return (
    <div className="profile-section">
      <div className="profile-container">
        {profile.profile_image && (
          <img 
            src={getImageUrl(profile.profile_image)} 
            alt={profile.name}
            className="profile-image"
            onError={(e) => {
              console.error('Image failed to load:', profile.profile_image);
              e.target.style.display = 'none';
            }}
          />
        )}
        <h1>{profile.name}</h1>
        <h2>{profile.title}</h2>
        <p className="bio">{profile.bio}</p>
        
        {profile.cv_file && (
          <a 
            href={getImageUrl(profile.cv_file)}
            download
            className="cv-download"
          >
            Download CV
          </a>
        )}
        
        {socialLinks.length > 0 && (
          <div className="social-links">
            {socialLinks.map((link) => (
              <a 
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                title={link.platform}
                aria-label={link.platform}
              >
                {getSocialIcon(link.platform)}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
