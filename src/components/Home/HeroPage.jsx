import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './Hero.css'; // Import your custom CSS file for styling
import Navigation from './Navbar';
import { useNavigate } from 'react-router-dom';

const HeroPage = () => {
  const navigate=useNavigate()
  return (
    <div>

        <div>
        <Navigation />
    </div>
    <div className="hero-container">
      <Container>
        <Row className="align-items-center">
          <Col lg={6} md={12}>
            <div className="hero-content">
              <h1>Welcome to Our Online Learning Platform</h1>
              <p>Unlock your potential with our wide range of digital courses.</p>
              <Button variant="primary"  onClick={()=>navigate('/viewProducts')}>Explore Courses</Button>
            </div>
          </Col>
          <Col lg={6} md={12}>
            <div className="hero-image">
              {/* Replace the image source with your own */}
              <img src="https://www.genesecloud.academy/wp-content/uploads/2021/06/Programming-amico-1280x1280.png" alt="Hero" />
            </div>
          </Col>
        </Row>
      </Container>

      {/* Showcase Products Section */}
      <div className="products-section my-5">
        <Container>
          <Row>
            <Col md={3}>
              <div className="product" style={{ backgroundColor: '#f8a488' }}>
                <h2>Share Market Knowledge</h2>
                <p>Master the art of trading and investing in the stock market.</p>
              </div>
            </Col>
            <Col md={3}>
              <div className="product" style={{ backgroundColor: '#7ed6df' }}>
                <h2>Web Development</h2>
                <p>Build stunning websites and web applications from scratch.</p>
              </div>
            </Col>
            <Col md={3}>
              <div className="product" style={{ backgroundColor: '#f3a683' }}>
                <h2>YouTube Content Creation</h2>
                <p>Create engaging videos and grow your YouTube channel.</p>
              </div>
            </Col>
            <Col md={3}>
              <div className="product" style={{ backgroundColor: '#82ccdd' }}>
                <h2>Dropshipping Mastery</h2>
                <p>Start and scale a profitable dropshipping business.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      </div>
    </div>
  );
}

export default HeroPage;
