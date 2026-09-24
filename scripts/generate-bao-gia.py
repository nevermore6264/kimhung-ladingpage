"""Sinh file Word + Excel báo giá freelancer gửi khách."""

from pathlib import Path

from docx import Document
from docx.enum.table import WD_CELL_VERTICAL_ALIGNMENT, WD_TABLE_ALIGNMENT
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Cm, Pt, RGBColor
from openpyxl import Workbook
from openpyxl.chart import PieChart, Reference
from openpyxl.chart.label import DataLabelList
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.utils import get_column_letter

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "docs"
OUT.mkdir(exist_ok=True)

NAVY = RGBColor(0x10, 0x2A, 0x43)
SKY = RGBColor(0x0E, 0xA5, 0xE9)
WHITE = RGBColor(0xFF, 0xFF, 0xFF)
INK = RGBColor(0x1E, 0x29, 0x3B)
MUTED = RGBColor(0x64, 0x74, 0x8B)
PALE = RGBColor(0xCB, 0xD5, 0xE1)

NAVY_HEX = "102A43"
SKY_HEX = "0EA5E9"
HEAD_HEX = "F1F5F9"
ROW_HEX = "F8FAFC"
LINE_HEX = "CBD5E1"
SOFT_HEX = "E2E8F0"
TOTAL_HEX = "DBEAFE"

QUOTE_NO = "BG/KH/2026/01"
QUOTE_DATE = "23/09/2026"
FONT = "Times New Roman"

LINE = Side(style="thin", color="CBD5E1")
BOX = Border(left=LINE, right=LINE, top=LINE, bottom=LINE)
MONEY = "#,##0"


def set_run(run, size=11, bold=False, color=INK, font=FONT, italic=False):
    run.font.name = font
    rPr = run._element.get_or_add_rPr()
    rFonts = rPr.find(qn("w:rFonts"))
    if rFonts is None:
        rFonts = OxmlElement("w:rFonts")
        rPr.append(rFonts)
    rFonts.set(qn("w:ascii"), font)
    rFonts.set(qn("w:hAnsi"), font)
    rFonts.set(qn("w:eastAsia"), font)
    rFonts.set(qn("w:cs"), font)
    run.font.size = Pt(size)
    run.bold = bold
    run.italic = italic
    run.font.color.rgb = color


def add_p(doc, text, size=11, bold=False, color=INK, align="left", space=6, before=0, italic=False):
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(space)
    p.paragraph_format.space_before = Pt(before)
    p.paragraph_format.line_spacing = 1.15
    if align == "center":
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    elif align == "right":
        p.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    elif align == "justify":
        p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    run = p.add_run(text)
    set_run(run, size=size, bold=bold, color=color, italic=italic)
    return p


def shade_cell(cell, hex_color):
    tcPr = cell._tc.get_or_add_tcPr()
    for old in tcPr.findall(qn("w:shd")):
        tcPr.remove(old)
    shd = OxmlElement("w:shd")
    shd.set(qn("w:fill"), hex_color)
    shd.set(qn("w:val"), "clear")
    tcPr.append(shd)


def set_cell_margins(cell, top=70, bottom=70, left=90, right=90):
    tcPr = cell._tc.get_or_add_tcPr()
    for old in tcPr.findall(qn("w:tcMar")):
        tcPr.remove(old)
    tcMar = OxmlElement("w:tcMar")
    for edge, val in (("top", top), ("left", left), ("bottom", bottom), ("right", right)):
        node = OxmlElement(f"w:{edge}")
        node.set(qn("w:w"), str(val))
        node.set(qn("w:type"), "dxa")
        tcMar.append(node)
    tcPr.append(tcMar)


def set_row_height(row, twips, rule="atLeast"):
    trPr = row._tr.get_or_add_trPr()
    for old in trPr.findall(qn("w:trHeight")):
        trPr.remove(old)
    h = OxmlElement("w:trHeight")
    h.set(qn("w:val"), str(twips))
    h.set(qn("w:hRule"), rule)
    trPr.append(h)


def set_table_width(table, cm):
    table.autofit = False
    tbl = table._tbl
    tblPr = tbl.tblPr
    if tblPr is None:
        tblPr = OxmlElement("w:tblPr")
        tbl.insert(0, tblPr)
    for old in tblPr.findall(qn("w:tblW")):
        tblPr.remove(old)
    tblW = OxmlElement("w:tblW")
    tblW.set(qn("w:w"), str(int(cm * 567)))
    tblW.set(qn("w:type"), "dxa")
    tblPr.append(tblW)
    for tag in ("w:tblCellSpacing", "w:tblInd"):
        for old in tblPr.findall(qn(tag)):
            tblPr.remove(old)
    spacing = OxmlElement("w:tblCellSpacing")
    spacing.set(qn("w:w"), "0")
    spacing.set(qn("w:type"), "dxa")
    tblPr.append(spacing)


def set_table_borders(table, color=LINE_HEX, sz="4"):
    tbl = table._tbl
    tblPr = tbl.tblPr
    if tblPr is None:
        tblPr = OxmlElement("w:tblPr")
        tbl.insert(0, tblPr)
    for old in tblPr.findall(qn("w:tblBorders")):
        tblPr.remove(old)
    borders = OxmlElement("w:tblBorders")
    val = "single" if sz != "0" else "nil"
    for edge in ("top", "left", "bottom", "right", "insideH", "insideV"):
        el = OxmlElement(f"w:{edge}")
        el.set(qn("w:val"), val)
        el.set(qn("w:sz"), sz)
        el.set(qn("w:space"), "0")
        el.set(qn("w:color"), color)
        borders.append(el)
    tblPr.append(borders)


def hide_borders(table):
    set_table_borders(table, sz="0")


def set_cell_border(cell, **edges):
    tcPr = cell._tc.get_or_add_tcPr()
    tcBorders = tcPr.find(qn("w:tcBorders"))
    if tcBorders is None:
        tcBorders = OxmlElement("w:tcBorders")
        tcPr.append(tcBorders)
    for edge, spec in edges.items():
        val, sz, color = spec
        el = tcBorders.find(qn(f"w:{edge}"))
        if el is None:
            el = OxmlElement(f"w:{edge}")
            tcBorders.append(el)
        el.set(qn("w:val"), val)
        el.set(qn("w:sz"), sz)
        el.set(qn("w:space"), "0")
        el.set(qn("w:color"), color)


def apply_widths(table, widths):
    for row in table.rows:
        for i, w in enumerate(widths):
            row.cells[i].width = Cm(w)


def cell_p(cell, text, size=10.5, bold=False, color=INK, align="left", space=2, italic=False, clear=False):
    if clear or not cell.paragraphs[0].text:
        p = cell.paragraphs[0]
        p.text = ""
    else:
        p = cell.add_paragraph()
    p.paragraph_format.space_after = Pt(space)
    p.paragraph_format.space_before = Pt(0)
    p.paragraph_format.line_spacing = 1.08
    if align == "center":
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    elif align == "right":
        p.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    run = p.add_run(str(text))
    set_run(run, size=size, bold=bold, color=color, italic=italic)
    return p


def set_cell_text(cell, text, bold=False, color=INK, size=10.5, align="left"):
    cell.text = ""
    cell.vertical_alignment = WD_CELL_VERTICAL_ALIGNMENT.CENTER
    set_cell_margins(cell)
    cell_p(cell, text, size=size, bold=bold, color=color, align=align, space=0, clear=True)


def add_table(doc, headers, rows, col_widths, money_cols=(), center_cols=()):
    table = doc.add_table(rows=1 + len(rows), cols=len(headers))
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_width(table, sum(col_widths))
    set_table_borders(table, color=LINE_HEX, sz="4")
    apply_widths(table, col_widths)
    for i, h in enumerate(headers):
        cell = table.rows[0].cells[i]
        set_cell_text(cell, h, bold=True, color=WHITE, size=10, align="center")
        shade_cell(cell, NAVY_HEX)
        set_cell_margins(cell, 80, 80, 80, 80)
    for r, row in enumerate(rows):
        last = r == len(rows) - 1
        for c, val in enumerate(row):
            cell = table.rows[r + 1].cells[c]
            if c in money_cols:
                align = "right"
            elif c in center_cols:
                align = "center"
            else:
                align = "left"
            set_cell_text(cell, val, bold=last, align=align, size=10.5)
            if last:
                shade_cell(cell, TOTAL_HEX)
            elif r % 2 == 1:
                shade_cell(cell, ROW_HEX)
    return table


def section_title(doc, number, title):
    table = doc.add_table(rows=1, cols=2)
    set_table_width(table, 17.4)
    hide_borders(table)
    apply_widths(table, [0.7, 16.7])
    num = table.rows[0].cells[0]
    label = table.rows[0].cells[1]
    set_cell_margins(num, 40, 40, 40, 40)
    set_cell_margins(label, 40, 60, 80, 40)
    num.vertical_alignment = WD_CELL_VERTICAL_ALIGNMENT.CENTER
    label.vertical_alignment = WD_CELL_VERTICAL_ALIGNMENT.CENTER
    shade_cell(num, NAVY_HEX)
    cell_p(num, number, size=11, bold=True, color=WHITE, align="center", space=0, clear=True)
    cell_p(label, title, size=13, bold=True, color=NAVY, space=0, clear=True)
    set_cell_border(label, bottom=("single", "12", SKY_HEX))
    add_p(doc, "", size=6, space=6)
    return table


def add_page_field(paragraph, kind="PAGE"):
    run = paragraph.add_run()
    begin = OxmlElement("w:fldChar")
    begin.set(qn("w:fldCharType"), "begin")
    instr = OxmlElement("w:instrText")
    instr.set(qn("xml:space"), "preserve")
    instr.text = f" {kind} "
    end = OxmlElement("w:fldChar")
    end.set(qn("w:fldCharType"), "end")
    run._r.append(begin)
    run._r.append(instr)
    run._r.append(end)
    set_run(run, size=8.5, color=MUTED)


def add_para_border(paragraph, edge="bottom", color=NAVY_HEX, sz="12", space="4"):
    pBdr = OxmlElement("w:pBdr")
    el = OxmlElement(f"w:{edge}")
    el.set(qn("w:val"), "single")
    el.set(qn("w:sz"), sz)
    el.set(qn("w:space"), space)
    el.set(qn("w:color"), color)
    pBdr.append(el)
    paragraph._p.get_or_add_pPr().append(pBdr)


def setup_header_footer(section):
    section.different_first_page_header_footer = True
    section.header_distance = Cm(0.7)
    section.footer_distance = Cm(0.7)

    first_header = section.first_page_header
    first_header.is_linked_to_previous = False
    first_header.paragraphs[0].text = ""

    header = section.header
    header.is_linked_to_previous = False
    hp = header.paragraphs[0]
    hp.alignment = WD_ALIGN_PARAGRAPH.LEFT
    hp.paragraph_format.space_after = Pt(4)
    r = hp.add_run("BÁO GIÁ DỊCH VỤ  ·  Công ty TNHH Đầu tư & Phát triển Kim Hưng")
    set_run(r, size=8.5, bold=True, color=NAVY)
    r2 = hp.add_run(f"          Số {QUOTE_NO}  ·  {QUOTE_DATE}")
    set_run(r2, size=8.5, color=MUTED)
    add_para_border(hp, "bottom", NAVY_HEX, "12", "4")

    for footer in (section.footer, section.first_page_footer):
        footer.is_linked_to_previous = False
        fp = footer.paragraphs[0]
        fp.text = ""
        fp.alignment = WD_ALIGN_PARAGRAPH.LEFT
        fp.paragraph_format.space_before = Pt(4)
        add_para_border(fp, "top", SOFT_HEX, "6", "6")
        r = fp.add_run("Trần Trung Hiếu  ·  0862 478 150  ·  hieupikas2606@gmail.com")
        set_run(r, size=8.5, color=MUTED)
        r = fp.add_run("                    Trang ")
        set_run(r, size=8.5, color=MUTED)
        add_page_field(fp, "PAGE")
        r = fp.add_run(" / ")
        set_run(r, size=8.5, color=MUTED)
        add_page_field(fp, "NUMPAGES")


def build_letterhead(doc):
    table = doc.add_table(rows=1, cols=3)
    set_table_width(table, 17.4)
    hide_borders(table)
    apply_widths(table, [1.6, 9.6, 6.2])
    set_row_height(table.rows[0], 1100, "atLeast")

    mark, info, meta = table.rows[0].cells
    for cell in (mark, info, meta):
        shade_cell(cell, NAVY_HEX)
        cell.vertical_alignment = WD_CELL_VERTICAL_ALIGNMENT.CENTER

    set_cell_margins(mark, 80, 80, 60, 40)
    set_cell_margins(info, 100, 100, 80, 80)
    set_cell_margins(meta, 100, 100, 80, 140)

    cell_p(mark, "TTH", size=14, bold=True, color=SKY, align="center", space=0, clear=True)
    cell_p(info, "TRẦN TRUNG HIẾU", size=14, bold=True, color=WHITE, space=1, clear=True)
    cell_p(info, "Làm website  ·  Đưa lên Google  ·  Máy chủ", size=9.5, color=SKY, space=2)
    cell_p(info, "0862 478 150   ·   hieupikas2606@gmail.com", size=9, color=PALE, space=0)

    cell_p(meta, "BÁO GIÁ SỐ", size=8, bold=True, color=SKY, align="right", space=1, clear=True)
    cell_p(meta, QUOTE_NO, size=13, bold=True, color=WHITE, align="right", space=1)
    cell_p(meta, f"Ngày {QUOTE_DATE}  ·  Hiệu lực 15 ngày", size=8.5, color=PALE, align="right", space=0)

    accent = doc.add_table(rows=1, cols=1)
    set_table_width(accent, 17.4)
    hide_borders(accent)
    apply_widths(accent, [17.4])
    set_row_height(accent.rows[0], 80, "exact")
    shade_cell(accent.rows[0].cells[0], SKY_HEX)
    set_cell_margins(accent.rows[0].cells[0], 0, 0, 0, 0)
    cell_p(accent.rows[0].cells[0], "", size=4, space=0, clear=True)


def party_line(cell, label, value, first=False):
    p = cell.paragraphs[0] if first else cell.add_paragraph()
    if first:
        p.text = ""
    p.paragraph_format.space_after = Pt(3)
    p.paragraph_format.space_before = Pt(0)
    r1 = p.add_run(label)
    set_run(r1, size=9, bold=True, color=MUTED)
    r2 = p.add_run(value)
    set_run(r2, size=10.5, color=INK)


def build_parties(doc):
    table = doc.add_table(rows=2, cols=2)
    set_table_width(table, 17.4)
    set_table_borders(table, color=SOFT_HEX, sz="4")
    apply_widths(table, [8.7, 8.7])
    set_row_height(table.rows[0], 360, "atLeast")

    a_h, b_h = table.rows[0].cells
    a_b, b_b = table.rows[1].cells
    for cell, title in ((a_h, "BÊN A  —  NGƯỜI LÀM"), (b_h, "BÊN B  —  KHÁCH HÀNG")):
        shade_cell(cell, NAVY_HEX)
        set_cell_margins(cell, 70, 70, 100, 100)
        cell.vertical_alignment = WD_CELL_VERTICAL_ALIGNMENT.CENTER
        cell_p(cell, title, size=10, bold=True, color=WHITE, align="center", space=0, clear=True)

    for cell in (a_b, b_b):
        shade_cell(cell, ROW_HEX)
        set_cell_margins(cell, 100, 110, 120, 120)
        cell.vertical_alignment = WD_CELL_VERTICAL_ALIGNMENT.TOP

    party_line(a_b, "Họ tên     ", "Trần Trung Hiếu", first=True)
    party_line(a_b, "Điện thoại     ", "0862 478 150")
    party_line(a_b, "Email     ", "hieupikas2606@gmail.com")
    party_line(a_b, "Địa chỉ     ", "FPT Complex, Nam Kỳ Khởi Nghĩa,")
    p = a_b.add_paragraph()
    p.paragraph_format.space_after = Pt(0)
    r = p.add_run("Ngũ Hành Sơn, Đà Nẵng")
    set_run(r, size=10.5, color=INK)

    party_line(b_b, "Đơn vị     ", "Công ty TNHH Đầu tư &", first=True)
    p = b_b.add_paragraph()
    p.paragraph_format.space_after = Pt(3)
    r = p.add_run("Phát triển Kim Hưng")
    set_run(r, size=10.5, bold=True, color=INK)
    party_line(b_b, "Trang mẫu     ", "kimhung.vn/que-thu-ma-tuy/")
    party_line(b_b, "Hạng mục     ", "Website, Google, máy chủ 12 tháng")
    party_line(b_b, "Tiền tệ     ", "Việt Nam Đồng (VNĐ)")


def build_total_banner(doc):
    table = doc.add_table(rows=1, cols=2)
    set_table_width(table, 17.4)
    hide_borders(table)
    apply_widths(table, [10.4, 7.0])
    set_row_height(table.rows[0], 900, "atLeast")

    left, right = table.rows[0].cells
    shade_cell(left, NAVY_HEX)
    shade_cell(right, SKY_HEX)
    left.vertical_alignment = WD_CELL_VERTICAL_ALIGNMENT.CENTER
    right.vertical_alignment = WD_CELL_VERTICAL_ALIGNMENT.CENTER
    set_cell_margins(left, 120, 120, 160, 120)
    set_cell_margins(right, 100, 100, 80, 120)

    cell_p(left, "TỔNG GIÁ TRỊ NĂM 1", size=9, bold=True, color=SKY, space=2, clear=True)
    cell_p(
        left,
        "Website 8 triệu  ·  Google 3 triệu/tháng  ·  Máy chủ ~300 nghìn/tháng",
        size=9,
        color=WHITE,
        space=0,
    )
    cell_p(right, "48.000.000 đ", size=20, bold=True, color=WHITE, align="right", space=0, clear=True)
    cell_p(right, "Báo khách: 48 triệu", size=9, color=WHITE, align="right", space=0)


def build_docx():
    doc = Document()
    normal = doc.styles["Normal"]
    normal.font.name = FONT
    normal.font.size = Pt(11)
    normal.font.color.rgb = INK
    rPr = normal.element.get_or_add_rPr()
    rFonts = rPr.find(qn("w:rFonts"))
    if rFonts is None:
        rFonts = OxmlElement("w:rFonts")
        rPr.append(rFonts)
    rFonts.set(qn("w:ascii"), FONT)
    rFonts.set(qn("w:hAnsi"), FONT)
    rFonts.set(qn("w:eastAsia"), FONT)

    for section in doc.sections:
        section.page_width = Cm(21.0)
        section.page_height = Cm(29.7)
        section.top_margin = Cm(1.4)
        section.bottom_margin = Cm(1.6)
        section.left_margin = Cm(1.8)
        section.right_margin = Cm(1.8)
        setup_header_footer(section)

    build_letterhead(doc)
    add_p(doc, "", size=8, space=10)
    add_p(doc, "BÁO GIÁ CUNG CẤP DỊCH VỤ", 18, True, NAVY, "center", 2)
    add_p(
        doc,
        "Làm website bán hàng  ·  Đưa website lên Google  ·  Thuê máy chủ 12 tháng",
        11,
        False,
        SKY,
        "center",
        2,
    )
    add_p(
        doc,
        "Kính gửi: Công ty TNHH Đầu tư & Phát triển Kim Hưng",
        11,
        True,
        INK,
        "center",
        10,
    )

    build_parties(doc)
    add_p(doc, "", size=6, space=10)
    build_total_banner(doc)
    add_p(doc, "", size=6, space=12)

    section_title(doc, "01", "Bảng giá năm 1")
    add_table(
        doc,
        ["STT", "Khoản mục", "Thành tiền", "Ghi chú"],
        [
            [
                "1",
                "Làm website (2–3 tuần)",
                "8.000.000",
                "Xem đẹp trên điện thoại. Có danh sách sản phẩm, bài hướng dẫn ngắn, ô gửi yêu cầu liên hệ.",
            ],
            [
                "2",
                "Thuê máy chủ 12 tháng",
                "3.600.000",
                "Website chạy ổn định, khoảng 300.000đ mỗi tháng.",
            ],
            [
                "3",
                "Đưa website lên Google × 12 tháng",
                "36.000.000",
                "3.000.000đ/tháng: viết bài, chỉnh trang cho Google dễ tìm, gửi báo cáo.",
            ],
            ["", "TỔNG CỘNG NĂM 1", "48.000.000", "Báo khách: bốn mươi tám triệu đồng"],
        ],
        [1.2, 5.4, 3.0, 7.8],
        money_cols={2},
        center_cols={0},
    )
    add_p(
        doc,
        "Năm 2 (không còn tiền làm website): khoảng 3.300.000đ/tháng — Google 3.000.000đ + máy chủ 300.000đ.",
        10,
        False,
        MUTED,
        space=12,
        before=6,
        italic=True,
    )

    section_title(doc, "02", "Phạm vi làm website — 8.000.000đ")
    scope = doc.add_table(rows=6, cols=2)
    set_table_width(scope, 17.4)
    set_table_borders(scope, color=SOFT_HEX, sz="4")
    apply_widths(scope, [0.8, 16.6])
    items = [
        "Xem đẹp, dễ bấm trên điện thoại. Có nút Gọi và Zalo.",
        "Các trang: trang chủ, giới thiệu, dịch vụ, tin tức, liên hệ.",
        "Danh sách sản phẩm và trang từng sản phẩm (ảnh, giá, nút gửi yêu cầu).",
        "Một bài hướng dẫn ngắn về que thử ma túy (gọn, không viết dài như trang mẫu).",
        "Ô điền họ tên, số điện thoại, nội dung — gửi yêu cầu tư vấn.",
        "Giao lại website và hướng dẫn sử dụng.",
    ]
    for i, text in enumerate(items):
        n, t = scope.rows[i].cells
        shade_cell(n, NAVY_HEX if i % 2 == 0 else "1B3A4B")
        shade_cell(t, "FFFFFF" if i % 2 == 0 else ROW_HEX)
        set_cell_margins(n, 60, 60, 40, 40)
        set_cell_margins(t, 60, 60, 120, 80)
        n.vertical_alignment = WD_CELL_VERTICAL_ALIGNMENT.CENTER
        t.vertical_alignment = WD_CELL_VERTICAL_ALIGNMENT.CENTER
        cell_p(n, str(i + 1).zfill(2), size=10, bold=True, color=WHITE, align="center", space=0, clear=True)
        cell_p(t, text, size=10.5, color=INK, space=0, clear=True)
    add_p(
        doc,
        "Không gồm: thanh toán online, ứng dụng điện thoại, quay video, chạy quảng cáo Google.",
        10,
        False,
        MUTED,
        space=12,
        before=6,
        italic=True,
    )

    section_title(doc, "03", "Máy chủ — 3.600.000đ / năm")
    add_table(
        doc,
        ["Hạng mục", "Thành tiền", "Ghi chú"],
        [
            ["Thuê máy chủ × 12 tháng", "3.600.000", "Khoảng 300.000đ/tháng. Website chạy 24/7."],
            ["Chứng chỉ bảo mật (https)", "0", "Đã gồm trong gói máy chủ."],
            ["Tên miền kimhung.vn", "0", "Khách tự giữ — không tính vào báo giá."],
            ["CỘNG MÁY CHỦ", "3.600.000", "Khách tự thuê máy chủ thì trừ 3.600.000đ."],
        ],
        [6.2, 3.2, 8.0],
        money_cols={1},
    )
    add_p(doc, "", size=6, space=10)

    section_title(doc, "04", "Đưa website lên Google — 3.000.000đ / tháng")
    add_p(
        doc,
        "Mỗi tháng viết 3 bài, chỉnh trang cho Google dễ tìm thấy, gửi báo cáo. Không chạy quảng cáo. Không hứa đứng số 1 với từ “que thử ma túy” ngay năm đầu — năm đầu nhắm trang 1 Google (top 10).",
        11,
        False,
        INK,
        "justify",
        8,
    )
    add_p(doc, "Bốn từ khóa làm trong năm", 11, True, NAVY, space=6)
    kws = [
        ("01", "cách dùng que thử ma túy"),
        ("02", "que thử ma túy 5 chân"),
        ("03", "que thử ma túy đá"),
        ("04", "đọc kết quả que thử 1 vạch 2 vạch"),
    ]
    grid = doc.add_table(rows=2, cols=2)
    set_table_width(grid, 17.4)
    set_table_borders(grid, color=SOFT_HEX, sz="4")
    apply_widths(grid, [8.7, 8.7])
    for i, (num, kw) in enumerate(kws):
        cell = grid.rows[i // 2].cells[i % 2]
        shade_cell(cell, ROW_HEX)
        set_cell_margins(cell, 80, 80, 120, 80)
        cell.vertical_alignment = WD_CELL_VERTICAL_ALIGNMENT.CENTER
        p = cell.paragraphs[0]
        p.text = ""
        r1 = p.add_run(f"{num}   ")
        set_run(r1, size=10, bold=True, color=SKY)
        r2 = p.add_run(kw)
        set_run(r2, size=11, color=INK)

    add_p(doc, "", size=6, space=8)
    add_p(doc, "Mốc cam kết", 11, True, NAVY, space=6)
    add_table(
        doc,
        ["Mốc", "Mục tiêu"],
        [
            ["Tháng 3", "Google đã thấy website. Ít nhất 2 từ khóa vào trang 1."],
            ["Tháng 6", "3/4 từ khóa vào trang 1. Ít nhất 1 từ vào top 5."],
            ["Tháng 12", "2/4 từ khóa vào top 5. Các từ còn lại ở trang 1."],
        ],
        [3.4, 14.0],
    )
    add_p(doc, "", size=6, space=10)

    section_title(doc, "05", "Lịch thanh toán")
    add_table(
        doc,
        ["Đợt", "Số tiền", "Nội dung"],
        [
            ["Tháng 1", "10.600.000", "Nửa tiền website (4.000.000) + Google 3.000.000 + máy chủ 3.600.000"],
            ["Tháng 2", "7.000.000", "Nửa tiền website còn lại + Google 3.000.000"],
            ["Tháng 3–12", "3.000.000 / tháng", "Đưa lên Google + sửa nhỏ website"],
            ["CẢ NĂM", "48.000.000", "Bằng chữ: bốn mươi tám triệu đồng"],
        ],
        [3.4, 4.0, 10.0],
        money_cols={1},
    )
    add_p(doc, "", size=6, space=10)

    section_title(doc, "06", "Điều khoản")
    terms = [
        "Báo giá có hiệu lực 15 ngày kể từ ngày ban hành.",
        "Tiền làm website: trả một nửa khi bắt đầu, một nửa khi website lên mạng.",
        "Phí đưa lên Google trả vào đầu mỗi tháng. Trễ 15 ngày có thể tạm dừng công việc.",
        "Website thuộc về khách khi đã thanh toán đủ.",
        "Khách cung cấp ảnh sản phẩm, giấy tờ, số điện thoại và nội dung cần đăng.",
    ]
    for i, item in enumerate(terms, 1):
        p = doc.add_paragraph()
        p.paragraph_format.space_after = Pt(4)
        p.paragraph_format.space_before = Pt(0)
        p.paragraph_format.left_indent = Cm(0.15)
        r1 = p.add_run(f"{i}.  ")
        set_run(r1, size=11, bold=True, color=SKY)
        r2 = p.add_run(item)
        set_run(r2, size=11, color=INK)

    add_p(doc, "", size=8, space=16)
    add_p(doc, "Đà Nẵng, ngày 23 tháng 09 năm 2026", 11, False, INK, "right", 4, italic=True)
    add_p(
        doc,
        "Hai bên thống nhất nội dung báo giá và ký xác nhận dưới đây.",
        10.5,
        False,
        MUTED,
        "center",
        10,
    )

    sign = doc.add_table(rows=4, cols=2)
    set_table_width(sign, 17.4)
    hide_borders(sign)
    apply_widths(sign, [8.7, 8.7])
    set_row_height(sign.rows[3], 1600, "atLeast")

    heads = (
        (0, "BÊN A", "Người thực hiện", "TRẦN TRUNG HIẾU"),
        (1, "BÊN B", "Đại diện khách hàng", "CÔNG TY TNHH ĐẦU TƯ &\nPHÁT TRIỂN KIM HƯNG"),
    )
    for col, role, role2, name in heads:
        c0 = sign.rows[0].cells[col]
        c1 = sign.rows[1].cells[col]
        c2 = sign.rows[2].cells[col]
        c3 = sign.rows[3].cells[col]
        for c in (c0, c1, c2, c3):
            set_cell_margins(c, 40, 40, 80, 80)
            c.vertical_alignment = WD_CELL_VERTICAL_ALIGNMENT.CENTER
        cell_p(c0, role, size=11, bold=True, color=NAVY, align="center", space=0, clear=True)
        cell_p(c1, role2, size=9.5, color=MUTED, align="center", space=0, italic=True, clear=True)
        for i, line in enumerate(name.split("\n")):
            cell_p(c2, line, size=11, bold=True, color=INK, align="center", space=0, clear=(i == 0))
        cell_p(c3, "\n\n\nKý và ghi rõ họ tên", size=9.5, color=MUTED, align="center", italic=True, space=0, clear=True)

    path = OUT / "Bao-gia-Kim-Hung-Website-SEO-2026.docx"
    doc.save(path)
    return path


def style_header(ws, row, cols):
    fill = PatternFill("solid", fgColor=NAVY_HEX)
    font = Font(bold=True, color="FFFFFF", name="Calibri", size=11)
    for c in range(1, cols + 1):
        cell = ws.cell(row, c)
        cell.fill = fill
        cell.font = font
        cell.alignment = Alignment(horizontal="center", vertical="center", wrap_text=True)
        cell.border = BOX


def paint(ws, row, col, value, bold=False, money=False, fill=None, center=False):
    cell = ws.cell(row, col, value)
    cell.font = Font(bold=bold, name="Calibri", size=11, color=NAVY_HEX)
    cell.border = BOX
    cell.alignment = Alignment(
        horizontal="center" if center else ("right" if money else "left"),
        vertical="center",
        wrap_text=True,
    )
    if money and not isinstance(value, str):
        cell.number_format = MONEY
    if fill:
        cell.fill = PatternFill("solid", fgColor=fill)
    return cell


def set_widths(ws, widths):
    for i, w in enumerate(widths, 1):
        ws.column_dimensions[get_column_letter(i)].width = w


def build_xlsx():
    wb = Workbook()

    ws = wb.active
    ws.title = "Tong hop"
    ws.page_setup.orientation = "landscape"
    ws.page_setup.fitToPage = True
    ws.page_setup.fitToWidth = 1
    ws.page_setup.fitToHeight = 1
    ws.sheet_properties.pageSetUpPr.fitToPage = True
    ws.print_title_rows = "1:3"

    ws.merge_cells("A1:C1")
    title = ws["A1"]
    title.value = "BÁO GIÁ — KIM HƯNG"
    title.font = Font(bold=True, size=16, color=NAVY_HEX, name="Calibri")
    ws.merge_cells("A2:C2")
    ws["A2"].value = "23/09/2026  ·  15 ngày  ·  VNĐ  ·  Trang mẫu: kimhung.vn/que-thu-ma-tuy"
    ws["A2"].font = Font(size=10, color="475569", name="Calibri")

    ws["A4"] = "Báo khách: 48 triệu / năm"
    ws["A4"].font = Font(bold=True, size=13, color=SKY_HEX, name="Calibri")
    ws.merge_cells("A4:C4")

    headers = ["Khoản", "Thành tiền (đ)", "Ghi chú"]
    for i, h in enumerate(headers, 1):
        ws.cell(5, i, h)
    style_header(ws, 5, 3)

    items = [
        (
            "Làm website (2–3 tuần)",
            8000000,
            "Xem đẹp trên điện thoại. Có danh sách sản phẩm, bài hướng dẫn ngắn, ô gửi yêu cầu liên hệ.",
        ),
        (
            "Thuê máy chủ 12 tháng",
            3600000,
            "Để website chạy ổn. Khoảng 300.000đ mỗi tháng.",
        ),
        (
            "Đưa website lên Google × 12",
            36000000,
            "3.000.000đ mỗi tháng: viết bài, chỉnh trang cho Google dễ tìm, gửi báo cáo.",
        ),
    ]
    for i, (name, amt, note) in enumerate(items, 6):
        paint(ws, i, 1, name)
        paint(ws, i, 2, amt, money=True)
        paint(ws, i, 3, note)
    paint(ws, 9, 1, "TỔNG NĂM 1", bold=True, fill=HEAD_HEX)
    paint(ws, 9, 2, 48000000, bold=True, money=True, fill=HEAD_HEX)
    paint(ws, 9, 3, "Báo khách: 48 triệu", bold=True, fill=HEAD_HEX)

    ws["A11"] = "Năm 2"
    ws["A11"].font = Font(bold=True, size=12, color=NAVY_HEX, name="Calibri")
    paint(ws, 12, 1, "Đưa lên Google / tháng")
    paint(ws, 12, 2, 3000000, money=True)
    paint(ws, 13, 1, "Máy chủ / tháng")
    paint(ws, 13, 2, 300000, money=True)
    paint(ws, 14, 1, "Cộng / tháng", bold=True, fill=HEAD_HEX)
    paint(ws, 14, 2, "=B12+B13", bold=True, money=True, fill=HEAD_HEX)
    paint(ws, 15, 1, "Cả năm 2", bold=True)
    paint(ws, 15, 2, "=B14*12", bold=True, money=True)

    ws["A17"] = "Câu chốt"
    ws["A17"].font = Font(bold=True, color=NAVY_HEX, name="Calibri")
    ws.merge_cells("A18:C18")
    ws["A18"] = "Làm website 8 triệu + đưa lên Google 3 triệu/tháng + máy chủ khoảng 300 nghìn/tháng."
    ws["A18"].font = Font(italic=True, size=12, color=NAVY_HEX, name="Calibri")

    pie = PieChart()
    pie.title = "Cơ cấu năm 1"
    labels = Reference(ws, min_col=1, min_row=6, max_row=8)
    data = Reference(ws, min_col=2, min_row=5, max_row=8)
    pie.add_data(data, titles_from_data=True)
    pie.set_categories(labels)
    pie.dataLabels = DataLabelList()
    pie.dataLabels.showPercent = True
    pie.dataLabels.showVal = False
    pie.dataLabels.showCatName = False
    pie.width = 14
    pie.height = 8
    ws.add_chart(pie, "E4")

    set_widths(ws, [38, 18, 42])
    ws.row_dimensions[1].height = 24
    ws.freeze_panes = "A6"

    ws3 = wb.create_sheet("Dong tien 12 thang")
    ws3.merge_cells("A1:E1")
    ws3["A1"] = "THANH TOÁN 12 THÁNG"
    ws3["A1"].font = Font(bold=True, size=14, color=NAVY_HEX, name="Calibri")

    for i, h in enumerate(["Tháng", "Làm website", "Đưa lên Google", "Máy chủ", "Cộng tháng"], 1):
        ws3.cell(3, i, h)
    style_header(ws3, 3, 5)

    paint(ws3, 4, 1, "Tháng 1")
    paint(ws3, 4, 2, 4000000, money=True)
    paint(ws3, 4, 3, 3000000, money=True)
    paint(ws3, 4, 4, 3600000, money=True)
    paint(ws3, 4, 5, "=B4+C4+D4", money=True, bold=True)
    paint(ws3, 5, 1, "Tháng 2")
    paint(ws3, 5, 2, 4000000, money=True)
    paint(ws3, 5, 3, 3000000, money=True)
    paint(ws3, 5, 4, 0, money=True)
    paint(ws3, 5, 5, "=B5+C5+D5", money=True, bold=True)
    for m in range(3, 13):
        r = m + 2
        paint(ws3, r, 1, f"Tháng {m}")
        paint(ws3, r, 2, 0, money=True)
        paint(ws3, r, 3, 3000000, money=True)
        paint(ws3, r, 4, 0, money=True)
        paint(ws3, r, 5, f"=B{r}+C{r}+D{r}", money=True)

    paint(ws3, 16, 1, "CẢ NĂM", bold=True, fill=HEAD_HEX)
    paint(ws3, 16, 2, "=SUM(B4:B15)", bold=True, money=True, fill=HEAD_HEX)
    paint(ws3, 16, 3, "=SUM(C4:C15)", bold=True, money=True, fill=HEAD_HEX)
    paint(ws3, 16, 4, "=SUM(D4:D15)", bold=True, money=True, fill=HEAD_HEX)
    paint(ws3, 16, 5, "=SUM(E4:E15)", bold=True, money=True, fill="DBEAFE")
    ws3["A18"] = "Máy chủ thu một lần tháng 1. Tên miền kimhung.vn khách tự giữ, không tính."
    ws3["A18"].font = Font(italic=True, color="475569", name="Calibri")
    ws3.merge_cells("A18:E18")
    set_widths(ws3, [16, 16, 16, 16, 16])

    ws4 = wb.create_sheet("SEO va KPI")
    ws4.merge_cells("A1:C1")
    ws4["A1"] = "ĐƯA WEBSITE LÊN GOOGLE — 3 TRIỆU/THÁNG"
    ws4["A1"].font = Font(bold=True, size=14, color=NAVY_HEX, name="Calibri")
    ws4.merge_cells("A2:C2")
    ws4["A2"] = "Mỗi tháng 3 bài viết, chỉnh trang cho Google dễ tìm, gửi báo cáo. Không chạy quảng cáo. Không hứa đứng số 1 từ “que thử ma túy” năm đầu."
    ws4["A2"].font = Font(size=10, italic=True, color="475569", name="Calibri")
    ws4.row_dimensions[2].height = 28

    for i, h in enumerate(["#", "Từ khóa mục tiêu", "Nhóm"], 1):
        ws4.cell(4, i, h)
    style_header(ws4, 4, 3)
    kws = [
        (1, "cách dùng que thử ma túy", "Hướng top 5"),
        (2, "que thử ma túy 5 chân", "Hướng top 5"),
        (3, "que thử ma túy đá", "Hướng top 5"),
        (4, "đọc kết quả que thử 1 vạch 2 vạch", "Hướng top 5"),
        (5, "que thử ma túy", "Năm đầu nhắm trang 1 Google"),
    ]
    for r, (n, kw, g) in enumerate(kws, 5):
        paint(ws4, r, 1, n, center=True)
        paint(ws4, r, 2, kw)
        paint(ws4, r, 3, g)

    for i, h in enumerate(["Mốc", "KPI"], 1):
        ws4.cell(12, i, h)
    style_header(ws4, 12, 2)
    paint(ws4, 13, 1, "Tháng 3")
    paint(ws4, 13, 2, "Google đã thấy website. Ít nhất 2 từ khóa vào trang 1.")
    paint(ws4, 14, 1, "Tháng 6")
    paint(ws4, 14, 2, "3/4 từ khóa vào trang 1. Ít nhất 1 từ vào top 5.")
    paint(ws4, 15, 1, "Tháng 12")
    paint(ws4, 15, 2, "2/4 từ khóa vào top 5. Còn lại ở trang 1.")
    ws4.merge_cells("B13:C13")
    ws4.merge_cells("B14:C14")
    ws4.merge_cells("B15:C15")
    set_widths(ws4, [12, 42, 32])

    ws5 = wb.create_sheet("Ha tang")
    ws5["A1"] = "MÁY CHỦ 12 THÁNG"
    ws5["A1"].font = Font(bold=True, size=14, color=NAVY_HEX, name="Calibri")
    ws5.merge_cells("A1:C1")
    for i, h in enumerate(["Hạng mục", "Đơn giá", "Ghi chú"], 1):
        ws5.cell(3, i, h)
    style_header(ws5, 3, 3)
    paint(ws5, 4, 1, "Thuê máy chủ / tháng")
    paint(ws5, 4, 2, 300000, money=True)
    paint(ws5, 4, 3, "Website chạy 24/7")
    paint(ws5, 5, 1, "Máy chủ × 12 tháng")
    paint(ws5, 5, 2, "=B4*12", money=True)
    paint(ws5, 5, 3, "Chứng chỉ bảo mật (https) đã gồm")
    paint(ws5, 6, 1, "Tên miền kimhung.vn")
    paint(ws5, 6, 2, 0, money=True)
    paint(ws5, 6, 3, "Khách tự giữ — không tính")
    paint(ws5, 7, 1, "CỘNG", bold=True, fill=HEAD_HEX)
    paint(ws5, 7, 2, "=B5+B6", bold=True, money=True, fill=HEAD_HEX)
    paint(ws5, 7, 3, "Khách tự thuê máy chủ thì trừ dòng này", fill=HEAD_HEX)
    set_widths(ws5, [36, 16, 36])

    ws6 = wb.create_sheet("Pham vi website")
    ws6["A1"] = "LÀM WEBSITE 8 TRIỆU — GỒM GÌ"
    ws6["A1"].font = Font(bold=True, size=14, color=NAVY_HEX, name="Calibri")
    ws6.merge_cells("A1:B1")
    for i, h in enumerate(["Hạng mục", "Có / không"], 1):
        ws6.cell(3, i, h)
    style_header(ws6, 3, 2)
    scope = [
        ("Xem đẹp trên điện thoại, nút Gọi / Zalo", "Có"),
        ("Trang chủ, giới thiệu, dịch vụ, tin, liên hệ", "Có"),
        ("Danh sách sản phẩm và trang từng sản phẩm", "Có"),
        ("Bài hướng dẫn ngắn về que thử ma túy", "Có"),
        ("Ô gửi yêu cầu liên hệ (họ tên, SĐT, nội dung)", "Có"),
        ("Thanh toán online, app, video, chạy quảng cáo", "Không"),
        ("Thời gian", "2–3 tuần"),
    ]
    for r, (a, b) in enumerate(scope, 4):
        paint(ws6, r, 1, a)
        paint(ws6, r, 2, b, center=True)
    set_widths(ws6, [52, 18])

    ws_ab = wb.create_sheet("Hai ben", 0)
    ws_ab.merge_cells("A1:C1")
    ws_ab["A1"] = "THÔNG TIN HAI BÊN"
    ws_ab["A1"].font = Font(bold=True, size=16, color=NAVY_HEX, name="Calibri")
    for i, h in enumerate(["", "Bên A — Người làm", "Bên B — Khách hàng"], 1):
        ws_ab.cell(3, i, h)
    style_header(ws_ab, 3, 3)
    ab = [
        ("Họ tên / đơn vị", "Trần Trung Hiếu", "Công ty TNHH Đầu tư & Phát triển Kim Hưng"),
        ("Điện thoại", "0862 478 150", ""),
        ("Email", "hieupikas2606@gmail.com", ""),
        ("Địa chỉ", "FPT Complex, Nam Kỳ Khởi Nghĩa, Ngũ Hành Sơn, Đà Nẵng", ""),
        ("Trang mẫu", "", "https://kimhung.vn/que-thu-ma-tuy/"),
    ]
    for r, (k, a, b) in enumerate(ab, 4):
        paint(ws_ab, r, 1, k, bold=True, fill=HEAD_HEX)
        paint(ws_ab, r, 2, a)
        paint(ws_ab, r, 3, b)
    set_widths(ws_ab, [18, 42, 48])
    ws_ab.row_dimensions[7].height = 32

    path = OUT / "Bao-gia-Kim-Hung-Website-SEO-2026.xlsx"
    wb.save(path)
    return path


if __name__ == "__main__":
    d = build_docx()
    x = build_xlsx()
    print(d)
    print(x)
