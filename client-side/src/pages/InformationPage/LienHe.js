import React, { useEffect } from 'react'
import Footer from '~/layouts/Footer/Footer'
import Header from '~/layouts/Header/Header'

export default function LienHe() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
  return (
    <>
    <Header />
    <div className="max-w-5xl mx-auto p-6 font-sans">
            <div className="mb-12">
                <h1 className="text-4xl font-bold mb-6 text-center">Liên Hệ</h1>
                <div className="container mx-auto p-6 font-sans flex flex-col md:flex-row">
            <div className="truso w-full md:w-2/3 mb-6 md:mb-0">
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold">Trụ sở chính</h2>
                    <p>Địa chỉ: Đường Hàn Thuyên, khu phố 6 P, Thủ Đức, Hồ Chí Minh</p>
                    <p>Điện thoại: (024) 39482633</p>
                    <p>Fax: (024) 38278905</p>
                    <p>Email: <a href="mailto:contact@nxbkimdong.com.vn" className="text-blue-500 hover:underline">contact@nxbkimdong.com.vn</a></p>
                </div>

                <div className="mb-6">
                    <h2 className="text-2xl font-semibold">Chi nhánh tại TP. Hồ Chí Minh</h2>
                    <p>Địa chỉ: 248 Cống Quỳnh, P. Phạm Ngũ Lão, Q. 1, TP. Hồ Chí Minh</p>
                    <p>Điện thoại: (028) 39350867</p>
                    <p>Email: <a href="mailto:cnkmindo@nxbkimdong.com.vn" className="text-blue-500 hover:underline">cnkmindo@nxbkimdong.com.vn</a></p>
                </div>

                <div className="mb-6">
                    <h2 className="text-2xl font-semibold">Chi nhánh tại Miền Trung</h2>
                    <p>Địa chỉ: 102 Đống Đa, TP. Đà Nẵng, Việt Nam</p>
                    <p>Email: <a href="mailto:contact@nxbkimdong.com.vn" className="text-blue-500 hover:underline">contact@nxbkimdong.com.vn</a></p>
                </div>
            </div>

            <form className="mt-6 md:mt-0 md:w-1/3 bg-gray-100 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Gửi Tin Nhắn</h2>
                <div className="mb-4">
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        className="border border-gray-300 rounded p-2 w-full" 
                        placeholder='Họ và tên:' 
                        required 
                    />
                </div>

                <div className="mb-4">
                    <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        className="border border-gray-300 rounded p-2 w-full" 
                        placeholder='Số điện thoại:' 
                        required 
                    />
                </div>

                <div className="mb-4">
                    <textarea 
                        id="message" 
                        name="message" 
                        className="border border-gray-300 rounded p-2 w-full" 
                        rows="4" 
                        placeholder='Tin nhắn:' 
                        required 
                    />
                </div>

                <button type="submit" className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
                    Gửi
                </button>
            </form>
        </div>
            </div>

            <div className="mb-12">
                <h1 className="text-4xl font-bold mb-6">Địa Chỉ</h1>

                <div className="mb-6">
                    <h2 className="text-2xl font-semibold">Đường Hàn Thuyên, khu phố 6 P, Thủ Đức, Hồ Chí Minh</h2>
                    <p className="mt-2">Số điện thoại: <a href="tel:+84905719595" className="text-blue-500 hover:underline">(+84) 19005719595</a></p>
                </div>

                <div className="mb-6">
                    <h2 className="text-lg font-semibold">Vị trí trên bản đồ:</h2>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.213423010167!2d105.84917271529412!3d21.01370899300718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab64a1cb8f83%3A0xd5a9e5c9f4e0f8a2!2zNTUgUsOgbmcgVHJ1bmcgTmVndsOgbmggRGUgSGFpIFJhdHVuZywgSGFpbm9p!5e0!3m2!1svi!2s!4v1632952403450!5m2!1svi!2s"
                        width="100%"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        title="Map Location"
                    ></iframe>
                </div>

                <div className="text-center">
                    <p className="text-gray-600">Mọi ý kiến đóng góp xin vui lòng gửi về chúng tôi. Xin chân thành cảm ơn!</p>
                </div>
            </div>
        </div>

    <Footer />
      </>
  )
}
