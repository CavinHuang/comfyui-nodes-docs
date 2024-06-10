---
tags:
- Batch
- Image
- ImageSplitting
---

# Split Image Batch 🎥🅥🅗🅢
## Documentation
- Class name: `VHS_SplitImages`
- Category: `Video Helper Suite 🎥🅥🅗🅢/image`
- Output node: `False`

The VHS_SplitImages node is designed to divide a batch of images into two groups based on a specified index. This functionality is essential for workflows that require the separation of image data for further processing or analysis.
## Input types
### Required
- **`images`**
    - The 'images' parameter represents the batch of images to be split. It is crucial for determining how the images are divided into two groups.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`split_index`**
    - The 'split_index' parameter specifies the index at which the batch of images is split. It plays a pivotal role in defining the boundary between the two resulting groups of images.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`IMAGE_A`**
    - Comfy dtype: `IMAGE`
    - The first group of images obtained after the split.
    - Python dtype: `torch.Tensor`
- **`A_count`**
    - Comfy dtype: `INT`
    - The count of images in the first group after the split.
    - Python dtype: `int`
- **`IMAGE_B`**
    - Comfy dtype: `IMAGE`
    - The second group of images obtained after the split.
    - Python dtype: `torch.Tensor`
- **`B_count`**
    - Comfy dtype: `INT`
    - The count of images in the second group after the split.
    - Python dtype: `int`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [SVD_img2vid_Conditioning](../../Comfy/Nodes/SVD_img2vid_Conditioning.md)
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)
    - [SeargeIntegerMath](../../SeargeSDXL/Nodes/SeargeIntegerMath.md)
    - [VHS_SplitImages](../../ComfyUI-VideoHelperSuite/Nodes/VHS_SplitImages.md)
    - [STMFNet VFI](../../ComfyUI-Frame-Interpolation/Nodes/STMFNet VFI.md)



## Source code
```python
class SplitImages:
    @classmethod
    def INPUT_TYPES(s):
        return {
                "required": {
                    "images": ("IMAGE",),
                    "split_index": ("INT", {"default": 0, "step": 1, "min": BIGMIN, "max": BIGMAX}),
                },
            }
    
    CATEGORY = "Video Helper Suite 🎥🅥🅗🅢/image"

    RETURN_TYPES = ("IMAGE", "INT", "IMAGE", "INT")
    RETURN_NAMES = ("IMAGE_A", "A_count", "IMAGE_B", "B_count")
    FUNCTION = "split_images"

    def split_images(self, images: Tensor, split_index: int):
        group_a = images[:split_index]
        group_b = images[split_index:]
        return (group_a, group_a.size(0), group_b, group_b.size(0))

```
