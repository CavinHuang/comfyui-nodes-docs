# Documentation
- Class name: SEGSPaste
- Category: ImpactPack/Detailer
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

SEGSPaste节点旨在将分割图中的片段集成到给定图像中，增强图像的视觉细节。它通过指定的羽化和alpha值对片段进行对齐和混合，确保了无缝和详细的结果。

# Input types
## Required
- image
    - 输入图像，将把片段粘贴到该图像中。它作为整个操作的基础，片段将与此图像对齐并混合。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- segs
    - 包含要粘贴到图像上的片段的分割数据。每个片段对于细节增强过程至关重要，有助于最终的视觉输出。
    - Comfy dtype: SEGS
    - Python dtype: List[SEG]
## Optional
- feather
    - 羽化参数控制粘贴片段时边缘的柔和度。它是实现片段与图像之间自然混合的重要因素。
    - Comfy dtype: INT
    - Python dtype: int
- alpha
    - alpha参数调整粘贴片段的不透明度，允许控制与底层图像的可见性和混合强度。
    - Comfy dtype: INT
    - Python dtype: int
- ref_image_opt
    - 一个可选的参考图像，为粘贴片段提供额外的上下文。它可以用来匹配片段与参考图像的光照或颜色。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- result
    - 输出是增强后的图像，其中来自分割图的片段被无缝集成。它代表了细节增强过程的最终视觉结果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class SEGSPaste:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',), 'segs': ('SEGS',), 'feather': ('INT', {'default': 5, 'min': 0, 'max': 100, 'step': 1}), 'alpha': ('INT', {'default': 255, 'min': 0, 'max': 255, 'step': 1})}, 'optional': {'ref_image_opt': ('IMAGE',)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Detailer'

    @staticmethod
    def doit(image, segs, feather, alpha=255, ref_image_opt=None):
        segs = core.segs_scale_match(segs, image.shape)
        result = None
        for (i, single_image) in enumerate(image):
            image_i = single_image.unsqueeze(0).clone()
            for seg in segs[1]:
                ref_image = None
                if ref_image_opt is None and seg.cropped_image is not None:
                    cropped_image = seg.cropped_image
                    if isinstance(cropped_image, np.ndarray):
                        cropped_image = torch.from_numpy(cropped_image)
                    ref_image = cropped_image[i].unsqueeze(0)
                elif ref_image_opt is not None:
                    ref_tensor = ref_image_opt[i].unsqueeze(0)
                    ref_image = crop_image(ref_tensor, seg.crop_region)
                if ref_image is not None:
                    if seg.cropped_mask.ndim == 3 and len(seg.cropped_mask) == len(image):
                        mask = seg.cropped_mask[i]
                    elif seg.cropped_mask.ndim == 3 and len(seg.cropped_mask) > 1:
                        print(f'[Impact Pack] WARN: SEGSPaste - The number of the mask batch({len(seg.cropped_mask)}) and the image batch({len(image)}) are different. Combine the mask frames and apply.')
                        combined_mask = (seg.cropped_mask[0] * 255).to(torch.uint8)
                        for frame_mask in seg.cropped_mask[1:]:
                            combined_mask |= (frame_mask * 255).to(torch.uint8)
                        combined_mask = (combined_mask / 255.0).to(torch.float32)
                        mask = utils.to_binary_mask(combined_mask, 0.1)
                    else:
                        mask = seg.cropped_mask
                    mask = tensor_gaussian_blur_mask(mask, feather) * (alpha / 255)
                    (x, y, *_) = seg.crop_region
                    mask.cpu()
                    image_i.cpu()
                    ref_image.cpu()
                    tensor_paste(image_i, ref_image, (x, y), mask)
            if result is None:
                result = image_i
            else:
                result = torch.concat((result, image_i), dim=0)
        return (result,)
```