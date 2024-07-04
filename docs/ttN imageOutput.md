
# Documentation
- Class name: ttN imageOutput
- Category: ttN/image
- Output node: True
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ttN_imageOutput 节点旨在管理自定义流程中的图像输出过程，专注于根据用户定义的设置进行图像保存、显示和修改的高级管理。它抽象了图像处理中涉及的复杂性，为与图像输出相关的操作提供了一个简化的接口。

# Input types
## Required
- image
    - 作为保存或修改等操作的核心输入，是节点处理活动的中心。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- image_output
    - 决定图像输出的处理方式，包括保存、隐藏或显示选项。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- output_path
    - 指定保存图像的目录路径，对组织保存的图像至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- save_prefix
    - 添加到保存图像的前缀，有助于图像的组织和检索。
    - Comfy dtype: STRING
    - Python dtype: str
- number_padding
    - 定义用于对保存图像进行编号的填充，有助于图像的系统化组织。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: int
- file_type
    - 确定保存图像的文件格式，影响输出的兼容性和质量。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- overwrite_existing
    - 控制是否应覆盖现有图像，影响新图像的存储方式。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: bool
- embed_workflow
    - 指示是否应在保存的图像中嵌入工作流信息，增强可追溯性。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: bool

# Output types
- image
    - 返回处理后的图像，根据操作可能是修改后的或原始形式的。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- ui
    - 将处理后的图像结果输出到UI，便于用户交互和可视化。


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ttN_imageOUPUT:
        version = '1.1.0'
        def __init__(self):
            pass
        
        @classmethod
        def INPUT_TYPES(s):
            return {"required": { 
                    "image": ("IMAGE",),
                    "image_output": (["Hide", "Preview", "Save", "Hide/Save"],{"default": "Preview"}),
                    "output_path": ("STRING", {"default": folder_paths.get_output_directory(), "multiline": False}),
                    "save_prefix": ("STRING", {"default": "ComfyUI"}),
                    "number_padding": (["None", 2, 3, 4, 5, 6, 7, 8, 9],{"default": 5}),
                    "file_type": (["PNG", "JPG", "JPEG", "BMP", "TIFF", "TIF"],{"default": "PNG"}),
                    "overwrite_existing": (["True", "False"],{"default": "False"}),
                    "embed_workflow": (["True", "False"],),

                    },
                    "hidden": {"prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO", "my_unique_id": "UNIQUE_ID",
                               "ttNnodeVersion": ttN_imageOUPUT.version},
                }

        RETURN_TYPES = ("IMAGE",)
        RETURN_NAMES = ("image",)
        FUNCTION = "output"
        CATEGORY = "ttN/image"
        OUTPUT_NODE = True

        def output(self, image, image_output, output_path, save_prefix, number_padding, file_type, overwrite_existing, embed_workflow, prompt, extra_pnginfo, my_unique_id):
            ttN_save = ttNsave(my_unique_id, prompt, extra_pnginfo, number_padding, overwrite_existing, output_path)
            results = ttN_save.images(image, save_prefix, image_output, embed_workflow, file_type.lower())

            if image_output in ("Hide", "Hide/Save"):
                return (image,)

            # Output image results to ui and node outputs
            return {"ui": {"images": results},
                    "result": (image,)}

```
