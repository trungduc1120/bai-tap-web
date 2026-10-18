/* BÀI B — VIẾT CODE: Lọc tin và đăng tin nhanh (news.html)
   Viết code theo đặc tả.
   Không sửa news.html, không sửa css; chỉ viết JavaScript trong file này. */

// ---------- ĐÃ CHO SẴN (không sửa) ----------
// Chặn việc gửi form tìm kiếm khi nhấn Enter, để trang không bị tải lại.
document.querySelector("#searchbar form").addEventListener("submit", (e) => e.preventDefault());

// ---------- PHẦN BẠN VIẾT ----------
const danhSachTin = document.getElementById("list");
const oTimKiem = document.getElementById("o-tim-kiem");
const boDem = document.getElementById("bo-dem");
const khongThay = document.getElementById("khong-thay");
const oTieuDe = document.getElementById("tin-tieu-de");
const oNoiDung = document.getElementById("tin-noi-dung");
const baoLoi = document.getElementById("bao-loi");
const nutDang = document.getElementById("nut-dang");

// F1. Bộ đếm "Đang hiển thị x/y tin" trong #bo-dem.
function capNhatBoDem() {
	const cacTin = danhSachTin.querySelectorAll("li");
	let soHien = 0;
	for (const tin of cacTin) {
		if (!tin.classList.contains("an")) {
			soHien++;
		}
	}
	boDem.textContent = `Đang hiển thị ${soHien}/${cacTin.length} tin`;
	return soHien;
}

// F2 + F3. Lọc tin khi gõ vào #o-tim-kiem (sự kiện keyup) và thông báo #khong-thay.
function locTin() {
	const tuKhoa = oTimKiem.value;
	for (const tin of danhSachTin.querySelectorAll("li")) {
		const vanBan = tin.querySelector("h3").textContent + " " + tin.querySelector("p").textContent;
		const khop = vanBan.toLowerCase().includes(tuKhoa.toLowerCase());
		tin.classList.toggle("an", !khop);
	}

	const soHien = capNhatBoDem();
	khongThay.classList.toggle("an", soHien > 0);
	khongThay.textContent = soHien === 0 ? `Không tìm thấy tin nào cho "${tuKhoa}"` : "";
}

oTimKiem.addEventListener("keyup", locTin);
locTin(); // Cập nhật bộ đếm ngay khi tải trang.

// F4. Nút "Read more >>" / "Thu gọn <<" — MỘT trình lắng nghe đặt trên #list.
danhSachTin.addEventListener("click", (e) => {
	if (e.target.nodeName !== "BUTTON" || !e.target.classList.contains("more")) {
		return;
	}

	const doanVan = e.target.parentNode.querySelector("p");
	const dangMo = doanVan.classList.toggle("day-du");
	e.target.textContent = dangMo ? "Thu gọn <<" : "Read more >>";
});

// F5. Nút #nut-dang: kiểm tra dữ liệu, tạo <li> mới, chèn vào đầu #list.
nutDang.addEventListener("click", () => {
	const tieuDe = oTieuDe.value;
	const noiDung = oNoiDung.value;
	if (tieuDe === "" || noiDung === "") {
		baoLoi.textContent = "Vui lòng nhập đủ tiêu đề và nội dung.";
		return;
	}

	const tinMoi = document.createElement("li");
	const ngay = document.createElement("span");
	ngay.className = "time";
	ngay.textContent = homNay();

	const tieuDeMoi = document.createElement("h3");
	tieuDeMoi.textContent = tieuDe;
	const doanVan = document.createElement("p");
	doanVan.textContent = noiDung;

	const nutMoRong = document.createElement("button");
	nutMoRong.type = "button";
	nutMoRong.className = "more";
	nutMoRong.textContent = "Read more >>";

	tinMoi.append(ngay, tieuDeMoi, doanVan, nutMoRong);
	danhSachTin.prepend(tinMoi);
	oTieuDe.value = "";
	oNoiDung.value = "";
	baoLoi.textContent = "";
	locTin(); // Tin mới cũng phải tuân theo bộ lọc hiện tại.
});
