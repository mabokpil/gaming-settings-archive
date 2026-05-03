// 서버에 데이터 저장 요청
async function saveSetting() {
  const gameName = document.getElementById("gameName").value;
  const mouseDpi = document.getElementById("mouseDpi").value;
  const sensitivity = document.getElementById("sensitivity").value;
  const gripStyle = document.getElementById("gripStyle").value;

  if (!gameName || !mouseDpi || !sensitivity) {
    alert("모든 칸을 입력해 주세요!");
    return;
  }

  const settingData = { gameName, mouseDpi, sensitivity, gripStyle };

  try {
    const response = await fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settingData),
    });

    if (response.ok) {
      alert("서버 저장 완료!");
      loadSettings(); // 목록 새로고침
      // 입력창 비우기
      document.getElementById("gameName").value = "";
      document.getElementById("mouseDpi").value = "";
      document.getElementById("sensitivity").value = "";
    }
  } catch (error) {
    console.error("저장 실패:", error);
  }
}

// 서버에서 데이터 가져와서 화면에 그리기
async function loadSettings() {
  try {
    const response = await fetch("/api/settings");
    const settings = await response.json();

    const settingsList = document.getElementById("settingsList");
    settingsList.innerHTML = "";

    settings.forEach((set) => {
      const card = document.createElement("div");
      card.className = "settings-card";
      card.innerHTML = `
                <h3>🎮 ${set.gameName}</h3>
                <p><strong>DPI:</strong> ${set.mouseDpi}</p>
                <p><strong>감도:</strong> ${set.sensitivity}</p>
                <p><strong>그립:</strong> ${set.gripStyle}</p>
            `;
      settingsList.prepend(card);
    });
  } catch (error) {
    console.error("불러오기 실패:", error);
  }
}

// 페이지 시작 시 자동 실행
loadSettings();
