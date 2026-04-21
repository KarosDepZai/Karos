/** @type {import('tailwindcss').Config} */
export default {
  // Chỉ định cho Tailwind biết cần quét các file nào để tạo CSS
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Khai báo font chữ để dùng trong code (ví dụ: className="font-jakarta")
        jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
        script: ['"Dancing Script"', 'cursive'],
      },
      // Bạn có thể thêm các màu sắc tùy chỉnh của Project Sekai ở đây nếu muốn
      colors: {
        sekai: {
          dark: '#3E3B53',
          light: '#DDE2EF',
          bg: '#EEF0F5',
        }
      }
    },
  },
  plugins: [],
}
