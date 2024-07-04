
# Documentation
- Class name: SaveImageWithAlpha
- Category: KJNodes/image
- Output node: True

SaveImageWithAlpha节点专门用于保存带有alpha通道的图像，从而实现透明效果。它支持向保存的图像文件添加元数据，包括提示信息和额外的PNG信息，并在保持图像质量和透明度的同时管理文件命名和存储。

# Input types
## Required
- images
    - 需要保存的图像，预期包含用于透明效果的alpha通道。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- mask
    - 应用于图像的蒙版，用于定义每个像素的透明度级别。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- filename_prefix
    - 文件名前缀，用于识别和组织保存的图像。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- ui
    - UI参数返回一个包含已保存图像路径的字典，便于用户交互和文件检索。


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaveImageWithAlpha:
    def __init__(self):
        self.output_dir = folder_paths.get_output_directory()
        self.type = "output"
        self.prefix_append = ""

    @classmethod
    def INPUT_TYPES(s):
        return {"required": 
                    {"images": ("IMAGE", ),
                    "mask": ("MASK", ),
                    "filename_prefix": ("STRING", {"default": "ComfyUI"})},
                "hidden": {"prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO"},
                }

    RETURN_TYPES = ()
    FUNCTION = "save_images_alpha"
    OUTPUT_NODE = True
    CATEGORY = "KJNodes/image"
    DESCRIPTION = """
Saves an image and mask as .PNG with the mask as the alpha channel. 
"""

    def save_images_alpha(self, images, mask, filename_prefix="ComfyUI_image_with_alpha", prompt=None, extra_pnginfo=None):
        from comfy.cli_args import args
        from PIL.PngImagePlugin import PngInfo
        filename_prefix += self.prefix_append
        full_output_folder, filename, counter, subfolder, filename_prefix = folder_paths.get_save_image_path(filename_prefix, self.output_dir, images[0].shape[1], images[0].shape[0])
        results = list()
        if mask.dtype == torch.float16:
            mask = mask.to(torch.float32)
        def file_counter():
            max_counter = 0
            # Loop through the existing files
            for existing_file in os.listdir(full_output_folder):
                # Check if the file matches the expected format
                match = re.fullmatch(fr"{filename}_(\d+)_?\.[a-zA-Z0-9]+", existing_file)
                if match:
                    # Extract the numeric portion of the filename
                    file_counter = int(match.group(1))
                    # Update the maximum counter value if necessary
                    if file_counter > max_counter:
                        max_counter = file_counter
            return max_counter

        for image, alpha in zip(images, mask):
            i = 255. * image.cpu().numpy()
            a = 255. * alpha.cpu().numpy()
            img = Image.fromarray(np.clip(i, 0, 255).astype(np.uint8))
            
             # Resize the mask to match the image size
            a_resized = Image.fromarray(a).resize(img.size, Image.LANCZOS)
            a_resized = np.clip(a_resized, 0, 255).astype(np.uint8)
            img.putalpha(Image.fromarray(a_resized, mode='L'))
            metadata = None
            if not args.disable_metadata:
                metadata = PngInfo()
                if prompt is not None:
                    metadata.add_text("prompt", json.dumps(prompt))
                if extra_pnginfo is not None:
                    for x in extra_pnginfo:
                        metadata.add_text(x, json.dumps(extra_pnginfo[x]))
           
            # Increment the counter by 1 to get the next available value
            counter = file_counter() + 1
            file = f"{filename}_{counter:05}.png"
            img.save(os.path.join(full_output_folder, file), pnginfo=metadata, compress_level=4)
            results.append({
                "filename": file,
                "subfolder": subfolder,
                "type": self.type
            })

        return { "ui": { "images": results } }

```
