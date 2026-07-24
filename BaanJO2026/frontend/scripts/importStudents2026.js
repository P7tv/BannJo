import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const runImport = () => {
  console.log("📥 กำลังดึงข้อมูลจาก Google Sheets (ทุก Sheet Tabs) และเข้ารหัสแบบเรียลไทม์...");
  
  const pythonScript = `
import urllib.request, zipfile, xml.etree.ElementTree as ET, io, json, re, hashlib, os
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.ciphers.aead import AESGCM

sheet_id = '11105pcsauP4cib6c9LfvTKjF2DMYqkQEMOyvHJydS-o'
export_url = f'https://docs.google.com/spreadsheets/d/{sheet_id}/export?format=xlsx'

req = urllib.request.Request(export_url, headers={'User-Agent': 'Mozilla/5.0'})
content = urllib.request.urlopen(req).read()
zf = zipfile.ZipFile(io.BytesIO(content))

shared_strings = []
if 'xl/sharedStrings.xml' in zf.namelist():
    ss_xml = zf.read('xl/sharedStrings.xml').decode('utf-8')
    ss_root = ET.fromstring(ss_xml)
    ns = {'main': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
    for si in ss_root.findall('.//main:si', ns):
        t = si.find('.//main:t', ns)
        shared_strings.append(t.text if t is not None and t.text else '')

wb_xml = zf.read('xl/workbook.xml').decode('utf-8')
root = ET.fromstring(wb_xml)
ns = {'main': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
sheets = root.findall('.//main:sheet', ns)

rels_xml = zf.read('xl/_rels/workbook.xml.rels').decode('utf-8')
rels_root = ET.fromstring(rels_xml)
rel_map = {r.attrib['Id']: r.attrib['Target'] for r in rels_root.findall('{http://schemas.openxmlformats.org/package/2006/relationships}Relationship')}

def get_sheet_rows(sheet_elem):
    rId = sheet_elem.attrib.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id')
    filename = 'xl/' + rel_map[rId]
    s_xml = zf.read(filename).decode('utf-8')
    s_root = ET.fromstring(s_xml)
    parsed_rows = []
    for r in s_root.findall('.//main:row', ns):
        row_vals = {}
        for c in r.findall('.//main:c', ns):
            col_ref = c.attrib.get('r', '')
            col_letter = ''.join([ch for ch in col_ref if ch.isalpha()])
            val_elem = c.find('./main:v', ns)
            val = val_elem.text if val_elem is not None else ''
            t_attr = c.attrib.get('t')
            if t_attr == 's' and val.isdigit():
                idx = int(val)
                val = shared_strings[idx] if idx < len(shared_strings) else val
            row_vals[col_letter] = str(val).strip()
        parsed_rows.append(row_vals)
    return parsed_rows

character_map = {
    'Kudo shinichi': 'Shiniji',
    'Conan': 'Conan',
    'Mori Ran': 'Ran',
    'Mori kogoro': 'Kogoro',
    'Kid': 'Kid',
    'Hibara': 'Haibara'
}

group_assignments = {}
for s in sheets:
    title = s.attrib.get('name')
    if title not in character_map: continue
    hormone = character_map[title]
    rows = get_sheet_rows(s)
    col_to_house = {'A': 'CID', 'D': 'CIA', 'G': 'FBI', 'J': 'DSI', 'M': 'MI6'}
    for r in rows[2:]:
        for nick_col, group in col_to_house.items():
            nick = r.get(nick_col, '')
            if not nick: continue
            fac_col = chr(ord(nick_col) + 1)
            fac = r.get(fac_col, '')
            group_assignments[(nick, fac)] = (group, hormone)
            group_assignments[nick] = (group, hormone)

master_rows = get_sheet_rows(sheets[0])
SALT = b'BaanJO2026Salt'

def derive_key(phone_str):
    kdf = PBKDF2HMAC(algorithm=hashes.SHA256(), length=32, salt=SALT, iterations=1000)
    return kdf.derive(phone_str.encode('utf-8'))

def encrypt_student_py(phone_str, student_dict):
    key = derive_key(phone_str)
    aesgcm = AESGCM(key)
    iv = os.urandom(12)
    payload_bytes = json.dumps(student_dict, ensure_ascii=False).encode('utf-8')
    ciphertext = aesgcm.encrypt(iv, payload_bytes, None)
    return {'iv': iv.hex(), 'data': ciphertext.hex()}

def normalize_phone(phone_raw):
    s = re.sub(r'\\D', '', str(phone_raw))
    if len(s) == 9 and not s.startswith('0'): s = '0' + s
    if 'E' in str(phone_raw).upper():
        try:
            f = float(phone_raw)
            s = f'0{int(f)}' if len(str(int(f))) == 9 else str(int(f))
        except: pass
    return s

final_student_map = {}
house_stats = {'CIA': 0, 'CID': 0, 'DSI': 0, 'FBI': 0, 'MI6': 0}

for idx, r in enumerate(master_rows[1:], 1):
    code = r.get('B', f'BJ{idx}')
    first_name = r.get('C', '')
    last_name = r.get('D', '')
    nickname = r.get('E', '')
    faculty = r.get('F', '')
    phone_raw = r.get('G', '')
    tel = normalize_phone(phone_raw)
    if not tel: continue
    
    assignment = group_assignments.get((nickname, faculty)) or group_assignments.get(nickname) or ('CIA', 'Conan')
    group, hormone = assignment
    student_data = {'code': code, 'titleName': 'คุณ', 'firstName': first_name, 'lastName': last_name, 'nickname': nickname, 'group': group, 'hormone': hormone, 'faculty': faculty, 'tel': tel}
    phone_hash = hashlib.sha256(tel.encode('utf-8')).hexdigest()
    final_student_map[phone_hash] = encrypt_student_py(tel, student_data)
    house_stats[group] = house_stats.get(group, 0) + 1

output_path = os.path.join(os.getcwd(), 'constants', 'students.json')
with open(output_path, 'w', encoding='utf-8') as f:
    json.dump(final_student_map, f, ensure_ascii=False, indent=2)

print("=========================================")
print("🎉 ดึงข้อมูลทุก Sheet Tab และเข้ารหัสลับสำเร็จเรียบร้อย!")
print(f"💾 บันทึกลงใน: {output_path}")
print(f"📊 จำนวนนิสิตทั้งหมด: {len(final_student_map)} คน")
print("-----------------------------------------")
print("🏠 สถิตินิสิตแยกตามกลุ่มบ้าน (2026 Houses):")
for h, count in house_stats.items():
    print(f"   - {h}: {count} คน")
print("=========================================\\n")
`;

  try {
    const output = execSync(`python3 -c "${pythonScript.replace(/"/g, '\\"')}"`, { encoding: "utf-8" });
    console.log(output);
  } catch (err) {
    console.error("❌ เกิดข้อผิดพลาดในการดึงข้อมูล:", err.message);
  }
};

runImport();
