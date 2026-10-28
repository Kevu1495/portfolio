"""Create the public resume from the site's approved content.

Usage: node scripts/export-content.mjs | python scripts/build-resume.py
Requires reportlab. The uploaded original is never modified.
"""

import json
import sys
from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import KeepTogether, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle

data = json.load(sys.stdin)
identity = data['identity']
output = Path('public/assets/kevin-patel-resume.pdf')
output.parent.mkdir(parents=True, exist_ok=True)
ink = colors.HexColor('#1c2517')
muted = colors.HexColor('#495344')
accent = colors.HexColor('#4a6229')
styles = {
    'name': ParagraphStyle('name', fontName='Helvetica-Bold', fontSize=25, leading=29, textColor=ink, spaceAfter=7),
    'meta': ParagraphStyle('meta', fontName='Helvetica', fontSize=8.4, leading=12, textColor=muted, spaceAfter=10),
    'body': ParagraphStyle('body', fontName='Helvetica', fontSize=9.3, leading=12.3, textColor=ink, spaceAfter=5),
    'small': ParagraphStyle('small', fontName='Helvetica', fontSize=8.3, leading=10.6, textColor=muted, spaceAfter=3),
    'heading': ParagraphStyle('heading', fontName='Helvetica-Bold', fontSize=10.2, leading=14, textColor=accent, spaceBefore=5, spaceAfter=4, keepWithNext=True),
    'role': ParagraphStyle('role', fontName='Helvetica-Bold', fontSize=10, leading=13, textColor=ink, spaceAfter=3, keepWithNext=True),
    'bullet': ParagraphStyle('bullet', fontName='Helvetica', fontSize=9.1, leading=11.3, textColor=ink, leftIndent=9, firstLineIndent=-9, spaceAfter=2),
}


def p(text, style='body'):
    return Paragraph(text, styles[style])


def safe(text):
    return escape(text).replace('\u2014', '-').replace('\u2013', '-')


story = [p(safe(identity['name']).upper(), 'name')]
links = f'<link href="mailto:{identity["email"]}">{identity["email"]}</link> | {identity["location"]} | <link href="{identity["site"]}">kevinp.dev</link><br/><link href="{identity["github"]}">github.com/Kevu1495</link> | <link href="{identity["linkedin"]}">linkedin.com/in/kevu1495</link>'
story.append(p(links, 'meta'))
story.append(p('PROFILE', 'heading'))
story.append(p(safe(identity['positioning']) + ' Experience across Java/Spring Boot services, registry integrations, relational data models and Python/PySpark data processing at Vertoz Limited.'))
story.append(p('TECHNICAL SKILLS', 'heading'))
for group in data['skillGroups']:
    story.append(p(f'<b>{safe(group["title"])}:</b> {safe(", ".join(group["technologies"]))}', 'small'))
story.append(p('PROFESSIONAL EXPERIENCE', 'heading'))
for exp in data['experiences']:
    heading = f'{safe(exp["title"])} | {safe(exp["employer"])}'
    story.append(p(heading, 'role'))
    subline = safe(exp['period']) + (f' | Product: {safe(exp["product"])}' if exp.get('product') else ' | Data engineering across multiple products')
    story.append(p(subline, 'small'))
    for bullet in exp['contributions']:
        story.append(p(f'&#8226; {safe(bullet)}', 'bullet'))
    story.append(Spacer(1, 3))

medleaf = data['medleaf']
story.append(p('PERSONAL PROJECT', 'heading'))
story.append(p('MedLeaf | 2025', 'role'))
story.append(p('PyTorch-based flora identification and medicinal value assessment. Data cleaning, preprocessing, model development, hyperparameter optimization and evaluation; Flask REST prediction APIs deployed on AWS EC2.', 'small'))
story.append(p('Project-reported model accuracy: 82%. Evaluation split and dataset details are not published; medicinal information is a project feature, not clinical guidance.', 'small'))
story.append(p('EDUCATION', 'heading'))
for item in data['education']:
    story.append(KeepTogether([p(f'<b>{safe(item["qualification"])}</b> | {safe(item["year"])}', 'small'), p(f'{safe(item["institution"])} | {safe(item["board"])}<br/>{safe(item["result"])}', 'small')]))
story.append(p('SELECTED COURSEWORK', 'heading'))
for item in data['credentials']:
    story.append(p(f'{safe(item["title"])} - {safe(item["instructor"])} | {safe(item["provider"])}', 'small'))


def footer(canvas, doc):
    canvas.setStrokeColor(colors.HexColor('#d9ded3'))
    canvas.line(37, 29, A4[0] - 37, 29)
    canvas.setFillColor(muted)
    canvas.setFont('Helvetica', 7)
    canvas.drawString(37, 17, 'Kevin Patel | kevinp.dev')
    canvas.drawRightString(A4[0] - 37, 17, str(doc.page))


doc = SimpleDocTemplate(str(output), pagesize=A4, leftMargin=37, rightMargin=37, topMargin=25, bottomMargin=33, title='Kevin Patel - Software Engineer', author='Kevin Patel', subject='Backend and data engineering experience')
doc.build(story, onFirstPage=footer, onLaterPages=footer)
print(f'Created {output}', file=sys.stderr)
