# Empty Latent Image (Big Batch) 🎭🅐🅓
## Documentation
- Class name: ADE_EmptyLatentImageLarge
- Category: Animate Diff 🎭🅐🅓/extras
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

ADE_EmptyLatentImageLarge节点旨在初始化一个用零填充的大型潜在图像张量。此张量作为进一步生成过程的空白画布，允许在潜在层面上创建和操作图像。

## Input types
### Required
- width
    - 指定要生成的潜在图像的宽度。它决定了生成张量的水平维度。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 确定潜在图像的高度。它影响生成张量的垂直维度。
    - Comfy dtype: INT
    - Python dtype: int
- batch_size
    - 控制一次生成的潜在图像的数量。它影响生成张量的第一个维度，允许批处理多个图像。
    - Comfy dtype: INT
    - Python dtype: int

## Output types
- latent
    - Comfy dtype: LATENT
    - 输出是一个表示一批空白潜在图像的张量。每个图像都用零初始化，准备进行后续生成修改。
    - Python dtype: torch.Tensor

## Usage tips
- Infra type: GPU
<!-- - Common nodes:
    - [BatchPromptScheduleLatentInput](../../ComfyUI_FizzNodes/Nodes/BatchPromptScheduleLatentInput.md)
    - [KSampler](../../Comfy/Nodes/KSampler.md) -->

## Source code
```python
class EmptyLatentImageLarge:
    def __init__(self, device="cpu"):
        self.device = device

    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "width": ("INT", {"default": 512, "min": 64, "max": comfy_nodes.MAX_RESOLUTION, "step": 8}),
                              "height": ("INT", {"default": 512, "min": 64, "max": comfy_nodes.MAX_RESOLUTION, "step": 8}),
                              "batch_size": ("INT", {"default": 1, "min": 1, "max": 262144})}}
    RETURN_TYPES = ("LATENT",)
    FUNCTION = "generate"

    CATEGORY = "Animate Diff 🎭🅐🅓/extras"

    def generate(self, width, height, batch_size=1):
        latent = torch.zeros([batch_size, 4, height // 8, width // 8])
        return ({"samples":latent}, )