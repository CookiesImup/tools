function openIGTool() {
    const area = document.getElementById("toolArea");

    area.innerHTML = `
        <div class="group-card">
            <div class="group-content">
                <h3>Instagram Downloader 📸</h3>

                <input type="text" id="iglink"
                    placeholder="Masukkan link Instagram...">

                <div style="margin-top:10px; display:flex; gap:10px;">
                    <button class="join-btn" onclick="executeIG()">Execute</button>
                    <button class="join-btn" onclick="clearIG()">Clear</button>
                </div>

                <div id="igOutput" style="margin-top:20px;"></div>
            </div>
        </div>
    `;
}

async function executeIG() {

    const link = document.getElementById("iglink").value;
    const output = document.getElementById("igOutput");

    if (!link) {
        output.innerHTML = "Masukkan link dulu 😭";
        return;
    }

    output.innerHTML = "Processing... ⏳";

    try {

        const response = await fetch(
            `https://api.nexray.web.id/downloader/v1/instagram?url=${encodeURIComponent(link)}`
        );

        const data = await response.json();

        if (!data.status) {
            output.innerHTML = "Gagal ambil data ❌";
            return;
        }

        const r = data.result;

        let mediaButtons = "";

        r.media.forEach(m => {

            if (m.type === "video") {
                mediaButtons += `
                    <a href="${m.url}" target="_blank">
                        <button class="join-btn">
                            Download Video (${m.quality})
                        </button>
                    </a>
                `;
            }

            if (m.type === "audio") {
                mediaButtons += `
                    <a href="${m.url}" target="_blank">
                        <button class="join-btn">
                            Download Audio (${m.quality})
                        </button>
                    </a>
                `;
            }

        });

        output.innerHTML = `
            <h3>${r.title}</h3>

            <img src="${r.thumbnail}"
                style="width:100%; border-radius:15px; margin-top:10px;">

            <p style="margin-top:10px;">
                Author: ${r.author}
            </p>

            <p>
                Likes: ${r.likes.toLocaleString()}
            </p>

            <div style="margin-top:15px; display:flex; flex-wrap:wrap; gap:10px;">
                ${mediaButtons}
            </div>
        `;

    } catch (err) {
        output.innerHTML = "Error API / CORS 😭";
    }
}

function clearIG() {
    document.getElementById("iglink").value = "";
    document.getElementById("igOutput").innerHTML = "";
}