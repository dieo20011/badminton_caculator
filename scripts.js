function calculateFees() {
    const numMen = parseInt(document.getElementById('numMen').value) || 0;
    const numWomen = parseInt(document.getElementById('numWomen').value) || 0;
    const numShuttles = parseInt(document.getElementById('numShuttles').value) || 0;
    const courtFee = parseFloat(document.getElementById('courtFee').value) || 0;
    const selectedWomanFee = parseInt(document.getElementById('womanFee').value) || 45000; // Tiền mỗi nữ đóng lấy từ dropdown

    const shuttleCostPerUnit = 23000; // Giá mỗi cầu

    // Tổng tiền cầu
    const shuttleFee = numShuttles * shuttleCostPerUnit;

    // Tổng tiền cần chia
    const totalFee = courtFee + shuttleFee;

    if (numWomen === 0) {
        // Nếu không có nữ, chia đều toàn bộ chi phí cho nam
        const perManFee = numMen > 0 ? (totalFee / numMen).toFixed(2) : 0;

        // Hiển thị kết quả
        document.getElementById('result').style.display = 'block';
        document.getElementById('totalFee').innerText = `Tổng tiền cần chia: ${totalFee.toLocaleString()} VND`;
        document.getElementById('perWoman').innerText = `Không có nữ tham gia.`;
        document.getElementById('perMan').innerText = `Tiền mỗi Nam phải trả: ${parseFloat(perManFee).toLocaleString()} VND`;
        return;
    }

    // Tính tổng tiền nữ đóng
    const totalWomanFee = numWomen * selectedWomanFee;

    // Tổng tiền còn lại chia cho Nam
    let totalFeeForMen = totalFee - totalWomanFee;

    // Kiểm tra số người để tránh chia cho 0
    let perManFee = numMen > 0 ? totalFeeForMen / numMen : 0;
    let finalWomanFee = selectedWomanFee;

    // Kiểm tra nếu cần chia đều
    if (perManFee < selectedWomanFee && numMen > 0) {
        // Chia đều toàn bộ số tiền cho tất cả mọi người
        const totalPeople = numMen + numWomen; // Tổng số người
        const equalShare = totalPeople > 0 ? parseFloat((totalFee / totalPeople).toFixed(2)) : 0;

        // Cập nhật lại giá trị chia đều
        perManFee = equalShare;
        finalWomanFee = equalShare;
    }

    // Hiển thị kết quả
    document.getElementById('result').style.display = 'block';
    document.getElementById('totalFee').innerText = `Tổng tiền cần chia: ${totalFee.toLocaleString()} VND`;
    document.getElementById('perWoman').innerText = `Tiền mỗi Nữ phải trả: ${finalWomanFee.toLocaleString()} VND`;
    document.getElementById('perMan').innerText = `Tiền mỗi Nam phải trả: ${perManFee.toLocaleString()} VND`;
}
