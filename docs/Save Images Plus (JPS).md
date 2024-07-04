
# Documentation
- Class name: Save Images Plus (JPS)
- Category: JPS Nodes/IO
- Output node: True
- Repo Ref: https://github.com/jps-yes/ComfyUI-JPsNM

Save Images Plus (JPS)节点专门用于高效地将图像存储到磁盘上。它提供了元数据自定义和压缩偏好设置的功能。该节点可以帮助用户有组织地管理文件，并支持根据图像属性动态调整。此外，它还提供了可选的元数据嵌入功能，以丰富文件的上下文信息。

# Input types
## Required
- images
    - 需要保存的一批图像。这个参数对于确定输出文件名和路径以及实际的图像保存过程至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]
- filename_prefix
    - 输出文件名的可选前缀。这允许用户对存储的图像进行有组织的管理，并方便识别已保存的图像。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- dummy_out
    - 该输出类型的具体用途和内容未知。
    - Comfy dtype: INT
    - Python dtype: unknown
- ui
    - 节点返回一个UI组件，用于显示已保存的图像，从而增强用户交互和反馈。
    - Comfy dtype: 未指定
    - Python dtype: 未指定


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Save_Images_Plus:
    def __init__(self):
        self.output_dir = folder_paths.get_output_directory()
        self.type = "output"
        self.prefix_append = ""
        self.compress_level = 4

    @classmethod
    def INPUT_TYPES(s):
        return {"required": 
                    {"images": ("IMAGE", ),
                     "filename_prefix": ("STRING", {"default": "ComfyUI"})},
                "hidden": {"prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO"},
                }

    RETURN_TYPES = ("INT",)
    RETURN_NAMES = ("dummy_out",)
    FUNCTION = "save_images_plus"

    OUTPUT_NODE = True

    CATEGORY = "JPS Nodes/IO"

    def save_images_plus(self, images, filename_prefix="ComfyUI", prompt=None, extra_pnginfo=None):
        filename_prefix += self.prefix_append
        full_output_folder, filename, counter, subfolder, filename_prefix = folder_paths.get_save_image_path(filename_prefix, self.output_dir, images[0].shape[1], images[0].shape[0])
        results = list()
        for image in images:
            i = 255. * image.cpu().numpy()
            img = Image.fromarray(np.clip(i, 0, 255).astype(np.uint8))
            metadata = None
            if not args.disable_metadata:
                metadata = PngInfo()
                if prompt is not None:
                    metadata.add_text("prompt", json.dumps(prompt))
                if extra_pnginfo is not None:
                    for x in extra_pnginfo:
                        metadata.add_text(x, json.dumps(extra_pnginfo[x]))

            file = f"{filename} {counter:03}.png"
            img.save(os.path.join(full_output_folder, file), pnginfo=metadata, compress_level=self.compress_level)
            results.append({
                "filename": file,
                "subfolder": subfolder,
                "type": self.type
            })
            counter += 1

        #return { "ui": { "images": results } }
        return(int(1), )            

```
