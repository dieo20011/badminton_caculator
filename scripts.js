function calculateFees() {
    const numMen = parseInt(document.getElementById('numMen').value) || 0;
    const numWomen = parseInt(document.getElementById('numWomen').value) || 0;
    const numShuttles = parseInt(document.getElementById('numShuttles').value) || 0;
    const courtFee = parseFloat(document.getElementById('courtFee').value) || 0;

    let womanFee = 40000; // Tiền mỗi nữ đóng mặc định
    const shuttleCostPerUnit = 21500; // Giá mỗi cầu

    // Tổng tiền cầu
    const shuttleFee = numShuttles * shuttleCostPerUnit;

    // Tổng tiền cần chia
    const totalFee = courtFee + shuttleFee;

    // Tính tổng tiền nữ đóng
    const totalWomanFee = numWomen * womanFee;

    // Tổng tiền còn lại chia cho Nam
    let totalFeeForMen = totalFee - totalWomanFee;

    // Kiểm tra số người để tránh chia cho 0
    let perManFee = numMen > 0 ? totalFeeForMen / numMen : 0;

    // Kiểm tra nếu cần chia đều
    if (perManFee < womanFee) {
        // Chia đều toàn bộ số tiền cho tất cả mọi người
        const totalPeople = numMen + numWomen; // Tổng số người
        const equalShare = totalPeople > 0 ? (totalFee / totalPeople).toFixed(2) : 0;

        // Cập nhật lại giá trị chia đều
        perManFee = equalShare;
        womanFee = equalShare;
    }

    // Hiển thị kết quả
    document.getElementById('result').style.display = 'block';
    document.getElementById('totalFee').innerText = `Tổng tiền cần chia: ${totalFee.toLocaleString()} VND`;
    document.getElementById('perWoman').innerText = `Tiền mỗi Nữ phải trả: ${parseFloat(womanFee).toLocaleString()} VND`;
    document.getElementById('perMan').innerText = `Tiền mỗi Nam phải trả: ${parseFloat(perManFee).toLocaleString()} VND`;
}
