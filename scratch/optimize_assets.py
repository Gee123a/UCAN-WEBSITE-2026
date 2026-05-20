import os
import re
from PIL import Image

PROJECT_ROOT = "/Users/mynamegee/Documents/UCAN-WEBSITE-2026"
ASSETS_DIR = os.path.join(PROJECT_ROOT, "src/assets")
SRC_DIR = os.path.join(PROJECT_ROOT, "src")

def convert_png_to_webp(png_path):
    webp_path = os.path.splitext(png_path)[0] + ".webp"
    try:
        with Image.open(png_path) as img:
            # Check original size
            orig_size = os.path.getsize(png_path)
            # Save as webp with quality 82
            img.save(webp_path, "WEBP", quality=82)
            new_size = os.path.getsize(webp_path)
            reduction = (orig_size - new_size) / (1024 * 1024)
            print(f"Converted: {os.path.basename(png_path)} -> {os.path.basename(webp_path)}")
            print(f"  Size: {orig_size/(1024*1024):.2f}MB -> {new_size/(1024*1024):.2f}MB (Saved {reduction:.2f}MB, {((orig_size-new_size)/orig_size)*100:.1f}%)")
            return webp_path, True
    except Exception as e:
        print(f"Error converting {png_path}: {e}")
        return None, False

def update_references(old_ext, new_ext):
    changed_files = 0
    # Walk through src directory for tsx, ts, css files
    for root, dirs, files in os.walk(SRC_DIR):
        for file in files:
            if file.endswith(('.tsx', '.ts', '.css')):
                file_path = os.path.join(root, file)
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Simple replacement of imports/urls
                # e.g., "import foo from './foo.png';" -> "import foo from './foo.webp';"
                # or url('./foo.png') -> url('./foo.webp')
                # Let's match case-insensitively or specifically ".png"
                new_content = re.sub(r'(\.png\b)', new_ext, content)
                
                if new_content != content:
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Updated references in: {os.path.relpath(file_path, PROJECT_ROOT)}")
                    changed_files += 1
    return changed_files

def main():
    png_files = []
    for root, dirs, files in os.walk(ASSETS_DIR):
        for file in files:
            if file.lower().endswith('.png'):
                png_files.append(os.path.join(root, file))
    
    print(f"Found {len(png_files)} PNG files to convert.")
    
    converted_count = 0
    for png_path in png_files:
        webp_path, success = convert_png_to_webp(png_path)
        if success:
            converted_count += 1
            # Remove original PNG to save space and avoid bundling both
            os.remove(png_path)
            
    print(f"Successfully converted {converted_count} files.")
    
    if converted_count > 0:
        print("Updating references in source files...")
        updated_files = update_references('.png', '.webp')
        print(f"Updated references in {updated_files} files.")

if __name__ == "__main__":
    main()
