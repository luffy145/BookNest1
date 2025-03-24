import React from 'react'
import Home from '../home'
import MainHeading from './MainHeading'
import "./about.css" 

export default function About() {
  return (
    <div>
      <MainHeading />
      <div>
            <main>
                <section className="about-section">
                    <h1>Welcome to BookNest</h1>
                    <p>
                        At BookNest, we are passionate about books and reading. Our goal is to provide a wide variety of books for all kinds of readers—from timeless classics to modern bestsellers. Whether you are looking for a captivating fiction novel, a self-help guide, or a book to expand your knowledge, we have something for everyone.
                    </p>

                    <h2>Our Mission</h2>
                    <p>
                        Our mission is simple: to make books easily accessible for everyone. We believe that reading is a gateway to learning, growth, and adventure. BookNest aims to create an easy and enjoyable shopping experience for all book lovers.
                    </p>

                    <h2>Why Choose Us?</h2>
                    <ul>
                        <li>Wide selection of books across various genres.</li>
                        <li>Affordable prices and regular discounts.</li>
                        <li>Fast and secure shipping.</li>
                        <li>Easy-to-use website for a seamless shopping experience.</li>
                    </ul>

                    <h2>Join the BookNest Community</h2>
                    <p>
                        Explore our collection and become part of a community that celebrates the love of books. Start your reading journey today!
                        YOu can mak eyour knowledge more by reading our books you know.
                    
                    </p>
                </section>
            </main>

            <footer>
                <p>&copy; 2024 BookNest. All Rights Reserved.</p>
            </footer>
        </div>
    </div>
      
  )
}
