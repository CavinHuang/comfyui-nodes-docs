
# Documentation
- Class name: ImageUpscaleWithModelBatched
- Category: KJNodes/image
- Output node: False

ImageUpscaleWithModelBatched节点是一个优化版的图像放大处理工具。它使用指定的模型对图像进行放大，并通过分批处理来减少显存使用。相比原生ComfyUI的模型放大节点，它在处理大量图像或需要大量计算资源的图像时提供了更高的灵活性。

# Input types
## Required
- upscale_model
    - 用于图像放大的模型。它决定了放大算法及其质量。该参数对节点的性能和输出质量起着关键作用。
    - Comfy dtype: UPSCALE_MODEL
    - Python dtype: torch.nn.Module
- images
    - 需要放大的图像批次。这个输入允许在一次操作中处理多张图像，从而优化了处理效率。它为批量处理提供了便利。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- per_batch
    - 指定每个子批次要处理的图像数量，允许控制放大过程中的显存使用。这个参数可以帮助用户在性能和资源使用之间找到平衡点。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 放大后的图像，以批次形式返回，顺序与输入相同。这种输出方式便于直接比较或进行进一步处理。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


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
