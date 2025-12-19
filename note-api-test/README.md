### phase 1: tạo rest api, lưu dữ liệu tạm thời ở ram
npm init -y
npm install express

Chạy ở chế độ development: npm run dev
Chạy ở chế độ production: npm start

node.js
express.js
rest api

### phase 2: lưu dũ liệu data vào JSON file
### phase 4: lưu vào mysql ở đây em dùng postgresql tại em từng dùng qua rồi
theo em hiểu về app này là html gửi resquest về và express nhận sau đó chuyển qua cho routes
"noteController.getALL" để gọi hết hàm getALL trong controller lên để xử lý
việc xử lí sẽ tùy thuộc tín hiệu api từ html truyền về (upload, create, delete,..)
controller gọi "db.query('làm j đó')" postgresql trả dữ liệu
controller trả dữ liệu json về frontend.

### hoàn thiện app ghi chú
các chức năng gồm thêm sửa xóa
dữ liệu toàn bộ đều được lưu ở postgres
sử dụng hbs + css (chat gpt)
