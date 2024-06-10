# Documentation
- Class name: WAS_Bounded_Image_Blend_With_Mask
- Category: WAS Suite/Image/Bound
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

方法 'bounded_image_blend_with_mask' 旨在使用遮罩控制混合过程，将源图像与目标图像在指定的边界内进行混合。它智能地应用混合因子来确定混合的程度，并可选地，使用羽化效果平滑图像之间的过渡。

# Input types
## Required
- target
    - 目标图像是源图像将被混合的图像。它作为整个混合操作的基础，对最终输出至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- target_mask
    - 定义目标图像中将发生混合的区域的遮罩。它在确定目标图像的哪些部分受源图像影响中起着关键作用。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- target_bounds
    - 指定目标图像内混合将发生的边界。它对于将混合效果限制在特定区域至关重要。
    - Comfy dtype: IMAGE_BOUNDS
    - Python dtype: Tuple[int, int, int, int]
- source
    - 将被混合到目标上的图像。其视觉内容和属性显著影响混合过程的结果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- blend_factor
    - 控制源图像和目标图像之间混合强度的因子。它允许微调混合效果以实现所需的视觉效果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- feathering
    - 应用于遮罩的羽化量，它平滑混合区域的边缘，以实现更自然的过渡。它提高了混合图像的美学质量。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- result_image
    - 混合过程后的生成图像，反映了在指定的边界和遮罩内源图像和目标图像的组合视觉元素。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Bounded_Image_Blend_With_Mask:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        return {'required': {'target': ('IMAGE',), 'target_mask': ('MASK',), 'target_bounds': ('IMAGE_BOUNDS',), 'source': ('IMAGE',), 'blend_factor': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0}), 'feathering': ('INT', {'default': 16, 'min': 0, 'max': 18446744073709551615})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'bounded_image_blend_with_mask'
    CATEGORY = 'WAS Suite/Image/Bound'

    def bounded_image_blend_with_mask(self, target, target_mask, target_bounds, source, blend_factor, feathering):
        target = target.unsqueeze(0) if target.dim() == 3 else target
        source = source.unsqueeze(0) if source.dim() == 3 else source
        target_mask = target_mask.unsqueeze(0) if target_mask.dim() == 2 else target_mask
        tgt_mask_len = 1 if len(target_mask) != len(source) else len(source)
        tgt_len = 1 if len(target) != len(source) else len(source)
        bounds_len = 1 if len(target_bounds) != len(source) else len(source)
        tgt_arr = [tensor2pil(tgt) for tgt in target[:tgt_len]]
        src_arr = [tensor2pil(src) for src in source]
        tgt_mask_arr = []
        for m_idx in range(tgt_mask_len):
            np_array = np.clip(target_mask[m_idx].cpu().numpy().squeeze() * 255.0, 0, 255)
            tgt_mask_arr.append(Image.fromarray(np_array.astype(np.uint8), mode='L'))
        result_tensors = []
        for idx in range(len(src_arr)):
            src = src_arr[idx]
            if tgt_len == 1 and idx == 0 or tgt_len > 1:
                tgt = tgt_arr[idx]
            if bounds_len == 1 and idx == 0 or bounds_len > 1:
                (rmin, rmax, cmin, cmax) = target_bounds[idx]
                (height, width) = (rmax - rmin + 1, cmax - cmin + 1)
            if tgt_mask_len == 1 and idx == 0 or tgt_mask_len > 1:
                tgt_mask = tgt_mask_arr[idx]
            if tgt_mask_len == 1 and bounds_len == 1 and (idx == 0) or (tgt_mask_len > 1 or bounds_len > 1):
                if tgt_mask.size != tgt.size:
                    mask_extended_canvas = Image.new('L', tgt.size, 0)
                    mask_extended_canvas.paste(tgt_mask, (cmin, rmin))
                    tgt_mask = mask_extended_canvas
                if feathering > 0:
                    tgt_mask = tgt_mask.filter(ImageFilter.GaussianBlur(radius=feathering))
                tgt_mask = tgt_mask.point(lambda p: p * blend_factor)
            src_resized = src.resize((width, height), Image.Resampling.LANCZOS)
            src_positioned = Image.new(tgt.mode, tgt.size)
            src_positioned.paste(src_resized, (cmin, rmin))
            result = Image.composite(src_positioned, tgt, tgt_mask)
            result_tensors.append(pil2tensor(result))
        return (torch.cat(result_tensors, dim=0),)
```