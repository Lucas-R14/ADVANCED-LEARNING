import os
import docx
from pathlib import Path

def extract_text_from_docx(docx_path):
    try:
        doc = docx.Document(docx_path)
        return "\n".join([paragraph.text for paragraph in doc.paragraphs if paragraph.text.strip()])
    except Exception as e:
        return f"Error extracting text from {docx_path}: {str(e)}"

def main():
    support_dir = Path("Programes/Student-suport")
    output_file = Path("student_support_content.txt")
    
    with open(output_file, 'w', encoding='utf-8') as f:
        for docx_file in support_dir.glob('*.docx'):
            f.write(f"=== {docx_file.name} ===\n\n")
            text = extract_text_from_docx(docx_file)
            f.write(text)
            f.write("\n\n" + "="*50 + "\n\n")
    
    print(f"Content extracted to {output_file}")

if __name__ == "__main__":
    main()
