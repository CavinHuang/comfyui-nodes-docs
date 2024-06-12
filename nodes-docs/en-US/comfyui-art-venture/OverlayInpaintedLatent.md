---
tags:
- Image
- ImageComposite
---

# Overlay Inpainted Latent
## Documentation
- Class name: `OverlayInpaintedLatent`
- Category: `Art Venture/Inpainting`
- Output node: `False`

The OverlayInpaintedLatent node is designed to blend original and inpainted latent representations based on a given mask, producing a seamless overlay where the inpainted content is integrated with the original content. This process is crucial for applications in art and image editing, where maintaining the integrity of the original image while incorporating new elements is essential.
## Input types
### Required
- **`original`**
    - The 'original' input represents the original latent representation before any inpainting has been applied. It serves as the base for the overlay process, ensuring that the inpainted content is integrated in a way that respects the original image's structure and content.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`inpainted`**
    - The 'inpainted' input contains the latent representation of the inpainted areas. It is crucial for the overlay process, as it provides the new content that will be blended with the original latent representation based on the mask.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`mask`**
    - The 'mask' input specifies the areas of the original latent representation that should be replaced or blended with the inpainted content. It plays a key role in determining how the original and inpainted representations are combined during the overlay process.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The output is a latent representation that combines the original and inpainted content based on the provided mask, resulting in a seamless integration of both elements.
    - Python dtype: `Dict[str, torch.Tensor]`
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
