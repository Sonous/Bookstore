import { Button } from 'antd';
import React, {useState} from 'react'
import Book from '~/component/Book/Book';
import { searchResult } from '~/dataTemorary';

import Header from '~/layouts/Header/Header';


function BookDetail() {
  const [activeHeader, setActiveHeader] = useState('');

  const handleDanhGiaClick = () => {
    setActiveHeader('Danh Gia');
  };

  const handleCauHoiClick = () => {
    setActiveHeader('Cau hoi va tra loi');
  };
  return (
    <div>
      <Header />
      <div className='bg-white rounded-xl flex flex-col'>
      <section className='upperDetail  flex mt-10 mx-48  justify-between gap-5'>
            <div className='leftPicture flex w-5/12 justify-center gap-5 px-10 py-5'>
              <div className="smallPicture w-[80px] h-[120px] 2xl:w-[100px] 2xl:h-[150px] mt-5 bg-cover bg-center" style={{ backgroundImage: "url('https://product.hstatic.net/200000343865/product/hoi-ki-ve-bac-ho_mai-nho-on-nguoi_6a5ac11987ee49ceb288199915f78e6a_master.jpg')" }}>
              </div>
              <div className="bigPicture w-[240px] h-[360px] 2xl:w-[375px] 2xl:h-[550px] bg-cover pl-5 hover:scale-105 cursor-pointer transition-all ease-out" 
                  style={{ backgroundImage: "url('https://product.hstatic.net/200000343865/product/hoi-ki-ve-bac-ho_mai-nho-on-nguoi_6a5ac11987ee49ceb288199915f78e6a_master.jpg')" }}>
              </div>
            </div>
            <div className='rightContent flex flex-col w-7/12'>
              <div className="top-title py-5 flex justify-between border-b border-b-gray-400">
                <div className="title-content flex flex-col ">
                  <h1 className='font-bold text-xl 2xl:text-2xl'>
                      HỒI KÍ VỀ BÁC HỒ - MÃI NHỚ ƠN NGƯỜI
                    </h1>
                  <h1 className='2xl: text-lg'>rating</h1>
                </div>
                <div className="heart-icon">
                </div>
              </div>
              <div className="price-content flex justify-start items-center text-center py-5 gap-5 border-b border-b-gray-400">
                <h1 className='text-red-500 font-bold text-2xl 2xl:text-4xl'>
                  36,000d
                </h1>
                <h1 className='discount text-gray-500 font-bold text-xl 2xl:text-2xl line-through'>
                  40,000d
                </h1>
                <h1 className='2xl: text-md'>(Tiết kiệm 4000d)</h1>
              </div>
              <div className="information-content flex justify-around text-center py-5">
                <div className="description h-[200px] ">
                  Mô tả ở đây
                </div>
                <div className="add-to-cart flex flex-col gap-5 2xl:w-[450px] xl:w-[300px]">
                  <form className='add-to-cart-Form' id='AddToCartForm'>
                    
                      <div className="qty-cart">
                        <span className="block mb-2 font-medium">So luong</span>
                        <div className="qty-interact flex items-center border border-black rounded-md justify-between ">
                          <button className="border-r border-black px-3 py-1">
                            -
                          </button>
                          <input 
                            type="number" 
                            id="quantity" 
                            className="border-x-0 border-t bg-gray-200 border-b border-black text-center w-16 px-2 py-1"
                            value="1"
                          />
                          <button className="border-l border-black px-3 py-1">
                            +
                          </button>
                        </div>
                      </div>
                    
                  </form>
                  <div className="button-container flex flex-col">
                      <Button className=' bg-blue-500 text-white font-bold text-lg'>Thêm vào giỏ hàng</Button>
                      <Button className=' bg-blue-500 text-white font-bold text-lg'>Mua ngay</Button>
                  </div>
                </div>
              </div>
            </div>
        </section>
      <section className='lowerDesc flex mx-48 mt-20 gap-10'>
       <div className="desc-content flex flex-col w-9/12 ">
        <div className="heading bg-red-400  flex text-center">
            <div className="desc border border-gray-600 px-5  hover:bg-red-600 hover:text-white">
              <h1 className='font-semibold text-lg'>Mo ta - Danh gia</h1>
            </div>
            <div className="cmt border border-gray-600 px-5  hover:bg-red-600 hover:text-white">
              <h1 className='font-semibold text-lg'>Binh Luan</h1>
            </div>
          </div>
          <div className="desc-text px-5 border border-gray-600" >
            <h1>Hồi Kí Về Bác Hồ - Mãi Nhớ Ơn Người gồm 02 phần: I - Bác Hồ với nhân sĩ trí thức và II – Bác Hồ với văn nghệ sĩ cho thấy sức cảm hóa kì tài, tinh thần đại đoàn kết và hòa hợp dân tộc ở Người, một trong những nhân tố quan trọng tạo nên thắng lợi vĩ đại của sự nghiệp cách mạng của dân tộc ta.</h1>
            <h1>“… Hôm nay, trong cảnh vĩ đại của lễ Độc lập chưa từng có ở Nam Bộ, sau khi nghe lời ‘Tuyên ngôn Độc lập’ của Cha và lời ca ‘Hồ Chí Minh’ muôn năm của đoàn Thiếu sinh Nam Bộ, con đã cảm xúc vô cùng và vừa khóc, con vừa cắt lấy dòng máu trong cánh tay niên thiếu của con để vẽ hình Cha và hình ba em nhỏ Trung Nam Bắc đương xúm đầu lại dưới chòm râu của Cha…” - DIỆP MINH CHÂU</h1>
            <h1>“Hồ Chí Minh cao mà không xa, mới mà không lạ, to lớn mà không làm ra vĩ đại, chói sáng mà không làm ai choáng ngợp, mới gặp lần đầu nhưng đã cảm thấy thân thiết từ lâu.” - THỦ TƯỚNG PHẠM VĂN ĐỒNG</h1>
          </div>
          <div className="rating border-gray-600 mt-5 border px-5">
            <h1 className='text-2xl'>Danh Gia San Pham</h1>
            <h1>rating</h1>
            <div className="danhgia flex">
              <h1
                className={`cursor-pointer ${activeHeader === 'Danh Gia' ? 'font-bold underline' : ''}`}
                onClick={handleDanhGiaClick}
              >
                Danh Gia
              </h1>
              <h1
                className={`ml-4 cursor-pointer ${activeHeader === 'Cau hoi va tra loi' ? 'font-bold underline' : ''}`}
                onClick={handleCauHoiClick}
              >
                Cau hoi va tra loi
              </h1>
            </div>
          </div>
       </div>
       <div className="same-author text-center items-center w-3/12">
          <h1>Sach cung tac gia</h1>
          
          {searchResult.map((item, index) => (
                              <Book
                                key={index}
                                {...item}
                              />
                            ))}
                            
                            
        </div>
        
        
      </section>
    </div>
    </div>
  )
}

export default BookDetail