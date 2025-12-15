import React, { Component } from 'react';
import Header from './Header';
import { Container } from 'semantic-ui-react';
import Head from 'next/head';

class Layout extends Component {
  componentDidMount() {
    // Tự động tải lại trang khi người dùng đổi ví trên MetaMask
    if (window.ethereum) {
        window.ethereum.on('accountsChanged', () => window.location.reload());
    }
  }

  render() {
    return (
      <div className="app-wrapper">
        <Head>
            <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
            <title>SkillCode | Blockchain Learning</title>
            <style>{`
                body {
                    background-color: #F0F2F5;
                    font-family: 'Poppins', sans-serif !important;
                    color: #1a1a1a;
                }
                .app-wrapper {
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                }
                .navbar-container {
                    background: #ffffff;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
                    position: sticky;
                    top: 0;
                    z-index: 1000;
                    padding: 12px 0;
                }
                .ui.card {
                    box-shadow: 0 4px 12px rgba(0,0,0,0.05) !important;
                    border: none !important;
                    border-radius: 12px !important;
                    transition: all 0.3s ease;
                    background: #ffffff !important;
                }
                .ui.card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 12px 24px rgba(0,0,0,0.1) !important;
                }
            `}</style>
        </Head>

        <div className="navbar-container">
            <Container>
                <Header />
            </Container>
        </div>

        <div style={{ flex: 1, paddingBottom: '50px' }}>
            {this.props.children}
        </div>
        
        <div style={{background: '#1a1a1a', padding: '40px 0', marginTop: 'auto', color: 'white'}}>
            <Container textAlign='center'>
                <h4 style={{color: 'white'}}>SkillCode Platform</h4>
                <p style={{color: '#888'}}>© 2024 Decentralized Education System.</p>
            </Container>
        </div>
      </div>
    );
  }
}
export default Layout;