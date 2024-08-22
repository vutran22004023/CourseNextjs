import random
import json

# Import danh sách thuật toán từ các module khác
from easy import easyAlgorithms
from medium import mediumAlgorithms
from hard import hardAlgorithms

def calculate_result(solution, test_data):
    """
    Chuyển đổi các hàm JavaScript thành các hàm Python tương ứng và tính toán kết quả.
    
    Parameters:
    - solution (str): Mã nguồn của thuật toán.
    - test_data (list): Dữ liệu đầu vào để kiểm tra thuật toán.

    Returns:
    - Kết quả tính toán của thuật toán hoặc None nếu không nhận diện được.
    """
    # Kiểm tra các kiểu thuật toán dựa trên nội dung của mã nguồn
    if "sum" in solution:
        return sum(test_data)
    elif "average" in solution:
        return sum(test_data) / len(test_data)
    elif "max" in solution:
        return max(test_data)
    elif "min" in solution:
        return min(test_data)
    # Thêm các điều kiện khác nếu cần thiết
    return None

def tao_mo_ta_thuat_toan():
    """
    Tạo mô tả thuật toán mẫu với các giá trị ngẫu nhiên và tính toán kết quả.

    Returns:
    - List chứa thông tin về các thuật toán.
    """
    thuat_toan = []

    # Chọn một thuật toán từ mỗi cấp độ khó
    thuat_toan_de = random.choice(easyAlgorithms)
    thuat_toan_vua = random.choice(mediumAlgorithms)
    thuat_toan_kho = random.choice(hardAlgorithms)

    # Tạo số ngẫu nhiên và mảng ngẫu nhiên
    so1 = random.randint(1, 100)
    so2 = random.randint(1, 100)
    mang_ngau_nhien = [random.randint(1, 100) for _ in range(10)]

    # Cập nhật dữ liệu thuật toán mẫu với solution, test_data, và result

    # Thuật toán dễ
    ten_de = thuat_toan_de['name'].replace("ngẫu nhiên", f"{so1} và {so2}")
    mo_ta_de = thuat_toan_de['description'].replace("hai số nguyên", f"{so1} và {so2}")
    result_de = calculate_result(thuat_toan_de['solution'], [so1, so2])
    thuat_toan.append({
        "ten": ten_de,
        "mo_ta": mo_ta_de,
        "level": "dễ",
        "solution": thuat_toan_de['solution'],
        "test_data": [so1, so2],
        "result": result_de
    })

    # Thuật toán vừa
    ten_vua = thuat_toan_vua['name'].replace("ngẫu nhiên", str(mang_ngau_nhien))
    mo_ta_vua = thuat_toan_vua['description'].replace("mảng", f"mảng {mang_ngau_nhien}")
    result_vua = calculate_result(thuat_toan_vua['solution'], mang_ngau_nhien)
    thuat_toan.append({
        "ten": ten_vua,
        "mo_ta": mo_ta_vua,
        "level": "vừa",
        "solution": thuat_toan_vua['solution'],
        "test_data": mang_ngau_nhien,
        "result": result_vua
    })

    # Thuật toán khó
    ten_kho = thuat_toan_kho['name']
    mo_ta_kho = thuat_toan_kho['description'].replace("ngẫu nhiên", f"một mảng {mang_ngau_nhien}")
    result_kho = calculate_result(thuat_toan_kho['solution'], mang_ngau_nhien)
    thuat_toan.append({
        "ten": ten_kho,
        "mo_ta": mo_ta_kho,
        "level": "khó",
        "solution": thuat_toan_kho['solution'],
        "test_data": mang_ngau_nhien,
        "result": result_kho
    })

    return thuat_toan

def main():
    thuat_toan = tao_mo_ta_thuat_toan()
    with open('output.json', 'w', encoding='utf-8') as f:
        json.dump(thuat_toan, f, indent=2, ensure_ascii=False)

if __name__ == "__main__":
    main()
