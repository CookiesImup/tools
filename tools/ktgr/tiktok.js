function openTikTokTool() {
    const area = document.getElementById("toolArea");

    area.innerHTML = `
        <div class="group-card">
            <div class="group-content">
                <h3>TikTok Downloader 🚀</h3>

                <input type="text" id="ttlink" 
                    placeholder="Masukkan link TikTok...">

                <div style="margin-top:10px; display:flex; gap:10px;">
                    <button class="join-btn" onclick="executeTT()">Execute</button>
                    <button class="join-btn" onclick="clearTT()">Clear</button>
                </div>

                <div id="ttOutput" style="margin-top:20px;"></div>
            </div>
        </div>
    `;
}

async function executeTT() {

    const link = document.getElementById("ttlink").value;
    const output = document.getElementById("ttOutput");

    if (!link) {
        output.innerHTML = "Masukkan link dulu 😭";
        return;
    }

    output.innerHTML = "Processing... ⏳";

    try {
        const response = await fetch(
            `https://www.tikwm.com/api/?url=${encodeURIComponent(link)}`
        );

        const data = await response.json();

        if (data.code !== 0) {
            output.innerHTML = "Gagal ambil data ❌";
            return;
        }

        const video = data.data.play;
        const audio = data.data.music;
        const duration = data.data.duration;
        const title = data.data.title;
        const cover = data.data.cover;

        output.innerHTML = `
            <div class="group-card">
                <div class="group-content">
                    <h3>${title}</h3>
                    <img src="${cover}" 
                        style="width:100%; border-radius:15px; margin-top:10px; box-shadow:0 0 20px #7f00ff;">

                    <p style="margin-top:10px;">
                        Duration: ${duration} seconds
                    </p>

                    <video controls 
                        src="${video}" 
                        style="width:100%; margin-top:10px; border-radius:15px;">
                    </video>

                    <div style="margin-top:15px;">
                        <a href="${video}" target="_blank">
                            <button class="join-btn">Download Video 🎥</button>
                        </a>

                        <a href="${audio}" target="_blank">
                            <button class="join-btn" 
                                style="margin-left:10px;">
                                Convert to Audio 🎵
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        `;

    } catch (err) {
        output.innerHTML = "Error API / CORS 😭";
    }
}

function clearTT() {
    document.getElementById("ttlink").value = "";
    document.getElementById("ttOutput").innerHTML = "";
}