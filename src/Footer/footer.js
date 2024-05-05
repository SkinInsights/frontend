import React from 'react'
import './footer.css'
import { SocialIcon } from 'react-social-icons'
const footer = () => {
  return (
    <footer class="footer">
      <div class="footer-left col-md-4 col-sm-6">
        <p class="about">
          <span> About the company</span>
          "Skin Insights: Illuminating Your Skin's Story, One Pixel at a Time"
        </p>
        <div class="icons">
          <a href="#"><SocialIcon url="https://facebook.com" /></a>
          <a href="#"><SocialIcon url="https://twitter.com" /></a>
          <a href="#"><SocialIcon url="https://linkedin.com" /></a>
          <a href="#"><SocialIcon url="https://googleplus.com" /></a>
          <a href="#"><SocialIcon url="https://instagram.com" /></a>
        </div>
      </div>
      <div class="footer-center col-md-4 col-sm-6">
        <div>
          <i class="fa fa-map-marker"></i>
          <p><span> Atal Bihari Vajpayee Indian Institue of Information Technology</span> Gwalior, India</p>
        </div>
        <div>
          <i class="fa fa-phone"></i>
          <p> (+91) 7065323541</p>
        </div>
        <div>
          <i class="fa fa-envelope"></i>
          <p><a href="#"> office@company.com</a></p>
        </div>
      </div>
      <div class="footer-right col-md-4 col-sm-6">
        <h2> Company<span> logo</span></h2>
        <p class="menu">
          <a href="#"> Home</a> |
          <a href="#"> About</a> |
          <a href="#"> Services</a> |
          <a href="#"> Portfolio</a> |
          <a href="#"> News</a> |
          <a href="#"> Contact</a>
        </p>
        <p class="name"> Team Insights &copy; 2024</p>
      </div>
    </footer>
  )
}

export default footer
