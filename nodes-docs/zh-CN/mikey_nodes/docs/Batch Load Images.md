
# Documentation
- Class name: Batch Load Images
- Category: Mikey/Image
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

Batch Load Images节点专门用于从指定目录批量加载图像，并可选择性地包括子目录中的图像。它支持多种图像格式，并将它们转换为适合进一步处理或作为模型输入的张量格式。

# Input types
## Required
- image_directory
    - 指定存储图像的目录路径。这个路径对于定位和加载图像至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- subdirectories
    - 决定是否包含指定图像目录内的子目录中的图像。这允许更全面的图像加载。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: bool

# Output types
- image
    - 输出一个已加载并转换为张量格式的图像列表，可用于进一步处理或作为模型的输入。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class BatchLoadImages:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"image_directory": ("STRING", {"multiline": False, "placeholder": "Image Directory"}),
                             "subdirectories": (['true', 'false'], {"default": 'false'})}}

    RETURN_TYPES = ('IMAGE',)
    RETURN_NAMES = ('image',)
    FUNCTION = 'batch'
    CATEGORY = 'Mikey/Image'
    OUTPUT_IS_LIST = (True, )

    def batch(self, image_directory, subdirectories):
        if not os.path.exists(image_directory):
            raise Exception(f"Image directory {image_directory} does not exist")

        images = []
        for file in os.listdir(image_directory):
            if file.endswith('.png') or file.endswith('.jpg') or file.endswith('.jpeg') or file.endswith('.webp') or file.endswith('.bmp') or file.endswith('.gif'):
                img = Image.open(os.path.join(image_directory, file))
                img = pil2tensor(img)
                images.append(img)
        #print(f'Loaded {len(images)} images')
        return (images,)

```
