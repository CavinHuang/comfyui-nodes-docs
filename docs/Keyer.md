
# Documentation
- Class name: Keyer
- Category: image/filters
- Output node: False

Keyer节点专门用于图像处理，特别是进行键控操作，根据颜色和亮度标准有选择地调整图像区域的透明度。它允许对图像进行复杂的操作，能够创建或修改alpha通道，以实现背景去除或合成等效果。

# Input types
## Required
- images
    - 要处理的图像，作为键控操作的主要输入。这个参数对于定义哪些图像将经过键控过程至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: List[Image]
- operation
    - 指定要执行的键控操作，影响如何评估图像的颜色和亮度水平以确定透明度。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- low
    - 定义键控操作的下限阈值，确定像素被视为透明的最小值。
    - Comfy dtype: FLOAT
    - Python dtype: float
- high
    - 设置键控操作的上限阈值，确定像素被视为透明的最大值。
    - Comfy dtype: FLOAT
    - Python dtype: float
- gamma
    - 调整键控操作的gamma值，影响中间调对比度和键控图像的整体外观。
    - Comfy dtype: FLOAT
    - Python dtype: float
- premult
    - 决定输出图像是否应该与其alpha通道预乘，影响合成工作流程中的混合行为。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- image
    - 键控操作后处理的图像，根据指定标准调整了透明度。
    - Comfy dtype: IMAGE
    - Python dtype: Image
- alpha
    - 由键控操作生成或修改的alpha通道，代表处理后图像的透明度水平。
    - Comfy dtype: IMAGE
    - Python dtype: Alpha
- mask
    - 从键控操作派生的遮罩，指示图像内的透明和不透明区域。
    - Comfy dtype: MASK
    - Python dtype: Mask


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class Keyer:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "images": ("IMAGE",),
                "operation": (["luminance", "saturation", "max", "min", "red", "green", "blue", "redscreen", "greenscreen", "bluescreen"],),
                "low": ("FLOAT",{"default": 0, "step": 0.001}),
                "high": ("FLOAT",{"default": 1, "step": 0.001}),
                "gamma": ("FLOAT",{"default": 1.0, "min": 0.001, "step": 0.001}),
                "premult": ("BOOLEAN", {"default": True}),
            },
        }

    RETURN_TYPES = ("IMAGE", "IMAGE", "MASK")
    RETURN_NAMES = ("image", "alpha", "mask")
    FUNCTION = "keyer"

    CATEGORY = "image/filters"

    def keyer(self, images, operation, low, high, gamma, premult):
        t = images[:,:,:,:3].detach().clone()
        
        if operation == "luminance":
            alpha = 0.2126 * t[:,:,:,0] + 0.7152 * t[:,:,:,1] + 0.0722 * t[:,:,:,2]
        elif operation == "saturation":
            minV = torch.min(t, 3)[0]
            maxV = torch.max(t, 3)[0]
            mask = maxV != 0
            alpha = maxV
            alpha[mask] = (maxV[mask] - minV[mask]) / maxV[mask]
        elif operation == "max":
            alpha = torch.max(t, 3)[0]
        elif operation == "min":
            alpha = torch.min(t, 3)[0]
        elif operation == "red":
            alpha = t[:,:,:,0]
        elif operation == "green":
            alpha = t[:,:,:,1]
        elif operation == "blue":
            alpha = t[:,:,:,2]
        elif operation == "redscreen":
            alpha = 0.7 * (t[:,:,:,1] + t[:,:,:,2]) - t[:,:,:,0] + 1
        elif operation == "greenscreen":
            alpha = 0.7 * (t[:,:,:,0] + t[:,:,:,2]) - t[:,:,:,1] + 1
        elif operation == "bluescreen":
            alpha = 0.7 * (t[:,:,:,0] + t[:,:,:,1]) - t[:,:,:,2] + 1
        else: # should never be reached
            alpha = t[:,:,:,0] * 0
        
        if low == high:
            alpha = (alpha > high).to(t.dtype)
        else:
            alpha = (alpha - low) / (high - low)
        
        if gamma != 1.0:
            alpha = torch.pow(alpha, 1/gamma)
        alpha = torch.clamp(alpha, min=0, max=1).unsqueeze(3).repeat(1,1,1,3)
        if premult:
            t *= alpha
        return (t, alpha, alpha[:,:,:,0])

```
