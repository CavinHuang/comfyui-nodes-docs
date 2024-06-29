---
tags:
- VAE
---

# Inpainting VAE Encode (WAS)
## Documentation
- Class name: `VAEEncodeForInpaint (WAS)`
- Category: `latent/inpaint`
- Output node: `False`

This node is designed for encoding images for inpainting tasks using a Variational Autoencoder (VAE). It processes images, masks, and mask offsets to generate latent representations that are suitable for inpainting, adjusting the input mask based on the specified offset to prepare the image for encoding.
## Input types
### Required
- **`pixels`**
    - The input image to be encoded for inpainting. It plays a crucial role in determining the output latent representation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`vae`**
    - The Variational Autoencoder (VAE) model used for encoding the input image into a latent representation.
    - Comfy dtype: `VAE`
    - Python dtype: `VAE`
- **`mask`**
    - A mask indicating the regions of the image to be inpainted. It is used to modify the input image before encoding.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`mask_offset`**
    - An integer specifying how much to modify the mask by. This affects the area of the image to be inpainted by either expanding or contracting the masked region.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The latent representation of the input image, suitable for use in inpainting tasks.
    - Python dtype: `Dict[str, torch.Tensor]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class WAS_VAEEncodeForInpaint:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "pixels": ("IMAGE", ), "vae": ("VAE", ), "mask": ("MASK", ), "mask_offset": ("INT", {"default": 6, "min": -128, "max": 128, "step": 1}),}}
    RETURN_TYPES = ("LATENT",)
    FUNCTION = "encode"

    CATEGORY = "latent/inpaint"

    def encode(self, vae, pixels, mask, mask_offset=6):
        x = (pixels.shape[1] // 8) * 8
        y = (pixels.shape[2] // 8) * 8
        mask = torch.nn.functional.interpolate(mask.reshape((-1, 1, mask.shape[-2], mask.shape[-1])), size=(pixels.shape[1], pixels.shape[2]), mode="bilinear")

        pixels = pixels.clone()
        if pixels.shape[1] != x or pixels.shape[2] != y:
            x_offset = (pixels.shape[1] % 8) // 2
            y_offset = (pixels.shape[2] % 8) // 2
            pixels = pixels[:,x_offset:x + x_offset, y_offset:y + y_offset,:]
            mask = mask[:,:,x_offset:x + x_offset, y_offset:y + y_offset]

        mask_erosion = self.modify_mask(mask, mask_offset)

        m = (1.0 - mask_erosion.round()).squeeze(1)
        for i in range(3):
            pixels[:,:,:,i] -= 0.5
            pixels[:,:,:,i] *= m
            pixels[:,:,:,i] += 0.5
        t = vae.encode(pixels)

        return ({"samples":t, "noise_mask": (mask_erosion[:,:,:x,:y].round())}, )
        
    def modify_mask(self, mask, modify_by):
        if modify_by == 0:
            return mask
        if modify_by > 0:
            kernel_size = 2 * modify_by + 1
            kernel_tensor = torch.ones((1, 1, kernel_size, kernel_size))
            padding = modify_by
            modified_mask = torch.clamp(torch.nn.functional.conv2d(mask.round(), kernel_tensor, padding=padding), 0, 1)
        else:
            kernel_size = 2 * abs(modify_by) + 1
            kernel_tensor = torch.ones((1, 1, kernel_size, kernel_size))
            padding = abs(modify_by)
            eroded_mask = torch.nn.functional.conv2d(1 - mask.round(), kernel_tensor, padding=padding)
            modified_mask = torch.clamp(1 - eroded_mask, 0, 1)
        return modified_mask

```
