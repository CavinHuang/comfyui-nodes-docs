---
tags:
- VAE
---

# VAE Encode (for Inpainting)
## Documentation
- Class name: `VAEEncodeForInpaint`
- Category: `latent/inpaint`
- Output node: `False`

This node is designed for encoding images into a latent representation suitable for inpainting tasks, incorporating additional preprocessing steps to adjust the input image and mask for optimal encoding by the VAE model.
## Input types
### Required
- **`pixels`**
    - The input image to be encoded. This image undergoes preprocessing and resizing to match the VAE model's expected input dimensions before encoding.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`vae`**
    - The VAE model used for encoding the image into its latent representation. It plays a crucial role in the transformation process, determining the quality and characteristics of the output latent space.
    - Comfy dtype: `VAE`
    - Python dtype: `torch.nn.Module`
- **`mask`**
    - A mask indicating the regions of the input image to be inpainted. It is used to modify the image before encoding, ensuring that the VAE focuses on the relevant areas.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`grow_mask_by`**
    - Specifies how much to expand the inpainting mask to ensure seamless transitions in the latent space. A larger value increases the area affected by inpainting.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The output includes the encoded latent representation of the image and a noise mask, both crucial for subsequent inpainting tasks.
    - Python dtype: `Dict[str, torch.Tensor]`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [VHS_DuplicateLatents](../../ComfyUI-VideoHelperSuite/Nodes/VHS_DuplicateLatents.md)
    - [KSampler](../../Comfy/Nodes/KSampler.md)
    - Reroute
    - [KSampler Adv. (Efficient)](../../efficiency-nodes-comfyui/Nodes/KSampler Adv. (Efficient).md)
    - Fast Muter (rgthree)
    - [KSampler (Efficient)](../../efficiency-nodes-comfyui/Nodes/KSampler (Efficient).md)
    - [VAEDecode](../../Comfy/Nodes/VAEDecode.md)



## Source code
```python
class VAEEncodeForInpaint:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "pixels": ("IMAGE", ), "vae": ("VAE", ), "mask": ("MASK", ), "grow_mask_by": ("INT", {"default": 6, "min": 0, "max": 64, "step": 1}),}}
    RETURN_TYPES = ("LATENT",)
    FUNCTION = "encode"

    CATEGORY = "latent/inpaint"

    def encode(self, vae, pixels, mask, grow_mask_by=6):
        x = (pixels.shape[1] // vae.downscale_ratio) * vae.downscale_ratio
        y = (pixels.shape[2] // vae.downscale_ratio) * vae.downscale_ratio
        mask = torch.nn.functional.interpolate(mask.reshape((-1, 1, mask.shape[-2], mask.shape[-1])), size=(pixels.shape[1], pixels.shape[2]), mode="bilinear")

        pixels = pixels.clone()
        if pixels.shape[1] != x or pixels.shape[2] != y:
            x_offset = (pixels.shape[1] % vae.downscale_ratio) // 2
            y_offset = (pixels.shape[2] % vae.downscale_ratio) // 2
            pixels = pixels[:,x_offset:x + x_offset, y_offset:y + y_offset,:]
            mask = mask[:,:,x_offset:x + x_offset, y_offset:y + y_offset]

        #grow mask by a few pixels to keep things seamless in latent space
        if grow_mask_by == 0:
            mask_erosion = mask
        else:
            kernel_tensor = torch.ones((1, 1, grow_mask_by, grow_mask_by))
            padding = math.ceil((grow_mask_by - 1) / 2)

            mask_erosion = torch.clamp(torch.nn.functional.conv2d(mask.round(), kernel_tensor, padding=padding), 0, 1)

        m = (1.0 - mask.round()).squeeze(1)
        for i in range(3):
            pixels[:,:,:,i] -= 0.5
            pixels[:,:,:,i] *= m
            pixels[:,:,:,i] += 0.5
        t = vae.encode(pixels)

        return ({"samples":t, "noise_mask": (mask_erosion[:,:,:x,:y].round())}, )

```
