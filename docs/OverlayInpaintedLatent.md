
# Documentation
- Class name: OverlayInpaintedLatent
- Category: Art Venture/Inpainting
- Output node: False

OverlayInpaintedLatent节点旨在根据给定的蒙版将原始和修复后的潜在表示进行混合，从而产生一个无缝的叠加效果，使修复的内容与原始内容完美融合。这一过程对艺术创作和图像编辑应用至关重要，它能在保持原始图像完整性的同时，巧妙地融入新元素。

# Input types
## Required
- original
    - 'original'输入代表在进行任何修复之前的原始潜在表示。它作为叠加过程的基础，确保修复的内容以尊重原始图像结构和内容的方式进行整合。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
- inpainted
    - 'inpainted'输入包含修复区域的潜在表示。它对叠加过程至关重要，因为它提供了将根据蒙版与原始潜在表示混合的新内容。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
- mask
    - 'mask'输入指定了原始潜在表示中应被替换或与修复内容混合的区域。它在决定如何在叠加过程中组合原始和修复表示方面起着关键作用。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Output types
- latent
    - 输出是一个潜在表示，它基于提供的蒙版将原始和修复内容结合在一起，实现了两种元素的无缝整合。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class OverlayInpaintedLatent:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "original": ("LATENT",),
                "inpainted": ("LATENT",),
                "mask": ("MASK",),
            }
        }

    RETURN_TYPES = ("LATENT",)
    CATEGORY = "Art Venture/Inpainting"
    FUNCTION = "overlay"

    def overlay(self, original: Dict, inpainted: Dict, mask: torch.Tensor):
        s_original: torch.Tensor = original["samples"]
        s_inpainted: torch.Tensor = inpainted["samples"]

        if s_original.shape[0] != s_inpainted.shape[0]:
            raise ValueError("original and inpainted must have same batch size")

        if s_original.shape[0] != mask.shape[0]:
            raise ValueError("original and mask must have same batch size")

        overlays = []

        for org, inp, msk in zip(s_original, s_inpainted, mask):
            latmask = tensor2pil(msk.unsqueeze(0), "L").convert("RGB").resize((org.shape[2], org.shape[1]))
            latmask = np.moveaxis(np.array(latmask, dtype=np.float32), 2, 0) / 255
            latmask = latmask[0]
            latmask = np.around(latmask)
            latmask = np.tile(latmask[None], (4, 1, 1))

            msk = torch.asarray(1.0 - latmask)
            nmask = torch.asarray(latmask)

            overlayed = inp * nmask + org * msk
            overlays.append(overlayed)

        samples = torch.stack(overlays)
        return ({"samples": samples},)

```
