# Figma MCP Write Capability Test

**Generated:** 2026-09-24 17:56 WIB (UTC+7)  
**Workspace:** `G:/Course LSM/UI-UX`  
**Harness:** Hermes Agent v0.21.1 (Oh My Pi) — `C:\Users\hikari\AppData\Local\hermes\hermes-agent`  
**MCP Config:** `C:\Users\hikari\AppData\Local\hermes\config.yaml` · `mcp_servers.figma.url=https://mcp.figma.com/mcp` · `auth=oauth` · `enabled=true`  
**Report file:** `G:/Course LSM/UI-UX/FIGMA_MCP_WRITE_TEST_REPORT.md` (tahap read-only: `FIGMA_MCP_AUDIT_REPORT.md`)

---

## Connection

- **Connected:** **YES** — `hermes mcp test figma` → `Transport: HTTP → https://mcp.figma.com/mcp` · `Auth: OAuth 2.0` · `✓ Connected (1829ms / 2281ms / 2516ms)` · `✓ Tools discovered: 40` · `hermes mcp list` → `figma | https://mcp.figma.com/mcp | all | ✓ enabled`
- **Authenticated:** **YES** — OAuth 2.1 PKCE + DCR (`client_name: "Claude Code"`, `client_id: g7FRsEwT3A5yG0dK5Tu0Gn`, `redirect_uri: http://127.0.0.1:51796/callback`, `scope: mcp:connect openid email`). Tokens cached: `mcp-tokens/figma.json` (Bearer `figu_...`, `expires_in: 7776000`, `expires_at: 1798021313`), `figma.client.json`, `figma.meta.json` (`issuer: https://api.figma.com`). Diverifikasi via `_oauth_tokens_present` + `hermes mcp test` + `whoami` sukses.

---

## File Creation

- **create_new_file available:** **YES** — tercantum di `hermes mcp test` (tool #29) dan `cache/mcp_schema_cache.json:figma.tools[].name=create_new_file` (`required: [fileName, planKey, editorType]`, `description: Create a new blank Figma file... Returns the new file key and URL. Requires a planKey... call whoami first`).
- **File created:** **YES** — exactly **1 file** (sesuai aturan: jangan lebih dari satu). Tidak ada file tugas kuliah.
- **File name:** `OMP Figma MCP Write Test` (verbatim sesuai instruksi Langkah 2)
- **File URL:** `https://www.figma.com/design/htD39aOXiXsDKRGmKATTTg`  
  **File key:** `htD39aOXiXsDKRGmKATTTg`  
  **Plan used:** `team::1497223281060382937` (`Shapiere Januar Rafiansyah's team`, tier `starter`, role `admin`, seat `View`) — dipilih dari `whoami` sebagai satu-satunya plan dengan `role: admin`. Alternatif tersedia: `kel 13_ui/ux semest 2` (`team::1494899368825491150`, member) dan `UI/UX 13` (`team::1504302319477636393`, member) — tidak dipakai.  
  **whoami result:**
  ```json
  {
    "handle": "shapiere",
    "email": "shapierejanuarr@gmail.com",
    "plans": [
      {"name": "Shapiere Januar Rafiansyah's team", "key": "team::1497223281060382937", "role": "admin", "tier": "starter"},
      {"name": "kel 13_ui/ux semest 2", "key": "team::1494899368825491150", "role": "member", "tier": "starter"},
      {"name": "UI/UX 13", "key": "team::1504302319477636393", "role": "member", "tier": "starter"}
    ]
  }
  ```
  **create_new_file result:**
  ```json
  {
    "file_key": "htD39aOXiXsDKRGmKATTTg",
    "message": "File \"OMP Figma MCP Write Test\" created successfully.",
    "file_url": "https://www.figma.com/design/htD39aOXiXsDKRGmKATTTg"
  }
  ```
  Skill loaded sebelum call: `skill://figma/figma-create-new-file/SKILL.md` via `mcp__figma__read_resource` (wajib per deskripsi tool). Call params: `fileName: "OMP Figma MCP Write Test"`, `planKey: "team::1497223281060382937"` (verbatim), `editorType: "design"`. Session: `20260924_174810_a4804d` (90s wall time, no error, no confirmation tambahan).
- **File terpisah dari Harness:** File harness yang diberikan `https://www.figma.com/design/40j4sqzxa75EWULqvhMq4w/Harness-MCP-Testing?node-id=0-1&t=SDytgIVah6K06rd7-1` (fileKey `40j4sqzxa75EWULqvhMq4w`) **tidak disentuh** — write hanya ke `htD39aOXiXsDKRGmKATTTg`.

---

## Native Design Write

- **use_figma available:** **YES** — tool #26 di `hermes mcp test`, schema `required: [fileKey, code, description]` (`description: Create, edit, generate, or sync any design in Figma... writes to Figma with JavaScript via the Figma Plugin API... IMPORTANT: Before calling this tool, load figma-use guidance`).
- **1440×900 frame created:** **YES**
- **Heading created:** **YES** — `"Hello from OMP"`
- **Paragraph created:** **YES** — `"Figma MCP write capability test"`
- **Button created:** **YES** — `"Test Button"`

**use_figma call (Langkah 3) — session `20260924_175047_68d622`:**

- Skill loaded: `skill://figma/figma-use/SKILL.md` via `mcp__figma__read_resource` sebelum `use_figma` (wajib per deskripsi tool).
- Params: `fileKey: htD39aOXiXsDKRGmKATTTg`, `description: "Create 1440x900 desktop frame with heading, paragraph and button for OMP write test"`, `skillNames: "resource:figma-use"`, `code:` JavaScript Figma Plugin API (≈ valid JS, <10000 chars, no external fetch) yang:
  - Membuat `FRAME "OMP Test - 1440x900"` → `width: 1440` `height: 900` `x: 0` `y: 0` `fill: #FFFFFF` `layoutMode: VERTICAL` `padding: 80` `itemSpacing: 24` `primaryAxisAlignItems: CENTER` `counterAxisAlignItems: CENTER`
  - `await figma.loadFontAsync` untuk `Inter Bold 700 48px`, `Inter Regular 400 18px`, `Inter Semi Bold 600 16px` sebelum `createText`
  - Text `Hello from OMP` → 48px Bold #111111 Inter
  - Text `Figma MCP write capability test` → 18px Regular #555555 Inter
  - Button `FRAME "Test Button"` → fill #111111 cornerRadius 8 padding 16/12 auto-layout horizontal centered → Text `Test Button` 16px Semi Bold #FFFFFF Inter
  - `figma.currentPage.appendChild(frame)` + `figma.viewport.scrollAndZoomIntoView([frame])`
  - Error handling via try/catch.

**use_figma result:**
```json
{
  "result": "{\"success\":true,\"createdNodeIds\":[\"1:2\",\"1:3\",\"1:4\",\"1:5\",\"1:6\"],\"mainFrameId\":\"1:2\",\"mainFrameName\":\"OMP Test - 1440x900\",\"bounds\":{\"width\":1440,\"height\":900,\"x\":0,\"y\":0}}",
  "_meta": {"mcpRequestId": "e59bd3b1-6fed-40ea-8299-a2afa21f6bcf"}
}
```
Rincian node: Frame `1:2` (1440×900), Heading `1:3`, Paragraph `1:4`, Button Frame `1:5`, Button Text `1:6`. Tidak ada upload asset eksternal, tidak ada generative plugin/shader, tidak ada prototype interaction, tidak ada design system kompleks — sesuai batasan.

---

## Verification

- **Read-back successful:** **YES** — 4 tool read-only dipanggil pada `fileKey: htD39aOXiXsDKRGmKATTTg` tanpa write tambahan (session `20260924_175222_d79e63`, 165s wall time):

  1. **`get_metadata` (tanpa nodeId) — list pages:**
     ```
     Top-level pages of the document:
     - 0:1: Page 1
     ```
  2. **`get_metadata` (nodeId: 1:2) — verify frame + children:**
     ```xml
     <frame id="1:2" name="OMP Test - 1440x900" x="0" y="0" width="1440" height="900">
       <text id="1:3" name="Hello from OMP" x="537" y="364.5" width="366" height="58" />
       <text id="1:4" name="Figma MCP write capability test" x="585" y="446.5" width="270" height="22" />
       <frame id="1:5" name="Test Button" x="659" y="492.5" width="122" height="43">
         <text id="1:6" name="Test Button" x="16" y="12" width="90" height="19" />
       </frame>
     </frame>
     ```
     → Frame 1440×900 terkonfirmasi, 3 elemen + button text hadir dengan koordinat native.

  3. **`get_screenshot` (nodeId: 1:2, maxDimension: 1440):**
     ```json
     {
       "image_url": "https://www.figma.com/api/mcp/asset/aa10e20a-6c76-4c73-99d1-9df0f518e9d9.png",
       "width": 1440,
       "height": 900,
       "format": "png",
       "original_width": 1440,
       "original_height": 900
     }
     ```
     → Screenshot PNG 1440×900 berhasil, `original_width/height` = `width/height` (tidak ada clamping).

  4. **`get_design_context` (nodeId: 1:2)** — setelah load `skill://figma/figma-design-to-code/SKILL.md`:
     - Frame `data-node-id="1:2"` flex vertical centered padding 80
     - Heading 1:3 "Hello from OMP" Inter Bold 48px #111
     - Paragraph 1:4 "Figma MCP write capability test" Inter Regular 18px #555
     - Button Frame 1:5 bg #111 rounded 8px px16 py12
     - Button Text 1:6 "Test Button" Inter Semi Bold 16px #fff

- **Screenshot/read verification successful:** **YES** — screenshot metadata `width:1440 height:900` + XML metadata + design context ketiganya konsisten; file benar-benar ada dan dapat dibuka di `https://www.figma.com/design/htD39aOXiXsDKRGmKATTTg`.

---

## Safety

- **Existing Figma files modified:** **NO** — hanya 1 file baru `htD39aOXiXsDKRGmKATTTg` yang dibuat; file Harness `40j4sqzxa75EWULqvhMq4w/Harness-MCP-Testing` tidak disentuh (tidak ada `use_figma`/`upload_assets`/`generate_figma_design` ke file tersebut); tidak ada design existing yang diubah.
- **Existing Figma files deleted:** **NO** — tidak ada operasi delete; tidak ada tool `delete` yang dipanggil.
- **OMP configuration changed:** **NO** (selain Figma MCP yang sudah ada sejak tahap 1) — `C:\Users\hikari\AppData\Local\hermes\config.yaml` tetap `mcp_servers.figma: {url: https://mcp.figma.com/mcp, auth: oauth, enabled: true}`, tidak ada perubahan `model`/`providers` (`9router`/`ag/gemini-3-flash`), `agent`/`skills`/`platforms`. Verifikasi: `cat config.yaml:1-43` identical pre/post write.
- **Unrelated files changed:** **NO** — workspace `G:/Course LSM/UI-UX/` sebelum tahap ini hanya berisi `FIGMA_MCP_AUDIT_REPORT.md` (12.9 KB, tahap read-only); setelah tahap ini hanya bertambah file laporan ini. Tidak ada `upload_assets` eksternal, tidak ada generative plugin/shader, tidak ada prototype tugas kuliah yang dibuat.

Aturan lain yang dipatuhi: file name bukan nama tugas kuliah; hanya 1 file Figma dibuat; tidak delete; tidak ubah model/provider; tidak ada confirmation/authorization tambahan yang ter-block (semua tool auth via OAuth cached); test file tidak dihapus (retained).

---

## Final Status

**WRITE VERIFIED**

Figma MCP write capability terverifikasi end-to-end: `create_new_file` dan `use_figma` berfungsi, native Figma layers (frame 1440×900 + 2 text + button) berhasil dibuat dan diverifikasi via `get_metadata`/`get_screenshot`/`get_design_context`. Aman untuk dilanjutkan ke tahap berikutnya **hanya setelah instruksi Anda** — sesuai permintaan, BERHENTI di sini dan tidak membuat prototype peminjaman buku.

---

### Appendix — Evidence & Repro

```bash
hermes mcp list
# figma | https://mcp.figma.com/mcp | all | ✓ enabled
hermes mcp test figma
# ✓ Connected (1829ms)  ✓ Tools discovered: 40
# use_figma / create_new_file listed

# Langkah 2 — create_new_file
hermes chat -q "whoami + create_new_file fileName='OMP Figma MCP Write Test' planKey=team::1497223281060382937 editorType=design" --oneshot --quiet
# → file_key: htD39aOXiXsDKRGmKATTTg  file_url: https://www.figma.com/design/htD39aOXiXsDKRGmKATTTg

# Langkah 3 — use_figma (load skill://figma/figma-use/SKILL.md first)
# fileKey: htD39aOXiXsDKRGmKATTTg
# → {"success":true,"createdNodeIds":["1:2","1:3","1:4","1:5","1:6"],"mainFrameId":"1:2","bounds":{"width":1440,"height":900}}

# Langkah 4 — verification (read-only)
# get_metadata fileKey=htD39aOXiXsDKRGmKATTTg → Page 1 (0:1)
# get_metadata fileKey=htD39aOXiXsDKRGmKATTTg nodeId=1:2 → <frame 1440x900> with 3 children
# get_screenshot fileKey=htD39aOXiXsDKRGmKATTTg nodeId=1:2 maxDimension=1440 → 1440x900 png
# get_design_context fileKey=htD39aOXiXsDKRGmKATTTg nodeId=1:2 → heading/paragraph/button confirmed
```

**Files in workspace after this stage:**
- `G:/Course LSM/UI-UX/FIGMA_MCP_AUDIT_REPORT.md` — read-only integration report (tahap 1)
- `G:/Course LSM/UI-UX/FIGMA_MCP_WRITE_TEST_REPORT.md` — this report (tahap 2)

**Figma files:**
- Created (test, retained): `https://www.figma.com/design/htD39aOXiXsDKRGmKATTTg` — OMP Figma MCP Write Test
- Harness (untouched): `https://www.figma.com/design/40j4sqzxa75EWULqvhMq4w/Harness-MCP-Testing`
