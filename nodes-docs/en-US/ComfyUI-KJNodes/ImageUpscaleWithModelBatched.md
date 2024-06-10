---
tags:
- ImageScaling
- ImageUpscaling
- Upscale
---

# ImageUpscaleWithModelBatched
## Documentation
- Class name: `ImageUpscaleWithModelBatched`
- Category: `KJNodes/image`
- Output node: `False`

This node is designed to upscale images using a specified model, with the added functionality of processing images in sub-batches to reduce VRAM usage. It is an enhancement over the native ComfyUI model upscaling node, offering more flexibility in handling large sets of images or images requiring significant computational resources.
## Input types
### Required
- **`upscale_model`**
    - The model used for upscaling images. It determines the upscaling algorithm and its quality.
    - Comfy dtype: `UPSCALE_MODEL`
    - Python dtype: `torch.nn.Module`
- **`images`**
    - The batch of images to be upscaled. This input allows for multiple images to be processed in a single operation, optimizing throughput.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`per_batch`**
    - Specifies the number of images to process per sub-batch, allowing for control over VRAM usage during upscaling.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The upscaled images, returned as a batch with the same order as the input. This allows for direct comparison or further processing.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageUpscaleWithModelBatched:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "upscale_model": ("UPSCALE_MODEL",),
                              "images": ("IMAGE",),
                              "per_batch": ("INT", {"default": 16, "min": 1, "max": 4096, "step": 1}),
                              }}
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "upscale"
    CATEGORY = "KJNodes/image"
    DESCRIPTION = """
Same as ComfyUI native model upscaling node,  
but allows setting sub-batches for reduced VRAM usage.
"""
    def upscale(self, upscale_model, images, per_batch):
        
        device = model_management.get_torch_device()
        upscale_model.to(device)
        in_img = images.movedim(-1,-3).to(device)
        
        steps = in_img.shape[0]
        pbar = comfy.utils.ProgressBar(steps)
        t = []
        
        for start_idx in range(0, in_img.shape[0], per_batch):
            sub_images = upscale_model(in_img[start_idx:start_idx+per_batch])
            t.append(sub_images.cpu())
            # Calculate the number of images processed in this batch
            batch_count = sub_images.shape[0]
            # Update the progress bar by the number of images processed in this batch
            pbar.update(batch_count)
        upscale_model.cpu()
        
        t = torch.cat(t, dim=0).permute(0, 2, 3, 1).cpu()

        return (t,)

```
