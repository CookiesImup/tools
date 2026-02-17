function openYTTool() {
    const area = document.getElementById("toolArea");

    area.innerHTML = `
        <div class="group-card">
            <div class="group-content">
                <h3>YouTube MP3 Downloader 🎵</h3>

                <input type="text" id="ytlink"
                    placeholder="Masukkan link YouTube...">

                <div style="margin-top:10px; display:flex; gap:10px;">
                    <button class="join-btn" onclick="executeYT()">Execute</button>
                    <button class="join-btn" onclick="clearYT()">Clear</button>
                </div>

                <div id="ytOutput" style="margin-top:20px;"></div>
            </div>
        </div>
    `;
}

async function executeYT() {

    const link = document.getElementById("ytlink").value;
    const output = document.getElementById("ytOutput");

    if (!link) {
        output.innerHTML = "Masukkan link dulu 😭";
        return;
    }

    output.innerHTML = "Processing... ⏳";

    try {

        const response = await fetch(
            `https://api.nexray.web.id/downloader/v1/ytmp3?url=${encodeURIComponent(link)}`
        );

        const data = await response.json();

        if (!data.status) {
            output.innerHTML = "Gagal ambil data ❌";
            return;
        }

        const r = data.result;

        output.innerHTML = `
            <h3>${r.title}</h3>

            <img src="${r.thumbnail}"
                style="width:100%; border-radius:15px; margin-top:10px;">

            <p style="margin-top:10px;">
                Author: ${r.author}
            </p>

            <p>
                Duration: ${formatDuration(r.duration)}
            </p>

            <p>
                Format: ${r.format} | Quality: ${r.quality}
            </p>

            <div style="margin-top:15px; display:flex; gap:10px; flex-wrap:wrap;">
                <a href="${r.url}" target="_blank">
                    <button class="join-btn">
                        Download MP3 🎵
                    </button>
                </a>

                <button class="join-btn" disabled>
                    MP4 Coming Soon 🎬
                </button>
            </div>
        `;

    } catch (err) {
        output.innerHTML = "Error API / CORS 😭";
    }
}

function clearYT() {
    document.getElementById("ytlink").value = "";
    document.getElementById("ytOutput").innerHTML = "";
}