import os
import re
from PIL import Image

# Disable Pillow limit for decompression bomb
Image.MAX_IMAGE_PIXELS = None

PROJECT_ROOT = "/Users/mynamegee/Documents/UCAN-WEBSITE-2026"
ASSETS_DIR = os.path.join(PROJECT_ROOT, "src/assets")
SRC_DIR = os.path.join(PROJECT_ROOT, "src")

def optimize_image(full_path, max_dim=2048):
    if not os.path.exists(full_path):
        print(f"File not found: {full_path}")
        return False
    
    webp_path = os.path.splitext(full_path)[0] + ".webp"
    try:
        orig_size = os.path.getsize(full_path)
        with Image.open(full_path) as img:
            w, h = img.size
            print(f"Original: {os.path.relpath(full_path, PROJECT_ROOT)} ({w}x{h}, {orig_size/(1024*1024):.2f} MB)")
            
            # Calculate new size maintaining aspect ratio if it exceeds max_dim
            if w > max_dim or h > max_dim:
                if w > h:
                    new_w = max_dim
                    new_h = int(h * (max_dim / w))
                else:
                    new_h = max_dim
                    new_w = int(w * (max_dim / h))
                
                print(f"Resizing to: {new_w}x{new_h}")
                img = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
            
            # Save as webp
            img.save(webp_path, "WEBP", quality=82)
            new_size = os.path.getsize(webp_path)
            reduction = (orig_size - new_size) / (1024 * 1024)
            print(f"Saved to: {webp_path}")
            print(f"  Size: {orig_size/(1024*1024):.2f}MB -> {new_size/(1024*1024):.2f}MB (Saved {reduction:.2f}MB, {((orig_size-new_size)/orig_size)*100:.1f}%)")
            return True
    except Exception as e:
        print(f"Error optimizing {full_path}: {e}")
        return False

def update_references(old_ext, new_ext):
    changed_files = 0
    # Walk through src directory for tsx, ts, css files
    for root, dirs, files in os.walk(SRC_DIR):
        for file in files:
            if file.endswith(('.tsx', '.ts', '.css')):
                file_path = os.path.join(root, file)
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Simple replacement of references
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
    
    print(f"Found {len(png_files)} PNG files to optimize/convert.")
    
    converted_count = 0
    for png_path in png_files:
        success = optimize_image(png_path, max_dim=2048)
        if success:
            converted_count += 1
            # Remove original PNG to save space
            os.remove(png_path)
            print(f"Removed original: {png_path}")
            
    print(f"Successfully converted {converted_count} files.")
    
    if converted_count > 0:
        print("Updating references in source files...")
        updated_files = update_references('.png', '.webp')
        print(f"Updated references in {updated_files} files.")

if __name__ == "__main__":
    main()
