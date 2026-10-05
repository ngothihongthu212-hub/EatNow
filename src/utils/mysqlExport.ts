import { Category, FoodItem, Order, User, WalletTransaction, Review, Voucher } from '../types';

export const generateMySQLScript = (data: {
  users: User[];
  categories: Category[];
  foods: FoodItem[];
  orders: Order[];
  transactions: WalletTransaction[];
  vouchers: Voucher[];
  reviews: Review[];
}): string => {
  const { users, categories, foods, orders, transactions, vouchers, reviews } = data;

  const escapeStr = (val: string | undefined | null) => {
    if (val === undefined || val === null) return 'NULL';
    return `'${val.replace(/'/g, "''").replace(/\\/g, '\\\\')}'`;
  };

  const sql: string[] = [];

  sql.push('-- ========================================================================');
  sql.push('-- HỆ THỐNG ĐẶT MÓN CĂN TIN TRƯỜNG ĐẠI HỌC - EATNOW');
  sql.push('-- Script Cơ sở Dữ liệu MySQL (Chuẩn DDL & DML)');
  sql.push(`-- Ngày xuất: ${new Date().toISOString()}`);
  sql.push('-- Tương thích: MySQL 5.7+, MySQL 8.0+, MariaDB 10.3+, phpMyAdmin');
  sql.push('-- ========================================================================\n');

  sql.push('CREATE DATABASE IF NOT EXISTS `eatnow_canteen` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;');
  sql.push('USE `eatnow_canteen`;\n');

  sql.push('-- Tắt kiểm tra khóa ngoại tạm thời khi tạo và nạp dữ liệu');
  sql.push('SET FOREIGN_KEY_CHECKS = 0;\n');

  // Table 1: users
  sql.push('-- ------------------------------------------------------------------------');
  sql.push('-- 1. Bảng `users`: Người dùng (Sinh viên, Nhân viên, Quản trị viên)');
  sql.push('-- ------------------------------------------------------------------------');
  sql.push('DROP TABLE IF EXISTS `users`;');
  sql.push(`CREATE TABLE \`users\` (
  \`id\` VARCHAR(50) NOT NULL PRIMARY KEY,
  \`name\` VARCHAR(100) NOT NULL,
  \`mssv\` VARCHAR(20) NULL,
  \`email\` VARCHAR(100) NOT NULL UNIQUE,
  \`phone\` VARCHAR(20) NOT NULL,
  \`role\` ENUM('customer', 'staff', 'admin') NOT NULL DEFAULT 'customer',
  \`wallet_balance\` DECIMAL(14, 2) NOT NULL DEFAULT 0.00,
  \`class_name\` VARCHAR(50) NULL,
  \`department\` VARCHAR(100) NULL,
  \`created_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n`);

  if (users.length > 0) {
    sql.push('INSERT INTO `users` (`id`, `name`, `mssv`, `email`, `phone`, `role`, `wallet_balance`, `class_name`, `department`) VALUES');
    const userVals = users.map(
      (u) =>
        `(${escapeStr(u.id)}, ${escapeStr(u.name)}, ${escapeStr(u.mssv)}, ${escapeStr(u.email)}, ${escapeStr(u.phone)}, ${escapeStr(u.role)}, ${u.walletBalance || 0}, ${escapeStr(u.className)}, ${escapeStr(u.department)})`
    );
    sql.push(userVals.join(',\n') + ';\n');
  }

  // Table 2: categories
  sql.push('-- ------------------------------------------------------------------------');
  sql.push('-- 2. Bảng `categories`: Danh mục món ăn');
  sql.push('-- ------------------------------------------------------------------------');
  sql.push('DROP TABLE IF EXISTS `categories`;');
  sql.push(`CREATE TABLE \`categories\` (
  \`id\` VARCHAR(50) NOT NULL PRIMARY KEY,
  \`name\` VARCHAR(100) NOT NULL,
  \`slug\` VARCHAR(100) NOT NULL,
  \`icon\` VARCHAR(50) NOT NULL,
  \`description\` TEXT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n`);

  if (categories.length > 0) {
    sql.push('INSERT INTO `categories` (`id`, `name`, `slug`, `icon`, `description`) VALUES');
    const catVals = categories.map(
      (c) => `(${escapeStr(c.id)}, ${escapeStr(c.name)}, ${escapeStr(c.slug)}, ${escapeStr(c.icon)}, ${escapeStr(c.description)})`
    );
    sql.push(catVals.join(',\n') + ';\n');
  }

  // Table 3: foods
  sql.push('-- ------------------------------------------------------------------------');
  sql.push('-- 3. Bảng `foods`: Thực đơn món ăn');
  sql.push('-- ------------------------------------------------------------------------');
  sql.push('DROP TABLE IF EXISTS `foods`;');
  sql.push(`CREATE TABLE \`foods\` (
  \`id\` VARCHAR(50) NOT NULL PRIMARY KEY,
  \`category_id\` VARCHAR(50) NOT NULL,
  \`name\` VARCHAR(150) NOT NULL,
  \`price\` DECIMAL(12, 2) NOT NULL,
  \`original_price\` DECIMAL(12, 2) NULL,
  \`image\` VARCHAR(255) NULL,
  \`description\` TEXT NULL,
  \`is_available\` TINYINT(1) NOT NULL DEFAULT 1,
  \`stock_quantity\` INT NOT NULL DEFAULT 0,
  \`prep_time_minutes\` INT NOT NULL DEFAULT 10,
  \`rating\` DECIMAL(3, 1) NOT NULL DEFAULT 5.0,
  \`review_count\` INT NOT NULL DEFAULT 0,
  \`calories\` INT NULL,
  \`protein\` DECIMAL(5, 1) NULL,
  \`carbs\` DECIMAL(5, 1) NULL,
  \`fat\` DECIMAL(5, 1) NULL,
  \`created_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT \`fk_food_category\` FOREIGN KEY (\`category_id\`) REFERENCES \`categories\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n`);

  if (foods.length > 0) {
    sql.push('INSERT INTO `foods` (`id`, `category_id`, `name`, `price`, `original_price`, `image`, `description`, `is_available`, `stock_quantity`, `prep_time_minutes`, `rating`, `review_count`, `calories`, `protein`, `carbs`, `fat`) VALUES');
    const foodVals = foods.map(
      (f) =>
        `(${escapeStr(f.id)}, ${escapeStr(f.categoryId)}, ${escapeStr(f.name)}, ${f.price}, ${f.originalPrice || f.price}, ${escapeStr(f.image)}, ${escapeStr(f.description)}, ${f.isAvailable ? 1 : 0}, ${f.stockQuantity}, ${f.prepTimeMinutes || 10}, ${f.rating || 5.0}, ${f.reviewCount || 0}, ${f.nutrition?.calories || f.calories || 0}, ${f.nutrition?.protein || 0}, ${f.nutrition?.carbs || 0}, ${f.nutrition?.fat || 0})`
    );
    sql.push(foodVals.join(',\n') + ';\n');
  }

  // Table 4: vouchers
  sql.push('-- ------------------------------------------------------------------------');
  sql.push('-- 4. Bảng `vouchers`: Mã khuyến mãi / Ưu đãi sinh viên');
  sql.push('-- ------------------------------------------------------------------------');
  sql.push('DROP TABLE IF EXISTS `vouchers`;');
  sql.push(`CREATE TABLE \`vouchers\` (
  \`code\` VARCHAR(50) NOT NULL PRIMARY KEY,
  \`title\` VARCHAR(150) NOT NULL,
  \`description\` TEXT NULL,
  \`discount_type\` ENUM('fixed', 'percent') NOT NULL DEFAULT 'fixed',
  \`discount_value\` DECIMAL(10, 2) NOT NULL,
  \`min_order_value\` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  \`max_discount\` DECIMAL(12, 2) NULL,
  \`is_active\` TINYINT(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n`);

  if (vouchers.length > 0) {
    sql.push('INSERT INTO `vouchers` (`code`, `title`, `description`, `discount_type`, `discount_value`, `min_order_value`, `max_discount`, `is_active`) VALUES');
    const voucherVals = vouchers.map(
      (v) =>
        `(${escapeStr(v.code)}, ${escapeStr(v.title)}, ${escapeStr(v.description)}, ${escapeStr(v.discountType)}, ${v.discountValue}, ${v.minOrderValue}, ${v.maxDiscount || 'NULL'}, 1)`
    );
    sql.push(voucherVals.join(',\n') + ';\n');
  }

  // Table 5: orders
  sql.push('-- ------------------------------------------------------------------------');
  sql.push('-- 5. Bảng `orders`: Đơn đặt món');
  sql.push('-- ------------------------------------------------------------------------');
  sql.push('DROP TABLE IF EXISTS `orders`;');
  sql.push(`CREATE TABLE \`orders\` (
  \`id\` VARCHAR(50) NOT NULL PRIMARY KEY,
  \`order_code\` VARCHAR(20) NOT NULL UNIQUE,
  \`user_id\` VARCHAR(50) NOT NULL,
  \`user_name\` VARCHAR(100) NOT NULL,
  \`user_phone\` VARCHAR(20) NOT NULL,
  \`total_amount\` DECIMAL(12, 2) NOT NULL,
  \`pickup_time_slot\` VARCHAR(50) NOT NULL,
  \`dining_option\` ENUM('dine_in', 'takeaway') NOT NULL DEFAULT 'takeaway',
  \`table_number\` VARCHAR(50) NULL,
  \`voucher_code\` VARCHAR(50) NULL,
  \`discount_amount\` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  \`status\` ENUM('pending_payment', 'paid_pending_confirm', 'preparing', 'ready', 'completed', 'cancelled') NOT NULL,
  \`cancel_reason\` VARCHAR(255) NULL,
  \`payment_method\` VARCHAR(30) NOT NULL DEFAULT 'wallet',
  \`payment_status\` ENUM('paid', 'refunded') NOT NULL DEFAULT 'paid',
  \`created_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  \`completed_at\` DATETIME NULL,
  CONSTRAINT \`fk_order_user\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n`);

  if (orders.length > 0) {
    sql.push('INSERT INTO `orders` (`id`, `order_code`, `user_id`, `user_name`, `user_phone`, `total_amount`, `pickup_time_slot`, `dining_option`, `table_number`, `voucher_code`, `discount_amount`, `status`, `cancel_reason`, `payment_method`, `payment_status`, `created_at`, `completed_at`) VALUES');
    const orderVals = orders.map(
      (o) =>
        `(${escapeStr(o.id)}, ${escapeStr(o.orderCode)}, ${escapeStr(o.userId)}, ${escapeStr(o.userName)}, ${escapeStr(o.userPhone)}, ${o.totalAmount}, ${escapeStr(o.pickupTimeSlot)}, ${escapeStr(o.diningOption || 'takeaway')}, ${escapeStr(o.tableNumber)}, ${escapeStr(o.voucherCode)}, ${o.discountAmount || 0}, ${escapeStr(o.status)}, ${escapeStr(o.cancelReason)}, 'wallet', ${escapeStr(o.paymentStatus)}, ${escapeStr(o.createdAt.replace('T', ' ').substring(0, 19))}, ${o.completedAt ? escapeStr(o.completedAt.replace('T', ' ').substring(0, 19)) : 'NULL'})`
    );
    sql.push(orderVals.join(',\n') + ';\n');
  }

  // Table 6: order_items
  sql.push('-- ------------------------------------------------------------------------');
  sql.push('-- 6. Bảng `order_items`: Chi tiết món ăn trong từng đơn');
  sql.push('-- ------------------------------------------------------------------------');
  sql.push('DROP TABLE IF EXISTS `order_items`;');
  sql.push(`CREATE TABLE \`order_items\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`order_id\` VARCHAR(50) NOT NULL,
  \`food_id\` VARCHAR(50) NOT NULL,
  \`name\` VARCHAR(150) NOT NULL,
  \`price\` DECIMAL(12, 2) NOT NULL,
  \`quantity\` INT NOT NULL DEFAULT 1,
  \`note\` VARCHAR(255) NULL,
  CONSTRAINT \`fk_item_order\` FOREIGN KEY (\`order_id\`) REFERENCES \`orders\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n`);

  const orderItemsData: { orderId: string; foodId: string; name: string; price: number; quantity: number; note?: string }[] = [];
  orders.forEach((o) => {
    o.items.forEach((item) => {
      orderItemsData.push({
        orderId: o.id,
        foodId: item.foodId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        note: item.note,
      });
    });
  });

  if (orderItemsData.length > 0) {
    sql.push('INSERT INTO `order_items` (`order_id`, `food_id`, `name`, `price`, `quantity`, `note`) VALUES');
    const itemVals = orderItemsData.map(
      (it) =>
        `(${escapeStr(it.orderId)}, ${escapeStr(it.foodId)}, ${escapeStr(it.name)}, ${it.price}, ${it.quantity}, ${escapeStr(it.note)})`
    );
    sql.push(itemVals.join(',\n') + ';\n');
  }

  // Table 7: wallet_transactions
  sql.push('-- ------------------------------------------------------------------------');
  sql.push('-- 7. Bảng `wallet_transactions`: Lịch sử giao dịch Ví CanteenGo');
  sql.push('-- ------------------------------------------------------------------------');
  sql.push('DROP TABLE IF EXISTS `wallet_transactions`;');
  sql.push(`CREATE TABLE \`wallet_transactions\` (
  \`id\` VARCHAR(50) NOT NULL PRIMARY KEY,
  \`user_id\` VARCHAR(50) NOT NULL,
  \`order_id\` VARCHAR(50) NULL,
  \`order_code\` VARCHAR(20) NULL,
  \`type\` ENUM('deposit', 'payment', 'refund') NOT NULL,
  \`amount\` DECIMAL(12, 2) NOT NULL,
  \`description\` VARCHAR(255) NOT NULL,
  \`status\` VARCHAR(30) NOT NULL DEFAULT 'success',
  \`timestamp\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT \`fk_tx_user\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n`);

  if (transactions.length > 0) {
    sql.push('INSERT INTO `wallet_transactions` (`id`, `user_id`, `order_id`, `order_code`, `type`, `amount`, `description`, `status`, `timestamp`) VALUES');
    const txVals = transactions.map(
      (t) =>
        `(${escapeStr(t.id)}, ${escapeStr(t.userId)}, ${escapeStr(t.orderId)}, ${escapeStr(t.orderCode)}, ${escapeStr(t.type)}, ${t.amount}, ${escapeStr(t.description)}, ${escapeStr(t.status)}, ${escapeStr(t.timestamp.replace('T', ' ').substring(0, 19))})`
    );
    sql.push(txVals.join(',\n') + ';\n');
  }

  // Table 8: reviews
  sql.push('-- ------------------------------------------------------------------------');
  sql.push('-- 8. Bảng `reviews`: Đánh giá món ăn của sinh viên');
  sql.push('-- ------------------------------------------------------------------------');
  sql.push('DROP TABLE IF EXISTS `reviews`;');
  sql.push(`CREATE TABLE \`reviews\` (
  \`id\` VARCHAR(50) NOT NULL PRIMARY KEY,
  \`food_id\` VARCHAR(50) NOT NULL,
  \`food_name\` VARCHAR(150) NOT NULL,
  \`user_id\` VARCHAR(50) NOT NULL,
  \`user_name\` VARCHAR(100) NOT NULL,
  \`rating\` INT NOT NULL DEFAULT 5,
  \`comment\` TEXT NOT NULL,
  \`created_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT \`fk_review_food\` FOREIGN KEY (\`food_id\`) REFERENCES \`foods\` (\`id\`) ON DELETE CASCADE,
  CONSTRAINT \`fk_review_user\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n`);

  if (reviews.length > 0) {
    sql.push('INSERT INTO `reviews` (`id`, `food_id`, `food_name`, `user_id`, `user_name`, `rating`, `comment`, `created_at`) VALUES');
    const revVals = reviews.map(
      (r) =>
        `(${escapeStr(r.id)}, ${escapeStr(r.foodId)}, ${escapeStr(r.foodName)}, ${escapeStr(r.userId)}, ${escapeStr(r.userName)}, ${r.rating}, ${escapeStr(r.comment)}, ${escapeStr(r.createdAt.replace('T', ' ').substring(0, 19))})`
    );
    sql.push(revVals.join(',\n') + ';\n');
  }

  sql.push('-- Bật lại kiểm tra khóa ngoại');
  sql.push('SET FOREIGN_KEY_CHECKS = 1;\n');

  sql.push('-- ========================================================================');
  sql.push('-- CÁC CÂU TRUY VẤN MẪU HỮU ÍCH (BÁO CÁO & THỐNG KÊ ĐỒ ÁN)');
  sql.push('-- ========================================================================');
  sql.push(`
-- 1. Báo cáo Doanh thu & Tổng số đơn hàng đã hoàn tất:
SELECT 
    COUNT(id) AS total_completed_orders,
    SUM(total_amount) AS total_revenue_vnd
FROM orders 
WHERE status = 'completed';

-- 2. Thống kê Top 5 món ăn bán chạy nhất căn tin:
SELECT 
    oi.food_id,
    f.name AS food_name,
    SUM(oi.quantity) AS total_quantity_sold,
    SUM(oi.quantity * oi.price) AS total_revenue_vnd
FROM order_items oi
JOIN foods f ON oi.food_id = f.id
JOIN orders o ON oi.order_id = o.id
WHERE o.status != 'cancelled'
GROUP BY oi.food_id, f.name
ORDER BY total_quantity_sold DESC
LIMIT 5;

-- 3. Thống kê số lượng đơn theo từng khung giờ nhận món:
SELECT 
    pickup_time_slot,
    COUNT(id) AS order_count,
    SUM(total_amount) AS slot_revenue
FROM orders
WHERE status != 'cancelled'
GROUP BY pickup_time_slot
ORDER BY pickup_time_slot ASC;

-- 4. Báo cáo số dư ví và tổng tiền nạp của sinh viên:
SELECT 
    u.id,
    u.name,
    u.mssv,
    u.class_name,
    u.wallet_balance,
    COALESCE(SUM(CASE WHEN t.type = 'deposit' THEN t.amount ELSE 0 END), 0) AS total_deposited
FROM users u
LEFT JOIN wallet_transactions t ON u.id = t.user_id
WHERE u.role = 'customer'
GROUP BY u.id, u.name, u.mssv, u.class_name, u.wallet_balance
ORDER BY u.wallet_balance DESC;
`);

  return sql.join('\n');
};
