import React from 'react';
import Footer from '~/layouts/Footer/Footer';
import Header from '~/layouts/Header/Header';
import PropTypes from 'prop-types';

function DetailLayout({ title, children }) {
  return (
    <div className="detail-layout">
      <header className="header">
        <Header />
      </header>
      <main className="content flex flex-col bg-orange-200 ">
        <h1 className="text-2xl font-bold py-5">{title}</h1> {/* Displaying the title */}
        {children}
      </main>
      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
}

DetailLayout.propTypes = {
  title: PropTypes.string.isRequired, // Title is required and should be a string
  children: PropTypes.node.isRequired, // Children is required and can be any renderable node
};

export default DetailLayout;
