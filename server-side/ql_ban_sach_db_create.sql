-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2024-10-10 08:43:15.298

create database ql_ban_sach;
use ql_ban_sach;
drop database ql_ban_sach;

-- tables
-- Table: Address
CREATE TABLE Address (
    address_id int  NOT NULL,
    address_house_number nvarchar(255)  NOT NULL,
    address_ward nvarchar(50)  NOT NULL,
    address_district nvarchar(50)  NOT NULL,
    address_province nvarchar(50)  NOT NULL,
    address_description text  NOT NULL,
    created_at datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT Address_pk PRIMARY KEY (address_id)
);

-- Table: Admin
CREATE TABLE Admin (
    admin_id int  NOT NULL,
    admin_username varchar(255)  NOT NULL,
    admin_password varchar(255)  NOT NULL,
    CONSTRAINT Admin_pk PRIMARY KEY (admin_id)
);

-- Table: Banner
CREATE TABLE Banner (
    banner_id int  NOT NULL,
    banner_image_url varchar(255)  NOT NULL,
    banner_link varchar(255) ,
    CONSTRAINT Banner_pk PRIMARY KEY (banner_id)
);

-- Table: Blog
CREATE TABLE Blog (
    blog_id int  NOT NULL,
    blog_title nvarchar(255)  NOT NULL,
    blog_content text  NOT NULL,
    blog_thumbnail varchar(255)  NOT NULL,
    created_at datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    type_id int  NOT NULL,
    CONSTRAINT Blog_pk PRIMARY KEY (blog_id)
);

-- Table: BlogType
CREATE TABLE BlogType (
    type_id int  NOT NULL,
    type_name nvarchar(50)  NOT NULL,
    CONSTRAINT BlogType_pk PRIMARY KEY (type_id)
);

-- Table: Book
CREATE TABLE Book (
    book_id int  NOT NULL,
    book_name nvarchar(255)  NOT NULL,
    book_cost decimal(20,2)  NOT NULL,
    book_discount decimal(4,2)  NOT NULL,
    book_end_cost decimal(20,2)  NOT NULL,
    book_available int  NOT NULL,
    book_sold int  NOT NULL,
    book_star_rating int  NOT NULL,
    book_rating_num int  NOT NULL,
    book_description text  NOT NULL,
    book_author nvarchar(255)  NOT NULL,
    book_format nvarchar(50)  NOT NULL,
    book_page_num int  NOT NULL,
    book_collection nvarchar(255),
    book_status nvarchar(255)  NOT NULL,
    created_at datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT Book_pk PRIMARY KEY (book_id)
);


-- Table: BookGenre
CREATE TABLE BookGenre (
    book_id int  NOT NULL,
    genre_id int  NOT NULL,
    CONSTRAINT BookGenre_pk PRIMARY KEY (book_id, genre_id)
);

-- Table: BookImage
CREATE TABLE BookImage (
    book_image_id int  NOT NULL,
    book_image_url varchar(255)  NOT NULL,
    book_id int  NOT NULL,
    CONSTRAINT BookImage_pk PRIMARY KEY (book_image_id)
);

-- Table: BookOrder
CREATE TABLE BookOrder (
    order_id int  NOT NULL,
    book_id int  NOT NULL,
    quantity int  NOT NULL,
    CONSTRAINT BookOrder_pk PRIMARY KEY (order_id,book_id)
);

-- Table: Cart
CREATE TABLE Cart (
    user_id int  NOT NULL,
    book_id int  NOT NULL,
    quantity int  NOT NULL,
    CONSTRAINT Cart_pk PRIMARY KEY (user_id,book_id)
);

-- Table: Categogy
CREATE TABLE Categogy (
    category_id int  NOT NULL,
    category_name nvarchar(50)  NOT NULL,
    CONSTRAINT Categogy_pk PRIMARY KEY (category_id)
);

-- Table: FavoriteBook
CREATE TABLE FavoriteBook (
    user_id int  NOT NULL,
    book_id int  NOT NULL,
    CONSTRAINT FavoriteBook_pk PRIMARY KEY (user_id,book_id)
);

-- Table: Genre
CREATE TABLE Genre (
    genre_id int  NOT NULL,
    genre_name nvarchar(50)  NOT NULL,
    category_id int  NOT NULL,
    CONSTRAINT Genre_pk PRIMARY KEY (genre_id)
);

-- Table: Order
CREATE TABLE `Order` (
    order_id int  NOT NULL,
    order_status nvarchar(50)  NOT NULL,
    books_total_prices decimal(20,2)  NOT NULL,
    transport_cost decimal(20,2)  NOT NULL,
    order_total_cost decimal(20,2)  NOT NULL,
    created_at datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    user_id int  NOT NULL,
    address_id int  NOT NULL,
    pay_method_id int  NOT NULL,
    CONSTRAINT Order_pk PRIMARY KEY (order_id)
);

-- Table: PayingMethod
CREATE TABLE PayingMethod (
    pay_method_id int  NOT NULL,
    pay_method_name nvarchar(255)  NOT NULL,
    CONSTRAINT PayingMethod_pk PRIMARY KEY (pay_method_id)
);

-- Table: RatingBook
CREATE TABLE RatingBook (
    user_id int  NOT NULL,
    book_id int  NOT NULL,
    rating_star int  NOT NULL,
    rating_content text  NOT NULL,
    created_at datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT RatingBook_pk PRIMARY KEY (user_id,book_id)
);

-- Table: User
CREATE TABLE User (
    user_id int  NOT NULL,
    user_name nvarchar(255)  NOT NULL,
    user_phone varchar(20)  NOT NULL,
    user_email varchar(255)  NOT NULL,
    user_password varchar(255)  NOT NULL,
    user_avatar_url varchar(255)  NOT NULL,
    created_at datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT User_pk PRIMARY KEY (user_id)
);

-- Table: UserAddress
CREATE TABLE UserAddress (
    address_id int  NOT NULL,
    user_id int  NOT NULL,
    CONSTRAINT UserAddress_pk PRIMARY KEY (address_id,user_id)
);

-- foreign keys
-- Reference: Blog_BlogType (table: Blog)
ALTER TABLE Blog ADD CONSTRAINT Blog_BlogType FOREIGN KEY Blog_BlogType (type_id)
    REFERENCES BlogType (type_id);

-- Reference: BookFavorite_User (table: FavoriteBook)
ALTER TABLE FavoriteBook ADD CONSTRAINT BookFavorite_User FOREIGN KEY BookFavorite_User (user_id)
    REFERENCES User (user_id);

-- Reference: BookGenre_Book (table: BookGenre)
ALTER TABLE BookGenre ADD CONSTRAINT BookGenre_Book FOREIGN KEY BookGenre_Book (book_id)
    REFERENCES Book (book_id);

-- Reference: BookGenre_Genre (table: BookGenre)
ALTER TABLE BookGenre ADD CONSTRAINT BookGenre_Genre FOREIGN KEY BookGenre_Genre (genre_id)
    REFERENCES Genre (genre_id);

-- Reference: BookImage_Book (table: BookImage)
ALTER TABLE BookImage ADD CONSTRAINT BookImage_Book FOREIGN KEY BookImage_Book (book_id)
    REFERENCES Book (book_id);

-- Reference: BookOrder_Book (table: BookOrder)
ALTER TABLE BookOrder ADD CONSTRAINT BookOrder_Book FOREIGN KEY BookOrder_Book (book_id)
    REFERENCES Book (book_id);

-- Reference: BookOrder_Order (table: BookOrder)
ALTER TABLE BookOrder ADD CONSTRAINT BookOrder_Order FOREIGN KEY BookOrder_Order (order_id)
    REFERENCES `Order` (order_id);

-- Reference: Cart_Book (table: Cart)
ALTER TABLE Cart ADD CONSTRAINT Cart_Book FOREIGN KEY Cart_Book (book_id)
    REFERENCES Book (book_id);

-- Reference: Cart_User (table: Cart)
ALTER TABLE Cart ADD CONSTRAINT Cart_User FOREIGN KEY Cart_User (user_id)
    REFERENCES User (user_id);

-- Reference: FavoriteBook_Book (table: FavoriteBook)
ALTER TABLE FavoriteBook ADD CONSTRAINT FavoriteBook_Book FOREIGN KEY FavoriteBook_Book (book_id)
    REFERENCES Book (book_id);

-- Reference: Genre_Categogy (table: Genre)
ALTER TABLE Genre ADD CONSTRAINT Genre_Categogy FOREIGN KEY Genre_Categogy (category_id)
    REFERENCES Categogy (category_id);

-- Reference: Order_Address (table: Order)
ALTER TABLE `Order` ADD CONSTRAINT Order_Address FOREIGN KEY Order_Address (address_id)
    REFERENCES Address (address_id);

-- Reference: Order_PayingMethod (table: Order)
ALTER TABLE `Order` ADD CONSTRAINT Order_PayingMethod FOREIGN KEY Order_PayingMethod (pay_method_id)
    REFERENCES PayingMethod (pay_method_id);

-- Reference: Order_User (table: Order)
ALTER TABLE `Order` ADD CONSTRAINT Order_User FOREIGN KEY Order_User (user_id)
    REFERENCES User (user_id);

-- Reference: Table_15_Book (table: RatingBook)
ALTER TABLE RatingBook ADD CONSTRAINT Table_15_Book FOREIGN KEY Table_15_Book (book_id)
    REFERENCES Book (book_id);

-- Reference: Table_15_User (table: RatingBook)
ALTER TABLE RatingBook ADD CONSTRAINT Table_15_User FOREIGN KEY Table_15_User (user_id)
    REFERENCES User (user_id);

-- Reference: User_Address_Address (table: UserAddress)
ALTER TABLE UserAddress ADD CONSTRAINT User_Address_Address FOREIGN KEY User_Address_Address (address_id)
    REFERENCES Address (address_id);

-- Reference: User_Address_User (table: UserAddress)
ALTER TABLE UserAddress ADD CONSTRAINT User_Address_User FOREIGN KEY User_Address_User (user_id)
    REFERENCES User (user_id);

-- End of file.

-- Insert data

 -- User
 INSERT INTO User (user_id, user_name, user_phone, user_email, user_password, user_avatar_url) VALUES 
 (10001, N'Lâm Quốc Huy', '0123456789', '1234abc@gmail.com', '1234abc@', 'Sonous.jpg');
 
 -- Book
INSERT INTO Book (book_id, book_name, book_cost, book_discount, book_end_cost, book_available, book_sold, book_star_rating, book_rating_num, book_description, book_author, book_format, book_page_num, book_collection, book_status) VALUES 
(60001, N'Hồi Kí Vanitas - Tập 10', 36000.00, 0.04, 34560.00, 100, 40, 5, 1, N'Tôi sẽ không bao giờ để cậu được “tự do”. Vanitas và Noé đối đầu nhau đúng như kế hoạch của Mikhail. Một bên tuyệt đối không để kí ức về “Trăng Xanh” bị tước đoạt, bên lại không muốn một lần nữa đánh mất người mình trân quý. Kết cục của trận chiến giữa những nguyện vọng tương đồng này là… Răng nanh ấy, tiếng khóc ấy, ước muốn ấy, tất thảy liệu có đến được đúng nơi?', N'Jun Mochizuki', N'bìa mềm', 186, N'Hồi kí Vanitas', N'Còn hàng'),
(60002, N'Hồi Kí Vanitas - Tập 4 (Tái Bản)', 36000.00, 0.04, 34560.00, 50, 20, 4, 1, N'Một đội quân chống Vampire “Chasseur”. Một “cái bóng của kẻ bị nguyền rủa” mang tính chất huỷ diệt. Trước hiểm họa đương chực chờ nơi hầm mộ dưới lòng đất, Vanitas và Noé đã chiến đấu vì lẽ gì, đã liều mình để cứu ai? Vai kề vai, chung lưng đấu cật... Dẫu rằng ngày nào đó, số mệnh nghiệt ngã sẽ khiến chiếc nanh ấy làm tổn thương cả hai người… “Vì tôi cứ vẽ một mạch tới đoạn mình muốn nên cuốn sách ra lần này cũng lại dày cui... Vậy là giảm cân thất bại rồi. Bắt đầu từ cuốn sau có lẽ số trang sẽ mỏng dần, nhưng tôi rất vui nếu có thể giữ được độ dày trung bình như mọi cuốn truyện bình thường khác.” (Jun Mochizuki)', N'Jun Mochizuki', N'bìa mềm', 200, N'Hồi kí Vanitas', N'Còn hàng'),
(60003, N'Thám Tử Lừng Danh Conan - Tập 102', 25000.00, 0.04, 24000.00, 50, 20, 5, 1, N'Jugo Yokomizo tình cờ gặp Chihaya Hagiwara tại bữa tiệc mai mối! Điều gì hiện lên trong tâm trí Chihaya khi cô chăm chú nhìn Wataru Takagi!? Chí nguyện “hoa anh đào” được tiếp nối qua bao thế hệ... Và... Chẳng hề báo trước, tập truyện này sẽ mở ra những diễn biến đầy bất ngờ.', N'Gosho Aoyama', N'bìa mềm', 180, N'Thám tử lừng danh Conan', N'Còn hàng'),
(60004, N'Thám Tử Lừng Danh Conan - Tập 101', 25000.00, 0.04, 24000.00, 50, 20, 0, 0, N'Mật mã Akemi Miyano để lại ẩn chứa gợi ý về vị trí chôn chiếc hộp thời gian ở trường tiểu học!? Conan dẽ cùng nhóm Haibara hợp sức giải mã!! Tiếng súng vang lên tại nhà hàng Pháp danh tiếng! Conan lần theo dấu viết của tiến sĩ vừa bị bắt đi, thế rồi “nữ thần gió” bất ngờ xuất hiện trước mặt cậu. Thân phận thực sự của cô là gì? Và lần này, Toru Amuro sẽ đối đầu với Kaito Kid khi hắn định trộm món bảo vật!', N'Gosho Aoyama', N'bìa mềm', 181, N'Thám tử lừng danh Conan', N'Còn hàng'),
(60005, N'Atomic Habits - Thay Đổi Tí Hon Hiệu Quả Bất Ngờ (Tái Bản 2023)', 189000.00, 0.22, 147420.00, 100, 40, 0, 0, N'<div>
    <p><strong>Atomic Habits - Thay Đổi Tí Hon Hiệu Quả Bất Ngờ (Tái Bản 2023)</strong></p>
    <p>• Wall Street Journal Bestseller, USA Today Bestseller, Publisher’s Weekly Bestseller</p>
    <p>• Nằm trong Top 20 tựa sách thể loại non-fiction bán chạy và được tìm đọc nhiều nhất của Amazon suốt 40 tuần tính đến tháng 9/2019</p>
    <p>Một thay đổi tí hon có thể biến đổi cuộc đời bạn không?</p>
    <p>Hẳn là khó đồng ý với điều đó. Nhưng nếu bạn thay đổi thêm một chút? Một chút nữa? Rồi thêm một chút nữa? Đến một lúc nào đó, bạn phải công nhận rằng cuộc sống của mình đã chuyển biến nhờ vào một thay đổi nhỏ…</p>
    <p>Và đó chính là sức mạnh của thói quen nguyên tử.</p>
    <p>Tác giả:</p>
    <p>James Clear là tác giả người Mỹ, nhiếp ảnh gia, nhà khởi nghiệp, và là người sáng tạo The Habits Academy.</p>
    <p>Anh nghiên cứu về những thói quen, việc đưa ra quyết định và sự cải tiến liên tục. Trang jamesclear.com có hàng triệu lượt truy cập mỗi tháng.</p>
    <p>Bài viết của James Clear được đăng trên New York Times, Entrepreneur, Time… Anh cũng là diễn giả thường xuyên tại các công ty nằm trong bảng xếp hạng Fortune 500.</p>
</div>
', N'James Clear', N'bìa mềm', 385, NULL, N'Còn hàng'),

(60006, N'Tư Duy Mở', 138000.00, 0.5, 69000.00, 100, 40, 0, 0, N'<div>
    <p><strong>Tư Duy Mở</strong></p>
    <p>Con người đang sống trong thời đại công nghệ, khi mọi thứ thay đổi chóng mặt, điều đó đòi hỏi chúng ta phải linh hoạt trong cách tư duy để bắt kịp xu hướng toàn cầu. Hay nói cách khác, chúng ta cần có một tư duy mở để đón nhận và khai phá kiến thức mới, bởi nếu chúng ta cứ khăng khăng giữ định kiến của mình thì sự phát triển sẽ đi vào ngõ cụt.</p>
    <p>Cụ thể hơn, người có tư duy mở tin rằng chỉ cần họ nỗ lực, thay đổi là có thể tiến bộ hơn. Họ sẽ vui vẻ chấp nhận thử thách, xem thử thách như cơ hội để học hỏi được những điều hay cái mới. Khi đối mặt với khó khăn hay không thành công, người có tư duy mở thường có thái độ: “Cách này không hiệu quả, vậy mình thử cách khác”. Đối với họ, thất bại chỉ là bài học giúp họ hoàn hảo hơn trên con đường khẳng định bản thân và phát triển sự nghiệp.</p>
    <p>Vậy làm thế nào để biết được chúng ta đang có loại tư duy nào, đóng hay mở? Và làm thế nào chúng ta nhận ra chúng?</p>
    <p>Nhưng làm thế nào để có được tư duy mở?</p>
    <p>Và tư duy mở góp phần vào cuộc sống của chúng ta thế nào?</p>
    <p>
        <em>
            Khi bạn đặt ra những câu hỏi đó thì cuốn sách này sinh ra để dành cho bạn. Cuốn sách được biên soạn dựa trên sự học tập và nghiên cứu tài liệu trong và ngoài nước cũng như từ những trải nghiệm của bản thân tác giả sẽ mang lại cho bạn những giá trị hữu ích của tư duy mở, giúp bạn tự tin chinh phục ước mơ, sẵn sàng đón nhận mọi chướng ngại và luôn nở nụ cười hạnh phúc.
        </em>
    </p>
</div>
', N'Nguyễn Anh Dũng', N'bìa mềm', 208, NULL, N'Còn hàng'),

(60007, N'Thiên Tài Bên Trái, Kẻ Điên Bên Phải (Tái Bản 2021)', 179000.00, 0.27, 130670.00, 100, 40, 0, 0, N'<div>
    <p><strong>Thiên Tài Bên Trái, Kẻ Điên Bên Phải</strong></p>
    <p><strong>NẾU MỘT NGÀY ANH THẤY TÔI ĐIÊN, THỰC RA CHÍNH LÀ ANH ĐIÊN ĐẤY!</strong></p>
    <p>Hỡi những con người đang oằn mình trong cuộc sống, bạn biết gì về thế giới của mình? Là vô vàn thứ lý thuyết được các bậc vĩ nhân kiểm chứng, là luật lệ, là cả nghìn thứ sự thật bọc trong cái lốt hiển nhiên, hay những triết lý cứng nhắc của cuộc đời?</p>
    <p>Lại đây, vượt qua thứ nhận thức tẻ nhạt bị đóng kín bằng con mắt trần gian, khai mở toàn bộ suy nghĩ, để dòng máu trong bạn sục sôi trước những điều kỳ vĩ, phá vỡ mọi quy tắc. Thế giới sẽ gọi bạn là kẻ điên, nhưng vậy thì có sao? Ranh giới duy nhất giữa kẻ điên và thiên tài chẳng qua là một sợi chỉ mỏng manh: Thiên tài chứng minh được thế giới của mình, còn kẻ điên chưa kịp làm điều đó. Chọn trở thành một kẻ điên để vẫy vùng giữa nhân gian loạn thế hay khóa hết chúng lại, sống mãi một cuộc đời bình thường khiến bạn cảm thấy hạnh phúc hơn?</p>
    <p>
        <em>
            Thiên tài bên trái, kẻ điên bên phải
        </em> 
        là cuốn sách dành cho những người điên rồ, những kẻ gây rối, những người chống đối, những mảnh ghép hình tròn trong những ô vuông không vừa vặn… những người nhìn mọi thứ khác biệt, không quan tâm đến quy tắc. Bạn có thể đồng ý, có thể phản đối, có thể vinh danh hay lăng mạ họ, nhưng điều duy nhất bạn không thể làm là phủ nhận sự tồn tại của họ. Đó là những người luôn tạo ra sự thay đổi trong khi hầu hết con người chỉ sống rập khuôn như một cái máy. Đa số đều nghĩ họ thật điên rồ nhưng nếu nhìn ở góc khác, ta lại thấy họ thiên tài. Bởi chỉ những người đủ điên nghĩ rằng họ có thể thay đổi thế giới mới là những người làm được điều đó.
    </p>
    <p>Chào mừng đến với thế giới của những kẻ điên.</p>
</div>
', N'Cao Minh', N'bìa mềm', 424, NULL, N'Còn hàng'),

(60008, N'Chúa tể bóng tối (Manga) - Tập 6', 40000.00, 0.1, 36000.00, 0, 40, 0, 0, N'<p>
    TRUYỆN TRANH CHUYỂN THỂ TỪ BỘ LIGHT-NOVEL “CHÚA TỂ BÓNG TỐI” RẤT ĐƯỢC YÊU THÍCH!!<br />
    Cậu thiếu niên Cid sau khi chuyển sinh sang một thế giới khác vẫn tiếp tục chơi trò nhập vai Chúa tể Bóng tối, can thiệp vào mọi biến cố và bộc lộ sức mạnh thực sự của mình từ trong màn đêm. Sau khi che giấu thân phận để tham dự<br />
    Đại hội Bushin – sự kiện lớn hằng năm nhằm tìm ra kiếm sĩ mạnh nhất cả nước, Cid đã nhanh chóng lọt vào tầm ngắm của rất nhiều người, trong đó có cả đại diện của 5 học viện nổi tiếng của quốc gia. Vậy ai sẽ là kẻ chiến thắng cuối cùng?<br />
    Mời các bạn đón đọc Tập 6 của series <strong>“Chúa Tể Bóng Tối”</strong>!
</p>
', N'Daisuke Takagi', N'bìa mềm', 228, NULL, N'Còn hàng'),

(60009, N'Dược sư tự sự (Light-novel) - Tập 5', 125000, 0.1, 112500, 0, 40, 0, 0, N'<div>
  <p>
    Cuộc nổi loạn của Tử tộc được dẹp yên, hoàng tử chào đời trong cung cấm, Ngọc Diệp trở thành chính cung hoàng hậu. 
    Nhâm Thị tham gia xử lí chính sự với thân phận hoàng đệ thay vì hoạn quan. 
    Thoạt nhìn, mọi việc tưởng chừng như đã yên bình, thế nhưng bầu không khí bất ổn lại lan toả khắp kinh thành. 
    Miêu Miêu thì vẫn như mọi khi, dính dáng tới vụ án đồ ngọt có độc bí ẩn, mối lo ngại về nạn châu chấu, vấn đề quyền sở hữu ở ngôi làng làm giấy... và xía mũi vào mấy chuyện này.
  </p>
  <p>
    Bên cạnh đó, theo mệnh lệnh của Nhâm Thị, cô cũng phải đi đến quê hương của Ngọc Diệp phi, địa điểm mang tên gọi Tây Đô. 
    Tại buổi vũ hội nơi vô vàn đoá hoa rực rỡ nở rộ, âm mưu của kẻ nào đó đang lẩn khuất. 
    Liệu Miêu Miêu có thể vạch trần ý đồ đó hay không!?
  </p>
  <p>
    DƯỢC SƯ TỰ SỰ là series light-novel thể loại trinh thám vô cùng độc đáo lấy bối cảnh cung đình. 
    Truyện đã được chuyển thể manga và anime ra mắt vào cuối năm 2023. 
    Tính đến tháng 3/2024, toàn series đã vượt mốc 33 triệu bản tại thị trường Nhật Bản và luôn thống trị bảng xếp hạng bán chạy mỗi khi ra tập mới!
  </p>
  <p>Số tập: 15+ (on-going)</p>
</div>
', N'Natsu Hyuuga, Touco Shino', N'bìa mềm', 468, N'Dược sư tự sự (Light-novel)', N'Hết hàng'),

(60010, N'Nhà Giả Kim (Tái Bản 2020)', 79000, 0.22, 61620, 100, 40, 0, 0, N'<div>
    <p>
        <em>Tất cả những trải nghiệm trong chuyến phiêu du theo đuổi vận mệnh của mình đã giúp Santiago thấu hiểu được ý nghĩa sâu xa nhất của hạnh phúc, hòa hợp với vũ trụ và con người</em>.
    </p>
    <p>
        Tiểu thuyết <em>Nhà giả kim</em> của Paulo Coelho như một câu chuyện cổ tích giản dị, nhân ái, giàu chất thơ, thấm đẫm những minh triết huyền bí của phương Đông. Trong lần xuất bản đầu tiên tại Brazil vào năm 1988, sách chỉ bán được 900 bản. Nhưng, với số phận đặc biệt của cuốn sách dành cho toàn nhân loại, vượt ra ngoài biên giới quốc gia, <em>Nhà giả kim</em> đã làm rung động hàng triệu tâm hồn, trở thành một trong những cuốn sách bán chạy nhất mọi thời đại, và có thể làm thay đổi cuộc đời người đọc.
    </p>
    <p>
        “Nhưng nhà luyện kim đan không quan tâm mấy đến những điều ấy. Ông đã từng thấy nhiều người đến rồi đi, trong khi ốc đảo và sa mạc vẫn là ốc đảo và sa mạc. Ông đã thấy vua chúa và kẻ ăn xin đi qua biển cát này, cái biển cát thường xuyên thay hình đổi dạng vì gió thổi nhưng vẫn mãi mãi là biển cát mà ông đã biết từ thuở nhỏ. Tuy vậy, tự đáy lòng mình, ông không thể không cảm thấy vui trước hạnh phúc của mỗi người lữ khách, sau bao ngày chỉ có cát vàng với trời xanh nay được thấy chà là xanh tươi hiện ra trước mắt. ‘Có thể Thượng đế tạo ra sa mạc chỉ để cho con người biết quý trọng cây chà là,’ ông nghĩ.”
    </p>
    <p>- Trích <em>Nhà giả kim</em></p>
    <p>
        <strong>Nhận định</strong>
    </p>
    <p>
        “Sau Garcia Márquez, đây là nhà văn Mỹ Latinh được đọc nhiều nhất thế giới.” <em>- The Economist</em>, London, Anh
    </p>
    <p>
        “Santiago có khả năng cảm nhận bằng trái tim như <em>Hoàng tử bé</em> của Saint-Exupéry.” <em>- Frankfurter Allgemeine Zeitung, Đức</em>
    </p>
</div>
', N'Paulo Coelho', N'bìa mềm', 227, NULL, N'Còn hàng'),
(60011, N'Hồi Kí Vanitas - Tập 10', 36000.00, 0.04, 34560.00, 100, 40, 0, 0, N'Tôi sẽ không bao giờ để cậu được “tự do”. Vanitas và Noé đối đầu nhau đúng như kế hoạch của Mikhail. Một bên tuyệt đối không để kí ức về “Trăng Xanh” bị tước đoạt, bên lại không muốn một lần nữa đánh mất người mình trân quý. Kết cục của trận chiến giữa những nguyện vọng tương đồng này là… Răng nanh ấy, tiếng khóc ấy, ước muốn ấy, tất thảy liệu có đến được đúng nơi?', N'Jun Mochizuki', N'bìa mềm', 186, N'Hồi kí Vanitas', N'Còn hàng'),
(60012, N'Hồi Kí Vanitas - Tập 4 (Tái Bản)', 36000.00, 0.04, 34560.00, 50, 20, 0, 0, N'Một đội quân chống Vampire “Chasseur”. Một “cái bóng của kẻ bị nguyền rủa” mang tính chất huỷ diệt. Trước hiểm họa đương chực chờ nơi hầm mộ dưới lòng đất, Vanitas và Noé đã chiến đấu vì lẽ gì, đã liều mình để cứu ai? Vai kề vai, chung lưng đấu cật... Dẫu rằng ngày nào đó, số mệnh nghiệt ngã sẽ khiến chiếc nanh ấy làm tổn thương cả hai người… “Vì tôi cứ vẽ một mạch tới đoạn mình muốn nên cuốn sách ra lần này cũng lại dày cui... Vậy là giảm cân thất bại rồi. Bắt đầu từ cuốn sau có lẽ số trang sẽ mỏng dần, nhưng tôi rất vui nếu có thể giữ được độ dày trung bình như mọi cuốn truyện bình thường khác.” (Jun Mochizuki)', N'Jun Mochizuki', N'bìa mềm', 200, N'Hồi kí Vanitas', N'Còn hàng'),
(60013, N'Thám Tử Lừng Danh Conan - Tập 102', 25000.00, 0.04, 24000.00, 50, 20, 0, 0, N'Jugo Yokomizo tình cờ gặp Chihaya Hagiwara tại bữa tiệc mai mối! Điều gì hiện lên trong tâm trí Chihaya khi cô chăm chú nhìn Wataru Takagi!? Chí nguyện “hoa anh đào” được tiếp nối qua bao thế hệ... Và... Chẳng hề báo trước, tập truyện này sẽ mở ra những diễn biến đầy bất ngờ.', N'Gosho Aoyama', N'bìa mềm', 180, N'Thám tử lừng danh Conan', N'Còn hàng'),
(60014, N'Thám Tử Lừng Danh Conan - Tập 101', 25000.00, 0.04, 24000.00, 50, 20, 0, 0, N'Mật mã Akemi Miyano để lại ẩn chứa gợi ý về vị trí chôn chiếc hộp thời gian ở trường tiểu học!? Conan dẽ cùng nhóm Haibara hợp sức giải mã!! Tiếng súng vang lên tại nhà hàng Pháp danh tiếng! Conan lần theo dấu viết của tiến sĩ vừa bị bắt đi, thế rồi “nữ thần gió” bất ngờ xuất hiện trước mặt cậu. Thân phận thực sự của cô là gì? Và lần này, Toru Amuro sẽ đối đầu với Kaito Kid khi hắn định trộm món bảo vật!', N'Gosho Aoyama', N'bìa mềm', 181, N'Thám tử lừng danh Conan', N'Còn hàng'),
(60015, N'Atomic Habits - Thay Đổi Tí Hon Hiệu Quả Bất Ngờ (Tái Bản 2023)', 189000.00, 0.22, 147420.00, 100, 40, 0, 0, N'<div>
    <p><strong>Atomic Habits - Thay Đổi Tí Hon Hiệu Quả Bất Ngờ (Tái Bản 2023)</strong></p>
    <p>• Wall Street Journal Bestseller, USA Today Bestseller, Publisher’s Weekly Bestseller</p>
    <p>• Nằm trong Top 20 tựa sách thể loại non-fiction bán chạy và được tìm đọc nhiều nhất của Amazon suốt 40 tuần tính đến tháng 9/2019</p>
    <p>Một thay đổi tí hon có thể biến đổi cuộc đời bạn không?</p>
    <p>Hẳn là khó đồng ý với điều đó. Nhưng nếu bạn thay đổi thêm một chút? Một chút nữa? Rồi thêm một chút nữa? Đến một lúc nào đó, bạn phải công nhận rằng cuộc sống của mình đã chuyển biến nhờ vào một thay đổi nhỏ…</p>
    <p>Và đó chính là sức mạnh của thói quen nguyên tử.</p>
    <p>Tác giả:</p>
    <p>James Clear là tác giả người Mỹ, nhiếp ảnh gia, nhà khởi nghiệp, và là người sáng tạo The Habits Academy.</p>
    <p>Anh nghiên cứu về những thói quen, việc đưa ra quyết định và sự cải tiến liên tục. Trang jamesclear.com có hàng triệu lượt truy cập mỗi tháng.</p>
    <p>Bài viết của James Clear được đăng trên New York Times, Entrepreneur, Time… Anh cũng là diễn giả thường xuyên tại các công ty nằm trong bảng xếp hạng Fortune 500.</p>
</div>
', N'James Clear', N'bìa mềm', 385, NULL, N'Còn hàng'),

(60016, N'Tư Duy Mở', 138000.00, 0.5, 69000.00, 100, 40, 0, 0, N'<div>
    <p><strong>Tư Duy Mở</strong></p>
    <p>Con người đang sống trong thời đại công nghệ, khi mọi thứ thay đổi chóng mặt, điều đó đòi hỏi chúng ta phải linh hoạt trong cách tư duy để bắt kịp xu hướng toàn cầu. Hay nói cách khác, chúng ta cần có một tư duy mở để đón nhận và khai phá kiến thức mới, bởi nếu chúng ta cứ khăng khăng giữ định kiến của mình thì sự phát triển sẽ đi vào ngõ cụt.</p>
    <p>Cụ thể hơn, người có tư duy mở tin rằng chỉ cần họ nỗ lực, thay đổi là có thể tiến bộ hơn. Họ sẽ vui vẻ chấp nhận thử thách, xem thử thách như cơ hội để học hỏi được những điều hay cái mới. Khi đối mặt với khó khăn hay không thành công, người có tư duy mở thường có thái độ: “Cách này không hiệu quả, vậy mình thử cách khác”. Đối với họ, thất bại chỉ là bài học giúp họ hoàn hảo hơn trên con đường khẳng định bản thân và phát triển sự nghiệp.</p>
    <p>Vậy làm thế nào để biết được chúng ta đang có loại tư duy nào, đóng hay mở? Và làm thế nào chúng ta nhận ra chúng?</p>
    <p>Nhưng làm thế nào để có được tư duy mở?</p>
    <p>Và tư duy mở góp phần vào cuộc sống của chúng ta thế nào?</p>
    <p>
        <em>
            Khi bạn đặt ra những câu hỏi đó thì cuốn sách này sinh ra để dành cho bạn. Cuốn sách được biên soạn dựa trên sự học tập và nghiên cứu tài liệu trong và ngoài nước cũng như từ những trải nghiệm của bản thân tác giả sẽ mang lại cho bạn những giá trị hữu ích của tư duy mở, giúp bạn tự tin chinh phục ước mơ, sẵn sàng đón nhận mọi chướng ngại và luôn nở nụ cười hạnh phúc.
        </em>
    </p>
</div>
', N'Nguyễn Anh Dũng', N'bìa mềm', 208, NULL, N'Còn hàng'),

(60017, N'Thiên Tài Bên Trái, Kẻ Điên Bên Phải (Tái Bản 2021)', 179000.00, 0.27, 130670.00, 100, 40, 0, 0, N'<div>
    <p><strong>Thiên Tài Bên Trái, Kẻ Điên Bên Phải</strong></p>
    <p><strong>NẾU MỘT NGÀY ANH THẤY TÔI ĐIÊN, THỰC RA CHÍNH LÀ ANH ĐIÊN ĐẤY!</strong></p>
    <p>Hỡi những con người đang oằn mình trong cuộc sống, bạn biết gì về thế giới của mình? Là vô vàn thứ lý thuyết được các bậc vĩ nhân kiểm chứng, là luật lệ, là cả nghìn thứ sự thật bọc trong cái lốt hiển nhiên, hay những triết lý cứng nhắc của cuộc đời?</p>
    <p>Lại đây, vượt qua thứ nhận thức tẻ nhạt bị đóng kín bằng con mắt trần gian, khai mở toàn bộ suy nghĩ, để dòng máu trong bạn sục sôi trước những điều kỳ vĩ, phá vỡ mọi quy tắc. Thế giới sẽ gọi bạn là kẻ điên, nhưng vậy thì có sao? Ranh giới duy nhất giữa kẻ điên và thiên tài chẳng qua là một sợi chỉ mỏng manh: Thiên tài chứng minh được thế giới của mình, còn kẻ điên chưa kịp làm điều đó. Chọn trở thành một kẻ điên để vẫy vùng giữa nhân gian loạn thế hay khóa hết chúng lại, sống mãi một cuộc đời bình thường khiến bạn cảm thấy hạnh phúc hơn?</p>
    <p>
        <em>
            Thiên tài bên trái, kẻ điên bên phải
        </em> 
        là cuốn sách dành cho những người điên rồ, những kẻ gây rối, những người chống đối, những mảnh ghép hình tròn trong những ô vuông không vừa vặn… những người nhìn mọi thứ khác biệt, không quan tâm đến quy tắc. Bạn có thể đồng ý, có thể phản đối, có thể vinh danh hay lăng mạ họ, nhưng điều duy nhất bạn không thể làm là phủ nhận sự tồn tại của họ. Đó là những người luôn tạo ra sự thay đổi trong khi hầu hết con người chỉ sống rập khuôn như một cái máy. Đa số đều nghĩ họ thật điên rồ nhưng nếu nhìn ở góc khác, ta lại thấy họ thiên tài. Bởi chỉ những người đủ điên nghĩ rằng họ có thể thay đổi thế giới mới là những người làm được điều đó.
    </p>
    <p>Chào mừng đến với thế giới của những kẻ điên.</p>
</div>
', N'Cao Minh', N'bìa mềm', 424, NULL, N'Còn hàng'),

(60018, N'Chúa tể bóng tối (Manga) - Tập 6', 40000.00, 0.1, 36000.00, 0, 40, 0, 0, N'<p>
    TRUYỆN TRANH CHUYỂN THỂ TỪ BỘ LIGHT-NOVEL “CHÚA TỂ BÓNG TỐI” RẤT ĐƯỢC YÊU THÍCH!!<br />
    Cậu thiếu niên Cid sau khi chuyển sinh sang một thế giới khác vẫn tiếp tục chơi trò nhập vai Chúa tể Bóng tối, can thiệp vào mọi biến cố và bộc lộ sức mạnh thực sự của mình từ trong màn đêm. Sau khi che giấu thân phận để tham dự<br />
    Đại hội Bushin – sự kiện lớn hằng năm nhằm tìm ra kiếm sĩ mạnh nhất cả nước, Cid đã nhanh chóng lọt vào tầm ngắm của rất nhiều người, trong đó có cả đại diện của 5 học viện nổi tiếng của quốc gia. Vậy ai sẽ là kẻ chiến thắng cuối cùng?<br />
    Mời các bạn đón đọc Tập 6 của series <strong>“Chúa Tể Bóng Tối”</strong>!
</p>
', N'Daisuke Takagi', N'bìa mềm', 228, NULL, N'Còn hàng'),

(60019, N'Dược sư tự sự (Light-novel) - Tập 5', 125000, 0.1, 112500, 0, 40, 0, 0, N'<div>
  <p>
    Cuộc nổi loạn của Tử tộc được dẹp yên, hoàng tử chào đời trong cung cấm, Ngọc Diệp trở thành chính cung hoàng hậu. 
    Nhâm Thị tham gia xử lí chính sự với thân phận hoàng đệ thay vì hoạn quan. 
    Thoạt nhìn, mọi việc tưởng chừng như đã yên bình, thế nhưng bầu không khí bất ổn lại lan toả khắp kinh thành. 
    Miêu Miêu thì vẫn như mọi khi, dính dáng tới vụ án đồ ngọt có độc bí ẩn, mối lo ngại về nạn châu chấu, vấn đề quyền sở hữu ở ngôi làng làm giấy... và xía mũi vào mấy chuyện này.
  </p>
  <p>
    Bên cạnh đó, theo mệnh lệnh của Nhâm Thị, cô cũng phải đi đến quê hương của Ngọc Diệp phi, địa điểm mang tên gọi Tây Đô. 
    Tại buổi vũ hội nơi vô vàn đoá hoa rực rỡ nở rộ, âm mưu của kẻ nào đó đang lẩn khuất. 
    Liệu Miêu Miêu có thể vạch trần ý đồ đó hay không!?
  </p>
  <p>
    DƯỢC SƯ TỰ SỰ là series light-novel thể loại trinh thám vô cùng độc đáo lấy bối cảnh cung đình. 
    Truyện đã được chuyển thể manga và anime ra mắt vào cuối năm 2023. 
    Tính đến tháng 3/2024, toàn series đã vượt mốc 33 triệu bản tại thị trường Nhật Bản và luôn thống trị bảng xếp hạng bán chạy mỗi khi ra tập mới!
  </p>
  <p>Số tập: 15+ (on-going)</p>
</div>
', N'Natsu Hyuuga, Touco Shino', N'bìa mềm', 468, N'Dược sư tự sự (Light-novel)', N'Hết hàng'),

(60020, N'Nhà Giả Kim (Tái Bản 2020)', 79000, 0.22, 61620, 100, 50, 0, 0, N'<div>
    <p>
        <em>Tất cả những trải nghiệm trong chuyến phiêu du theo đuổi vận mệnh của mình đã giúp Santiago thấu hiểu được ý nghĩa sâu xa nhất của hạnh phúc, hòa hợp với vũ trụ và con người</em>.
    </p>
    <p>
        Tiểu thuyết <em>Nhà giả kim</em> của Paulo Coelho như một câu chuyện cổ tích giản dị, nhân ái, giàu chất thơ, thấm đẫm những minh triết huyền bí của phương Đông. Trong lần xuất bản đầu tiên tại Brazil vào năm 1988, sách chỉ bán được 900 bản. Nhưng, với số phận đặc biệt của cuốn sách dành cho toàn nhân loại, vượt ra ngoài biên giới quốc gia, <em>Nhà giả kim</em> đã làm rung động hàng triệu tâm hồn, trở thành một trong những cuốn sách bán chạy nhất mọi thời đại, và có thể làm thay đổi cuộc đời người đọc.
    </p>
    <p>
        “Nhưng nhà luyện kim đan không quan tâm mấy đến những điều ấy. Ông đã từng thấy nhiều người đến rồi đi, trong khi ốc đảo và sa mạc vẫn là ốc đảo và sa mạc. Ông đã thấy vua chúa và kẻ ăn xin đi qua biển cát này, cái biển cát thường xuyên thay hình đổi dạng vì gió thổi nhưng vẫn mãi mãi là biển cát mà ông đã biết từ thuở nhỏ. Tuy vậy, tự đáy lòng mình, ông không thể không cảm thấy vui trước hạnh phúc của mỗi người lữ khách, sau bao ngày chỉ có cát vàng với trời xanh nay được thấy chà là xanh tươi hiện ra trước mắt. ‘Có thể Thượng đế tạo ra sa mạc chỉ để cho con người biết quý trọng cây chà là,’ ông nghĩ.”
    </p>
    <p>- Trích <em>Nhà giả kim</em></p>
    <p>
        <strong>Nhận định</strong>
    </p>
    <p>
        “Sau Garcia Márquez, đây là nhà văn Mỹ Latinh được đọc nhiều nhất thế giới.” <em>- The Economist</em>, London, Anh
    </p>
    <p>
        “Santiago có khả năng cảm nhận bằng trái tim như <em>Hoàng tử bé</em> của Saint-Exupéry.” <em>- Frankfurter Allgemeine Zeitung, Đức</em>
    </p>
</div>
', N'Paulo Coelho', N'bìa mềm', 227, NULL, N'Còn hàng'),

(60021, N'Hồi Kí Vanitas - Tập 10', 36000.00, 0.04, 34560.00, 100, 40, 0, 0, N'Tôi sẽ không bao giờ để cậu được “tự do”. Vanitas và Noé đối đầu nhau đúng như kế hoạch của Mikhail. Một bên tuyệt đối không để kí ức về “Trăng Xanh” bị tước đoạt, bên lại không muốn một lần nữa đánh mất người mình trân quý. Kết cục của trận chiến giữa những nguyện vọng tương đồng này là… Răng nanh ấy, tiếng khóc ấy, ước muốn ấy, tất thảy liệu có đến được đúng nơi?', N'Jun Mochizuki', N'bìa mềm', 186, N'Hồi kí Vanitas', N'Còn hàng'),
(60022, N'Hồi Kí Vanitas - Tập 4 (Tái Bản)', 36000.00, 0.04, 34560.00, 50, 20, 0, 0, N'Một đội quân chống Vampire “Chasseur”. Một “cái bóng của kẻ bị nguyền rủa” mang tính chất huỷ diệt. Trước hiểm họa đương chực chờ nơi hầm mộ dưới lòng đất, Vanitas và Noé đã chiến đấu vì lẽ gì, đã liều mình để cứu ai? Vai kề vai, chung lưng đấu cật... Dẫu rằng ngày nào đó, số mệnh nghiệt ngã sẽ khiến chiếc nanh ấy làm tổn thương cả hai người… “Vì tôi cứ vẽ một mạch tới đoạn mình muốn nên cuốn sách ra lần này cũng lại dày cui... Vậy là giảm cân thất bại rồi. Bắt đầu từ cuốn sau có lẽ số trang sẽ mỏng dần, nhưng tôi rất vui nếu có thể giữ được độ dày trung bình như mọi cuốn truyện bình thường khác.” (Jun Mochizuki)', N'Jun Mochizuki', N'bìa mềm', 200, N'Hồi kí Vanitas', N'Còn hàng'),
(60023, N'Thám Tử Lừng Danh Conan - Tập 102', 25000.00, 0.04, 24000.00, 50, 20, 0, 0, N'Jugo Yokomizo tình cờ gặp Chihaya Hagiwara tại bữa tiệc mai mối! Điều gì hiện lên trong tâm trí Chihaya khi cô chăm chú nhìn Wataru Takagi!? Chí nguyện “hoa anh đào” được tiếp nối qua bao thế hệ... Và... Chẳng hề báo trước, tập truyện này sẽ mở ra những diễn biến đầy bất ngờ.', N'Gosho Aoyama', N'bìa mềm', 180, N'Thám tử lừng danh Conan', N'Còn hàng'),
(60024, N'Thám Tử Lừng Danh Conan - Tập 101', 25000.00, 0.04, 24000.00, 50, 20, 0, 0, N'Mật mã Akemi Miyano để lại ẩn chứa gợi ý về vị trí chôn chiếc hộp thời gian ở trường tiểu học!? Conan dẽ cùng nhóm Haibara hợp sức giải mã!! Tiếng súng vang lên tại nhà hàng Pháp danh tiếng! Conan lần theo dấu viết của tiến sĩ vừa bị bắt đi, thế rồi “nữ thần gió” bất ngờ xuất hiện trước mặt cậu. Thân phận thực sự của cô là gì? Và lần này, Toru Amuro sẽ đối đầu với Kaito Kid khi hắn định trộm món bảo vật!', N'Gosho Aoyama', N'bìa mềm', 181, N'Thám tử lừng danh Conan', N'Còn hàng'),
(60025, N'Atomic Habits - Thay Đổi Tí Hon Hiệu Quả Bất Ngờ (Tái Bản 2023)', 189000.00, 0.22, 147420.00, 100, 40, 0, 0, N'<div>
    <p><strong>Atomic Habits - Thay Đổi Tí Hon Hiệu Quả Bất Ngờ (Tái Bản 2023)</strong></p>
    <p>• Wall Street Journal Bestseller, USA Today Bestseller, Publisher’s Weekly Bestseller</p>
    <p>• Nằm trong Top 20 tựa sách thể loại non-fiction bán chạy và được tìm đọc nhiều nhất của Amazon suốt 40 tuần tính đến tháng 9/2019</p>
    <p>Một thay đổi tí hon có thể biến đổi cuộc đời bạn không?</p>
    <p>Hẳn là khó đồng ý với điều đó. Nhưng nếu bạn thay đổi thêm một chút? Một chút nữa? Rồi thêm một chút nữa? Đến một lúc nào đó, bạn phải công nhận rằng cuộc sống của mình đã chuyển biến nhờ vào một thay đổi nhỏ…</p>
    <p>Và đó chính là sức mạnh của thói quen nguyên tử.</p>
    <p>Tác giả:</p>
    <p>James Clear là tác giả người Mỹ, nhiếp ảnh gia, nhà khởi nghiệp, và là người sáng tạo The Habits Academy.</p>
    <p>Anh nghiên cứu về những thói quen, việc đưa ra quyết định và sự cải tiến liên tục. Trang jamesclear.com có hàng triệu lượt truy cập mỗi tháng.</p>
    <p>Bài viết của James Clear được đăng trên New York Times, Entrepreneur, Time… Anh cũng là diễn giả thường xuyên tại các công ty nằm trong bảng xếp hạng Fortune 500.</p>
</div>
', N'James Clear', N'bìa mềm', 385, NULL, N'Còn hàng'),

(60026, N'Tư Duy Mở', 138000.00, 0.5, 69000.00, 100, 40, 0, 0, N'<div>
    <p><strong>Tư Duy Mở</strong></p>
    <p>Con người đang sống trong thời đại công nghệ, khi mọi thứ thay đổi chóng mặt, điều đó đòi hỏi chúng ta phải linh hoạt trong cách tư duy để bắt kịp xu hướng toàn cầu. Hay nói cách khác, chúng ta cần có một tư duy mở để đón nhận và khai phá kiến thức mới, bởi nếu chúng ta cứ khăng khăng giữ định kiến của mình thì sự phát triển sẽ đi vào ngõ cụt.</p>
    <p>Cụ thể hơn, người có tư duy mở tin rằng chỉ cần họ nỗ lực, thay đổi là có thể tiến bộ hơn. Họ sẽ vui vẻ chấp nhận thử thách, xem thử thách như cơ hội để học hỏi được những điều hay cái mới. Khi đối mặt với khó khăn hay không thành công, người có tư duy mở thường có thái độ: “Cách này không hiệu quả, vậy mình thử cách khác”. Đối với họ, thất bại chỉ là bài học giúp họ hoàn hảo hơn trên con đường khẳng định bản thân và phát triển sự nghiệp.</p>
    <p>Vậy làm thế nào để biết được chúng ta đang có loại tư duy nào, đóng hay mở? Và làm thế nào chúng ta nhận ra chúng?</p>
    <p>Nhưng làm thế nào để có được tư duy mở?</p>
    <p>Và tư duy mở góp phần vào cuộc sống của chúng ta thế nào?</p>
    <p>
        <em>
            Khi bạn đặt ra những câu hỏi đó thì cuốn sách này sinh ra để dành cho bạn. Cuốn sách được biên soạn dựa trên sự học tập và nghiên cứu tài liệu trong và ngoài nước cũng như từ những trải nghiệm của bản thân tác giả sẽ mang lại cho bạn những giá trị hữu ích của tư duy mở, giúp bạn tự tin chinh phục ước mơ, sẵn sàng đón nhận mọi chướng ngại và luôn nở nụ cười hạnh phúc.
        </em>
    </p>
</div>
', N'Nguyễn Anh Dũng', N'bìa mềm', 208, NULL, N'Còn hàng'),

(60027, N'Thiên Tài Bên Trái, Kẻ Điên Bên Phải (Tái Bản 2021)', 179000.00, 0.27, 130670.00, 100, 40, 0, 0, N'<div>
    <p><strong>Thiên Tài Bên Trái, Kẻ Điên Bên Phải</strong></p>
    <p><strong>NẾU MỘT NGÀY ANH THẤY TÔI ĐIÊN, THỰC RA CHÍNH LÀ ANH ĐIÊN ĐẤY!</strong></p>
    <p>Hỡi những con người đang oằn mình trong cuộc sống, bạn biết gì về thế giới của mình? Là vô vàn thứ lý thuyết được các bậc vĩ nhân kiểm chứng, là luật lệ, là cả nghìn thứ sự thật bọc trong cái lốt hiển nhiên, hay những triết lý cứng nhắc của cuộc đời?</p>
    <p>Lại đây, vượt qua thứ nhận thức tẻ nhạt bị đóng kín bằng con mắt trần gian, khai mở toàn bộ suy nghĩ, để dòng máu trong bạn sục sôi trước những điều kỳ vĩ, phá vỡ mọi quy tắc. Thế giới sẽ gọi bạn là kẻ điên, nhưng vậy thì có sao? Ranh giới duy nhất giữa kẻ điên và thiên tài chẳng qua là một sợi chỉ mỏng manh: Thiên tài chứng minh được thế giới của mình, còn kẻ điên chưa kịp làm điều đó. Chọn trở thành một kẻ điên để vẫy vùng giữa nhân gian loạn thế hay khóa hết chúng lại, sống mãi một cuộc đời bình thường khiến bạn cảm thấy hạnh phúc hơn?</p>
    <p>
        <em>
            Thiên tài bên trái, kẻ điên bên phải
        </em> 
        là cuốn sách dành cho những người điên rồ, những kẻ gây rối, những người chống đối, những mảnh ghép hình tròn trong những ô vuông không vừa vặn… những người nhìn mọi thứ khác biệt, không quan tâm đến quy tắc. Bạn có thể đồng ý, có thể phản đối, có thể vinh danh hay lăng mạ họ, nhưng điều duy nhất bạn không thể làm là phủ nhận sự tồn tại của họ. Đó là những người luôn tạo ra sự thay đổi trong khi hầu hết con người chỉ sống rập khuôn như một cái máy. Đa số đều nghĩ họ thật điên rồ nhưng nếu nhìn ở góc khác, ta lại thấy họ thiên tài. Bởi chỉ những người đủ điên nghĩ rằng họ có thể thay đổi thế giới mới là những người làm được điều đó.
    </p>
    <p>Chào mừng đến với thế giới của những kẻ điên.</p>
</div>
', N'Cao Minh', N'bìa mềm', 424, NULL, N'Còn hàng'),

(60028, N'Chúa tể bóng tối (Manga) - Tập 6', 40000.00, 0.1, 36000.00, 0, 40, 0, 0, N'<p>
    TRUYỆN TRANH CHUYỂN THỂ TỪ BỘ LIGHT-NOVEL “CHÚA TỂ BÓNG TỐI” RẤT ĐƯỢC YÊU THÍCH!!<br />
    Cậu thiếu niên Cid sau khi chuyển sinh sang một thế giới khác vẫn tiếp tục chơi trò nhập vai Chúa tể Bóng tối, can thiệp vào mọi biến cố và bộc lộ sức mạnh thực sự của mình từ trong màn đêm. Sau khi che giấu thân phận để tham dự<br />
    Đại hội Bushin – sự kiện lớn hằng năm nhằm tìm ra kiếm sĩ mạnh nhất cả nước, Cid đã nhanh chóng lọt vào tầm ngắm của rất nhiều người, trong đó có cả đại diện của 5 học viện nổi tiếng của quốc gia. Vậy ai sẽ là kẻ chiến thắng cuối cùng?<br />
    Mời các bạn đón đọc Tập 6 của series <strong>“Chúa Tể Bóng Tối”</strong>!
</p>
', N'Daisuke Takagi', N'bìa mềm', 228, NULL, N'Còn hàng'),

(60029, N'Dược sư tự sự (Light-novel) - Tập 5', 125000, 0.1, 112500, 0, 40, 0, 0, N'<div>
  <p>
    Cuộc nổi loạn của Tử tộc được dẹp yên, hoàng tử chào đời trong cung cấm, Ngọc Diệp trở thành chính cung hoàng hậu. 
    Nhâm Thị tham gia xử lí chính sự với thân phận hoàng đệ thay vì hoạn quan. 
    Thoạt nhìn, mọi việc tưởng chừng như đã yên bình, thế nhưng bầu không khí bất ổn lại lan toả khắp kinh thành. 
    Miêu Miêu thì vẫn như mọi khi, dính dáng tới vụ án đồ ngọt có độc bí ẩn, mối lo ngại về nạn châu chấu, vấn đề quyền sở hữu ở ngôi làng làm giấy... và xía mũi vào mấy chuyện này.
  </p>
  <p>
    Bên cạnh đó, theo mệnh lệnh của Nhâm Thị, cô cũng phải đi đến quê hương của Ngọc Diệp phi, địa điểm mang tên gọi Tây Đô. 
    Tại buổi vũ hội nơi vô vàn đoá hoa rực rỡ nở rộ, âm mưu của kẻ nào đó đang lẩn khuất. 
    Liệu Miêu Miêu có thể vạch trần ý đồ đó hay không!?
  </p>
  <p>
    DƯỢC SƯ TỰ SỰ là series light-novel thể loại trinh thám vô cùng độc đáo lấy bối cảnh cung đình. 
    Truyện đã được chuyển thể manga và anime ra mắt vào cuối năm 2023. 
    Tính đến tháng 3/2024, toàn series đã vượt mốc 33 triệu bản tại thị trường Nhật Bản và luôn thống trị bảng xếp hạng bán chạy mỗi khi ra tập mới!
  </p>
  <p>Số tập: 15+ (on-going)</p>
</div>
', N'Natsu Hyuuga, Touco Shino', N'bìa mềm', 468, N'Dược sư tự sự (Light-novel)', N'Hết hàng'),

(60030, N'Nhà Giả Kim (Tái Bản 2020)', 79000, 0.22, 61620, 100, 50, 0, 0, N'<div>
    <p>
        <em>Tất cả những trải nghiệm trong chuyến phiêu du theo đuổi vận mệnh của mình đã giúp Santiago thấu hiểu được ý nghĩa sâu xa nhất của hạnh phúc, hòa hợp với vũ trụ và con người</em>.
    </p>
    <p>
        Tiểu thuyết <em>Nhà giả kim</em> của Paulo Coelho như một câu chuyện cổ tích giản dị, nhân ái, giàu chất thơ, thấm đẫm những minh triết huyền bí của phương Đông. Trong lần xuất bản đầu tiên tại Brazil vào năm 1988, sách chỉ bán được 900 bản. Nhưng, với số phận đặc biệt của cuốn sách dành cho toàn nhân loại, vượt ra ngoài biên giới quốc gia, <em>Nhà giả kim</em> đã làm rung động hàng triệu tâm hồn, trở thành một trong những cuốn sách bán chạy nhất mọi thời đại, và có thể làm thay đổi cuộc đời người đọc.
    </p>
    <p>
        “Nhưng nhà luyện kim đan không quan tâm mấy đến những điều ấy. Ông đã từng thấy nhiều người đến rồi đi, trong khi ốc đảo và sa mạc vẫn là ốc đảo và sa mạc. Ông đã thấy vua chúa và kẻ ăn xin đi qua biển cát này, cái biển cát thường xuyên thay hình đổi dạng vì gió thổi nhưng vẫn mãi mãi là biển cát mà ông đã biết từ thuở nhỏ. Tuy vậy, tự đáy lòng mình, ông không thể không cảm thấy vui trước hạnh phúc của mỗi người lữ khách, sau bao ngày chỉ có cát vàng với trời xanh nay được thấy chà là xanh tươi hiện ra trước mắt. ‘Có thể Thượng đế tạo ra sa mạc chỉ để cho con người biết quý trọng cây chà là,’ ông nghĩ.”
    </p>
    <p>- Trích <em>Nhà giả kim</em></p>
    <p>
        <strong>Nhận định</strong>
    </p>
    <p>
        “Sau Garcia Márquez, đây là nhà văn Mỹ Latinh được đọc nhiều nhất thế giới.” <em>- The Economist</em>, London, Anh
    </p>
    <p>
        “Santiago có khả năng cảm nhận bằng trái tim như <em>Hoàng tử bé</em> của Saint-Exupéry.” <em>- Frankfurter Allgemeine Zeitung, Đức</em>
    </p>
</div>
', N'Paulo Coelho', N'bìa mềm', 227, NULL, N'Còn hàng');

-- Address
INSERT INTO Address (address_id, address_house_number, address_ward, address_district, address_province, address_description) 
VALUES (20001, N'abc123', N'Phường Tây Thạnh', N'Quận Tân Phú', N'Thành phố Hồ Chí Minh', N'abcxyz123');

-- Admin
INSERT INTO Admin (admin_id, admin_username, admin_password) 
VALUES (1, 'root', '22520545');

-- Banner
INSERT INTO Banner (banner_id, banner_image_url, banner_link) 
VALUES
    (110001, 'duoc_su_tu_su_5_banner.webp', NULL),
    (110002, 'loi_hua_lo_lem_banner.webp', NULL),
    (110003, 'one_piece_banner.webp', NULL);

-- BlogType
INSERT INTO BlogType (type_id, type_name) 
VALUES 
    (140001, N'Hoạt động'),
    (140002, N'Sự kiện'),
    (140003, N'Tin sách');

-- Blog
INSERT INTO Blog (blog_id, blog_title, blog_content, blog_thumbnail, type_id) 
VALUES 
    (130001, N'ƯU ĐÃI NGÀY KÉP 10.10', 
    '<div>
                    <p>
                        <strong>
                            Viện Pháp tại Việt Nam triển khai một loạt hoạt động nhằm thúc đẩy sự phát triển của truyện
                            tranh tại Việt Nam như một lĩnh vực công nghiệp văn hóa.
                        </strong>
                    </p>
                    <p>
                        Nằm trong khuôn khổ dự án FEF - sáng tạo và dự án Công nghiệp văn hóa - sáng tạo khu vực “Ngành
                        truyện tranh ở Việt Nam và Campuchia: Kết nối kinh nghiệm chuyên môn của Pháp”, Viện Pháp tại
                        Việt Nam triển khai một loạt hoạt động nhằm thúc đẩy sự phát triển của truyện tranh tại Việt
                        Nam.
                    </p>
                    <p>
                        Theo đó, từ 23 đến 27/9, Viện Pháp tại Việt Nam và Nhà xuất bản Kim Đồng tổ chức master classe
                        (lớp hướng dẫn) sáng tác truyện tranh dưới sự hướng dẫn của các họa sĩ Pháp và Việt Nam.
                    </p>
                    <p className="flex justify-center">
                        <img
                            src="//file.hstatic.net/200000343865/file/1-1100_33f4aa19ecb84dfbad240eb51d144ed4_grande.jpg"
                            alt="Hình ảnh về truyện tranh"
                        />
                    </p>
                    <p className="flex justify-center py-2">
                        <span>
                            <em className="font-bold">
                                Angoulême là vùng đất xinh đẹp nổi tiếng ở Pháp với các tín đồ yêu thích truyện tranh.
                                Ảnh: Angoulême tourist office
                            </em>
                        </span>
                    </p>
                    <p>
                        Các họa sĩ tham gia hướng dẫn bao gồm các tên tuổi nổi bật trong lĩnh vực truyện tranh: Maxime
                        Péroz, Clément Baloup, Tạ Huy Long ("Lược sử nước Việt" bằng tranh), Nguyễn Thành Phong ("Long
                        thần tướng").
                    </p>
                    <p>
                        Kết thúc chương trình, học viên sẽ có cơ hội trình bày một dự án từ 6 đến 10 trang truyện tranh
                        để xuất bản. Chương trình tập trung khai thác các yếu tố cơ bản về nghệ thuật và sáng tạo, cũng
                        như sự đa dạng hóa khả năng sử dụng đồ họa và kể chuyện.
                    </p>
                    <p>
                        Một cuộc thi sáng tác truyện tranh do Viện Pháp tại Việt Nam phối hợp tổ chức cùng Nhà xuất bản
                        Kim Đồng đang diễn ra cho đến hết ngày 1/11. Thí sinh đạt giải nhất sẽ cùng với đại diện 5 nhà
                        xuất bản từ Việt Nam và Campuchia và một số họa sĩ truyện tranh tài năng sang Pháp tham gia
                        Festival d’Angoulême - liên hoan truyện tranh tiếng Pháp lớn nhất thế giới về danh tiếng và quy
                        mô.
                    </p>
                    <p>
                        Ngoài ra, từ ngày 30/9 đến 2/10 tại Nhà xuất bản Kim Đồng, các dịch giả trẻ của Việt Nam và
                        Campuchia sẽ được tham gia một chuỗi workshop với sự góp mặt của các tác giả, họa sĩ minh họa và
                        biên tập viên từ Pháp, Việt Nam và Campuchia.
                    </p>
                    <p>
                        Học viên sẽ có cơ hội dịch truyện tranh và trao đổi kinh nghiệm với các dịch giả hướng dẫn. Kết
                        thúc chương trình, các tác phẩm do học viên dịch sẽ được các nhà xuất bản đối tác của dự án phát
                        hành.
                    </p>
                    <p>
                        Tiếp đó, hội thảo chuyên đề dành cho các nhà xuất bản truyện tranh 3 nước Pháp Việt Nam và
                        Campuchia sẽ được tổ chức tại Phnom Penh ngày 23 đến 25/10, với sự hỗ trợ của Văn phòng Xuất bản
                        Quốc tế Pháp (BIEF).
                    </p>
                    <p>
                        Hội thảo sẽ tập trung vào vấn đề xuất bản truyện tranh ở Pháp, Việt Nam và Campuchia, xoay quanh
                        xu hướng xuất bản; cái nhìn tổng quan về sự đa dạng của truyện tranh Pháp dành cho cả trẻ em lẫn
                        người lớn…
                    </p>
                    <p>
                        Chương trình có sự tham gia của các nhà xuất bản và tác giả người Pháp: Charlotte Moundlic, Giám
                        đốc Nghệ thuật Nhà xuất bản Rue de Sèvre; François Le Bescond, Giám đốc xuất bản Dargaud France;
                        và Wandrille Leroy, tác giả, biên tập viên truyện tranh và giảng viên tại Học viện Delcourt.
                    </p>
                    <p>
                        Hội thảo này được kỳ vọng là sẽ đáp ứng nhu cầu được đào tạo về xuất bản truyện tranh của các
                        nhà xuất bản địa phương, cung cấp những kiến thức chuyên sâu về kỹ thuật thiết kế và dàn trang
                        truyện tranh, lĩnh vực mà Pháp có nhiều kinh nghiệm.
                    </p>
                    <p className="text-end">
                        <em>Nguồn: congluan.vn</em>
                    </p>
                </div>
', 
    'https://file.hstatic.net/200000343865/file/y-kep-1010-banner-fb-post-1800_1200px_6daf20424c8d46139e654fe9547a7994_grande.png', 140002),
    (130002, N'Viện Pháp thúc đẩy sự phát triển công nghiệp truyện tranh tại Việt Nam', 
    '<div>
                    <p>
                        <strong>
                            Viện Pháp tại Việt Nam triển khai một loạt hoạt động nhằm thúc đẩy sự phát triển của truyện
                            tranh tại Việt Nam như một lĩnh vực công nghiệp văn hóa.
                        </strong>
                    </p>
                    <p>
                        Nằm trong khuôn khổ dự án FEF - sáng tạo và dự án Công nghiệp văn hóa - sáng tạo khu vực “Ngành
                        truyện tranh ở Việt Nam và Campuchia: Kết nối kinh nghiệm chuyên môn của Pháp”, Viện Pháp tại
                        Việt Nam triển khai một loạt hoạt động nhằm thúc đẩy sự phát triển của truyện tranh tại Việt
                        Nam.
                    </p>
                    <p>
                        Theo đó, từ 23 đến 27/9, Viện Pháp tại Việt Nam và Nhà xuất bản Kim Đồng tổ chức master classe
                        (lớp hướng dẫn) sáng tác truyện tranh dưới sự hướng dẫn của các họa sĩ Pháp và Việt Nam.
                    </p>
                    <p className="flex justify-center">
                        <img
                            src="//file.hstatic.net/200000343865/file/1-1100_33f4aa19ecb84dfbad240eb51d144ed4_grande.jpg"
                            alt="Hình ảnh về truyện tranh"
                        />
                    </p>
                    <p className="flex justify-center py-2">
                        <span>
                            <em className="font-bold">
                                Angoulême là vùng đất xinh đẹp nổi tiếng ở Pháp với các tín đồ yêu thích truyện tranh.
                                Ảnh: Angoulême tourist office
                            </em>
                        </span>
                    </p>
                    <p>
                        Các họa sĩ tham gia hướng dẫn bao gồm các tên tuổi nổi bật trong lĩnh vực truyện tranh: Maxime
                        Péroz, Clément Baloup, Tạ Huy Long ("Lược sử nước Việt" bằng tranh), Nguyễn Thành Phong ("Long
                        thần tướng").
                    </p>
                    <p>
                        Kết thúc chương trình, học viên sẽ có cơ hội trình bày một dự án từ 6 đến 10 trang truyện tranh
                        để xuất bản. Chương trình tập trung khai thác các yếu tố cơ bản về nghệ thuật và sáng tạo, cũng
                        như sự đa dạng hóa khả năng sử dụng đồ họa và kể chuyện.
                    </p>
                    <p>
                        Một cuộc thi sáng tác truyện tranh do Viện Pháp tại Việt Nam phối hợp tổ chức cùng Nhà xuất bản
                        Kim Đồng đang diễn ra cho đến hết ngày 1/11. Thí sinh đạt giải nhất sẽ cùng với đại diện 5 nhà
                        xuất bản từ Việt Nam và Campuchia và một số họa sĩ truyện tranh tài năng sang Pháp tham gia
                        Festival d’Angoulême - liên hoan truyện tranh tiếng Pháp lớn nhất thế giới về danh tiếng và quy
                        mô.
                    </p>
                    <p>
                        Ngoài ra, từ ngày 30/9 đến 2/10 tại Nhà xuất bản Kim Đồng, các dịch giả trẻ của Việt Nam và
                        Campuchia sẽ được tham gia một chuỗi workshop với sự góp mặt của các tác giả, họa sĩ minh họa và
                        biên tập viên từ Pháp, Việt Nam và Campuchia.
                    </p>
                    <p>
                        Học viên sẽ có cơ hội dịch truyện tranh và trao đổi kinh nghiệm với các dịch giả hướng dẫn. Kết
                        thúc chương trình, các tác phẩm do học viên dịch sẽ được các nhà xuất bản đối tác của dự án phát
                        hành.
                    </p>
                    <p>
                        Tiếp đó, hội thảo chuyên đề dành cho các nhà xuất bản truyện tranh 3 nước Pháp Việt Nam và
                        Campuchia sẽ được tổ chức tại Phnom Penh ngày 23 đến 25/10, với sự hỗ trợ của Văn phòng Xuất bản
                        Quốc tế Pháp (BIEF).
                    </p>
                    <p>
                        Hội thảo sẽ tập trung vào vấn đề xuất bản truyện tranh ở Pháp, Việt Nam và Campuchia, xoay quanh
                        xu hướng xuất bản; cái nhìn tổng quan về sự đa dạng của truyện tranh Pháp dành cho cả trẻ em lẫn
                        người lớn…
                    </p>
                    <p>
                        Chương trình có sự tham gia của các nhà xuất bản và tác giả người Pháp: Charlotte Moundlic, Giám
                        đốc Nghệ thuật Nhà xuất bản Rue de Sèvre; François Le Bescond, Giám đốc xuất bản Dargaud France;
                        và Wandrille Leroy, tác giả, biên tập viên truyện tranh và giảng viên tại Học viện Delcourt.
                    </p>
                    <p>
                        Hội thảo này được kỳ vọng là sẽ đáp ứng nhu cầu được đào tạo về xuất bản truyện tranh của các
                        nhà xuất bản địa phương, cung cấp những kiến thức chuyên sâu về kỹ thuật thiết kế và dàn trang
                        truyện tranh, lĩnh vực mà Pháp có nhiều kinh nghiệm.
                    </p>
                    <p className="text-end">
                        <em>Nguồn: congluan.vn</em>
                    </p>
                </div>
', 
    'https://file.hstatic.net/200000343865/article/1-1100_a73b918912c442efa45293faba761192_large.jpg', 140002),
    (130003, N'Phát triển truyện tranh Việt: Nhìn từ huyền thoại Đôrêmon', 
    '<div>
                    <p>
                        <strong>
                            Viện Pháp tại Việt Nam triển khai một loạt hoạt động nhằm thúc đẩy sự phát triển của truyện
                            tranh tại Việt Nam như một lĩnh vực công nghiệp văn hóa.
                        </strong>
                    </p>
                    <p>
                        Nằm trong khuôn khổ dự án FEF - sáng tạo và dự án Công nghiệp văn hóa - sáng tạo khu vực “Ngành
                        truyện tranh ở Việt Nam và Campuchia: Kết nối kinh nghiệm chuyên môn của Pháp”, Viện Pháp tại
                        Việt Nam triển khai một loạt hoạt động nhằm thúc đẩy sự phát triển của truyện tranh tại Việt
                        Nam.
                    </p>
                    <p>
                        Theo đó, từ 23 đến 27/9, Viện Pháp tại Việt Nam và Nhà xuất bản Kim Đồng tổ chức master classe
                        (lớp hướng dẫn) sáng tác truyện tranh dưới sự hướng dẫn của các họa sĩ Pháp và Việt Nam.
                    </p>
                    <p className="flex justify-center">
                        <img
                            src="//file.hstatic.net/200000343865/file/1-1100_33f4aa19ecb84dfbad240eb51d144ed4_grande.jpg"
                            alt="Hình ảnh về truyện tranh"
                        />
                    </p>
                    <p className="flex justify-center py-2">
                        <span>
                            <em className="font-bold">
                                Angoulême là vùng đất xinh đẹp nổi tiếng ở Pháp với các tín đồ yêu thích truyện tranh.
                                Ảnh: Angoulême tourist office
                            </em>
                        </span>
                    </p>
                    <p>
                        Các họa sĩ tham gia hướng dẫn bao gồm các tên tuổi nổi bật trong lĩnh vực truyện tranh: Maxime
                        Péroz, Clément Baloup, Tạ Huy Long ("Lược sử nước Việt" bằng tranh), Nguyễn Thành Phong ("Long
                        thần tướng").
                    </p>
                    <p>
                        Kết thúc chương trình, học viên sẽ có cơ hội trình bày một dự án từ 6 đến 10 trang truyện tranh
                        để xuất bản. Chương trình tập trung khai thác các yếu tố cơ bản về nghệ thuật và sáng tạo, cũng
                        như sự đa dạng hóa khả năng sử dụng đồ họa và kể chuyện.
                    </p>
                    <p>
                        Một cuộc thi sáng tác truyện tranh do Viện Pháp tại Việt Nam phối hợp tổ chức cùng Nhà xuất bản
                        Kim Đồng đang diễn ra cho đến hết ngày 1/11. Thí sinh đạt giải nhất sẽ cùng với đại diện 5 nhà
                        xuất bản từ Việt Nam và Campuchia và một số họa sĩ truyện tranh tài năng sang Pháp tham gia
                        Festival d’Angoulême - liên hoan truyện tranh tiếng Pháp lớn nhất thế giới về danh tiếng và quy
                        mô.
                    </p>
                    <p>
                        Ngoài ra, từ ngày 30/9 đến 2/10 tại Nhà xuất bản Kim Đồng, các dịch giả trẻ của Việt Nam và
                        Campuchia sẽ được tham gia một chuỗi workshop với sự góp mặt của các tác giả, họa sĩ minh họa và
                        biên tập viên từ Pháp, Việt Nam và Campuchia.
                    </p>
                    <p>
                        Học viên sẽ có cơ hội dịch truyện tranh và trao đổi kinh nghiệm với các dịch giả hướng dẫn. Kết
                        thúc chương trình, các tác phẩm do học viên dịch sẽ được các nhà xuất bản đối tác của dự án phát
                        hành.
                    </p>
                    <p>
                        Tiếp đó, hội thảo chuyên đề dành cho các nhà xuất bản truyện tranh 3 nước Pháp Việt Nam và
                        Campuchia sẽ được tổ chức tại Phnom Penh ngày 23 đến 25/10, với sự hỗ trợ của Văn phòng Xuất bản
                        Quốc tế Pháp (BIEF).
                    </p>
                    <p>
                        Hội thảo sẽ tập trung vào vấn đề xuất bản truyện tranh ở Pháp, Việt Nam và Campuchia, xoay quanh
                        xu hướng xuất bản; cái nhìn tổng quan về sự đa dạng của truyện tranh Pháp dành cho cả trẻ em lẫn
                        người lớn…
                    </p>
                    <p>
                        Chương trình có sự tham gia của các nhà xuất bản và tác giả người Pháp: Charlotte Moundlic, Giám
                        đốc Nghệ thuật Nhà xuất bản Rue de Sèvre; François Le Bescond, Giám đốc xuất bản Dargaud France;
                        và Wandrille Leroy, tác giả, biên tập viên truyện tranh và giảng viên tại Học viện Delcourt.
                    </p>
                    <p>
                        Hội thảo này được kỳ vọng là sẽ đáp ứng nhu cầu được đào tạo về xuất bản truyện tranh của các
                        nhà xuất bản địa phương, cung cấp những kiến thức chuyên sâu về kỹ thuật thiết kế và dàn trang
                        truyện tranh, lĩnh vực mà Pháp có nhiều kinh nghiệm.
                    </p>
                    <p className="text-end">
                        <em>Nguồn: congluan.vn</em>
                    </p>
                </div>
', 
    'https://file.hstatic.net/200000343865/file/viet-nhin-tu-huyen-thoai-doremon-6329_97bc30aeb485429c9700bf95c0189033_grande.jpg', 140001),
    (130004, N'Tiết lộ bất ngờ về truyện "Doraemon"', 
    '<div>
                    <p>
                        <strong>
                            Viện Pháp tại Việt Nam triển khai một loạt hoạt động nhằm thúc đẩy sự phát triển của truyện
                            tranh tại Việt Nam như một lĩnh vực công nghiệp văn hóa.
                        </strong>
                    </p>
                    <p>
                        Nằm trong khuôn khổ dự án FEF - sáng tạo và dự án Công nghiệp văn hóa - sáng tạo khu vực “Ngành
                        truyện tranh ở Việt Nam và Campuchia: Kết nối kinh nghiệm chuyên môn của Pháp”, Viện Pháp tại
                        Việt Nam triển khai một loạt hoạt động nhằm thúc đẩy sự phát triển của truyện tranh tại Việt
                        Nam.
                    </p>
                    <p>
                        Theo đó, từ 23 đến 27/9, Viện Pháp tại Việt Nam và Nhà xuất bản Kim Đồng tổ chức master classe
                        (lớp hướng dẫn) sáng tác truyện tranh dưới sự hướng dẫn của các họa sĩ Pháp và Việt Nam.
                    </p>
                    <p className="flex justify-center">
                        <img
                            src="//file.hstatic.net/200000343865/file/1-1100_33f4aa19ecb84dfbad240eb51d144ed4_grande.jpg"
                            alt="Hình ảnh về truyện tranh"
                        />
                    </p>
                    <p className="flex justify-center py-2">
                        <span>
                            <em className="font-bold">
                                Angoulême là vùng đất xinh đẹp nổi tiếng ở Pháp với các tín đồ yêu thích truyện tranh.
                                Ảnh: Angoulême tourist office
                            </em>
                        </span>
                    </p>
                    <p>
                        Các họa sĩ tham gia hướng dẫn bao gồm các tên tuổi nổi bật trong lĩnh vực truyện tranh: Maxime
                        Péroz, Clément Baloup, Tạ Huy Long ("Lược sử nước Việt" bằng tranh), Nguyễn Thành Phong ("Long
                        thần tướng").
                    </p>
                    <p>
                        Kết thúc chương trình, học viên sẽ có cơ hội trình bày một dự án từ 6 đến 10 trang truyện tranh
                        để xuất bản. Chương trình tập trung khai thác các yếu tố cơ bản về nghệ thuật và sáng tạo, cũng
                        như sự đa dạng hóa khả năng sử dụng đồ họa và kể chuyện.
                    </p>
                    <p>
                        Một cuộc thi sáng tác truyện tranh do Viện Pháp tại Việt Nam phối hợp tổ chức cùng Nhà xuất bản
                        Kim Đồng đang diễn ra cho đến hết ngày 1/11. Thí sinh đạt giải nhất sẽ cùng với đại diện 5 nhà
                        xuất bản từ Việt Nam và Campuchia và một số họa sĩ truyện tranh tài năng sang Pháp tham gia
                        Festival d’Angoulême - liên hoan truyện tranh tiếng Pháp lớn nhất thế giới về danh tiếng và quy
                        mô.
                    </p>
                    <p>
                        Ngoài ra, từ ngày 30/9 đến 2/10 tại Nhà xuất bản Kim Đồng, các dịch giả trẻ của Việt Nam và
                        Campuchia sẽ được tham gia một chuỗi workshop với sự góp mặt của các tác giả, họa sĩ minh họa và
                        biên tập viên từ Pháp, Việt Nam và Campuchia.
                    </p>
                    <p>
                        Học viên sẽ có cơ hội dịch truyện tranh và trao đổi kinh nghiệm với các dịch giả hướng dẫn. Kết
                        thúc chương trình, các tác phẩm do học viên dịch sẽ được các nhà xuất bản đối tác của dự án phát
                        hành.
                    </p>
                    <p>
                        Tiếp đó, hội thảo chuyên đề dành cho các nhà xuất bản truyện tranh 3 nước Pháp Việt Nam và
                        Campuchia sẽ được tổ chức tại Phnom Penh ngày 23 đến 25/10, với sự hỗ trợ của Văn phòng Xuất bản
                        Quốc tế Pháp (BIEF).
                    </p>
                    <p>
                        Hội thảo sẽ tập trung vào vấn đề xuất bản truyện tranh ở Pháp, Việt Nam và Campuchia, xoay quanh
                        xu hướng xuất bản; cái nhìn tổng quan về sự đa dạng của truyện tranh Pháp dành cho cả trẻ em lẫn
                        người lớn…
                    </p>
                    <p>
                        Chương trình có sự tham gia của các nhà xuất bản và tác giả người Pháp: Charlotte Moundlic, Giám
                        đốc Nghệ thuật Nhà xuất bản Rue de Sèvre; François Le Bescond, Giám đốc xuất bản Dargaud France;
                        và Wandrille Leroy, tác giả, biên tập viên truyện tranh và giảng viên tại Học viện Delcourt.
                    </p>
                    <p>
                        Hội thảo này được kỳ vọng là sẽ đáp ứng nhu cầu được đào tạo về xuất bản truyện tranh của các
                        nhà xuất bản địa phương, cung cấp những kiến thức chuyên sâu về kỹ thuật thiết kế và dàn trang
                        truyện tranh, lĩnh vực mà Pháp có nhiều kinh nghiệm.
                    </p>
                    <p className="text-end">
                        <em>Nguồn: congluan.vn</em>
                    </p>
                </div>
', 
    'https://file.hstatic.net/200000343865/file/manga_aba3e04a7cc94e9481d35603d9ed2e37_grande.jpg', 140003),
    (130005, N'Công nghiệp truyện tranh Việt Nam:Từ “Đôrêmon” tới “Doraemon”', 
    '<div>
                    <p>
                        <strong>
                            Viện Pháp tại Việt Nam triển khai một loạt hoạt động nhằm thúc đẩy sự phát triển của truyện
                            tranh tại Việt Nam như một lĩnh vực công nghiệp văn hóa.
                        </strong>
                    </p>
                    <p>
                        Nằm trong khuôn khổ dự án FEF - sáng tạo và dự án Công nghiệp văn hóa - sáng tạo khu vực “Ngành
                        truyện tranh ở Việt Nam và Campuchia: Kết nối kinh nghiệm chuyên môn của Pháp”, Viện Pháp tại
                        Việt Nam triển khai một loạt hoạt động nhằm thúc đẩy sự phát triển của truyện tranh tại Việt
                        Nam.
                    </p>
                    <p>
                        Theo đó, từ 23 đến 27/9, Viện Pháp tại Việt Nam và Nhà xuất bản Kim Đồng tổ chức master classe
                        (lớp hướng dẫn) sáng tác truyện tranh dưới sự hướng dẫn của các họa sĩ Pháp và Việt Nam.
                    </p>
                    <p className="flex justify-center">
                        <img
                            src="//file.hstatic.net/200000343865/file/1-1100_33f4aa19ecb84dfbad240eb51d144ed4_grande.jpg"
                            alt="Hình ảnh về truyện tranh"
                        />
                    </p>
                    <p className="flex justify-center py-2">
                        <span>
                            <em className="font-bold">
                                Angoulême là vùng đất xinh đẹp nổi tiếng ở Pháp với các tín đồ yêu thích truyện tranh.
                                Ảnh: Angoulême tourist office
                            </em>
                        </span>
                    </p>
                    <p>
                        Các họa sĩ tham gia hướng dẫn bao gồm các tên tuổi nổi bật trong lĩnh vực truyện tranh: Maxime
                        Péroz, Clément Baloup, Tạ Huy Long ("Lược sử nước Việt" bằng tranh), Nguyễn Thành Phong ("Long
                        thần tướng").
                    </p>
                    <p>
                        Kết thúc chương trình, học viên sẽ có cơ hội trình bày một dự án từ 6 đến 10 trang truyện tranh
                        để xuất bản. Chương trình tập trung khai thác các yếu tố cơ bản về nghệ thuật và sáng tạo, cũng
                        như sự đa dạng hóa khả năng sử dụng đồ họa và kể chuyện.
                    </p>
                    <p>
                        Một cuộc thi sáng tác truyện tranh do Viện Pháp tại Việt Nam phối hợp tổ chức cùng Nhà xuất bản
                        Kim Đồng đang diễn ra cho đến hết ngày 1/11. Thí sinh đạt giải nhất sẽ cùng với đại diện 5 nhà
                        xuất bản từ Việt Nam và Campuchia và một số họa sĩ truyện tranh tài năng sang Pháp tham gia
                        Festival d’Angoulême - liên hoan truyện tranh tiếng Pháp lớn nhất thế giới về danh tiếng và quy
                        mô.
                    </p>
                    <p>
                        Ngoài ra, từ ngày 30/9 đến 2/10 tại Nhà xuất bản Kim Đồng, các dịch giả trẻ của Việt Nam và
                        Campuchia sẽ được tham gia một chuỗi workshop với sự góp mặt của các tác giả, họa sĩ minh họa và
                        biên tập viên từ Pháp, Việt Nam và Campuchia.
                    </p>
                    <p>
                        Học viên sẽ có cơ hội dịch truyện tranh và trao đổi kinh nghiệm với các dịch giả hướng dẫn. Kết
                        thúc chương trình, các tác phẩm do học viên dịch sẽ được các nhà xuất bản đối tác của dự án phát
                        hành.
                    </p>
                    <p>
                        Tiếp đó, hội thảo chuyên đề dành cho các nhà xuất bản truyện tranh 3 nước Pháp Việt Nam và
                        Campuchia sẽ được tổ chức tại Phnom Penh ngày 23 đến 25/10, với sự hỗ trợ của Văn phòng Xuất bản
                        Quốc tế Pháp (BIEF).
                    </p>
                    <p>
                        Hội thảo sẽ tập trung vào vấn đề xuất bản truyện tranh ở Pháp, Việt Nam và Campuchia, xoay quanh
                        xu hướng xuất bản; cái nhìn tổng quan về sự đa dạng của truyện tranh Pháp dành cho cả trẻ em lẫn
                        người lớn…
                    </p>
                    <p>
                        Chương trình có sự tham gia của các nhà xuất bản và tác giả người Pháp: Charlotte Moundlic, Giám
                        đốc Nghệ thuật Nhà xuất bản Rue de Sèvre; François Le Bescond, Giám đốc xuất bản Dargaud France;
                        và Wandrille Leroy, tác giả, biên tập viên truyện tranh và giảng viên tại Học viện Delcourt.
                    </p>
                    <p>
                        Hội thảo này được kỳ vọng là sẽ đáp ứng nhu cầu được đào tạo về xuất bản truyện tranh của các
                        nhà xuất bản địa phương, cung cấp những kiến thức chuyên sâu về kỹ thuật thiết kế và dàn trang
                        truyện tranh, lĩnh vực mà Pháp có nhiều kinh nghiệm.
                    </p>
                    <p className="text-end">
                        <em>Nguồn: congluan.vn</em>
                    </p>
                </div>
', 
    'https://file.hstatic.net/200000343865/file/1-1042_4e610f3749f84a6284dedc7712901224_grande.jpg', 140001),
    (130006, N'Tạo "đất diễn" cho truyện tranh Việt Nam', 
    '<div>
                    <p>
                        <strong>
                            Viện Pháp tại Việt Nam triển khai một loạt hoạt động nhằm thúc đẩy sự phát triển của truyện
                            tranh tại Việt Nam như một lĩnh vực công nghiệp văn hóa.
                        </strong>
                    </p>
                    <p>
                        Nằm trong khuôn khổ dự án FEF - sáng tạo và dự án Công nghiệp văn hóa - sáng tạo khu vực “Ngành
                        truyện tranh ở Việt Nam và Campuchia: Kết nối kinh nghiệm chuyên môn của Pháp”, Viện Pháp tại
                        Việt Nam triển khai một loạt hoạt động nhằm thúc đẩy sự phát triển của truyện tranh tại Việt
                        Nam.
                    </p>
                    <p>
                        Theo đó, từ 23 đến 27/9, Viện Pháp tại Việt Nam và Nhà xuất bản Kim Đồng tổ chức master classe
                        (lớp hướng dẫn) sáng tác truyện tranh dưới sự hướng dẫn của các họa sĩ Pháp và Việt Nam.
                    </p>
                    <p className="flex justify-center">
                        <img
                            src="//file.hstatic.net/200000343865/file/1-1100_33f4aa19ecb84dfbad240eb51d144ed4_grande.jpg"
                            alt="Hình ảnh về truyện tranh"
                        />
                    </p>
                    <p className="flex justify-center py-2">
                        <span>
                            <em className="font-bold">
                                Angoulême là vùng đất xinh đẹp nổi tiếng ở Pháp với các tín đồ yêu thích truyện tranh.
                                Ảnh: Angoulême tourist office
                            </em>
                        </span>
                    </p>
                    <p>
                        Các họa sĩ tham gia hướng dẫn bao gồm các tên tuổi nổi bật trong lĩnh vực truyện tranh: Maxime
                        Péroz, Clément Baloup, Tạ Huy Long ("Lược sử nước Việt" bằng tranh), Nguyễn Thành Phong ("Long
                        thần tướng").
                    </p>
                    <p>
                        Kết thúc chương trình, học viên sẽ có cơ hội trình bày một dự án từ 6 đến 10 trang truyện tranh
                        để xuất bản. Chương trình tập trung khai thác các yếu tố cơ bản về nghệ thuật và sáng tạo, cũng
                        như sự đa dạng hóa khả năng sử dụng đồ họa và kể chuyện.
                    </p>
                    <p>
                        Một cuộc thi sáng tác truyện tranh do Viện Pháp tại Việt Nam phối hợp tổ chức cùng Nhà xuất bản
                        Kim Đồng đang diễn ra cho đến hết ngày 1/11. Thí sinh đạt giải nhất sẽ cùng với đại diện 5 nhà
                        xuất bản từ Việt Nam và Campuchia và một số họa sĩ truyện tranh tài năng sang Pháp tham gia
                        Festival d’Angoulême - liên hoan truyện tranh tiếng Pháp lớn nhất thế giới về danh tiếng và quy
                        mô.
                    </p>
                    <p>
                        Ngoài ra, từ ngày 30/9 đến 2/10 tại Nhà xuất bản Kim Đồng, các dịch giả trẻ của Việt Nam và
                        Campuchia sẽ được tham gia một chuỗi workshop với sự góp mặt của các tác giả, họa sĩ minh họa và
                        biên tập viên từ Pháp, Việt Nam và Campuchia.
                    </p>
                    <p>
                        Học viên sẽ có cơ hội dịch truyện tranh và trao đổi kinh nghiệm với các dịch giả hướng dẫn. Kết
                        thúc chương trình, các tác phẩm do học viên dịch sẽ được các nhà xuất bản đối tác của dự án phát
                        hành.
                    </p>
                    <p>
                        Tiếp đó, hội thảo chuyên đề dành cho các nhà xuất bản truyện tranh 3 nước Pháp Việt Nam và
                        Campuchia sẽ được tổ chức tại Phnom Penh ngày 23 đến 25/10, với sự hỗ trợ của Văn phòng Xuất bản
                        Quốc tế Pháp (BIEF).
                    </p>
                    <p>
                        Hội thảo sẽ tập trung vào vấn đề xuất bản truyện tranh ở Pháp, Việt Nam và Campuchia, xoay quanh
                        xu hướng xuất bản; cái nhìn tổng quan về sự đa dạng của truyện tranh Pháp dành cho cả trẻ em lẫn
                        người lớn…
                    </p>
                    <p>
                        Chương trình có sự tham gia của các nhà xuất bản và tác giả người Pháp: Charlotte Moundlic, Giám
                        đốc Nghệ thuật Nhà xuất bản Rue de Sèvre; François Le Bescond, Giám đốc xuất bản Dargaud France;
                        và Wandrille Leroy, tác giả, biên tập viên truyện tranh và giảng viên tại Học viện Delcourt.
                    </p>
                    <p>
                        Hội thảo này được kỳ vọng là sẽ đáp ứng nhu cầu được đào tạo về xuất bản truyện tranh của các
                        nhà xuất bản địa phương, cung cấp những kiến thức chuyên sâu về kỹ thuật thiết kế và dàn trang
                        truyện tranh, lĩnh vực mà Pháp có nhiều kinh nghiệm.
                    </p>
                    <p className="text-end">
                        <em>Nguồn: congluan.vn</em>
                    </p>
                </div>
', 
    'https://file.hstatic.net/200000343865/file/son_goal_09bb337d7d05403aa834f1feba4a8e93_grande.jpg', 140001),
    (130007, N'Sách cho trẻ em - Làm sao đủ sức hút?', 
    '<div>
                    <p>
                        <strong>
                            Viện Pháp tại Việt Nam triển khai một loạt hoạt động nhằm thúc đẩy sự phát triển của truyện
                            tranh tại Việt Nam như một lĩnh vực công nghiệp văn hóa.
                        </strong>
                    </p>
                    <p>
                        Nằm trong khuôn khổ dự án FEF - sáng tạo và dự án Công nghiệp văn hóa - sáng tạo khu vực “Ngành
                        truyện tranh ở Việt Nam và Campuchia: Kết nối kinh nghiệm chuyên môn của Pháp”, Viện Pháp tại
                        Việt Nam triển khai một loạt hoạt động nhằm thúc đẩy sự phát triển của truyện tranh tại Việt
                        Nam.
                    </p>
                    <p>
                        Theo đó, từ 23 đến 27/9, Viện Pháp tại Việt Nam và Nhà xuất bản Kim Đồng tổ chức master classe
                        (lớp hướng dẫn) sáng tác truyện tranh dưới sự hướng dẫn của các họa sĩ Pháp và Việt Nam.
                    </p>
                    <p className="flex justify-center">
                        <img
                            src="//file.hstatic.net/200000343865/file/1-1100_33f4aa19ecb84dfbad240eb51d144ed4_grande.jpg"
                            alt="Hình ảnh về truyện tranh"
                        />
                    </p>
                    <p className="flex justify-center py-2">
                        <span>
                            <em className="font-bold">
                                Angoulême là vùng đất xinh đẹp nổi tiếng ở Pháp với các tín đồ yêu thích truyện tranh.
                                Ảnh: Angoulême tourist office
                            </em>
                        </span>
                    </p>
                    <p>
                        Các họa sĩ tham gia hướng dẫn bao gồm các tên tuổi nổi bật trong lĩnh vực truyện tranh: Maxime
                        Péroz, Clément Baloup, Tạ Huy Long ("Lược sử nước Việt" bằng tranh), Nguyễn Thành Phong ("Long
                        thần tướng").
                    </p>
                    <p>
                        Kết thúc chương trình, học viên sẽ có cơ hội trình bày một dự án từ 6 đến 10 trang truyện tranh
                        để xuất bản. Chương trình tập trung khai thác các yếu tố cơ bản về nghệ thuật và sáng tạo, cũng
                        như sự đa dạng hóa khả năng sử dụng đồ họa và kể chuyện.
                    </p>
                    <p>
                        Một cuộc thi sáng tác truyện tranh do Viện Pháp tại Việt Nam phối hợp tổ chức cùng Nhà xuất bản
                        Kim Đồng đang diễn ra cho đến hết ngày 1/11. Thí sinh đạt giải nhất sẽ cùng với đại diện 5 nhà
                        xuất bản từ Việt Nam và Campuchia và một số họa sĩ truyện tranh tài năng sang Pháp tham gia
                        Festival d’Angoulême - liên hoan truyện tranh tiếng Pháp lớn nhất thế giới về danh tiếng và quy
                        mô.
                    </p>
                    <p>
                        Ngoài ra, từ ngày 30/9 đến 2/10 tại Nhà xuất bản Kim Đồng, các dịch giả trẻ của Việt Nam và
                        Campuchia sẽ được tham gia một chuỗi workshop với sự góp mặt của các tác giả, họa sĩ minh họa và
                        biên tập viên từ Pháp, Việt Nam và Campuchia.
                    </p>
                    <p>
                        Học viên sẽ có cơ hội dịch truyện tranh và trao đổi kinh nghiệm với các dịch giả hướng dẫn. Kết
                        thúc chương trình, các tác phẩm do học viên dịch sẽ được các nhà xuất bản đối tác của dự án phát
                        hành.
                    </p>
                    <p>
                        Tiếp đó, hội thảo chuyên đề dành cho các nhà xuất bản truyện tranh 3 nước Pháp Việt Nam và
                        Campuchia sẽ được tổ chức tại Phnom Penh ngày 23 đến 25/10, với sự hỗ trợ của Văn phòng Xuất bản
                        Quốc tế Pháp (BIEF).
                    </p>
                    <p>
                        Hội thảo sẽ tập trung vào vấn đề xuất bản truyện tranh ở Pháp, Việt Nam và Campuchia, xoay quanh
                        xu hướng xuất bản; cái nhìn tổng quan về sự đa dạng của truyện tranh Pháp dành cho cả trẻ em lẫn
                        người lớn…
                    </p>
                    <p>
                        Chương trình có sự tham gia của các nhà xuất bản và tác giả người Pháp: Charlotte Moundlic, Giám
                        đốc Nghệ thuật Nhà xuất bản Rue de Sèvre; François Le Bescond, Giám đốc xuất bản Dargaud France;
                        và Wandrille Leroy, tác giả, biên tập viên truyện tranh và giảng viên tại Học viện Delcourt.
                    </p>
                    <p>
                        Hội thảo này được kỳ vọng là sẽ đáp ứng nhu cầu được đào tạo về xuất bản truyện tranh của các
                        nhà xuất bản địa phương, cung cấp những kiến thức chuyên sâu về kỹ thuật thiết kế và dàn trang
                        truyện tranh, lĩnh vực mà Pháp có nhiều kinh nghiệm.
                    </p>
                    <p className="text-end">
                        <em>Nguồn: congluan.vn</em>
                    </p>
                </div>
', 
    'https://file.hstatic.net/200000343865/file/hep-vo-van-tan-1689137114989263029386_05a14d8c450a49489f1f9ee7cd0a5802_grande.jpg', 140003),
    (130008, N'Nuôi dưỡng hệ sinh thái đọc sách cho trẻ em', 
    '<div>
                    <p>
                        <strong>
                            Viện Pháp tại Việt Nam triển khai một loạt hoạt động nhằm thúc đẩy sự phát triển của truyện
                            tranh tại Việt Nam như một lĩnh vực công nghiệp văn hóa.
                        </strong>
                    </p>
                    <p>
                        Nằm trong khuôn khổ dự án FEF - sáng tạo và dự án Công nghiệp văn hóa - sáng tạo khu vực “Ngành
                        truyện tranh ở Việt Nam và Campuchia: Kết nối kinh nghiệm chuyên môn của Pháp”, Viện Pháp tại
                        Việt Nam triển khai một loạt hoạt động nhằm thúc đẩy sự phát triển của truyện tranh tại Việt
                        Nam.
                    </p>
                    <p>
                        Theo đó, từ 23 đến 27/9, Viện Pháp tại Việt Nam và Nhà xuất bản Kim Đồng tổ chức master classe
                        (lớp hướng dẫn) sáng tác truyện tranh dưới sự hướng dẫn của các họa sĩ Pháp và Việt Nam.
                    </p>
                    <p className="flex justify-center">
                        <img
                            src="//file.hstatic.net/200000343865/file/1-1100_33f4aa19ecb84dfbad240eb51d144ed4_grande.jpg"
                            alt="Hình ảnh về truyện tranh"
                        />
                    </p>
                    <p className="flex justify-center py-2">
                        <span>
                            <em className="font-bold">
                                Angoulême là vùng đất xinh đẹp nổi tiếng ở Pháp với các tín đồ yêu thích truyện tranh.
                                Ảnh: Angoulême tourist office
                            </em>
                        </span>
                    </p>
                    <p>
                        Các họa sĩ tham gia hướng dẫn bao gồm các tên tuổi nổi bật trong lĩnh vực truyện tranh: Maxime
                        Péroz, Clément Baloup, Tạ Huy Long ("Lược sử nước Việt" bằng tranh), Nguyễn Thành Phong ("Long
                        thần tướng").
                    </p>
                    <p>
                        Kết thúc chương trình, học viên sẽ có cơ hội trình bày một dự án từ 6 đến 10 trang truyện tranh
                        để xuất bản. Chương trình tập trung khai thác các yếu tố cơ bản về nghệ thuật và sáng tạo, cũng
                        như sự đa dạng hóa khả năng sử dụng đồ họa và kể chuyện.
                    </p>
                    <p>
                        Một cuộc thi sáng tác truyện tranh do Viện Pháp tại Việt Nam phối hợp tổ chức cùng Nhà xuất bản
                        Kim Đồng đang diễn ra cho đến hết ngày 1/11. Thí sinh đạt giải nhất sẽ cùng với đại diện 5 nhà
                        xuất bản từ Việt Nam và Campuchia và một số họa sĩ truyện tranh tài năng sang Pháp tham gia
                        Festival d’Angoulême - liên hoan truyện tranh tiếng Pháp lớn nhất thế giới về danh tiếng và quy
                        mô.
                    </p>
                    <p>
                        Ngoài ra, từ ngày 30/9 đến 2/10 tại Nhà xuất bản Kim Đồng, các dịch giả trẻ của Việt Nam và
                        Campuchia sẽ được tham gia một chuỗi workshop với sự góp mặt của các tác giả, họa sĩ minh họa và
                        biên tập viên từ Pháp, Việt Nam và Campuchia.
                    </p>
                    <p>
                        Học viên sẽ có cơ hội dịch truyện tranh và trao đổi kinh nghiệm với các dịch giả hướng dẫn. Kết
                        thúc chương trình, các tác phẩm do học viên dịch sẽ được các nhà xuất bản đối tác của dự án phát
                        hành.
                    </p>
                    <p>
                        Tiếp đó, hội thảo chuyên đề dành cho các nhà xuất bản truyện tranh 3 nước Pháp Việt Nam và
                        Campuchia sẽ được tổ chức tại Phnom Penh ngày 23 đến 25/10, với sự hỗ trợ của Văn phòng Xuất bản
                        Quốc tế Pháp (BIEF).
                    </p>
                    <p>
                        Hội thảo sẽ tập trung vào vấn đề xuất bản truyện tranh ở Pháp, Việt Nam và Campuchia, xoay quanh
                        xu hướng xuất bản; cái nhìn tổng quan về sự đa dạng của truyện tranh Pháp dành cho cả trẻ em lẫn
                        người lớn…
                    </p>
                    <p>
                        Chương trình có sự tham gia của các nhà xuất bản và tác giả người Pháp: Charlotte Moundlic, Giám
                        đốc Nghệ thuật Nhà xuất bản Rue de Sèvre; François Le Bescond, Giám đốc xuất bản Dargaud France;
                        và Wandrille Leroy, tác giả, biên tập viên truyện tranh và giảng viên tại Học viện Delcourt.
                    </p>
                    <p>
                        Hội thảo này được kỳ vọng là sẽ đáp ứng nhu cầu được đào tạo về xuất bản truyện tranh của các
                        nhà xuất bản địa phương, cung cấp những kiến thức chuyên sâu về kỹ thuật thiết kế và dàn trang
                        truyện tranh, lĩnh vực mà Pháp có nhiều kinh nghiệm.
                    </p>
                    <p className="text-end">
                        <em>Nguồn: congluan.vn</em>
                    </p>
                </div>
', 
    'https://file.hstatic.net/200000343865/file/read_af16bc4688f247298a3fe5a568264cda_grande.jpg', 140001)
    ;

-- Categogy
INSERT INTO Categogy (category_id, category_name) VALUES 
(100001, N'Văn học'),
(100002, N'Tâm lí - Kĩ năng sống'),
(100003, N'Manga - Comic'),
(100004, N'Tiểu sử - Hồi ký'),
(100005, N'Sách học ngoại ngữ'),
(100006, N'Kinh tế');

-- Genre
INSERT INTO Genre (genre_id, genre_name, category_id) VALUES 
(90001, N'Tiểu thuyết', 100001),
(90002, N'Truyện ngắn - Tản văn', 100001),
(90003, N'Light Novel', 100001),
(90004, N'Trinh thám', 100001),
(90005, N'Ngôn Tình', 100001),
(90006, N'Truyện Trinh Thám - Kiếm Hiệp', 100001),
(90007, N'12 Cung Hoàng Đạo', 100001),
(90008, N'Kĩ năng sống', 100002),
(90009, N'Rèn luyện nhân cách', 100002),
(90010, N'Tâm lí', 100002),
(90011, N'Sách cho tuổi mới lớn', 100002),
(90012, N'Adventure', 100003),
(90013, N'Action', 100003),
(90014, N'Comedy', 100003),
(90015, N'Shounen', 100003),
(90016, N'Fantasy', 100003),
(90017, N'Drama', 100003),
(90018, N'Historical', 100003),
(90019, N'Supernatural', 100003),
(90020, N'Mystery', 100003),
(90021, N'Romance', 100003),
(90022, N'Câu chuyện cuộc đời', 100004),
(90023, N'Chính trị', 100004),
(90024, N'Kinh tế', 100004),
(90025, N'Nghệ thuật - Giải trí', 100004),
(90026, N'Tiếng Anh', 100005),
(90027, N'Tiếng Nhật', 100005),
(90028, N'Tiếng Trung', 100005),
(90029, N'Tiếng Hàn', 100005),
(90030, N'Tiếng Đức', 100005),
(90031, N'Tiếng Pháp', 100005),
(90032, N'Quản trị - Lãnh đạo', 100006),
(90033, N'Nhân vật - Bài học kinh doanh', 100006),
(90034, N'Marketing', 100006),
(90035, N'Phân tích kinh tế', 100006);

-- BookGenre
INSERT INTO BookGenre (book_id, genre_id) VALUES 
(60001, 90012), (60001, 90013), (60001, 90014), (60001, 90015), (60001, 90016), 
(60001, 90017), (60001, 90018), (60001, 90019), (60001, 90020), (60001, 90021),
(60002, 90012), (60002, 90013), (60002, 90014), (60002, 90015), (60002, 90016),
(60002, 90017), (60002, 90018), (60002, 90019), (60002, 90020), (60002, 90021),
(60003, 90012), (60003, 90014), (60003, 90015), (60003, 90017), (60003, 90020),
(60004, 90012), (60004, 90014), (60004, 90015), (60004, 90017), (60004, 90020),
(60005, 90008), (60006, 90008), (60007, 90010), (60008, 90003), (60009, 90003),
(60010, 90001), (60011, 90012), (60011, 90013), (60011, 90014), (60011, 90015),
(60011, 90016), (60011, 90017), (60011, 90018), (60011, 90019), (60011, 90020),
(60011, 90021), (60012, 90012), (60012, 90013), (60012, 90014), (60012, 90015),
(60012, 90016), (60012, 90017), (60012, 90018), (60012, 90019), (60012, 90020),
(60012, 90021), (60013, 90012), (60013, 90014), (60013, 90015), (60013, 90017),
(60013, 90020), (60014, 90012), (60014, 90014), (60014, 90015), (60014, 90017),
(60014, 90020), (60015, 90008), (60016, 90008), (60017, 90010), (60018, 90003),
(60019, 90003), (60020, 90001), (60021, 90012), (60021, 90013), (60021, 90014),
(60021, 90015), (60021, 90016), (60021, 90017), (60021, 90018), (60021, 90019),
(60021, 90020), (60021, 90021), (60022, 90012), (60022, 90013), (60022, 90014),
(60022, 90015), (60022, 90016), (60022, 90017), (60022, 90018), (60022, 90019),
(60022, 90020), (60022, 90021), (60023, 90012), (60023, 90014), (60023, 90015),
(60023, 90017), (60023, 90020), (60024, 90012), (60024, 90014), (60024, 90015),
(60024, 90017), (60024, 90020), (60025, 90008), (60026, 90008), (60027, 90010),
(60028, 90003), (60029, 90003), (60030, 90001);

-- BookImage
INSERT INTO BookImage (book_image_id, book_image_url, book_id) VALUES 
(70001, 'hoi_ki_vanitas_10_1.webp', 60001),
(70002, 'hoi_ki_vanitas_10_2.webp', 60001),
(70003, 'hoi_ki_vanitas_4_1.webp', 60002),
(70004, 'hoi_ki_vanitas_4_2.webp', 60002),
(70005, 'connan_102_1.webp', 60003),
(70006, 'connan_102_2.webp', 60003),
(70007, 'connan_101.webp', 60004),
(70008, 'atomic_habits.webp', 60005),
(70009, 'tu_duy_mo.webp', 60006),
(70010, 'thien_tai_ben_trai.webp', 60007),
(70011, 'chua_te_bong_toi_6.jpg', 60008),
(70012, 'duoc_su_tu_su_5.jpg', 60009),
(70013, 'nha_gia_kim.webp', 60010),
(70014, 'hoi_ki_vanitas_10_1.webp', 60011),
(70015, 'hoi_ki_vanitas_10_2.webp', 60011),
(70016, 'hoi_ki_vanitas_4_1.webp', 60012),
(70017, 'hoi_ki_vanitas_4_2.webp', 60012),
(70018, 'connan_102_1.webp', 60013),
(70019, 'connan_102_2.webp', 60013),
(70020, 'connan_101.webp', 60014),
(70021, 'atomic_habits.webp', 60015),
(70022, 'tu_duy_mo.webp', 60016),
(70023, 'thien_tai_ben_trai.webp', 60017),
(70024, 'chua_te_bong_toi_6.jpg', 60018),
(70025, 'duoc_su_tu_su_5.jpg', 60019),
(70026, 'nha_gia_kim.webp', 60020),
(70027, 'hoi_ki_vanitas_10_1.webp', 60021),
(70028, 'hoi_ki_vanitas_10_2.webp', 60021),
(70029, 'hoi_ki_vanitas_4_1.webp', 60022),
(70030, 'hoi_ki_vanitas_4_2.webp', 60022),
(70031, 'connan_102_1.webp', 60023),
(70032, 'connan_102_2.webp', 60023),
(70033, 'connan_101.webp', 60024),
(70034, 'atomic_habits.webp', 60025),
(70035, 'tu_duy_mo.webp', 60026),
(70036, 'thien_tai_ben_trai.webp', 60027),
(70037, 'chua_te_bong_toi_6.jpg', 60028),
(70038, 'duoc_su_tu_su_5.jpg', 60029),
(70039, 'nha_gia_kim.webp', 60030);

-- PayingMethod
INSERT INTO PayingMethod (pay_method_id, pay_method_name) VALUES (40001, N'Thanh toán khi nhận hàng'), (40002, N'Ví momo');

-- Order
INSERT INTO `Order` (order_id, order_status, books_total_prices, transport_cost, order_total_cost, user_id, address_id, pay_method_id) 
VALUES (30001, N'Đã Giao', 82560.00, 20000.00, 102560.00, 10001, 20001, 40001);

-- BookOrder
INSERT INTO BookOrder (order_id, book_id, quantity) VALUES 
(30001, 60001, 1), 
(30001, 60003, 2);

-- Cart
INSERT INTO Cart (user_id, book_id, quantity) VALUES 
(10001, 60001, 1),
(10001, 60002, 2),
(10001, 60003, 2);


-- FavoriteBook
INSERT INTO FavoriteBook (user_id, book_id) VALUES 
(10001, 60001),
(10001, 60002),
(10001, 60003),
(10001, 60004),
(10001, 60005);

-- RatingBook
INSERT INTO RatingBook (user_id, book_id, rating_star, rating_content) VALUES
 (10001, 60001, 5, N'Sách hay, tuyệt vời'),
 (10001, 60002, 4, N'Tình tiết truyện cuốn hút'),
 (10001, 60003, 5, N'Hóng tập tiếp theo');
 
 -- UserAddress
 INSERT INTO UserAddress (address_id, user_id) VALUES (20001, 10001);

