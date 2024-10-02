import React, { useState, useEffect } from 'react';

const Carousel = () => {
  const [index, setIndex] = useState(1);

  const handleBulletClick = (index) => {
    setIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex === 3 ? 1 : prevIndex + 1)); // Tăng chỉ số hình ảnh hoặc quay lại 1
    }, 3000); // Chuyển đổi hình ảnh sau 3 giây

    return () => {
      clearInterval(interval); // Dọn dẹp interval khi component unmount
    };
  }, []);

  return (
    <div className="carousel">
      <div className="images-wrapper">
        <img src="https://cdn.prod.website-files.com/641a3249b8c4027539157305/649cc7ae011753a88fbc403f_greenlight.jpeg" className={`image img-1 ${index === 1 ? 'show' : ''}`} alt="" />
        <img src="https://images.squarespace-cdn.com/content/v1/6487d3d312599067b14fb36d/ae9b4b20-fe91-4722-bad4-acb1ddc224af/DSCF1212+Curtis+Perry.jpg" className={`image img-2 ${index === 2 ? 'show' : ''}`} alt="" />
        <img src="https://images.photowall.com/products/57491/greatest-bookshop-in-the-world.jpg?h=699&q=85" className={`image img-3 ${index === 3 ? 'show' : ''}`} alt="" />
      </div>

      <div className="text-slider">
        <div className="text-wrap">
          <div className="text-group" style={{ transform: `translateY(${-(index - 1) * 2.2}rem)` }}>
            <h2>Khám Phá Thế Giới Sách</h2>
            <h2>Sách Hay Cho Mọi Lứa Tuổi</h2>
            <h2>Thế Giới Trong Tầm Tay</h2>
          </div>
        </div>

        <div className="bullets">
          <span className={index === 1 ? 'active' : ''} onClick={() => handleBulletClick(1)}></span>
          <span className={index === 2 ? 'active' : ''} onClick={() => handleBulletClick(2)}></span>
          <span className={index === 3 ? 'active' : ''} onClick={() => handleBulletClick(3)}></span>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
