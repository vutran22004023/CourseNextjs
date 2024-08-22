import random
import json

# Import danh sách thuật toán từ các module khác
from easy import easyAlgorithms
from medium import mediumAlgorithms
from hard import hardAlgorithms

def tao_mo_ta_thuat_toan():
    thuat_toan = []

    # Chọn một thuật toán từ mỗi cấp độ khó
    thuat_toan_de = random.choice(easyAlgorithms)
    thuat_toan_vua = random.choice(mediumAlgorithms)
    thuat_toan_kho = random.choice(hardAlgorithms)

    # Tạo số ngẫu nhiên và mảng ngẫu nhiên
    so1 = random.randint(1, 100)
    so2 = random.randint(1, 100)
    mang_ngau_nhien = [random.randint(1, 100) for _ in range(10)]

    # Thay thế các giá trị ngẫu nhiên trong mô tả thuật toán
    thuat_toan.append({
        "ten": thuat_toan_de['name'].replace("ngẫu nhiên", f"{so1} và {so2}"),
        "mo_ta": thuat_toan_de['description'].replace("hai số nguyên", f"{so1} và {so2}"),
        "level": "dễ"
    })
    thuat_toan.append({
        "ten": thuat_toan_vua['name'].replace("ngẫu nhiên", str(mang_ngau_nhien)),
        "mo_ta": thuat_toan_vua['description'].replace("mảng", f"mảng {mang_ngau_nhien}"),
        "level": "vừa"
    })
    thuat_toan.append({
        "ten": thuat_toan_kho['name'],
        "mo_ta": thuat_toan_kho['description'].replace("ngẫu nhiên", f"một mảng {mang_ngau_nhien}"),
        "level": "khó"
    })

    return thuat_toan

def main():
    thuat_toan = tao_mo_ta_thuat_toan()
    with open('output.json', 'w', encoding='utf-8') as f:
        json.dump(thuat_toan, f, indent=2, ensure_ascii=False)

if __name__ == "__main__":
    main()
