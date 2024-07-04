
# Documentation
- Class name: GrowMaskWithBlur
- Category: KJNodes/masking
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

GrowMaskWithBlur节点用于处理单个或批量掩码。它可以扩大或缩小掩码，可选择性地应用模糊效果，并执行各种其他变换，如翻转、填充孔洞和帧间插值。这个节点在掩码处理方面非常灵活，允许对掩码数据进行动态调整和增强。

# Input types
## Required
- mask
    - 要处理的输入掩码或掩码批次。它是所有变换的主要数据来源。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- expand
    - 决定掩码将被扩展或收缩的程度。正值扩展掩码，负值收缩掩码。
    - Comfy dtype: INT
    - Python dtype: int
- incremental_expandrate
    - 指定每帧调整expand参数的比率，允许在一系列掩码上进行动态调整大小。
    - Comfy dtype: FLOAT
    - Python dtype: float
- tapered_corners
    - 启用时，在扩展或收缩过程中对掩码应用渐变角，影响处理后掩码的形状。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- flip_input
    - 如果设置为true，在进行任何其他处理之前水平翻转输入掩码。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- blur_radius
    - 使用指定半径对掩码应用模糊效果。大于0的值会激活此效果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- lerp_alpha
    - 用于帧间线性插值的alpha值，实现动画掩码序列中的平滑过渡。
    - Comfy dtype: FLOAT
    - Python dtype: float
- decay_factor
    - 在帧之间应用于掩码的衰减因子，允许特征逐渐淡化或增强。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- fill_holes
    - 启用时，填充掩码中的任何孔洞，这对创建更实心或连贯的掩码形状特别有用。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- mask
    - 应用指定变换后的主要输出掩码。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- mask_inverted
    - 主要输出掩码的反转版本，提供另一种可视化或应用方式。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class GrowMaskWithBlur:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "mask": ("MASK",),
                "expand": ("INT", {"default": 0, "min": -MAX_RESOLUTION, "max": MAX_RESOLUTION, "step": 1}),
                "incremental_expandrate": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 100.0, "step": 0.1}),
                "tapered_corners": ("BOOLEAN", {"default": True}),
                "flip_input": ("BOOLEAN", {"default": False}),
                "blur_radius": ("FLOAT", {
                    "default": 0.0,
                    "min": 0.0,
                    "max": 100,
                    "step": 0.1
                }),
                "lerp_alpha": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                "decay_factor": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
            },
            "optional": {
                "fill_holes": ("BOOLEAN", {"default": False}),
            },
        }

    CATEGORY = "KJNodes/masking"
    RETURN_TYPES = ("MASK", "MASK",)
    RETURN_NAMES = ("mask", "mask_inverted",)
    FUNCTION = "expand_mask"
    DESCRIPTION = """
# GrowMaskWithBlur
- mask: Input mask or mask batch
- expand: Expand or contract mask or mask batch by a given amount
- incremental_expandrate: increase expand rate by a given amount per frame
- tapered_corners: use tapered corners
- flip_input: flip input mask
- blur_radius: value higher than 0 will blur the mask
- lerp_alpha: alpha value for interpolation between frames
- decay_factor: decay value for interpolation between frames
- fill_holes: fill holes in the mask (slow)"""
    
    def expand_mask(self, mask, expand, tapered_corners, flip_input, blur_radius, incremental_expandrate, lerp_alpha, decay_factor, fill_holes=False):
        alpha = lerp_alpha
        decay = decay_factor
        if flip_input:
            mask = 1.0 - mask
        c = 0 if tapered_corners else 1
        kernel = np.array([[c, 1, c],
                           [1, 1, 1],
                           [c, 1, c]])
        growmask = mask.reshape((-1, mask.shape[-2], mask.shape[-1])).cpu()
        out = []
        previous_output = None
        current_expand = expand
        for m in growmask:
            output = m.numpy()
            for _ in range(abs(round(current_expand))):
                if current_expand < 0:
                    output = scipy.ndimage.grey_erosion(output, footprint=kernel)
                else:
                    output = scipy.ndimage.grey_dilation(output, footprint=kernel)
            if current_expand < 0:
                current_expand -= abs(incremental_expandrate)
            else:
                current_expand += abs(incremental_expandrate)
            if fill_holes:
                binary_mask = output > 0
                output = scipy.ndimage.binary_fill_holes(binary_mask)
                output = output.astype(np.float32) * 255
            output = torch.from_numpy(output)
            if alpha < 1.0 and previous_output is not None:
                # Interpolate between the previous and current frame
                output = alpha * output + (1 - alpha) * previous_output
            if decay < 1.0 and previous_output is not None:
                # Add the decayed previous output to the current frame
                output += decay * previous_output
                output = output / output.max()
            previous_output = output
            out.append(output)

        if blur_radius != 0:
            # Convert the tensor list to PIL images, apply blur, and convert back
            for idx, tensor in enumerate(out):
                # Convert tensor to PIL image
                pil_image = tensor2pil(tensor.cpu().detach())[0]
                # Apply Gaussian blur
                pil_image = pil_image.filter(ImageFilter.GaussianBlur(blur_radius))
                # Convert back to tensor
                out[idx] = pil2tensor(pil_image)
            blurred = torch.cat(out, dim=0)
            return (blurred, 1.0 - blurred)
        else:
            return (torch.stack(out, dim=0), 1.0 - torch.stack(out, dim=0),)

```
