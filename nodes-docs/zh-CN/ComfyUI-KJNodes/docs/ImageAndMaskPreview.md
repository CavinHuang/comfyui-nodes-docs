
# Documentation
- Class name: `ImageAndMaskPreview`
- Category: `KJNodes`
- Output node: `True`
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ImageAndMaskPreview节点旨在为图像生成预览，并可选择性地应用蒙版。它能够在将蒙版叠加到图像上之前调整蒙版的不透明度和颜色，或者在未提供其中一项时仅返回图像或蒙版。这一功能对于在工作流程中直观检查蒙版对图像的效果非常有用。

# Input types
## Required
- mask_opacity
    - 指定将蒙版应用于图像时的不透明度级别，影响蒙版叠加的可见度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- mask_color
    - 以'R, G, B'格式定义蒙版的颜色。当同时提供蒙版和图像时，用于在将蒙版应用到图像之前为其着色。
    - Comfy dtype: STRING
    - Python dtype: str
- pass_through
    - 决定是直接返回处理后的预览还是将其保存到文件。当为true时，返回预览；否则，将其保存。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
## Optional
- image
    - 可能应用蒙版的图像。如果只提供图像，它将作为预览返回。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- mask
    - 要应用于图像的蒙版。如果只提供蒙版，它将被转换为预览格式。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Output types
- composite
    - 当同时提供图像和蒙版时，节点返回一个合成图像，将指定不透明度和颜色调整的蒙版应用到图像上。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- ui
    - 提供一个UI元素，根据提供的输入显示结果，包括节点处理或保存的图像。


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageAndMaskPreview(SaveImage):
    def __init__(self):
        self.output_dir = folder_paths.get_temp_directory()
        self.type = "temp"
        self.prefix_append = "_temp_" + ''.join(random.choice("abcdefghijklmnopqrstupvxyz") for x in range(5))
        self.compress_level = 4

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "mask_opacity": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                "mask_color": ("STRING", {"default": "255, 255, 255"}),
                "pass_through": ("BOOLEAN", {"default": False}),
             },
            "optional": {
                "image": ("IMAGE",),
                "mask": ("MASK",),                
            },
            "hidden": {"prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO"},
        }
    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("composite",)
    FUNCTION = "execute"
    CATEGORY = "KJNodes"
    DESCRIPTION = """
Preview an image or a mask, when both inputs are used  
composites the mask on top of the image.
with pass_through on the preview is disabled and the  
composite is returned from the composite slot instead,  
this allows for the preview to be passed for video combine  
nodes for example.
"""

    def execute(self, mask_opacity, mask_color, pass_through, filename_prefix="ComfyUI", image=None, mask=None, prompt=None, extra_pnginfo=None):
        if mask is not None and image is None:
            preview = mask.reshape((-1, 1, mask.shape[-2], mask.shape[-1])).movedim(1, -1).expand(-1, -1, -1, 3)
        elif mask is None and image is not None:
            preview = image
        elif mask is not None and image is not None:
            mask_adjusted = mask * mask_opacity
            mask_image = mask.reshape((-1, 1, mask.shape[-2], mask.shape[-1])).movedim(1, -1).expand(-1, -1, -1, 3).clone()

            color_list = list(map(int, mask_color.split(', ')))
            print(color_list[0])
            mask_image[:, :, :, 0] = color_list[0] // 255 # Red channel
            mask_image[:, :, :, 1] = color_list[1] // 255 # Green channel
            mask_image[:, :, :, 2] = color_list[2] // 255 # Blue channel
            
            preview, = ImageCompositeMasked.composite(self, image, mask_image, 0, 0, True, mask_adjusted)
        if pass_through:
            return (preview, )
        return(self.save_images(preview, filename_prefix, prompt, extra_pnginfo))

```
