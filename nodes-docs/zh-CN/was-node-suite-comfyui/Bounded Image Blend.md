# Documentation
- Class name: WAS_Bounded_Image_Blend
- Category: WAS Suite/Image/Bound
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

方法 `bounded_image_blend` 旨在将源图像无缝地混合到目标图像中，且限定在特定的边界内。通过应用混合因子和可选的羽化效果，它在图像之间创建平滑的过渡，确保了视觉上的连贯性。

# Input types
## Required
- target
    - 目标图像，源图像将被混合到其中。它作为混合操作的背景，对于确定合成图像的最终外观至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- target_bounds
    - 定义目标图像内源图像将被混合的区域的坐标。这些边界对于指定操作的兴趣区域至关重要。
    - Comfy dtype: IMAGE_BOUNDS
    - Python dtype: Tuple[int, int, int, int]
- source
    - 将被混合到目标上的图像。它是将被合并到目标图像中的主要视觉元素，且在指定的边界内。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- blend_factor
    - 一个浮点值，用于确定源图像和目标图像之间的混合程度。它影响源图像在混合区域内的透明度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- feathering
    - 应用于混合区域边缘的羽化量，以创建平滑过渡。更高的值会导致更渐进的混合。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- result_image
    - 输出图像，代表在指定边界内源图像和目标图像的混合结果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Bounded_Image_Blend:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        return {'required': {'target': ('IMAGE',), 'target_bounds': ('IMAGE_BOUNDS',), 'source': ('IMAGE',), 'blend_factor': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0}), 'feathering': ('INT', {'default': 16, 'min': 0, 'max': 18446744073709551615})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'bounded_image_blend'
    CATEGORY = 'WAS Suite/Image/Bound'

    def bounded_image_blend(self, target, target_bounds, source, blend_factor, feathering):
        target = target.unsqueeze(0) if target.dim() == 3 else target
        source = source.unsqueeze(0) if source.dim() == 3 else source
        tgt_len = 1 if len(target) != len(source) else len(source)
        bounds_len = 1 if len(target_bounds) != len(source) else len(source)
        tgt_arr = [tensor2pil(tgt) for tgt in target[:tgt_len]]
        src_arr = [tensor2pil(src) for src in source]
        result_tensors = []
        for idx in range(len(src_arr)):
            src = src_arr[idx]
            if tgt_len == 1 and idx == 0 or tgt_len > 1:
                tgt = tgt_arr[idx]
            if bounds_len == 1 and idx == 0 or bounds_len > 1:
                (rmin, rmax, cmin, cmax) = target_bounds[idx]
                (height, width) = (rmax - rmin + 1, cmax - cmin + 1)
                if feathering > 0:
                    inner_mask = Image.new('L', (width - 2 * feathering, height - 2 * feathering), 255)
                    inner_mask = ImageOps.expand(inner_mask, border=feathering, fill=0)
                    inner_mask = inner_mask.filter(ImageFilter.GaussianBlur(radius=feathering))
                else:
                    inner_mask = Image.new('L', (width, height), 255)
                inner_mask = inner_mask.point(lambda p: p * blend_factor)
                tgt_mask = Image.new('L', tgt.size, 0)
                tgt_mask.paste(inner_mask, (cmin, rmin))
            src_resized = src.resize((width, height), Image.Resampling.LANCZOS)
            src_positioned = Image.new(tgt.mode, tgt.size)
            src_positioned.paste(src_resized, (cmin, rmin))
            result = Image.composite(src_positioned, tgt, tgt_mask)
            result_tensors.append(pil2tensor(result))
        return (torch.cat(result_tensors, dim=0),)
```