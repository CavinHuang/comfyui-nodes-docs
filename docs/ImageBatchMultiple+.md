
# Documentation
- Class name: ImageBatchMultiple+
- Category: essentials
- Output node: False
- Repo Ref: https://github.com/shleemr/ComfyUI-Custom-Nodes

ImageBatchMultiple+ 节点旨在将多个图像合并为一个批次，便于需要批量处理图像的操作。该节点抽象了处理多种图像格式和尺寸的复杂性，确保它们能够兼容批量操作。

# Input types
## Required
- image_i
    - 代表要包含在批次中的图像。根据需要调整其格式和大小，以确保与批次中的其他图像兼容。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- method
    - 指定将图像合并到批次中的方法，确保所有图像的一致性和兼容性。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
## Optional

# Output types
- image
    - 输出是一个由输入图像组合而成的图像批次。这个批次可用于进一步的图像处理或分析任务。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageBatchMultiple:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image_1": ("IMAGE",),
                "image_2": ("IMAGE",),
                "method": (["nearest-exact", "bilinear", "area", "bicubic", "lanczos"], { "default": "lanczos" }),
            }, "optional": {
                "image_3": ("IMAGE",),
                "image_4": ("IMAGE",),
                "image_5": ("IMAGE",),
            },
        }
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"
    CATEGORY = "essentials"

    def execute(self, image_1, image_2, method, image_3=None, image_4=None, image_5=None):
        if image_1.shape[1:] != image_2.shape[1:]:
            image_2 = comfy.utils.common_upscale(image_2.movedim(-1,1), image_1.shape[2], image_1.shape[1], method, "center").movedim(1,-1)
        out = torch.cat((image_1, image_2), dim=0)

        if image_3 is not None:
            if image_1.shape[1:] != image_3.shape[1:]:
                image_3 = comfy.utils.common_upscale(image_3.movedim(-1,1), image_1.shape[2], image_1.shape[1], method, "center").movedim(1,-1)
            out = torch.cat((out, image_3), dim=0)
        if image_4 is not None:
            if image_1.shape[1:] != image_4.shape[1:]:
                image_4 = comfy.utils.common_upscale(image_4.movedim(-1,1), image_1.shape[2], image_1.shape[1], method, "center").movedim(1,-1)
            out = torch.cat((out, image_4), dim=0)
        if image_5 is not None:
            if image_1.shape[1:] != image_5.shape[1:]:
                image_5 = comfy.utils.common_upscale(image_5.movedim(-1,1), image_1.shape[2], image_1.shape[1], method, "center").movedim(1,-1)
            out = torch.cat((out, image_5), dim=0)
        
        return (out,)

```
