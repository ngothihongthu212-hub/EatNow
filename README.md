# CANTEEN MANAGEMENT SYSTEM - Hệ thống Đặt Món & Quản Lý Căn Tin EatNow TOÀN DIỆN

Hệ thống đặt món trực tuyến và quản lý căn tin trường đại học **EatNow** được xây dựng hoàn chỉnh theo kiến trúc web hiện đại: **HTML5 + CSS3 (Tailwind CSS) + JavaScript ES6+ (ReactJS / TypeScript) + Node.js + MySQL**. Hệ thống phục vụ 3 nhóm người dùng trọng tâm: **Quản trị viên (ADMIN)**, **Nhân viên căn tin (EMPLOYEE / STAFF)**, và **Sinh Viên (CUSTOMER)**.

---

## 1. CÔNG NGHỆ BẮT BUỘC SỬ DỤNG

Dự án áp dụng đầy đủ các công nghệ web nền tảng đã đăng ký theo chương trình môn học, đồng thời tích hợp các thư viện hiện đại để tối ưu trải nghiệm và hiệu năng:

* **Frontend & Ngôn ngữ Web:**
  * **HTML5 & CSS3**: Xây dựng cấu trúc trang ngữ nghĩa và bố cục chuẩn responsive.
  * **JavaScript (ES6+) / TypeScript**: Xử lý toàn bộ luồng logic nghiệp vụ, tính toán giỏ hàng, áp dụng voucher và ràng buộc kiểu dữ liệu an toàn.
  * **ReactJS (React 19)**: Xây dựng giao diện hướng thành phần (Component-based), quản lý trạng thái tập trung với React Context & Hooks.
  * **Tailwind CSS (v4)**: Framework CSS tiện ích giúp tối ưu giao diện mượt mà trên cả Mobile, Tablet và Desktop.
  * **Lucide React & Motion**: Bộ icon chuẩn hóa và hiệu ứng đóng/mở giao dịch mượt mà.

* **Backend & Runtime:**
  * **Node.js**: Nền tảng thực thi JavaScript phía máy chủ, điều phối gói thư viện và máy chủ phát triển (Vite Dev Server).
  * **Express / tsx**: Hỗ trợ môi trường API backend và middleware.

* **Cơ sở dữ liệu (Database):**
  * **MySQL (InnoDB, utf8mb4)**: Thiết kế chuẩn hóa 8 bảng dữ liệu quan hệ, ràng buộc toàn vẹn khóa chính (PK) và khóa ngoại (FK).
  * Tích hợp công cụ xuất file mã nguồn SQL (`eatnow_canteen_database.sql`) để nạp trực tiếp vào phpMyAdmin hoặc MySQL Workbench.

* **Quản lý mã nguồn & Triển khai:**
  * **GitHub**: Quản lý phiên bản mã nguồn, lịch sử commit và theo dõi tiến độ đồ án (Repo: `ngothihongthu212-hub/EatNow`).

---

## 2. PHÂN HỆ VÀ CÁC CHỨC NĂNG DÀNH CHO 3 NHÓM NGƯỜI DÙNG

### 2.1. Phân hệ Sinh viên / Giảng viên (CUSTOMER)
* **Khám phá & Tìm kiếm Thực đơn:**
  * Xem danh mục món ăn phong phú: Cơm trưa, Bún & Phở, Đồ ăn vặt, Nước giải khát, Món tráng miệng.
  * Tìm kiếm tức thời theo tên món và mức giá.
  * Bộ lọc giá nhiều mức (*Dưới 30k*, *30k - 45k*, *Trên 45k*), lọc món lành mạnh (*Healthy*), lọc món còn hàng.
  * Sắp xếp món ăn theo độ phổ biến, đánh giá sao, giá tăng/giảm dần.
* **Giỏ hàng & Đặt món trước (Pre-order):**
  * Tùy chỉnh số lượng và ghi chú chế biến riêng theo khẩu vị (ít cay, không hành,...).
  * **Chọn hình thức dùng bữa:** *🍽️ Ăn tại chỗ (kèm số bàn/khu vực)* hoặc *🥡 Đóng hộp mang đi*.
  * **Chọn khung giờ hẹn lấy:** Chia theo các slot 15 phút (10:45 – 13:15, 17:00 – 18:30) tránh ùn tắc giờ tan học.
* **Mã giảm giá & Khuyến mãi (Voucher):**
  * Áp dụng mã ưu đãi cho sinh viên (`CHAOTAN20`, `EATNOW10`, `FREESHIP5K`, `CANTEEN5K`).
  * Tự động tính toán số tiền giảm trừ vào tổng hóa đơn.
* **Ví điện tử CanteenGo tích hợp:**
  * Thanh toán đơn hàng một chạm không dùng tiền mặt.
  * Hỗ trợ nạp tiền ví qua mô phỏng: MoMo, ZaloPay, VietQR Ngân hàng hoặc Tiền mặt tại quầy.
  * Minh bạch lịch sử giao dịch và biến động số dư.
* **Theo dõi tiến độ đơn hàng thời gian thực:**
  * Hiển thị quy trình 4 giai đoạn: *Đã thanh toán → Bếp đang nấu → Sẵn sàng nhận món → Đã hoàn tất*.
  * Cung cấp **Mã nhận món số lớn** và **Mã QR Check-in** để đối chiếu tại quầy.
* **In phiếu nhận món & Hóa đơn Căn tin:**
  * Mẫu hóa đơn in nhiệt 80mm có nút in trực tiếp (Print) hoặc tải file phiếu `.txt`.
* **Đánh giá & Nhận xét món:** Chấm điểm 1 – 5 sao và nhận xét đồ ăn sau khi hoàn tất bữa ăn.
* **Hủy đơn hoàn tiền tự động:** Cho phép hủy đơn khi bếp chưa nấu và hoàn tiền về ví tức thì 100%.

---

### 2.2. Phân hệ Nhân viên Quầy & Bếp (STAFF / EMPLOYEE)
* **Màn hình điều phối Bếp (Kitchen Order Display):**
  * Phân chia trạng thái đơn trực quan: *Đơn mới cần duyệt*, *Đang chế biến*, *Sẵn sàng giao*, *Lịch sử hoàn tất/hủy*.
  * Lọc nhanh theo khung giờ hẹn lấy và tìm kiếm theo Mã đơn / Tên sinh viên / Số điện thoại.
* **Cảnh báo âm thanh đơn mới:** Chuông thông báo tự động khi có đơn đặt món mới gửi tới bếp.
* **Quy trình chế biến chuyên nghiệp:**
  * Chuyển trạng thái đơn sang *Đang nấu* và *Sẵn sàng lấy món* (hệ thống gửi tín hiệu đến màn hình sinh viên).
  * Xử lý từ chối đơn hàng có lý do (hết nguyên liệu) → Hệ thống tự động hoàn trả số dư ví cho sinh viên.
* **In phiếu order bếp (Kitchen Ticket):** In phiếu giấy chi tiết số lượng món, ghi chú cay/ngọt để nhân viên đóng gói chính xác.

---

### 2.3. Phân hệ Quản trị viên (ADMIN)
* **Báo cáo kinh doanh & Thống kê (Analytics Dashboard):**
  * Tổng doanh thu bán hàng theo ngày/tháng.
  * Tổng số đơn đã phục vụ và tỷ lệ hoàn tất.
  * Thống kê số lượng người dùng và số dư trong hệ thống.
* **Quản lý Thực đơn & Danh mục:**
  * Thêm món mới, cập nhật giá tiền, hình ảnh minh họa, lượng calo, số lượng tồn kho.
  * Bật/tắt trạng thái *Hết món* tức thời.
* **Quản lý Mã ưu đãi (Voucher Management):**
  * Tạo mới mã voucher theo phần trăm (%) hoặc số tiền cố định.
  * Thiết lập giá trị đơn hàng tối thiểu và mức giảm tối đa.
* **Quản trị Cơ sở dữ liệu MySQL:**
  * Xem cấu trúc chi tiết (Schema) của 8 bảng dữ liệu quan hệ.
  * Trình duyệt dữ liệu trực tiếp trong từng bảng (Data Viewer).
  * Bộ truy vấn SQL mẫu (SELECT, JOIN, GROUP BY, Doanh thu, Bán chạy) sẵn sàng cho việc báo cáo đồ án.
  * Nút **Xuất file SQL (`eatnow_canteen_database.sql`)** để import vào phpMyAdmin/MySQL Workbench.

---

## 3. THIẾT KẾ CƠ SỞ DỮ LIỆU MYSQL (DATABASE SCHEMA)

Cơ sở dữ liệu `eatnow_db` được thiết kế chuẩn hóa gồm 8 bảng quan hệ:

1. **`users`**: Lưu trữ tài khoản người dùng (`id`, `name`, `email`, `phone`, `role`, `mssv`, `class_name`, `wallet_balance`, `created_at`).
2. **`categories`**: Danh mục nhóm món ăn (`id`, `name`, `icon`, `display_order`, `is_active`).
3. **`foods`**: Thực đơn chi tiết (`id`, `category_id [FK]`, `name`, `description`, `price`, `original_price`, `image`, `is_available`, `stock_quantity`, `rating`, `calories`).
4. **`orders`**: Thông tin đơn hàng (`id`, `order_code`, `user_id [FK]`, `total_amount`, `pickup_time_slot`, `dining_option`, `table_number`, `voucher_code`, `discount_amount`, `payment_method`, `status`, `payment_status`, `created_at`).
5. **`order_items`**: Chi tiết món trong từng đơn (`id`, `order_id [FK]`, `food_id [FK]`, `quantity`, `price`, `note`).
6. **`wallet_transactions`**: Biến động số dư ví (`id`, `user_id [FK]`, `type`, `amount`, `balance_after`, `description`, `reference_id`, `created_at`).
7. **`vouchers`**: Danh mục mã khuyến mãi (`code`, `title`, `description`, `discount_type`, `discount_value`, `min_order_value`, `max_discount`).
8. **`reviews`**: Đánh giá phản hồi món ăn (`id`, `order_id [FK]`, `user_id [FK]`, `food_id [FK]`, `rating`, `comment`, `created_at`).

---

## 4. HƯỚNG DẪN CÀI ĐẶT VÀ CHẠY ỨNG DỤNG (RUN LOCALLY)

### Yêu cầu cài đặt trước:
* Đã cài đặt **Node.js** (phiên bản 18.x hoặc 20.x trở lên).
* Trình duyệt web hiện đại (Google Chrome, Microsoft Edge, Firefox, Cốc Cốc,...).

### Các bước thực hiện:

1. **Sao chép mã nguồn từ GitHub:**
   ```bash
   git clone https://github.com/ngothihongthu212-hub/EatNow.git
   cd EatNow
   ```

2. **Cài đặt các thư viện cần thiết:**
   ```bash
   npm install
   ```

3. **Khởi chạy máy chủ phát triển:**
   ```bash
   npm run dev
   ```
   Sau khi chạy lệnh, mở trình duyệt và truy cập vào đường dẫn: **`http://localhost:3000`**

4. **Kiểm tra cú pháp & Đóng gói sản phẩm:**
   ```bash
   npm run lint
   npm run build
   ```

---

## 5. TÀI KHOẢN TRẢI NGHIỆM MẪU DÀNH CHO GIẢNG VIÊN CHẤM BÀI

Người dùng có thể dùng thanh **Chuyển đổi vai trò nhanh** ở đầu trang web hoặc đăng nhập qua các tài khoản định sẵn:

| Nhóm tài khoản | Họ và tên | Email đăng nhập | Quyền hạn kiểm tra |
| :--- | :--- | :--- | :--- |
| **Sinh Viên** | Nguyễn Văn An | `an.nguyen@student.edu.vn` | Đặt món, chọn giờ hẹn lấy, nạp ví, áp mã voucher, in phiếu nhận món, đánh giá. |
| **Nhân Viên Bếp** | Nguyễn Thị Hồng | `bep.hongthu@canteen.edu.vn` | Tiếp nhận đơn mới, chuông báo, xác nhận đang nấu/sẵn sàng, in phiếu bếp. |
| **Quản Trị Viên** | Quản Trị Căn Tin | `admin@canteen.edu.vn` | Quản lý món ăn, thêm voucher, xem bảng dữ liệu MySQL, xuất file `.sql`. |

---

## 6. THÔNG TIN BÁO CÁO ĐỒ ÁN
* **Tên đề tài:** Hệ thống Đặt món Căn tin Trực tuyến EatNow (EatNow Canteen Management System)
* **Sinh viên thực hiện:** Nguyễn Thị Hồng Thu (MSSV: 2374820071)
* **GitHub Repository:** [https://github.com/ngothihongthu212-hub/EatNow](https://github.com/ngothihongthu212-hub/EatNow)
* **Công nghệ sử dụng:** HTML5, CSS3 (Tailwind CSS), JavaScript (ES6+), ReactJS, Node.js, MySQL, GitHub
