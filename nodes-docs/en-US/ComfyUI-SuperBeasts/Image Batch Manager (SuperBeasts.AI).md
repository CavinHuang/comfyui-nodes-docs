---
tags:
- Batch
- Image
- ImageBatch
---

# Image Batch Manager (SuperBeasts.AI)
## Documentation
- Class name: `Image Batch Manager (SuperBeasts.AI)`
- Category: `SuperBeastsAI/Image`
- Output node: `False`

The Image Batch Manager node is designed to reorder and process a batch of images based on specified dimensions and an optional new order. It enables the dynamic resizing and cropping of images to fit desired dimensions, and optionally reorders them according to a custom sequence, facilitating versatile image batch manipulation for various applications.
## Input types
### Required
- **`width`**
    - Specifies the desired width for the output images, affecting the resizing and cropping operation to ensure images meet this width requirement.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Specifies the desired height for the output images, affecting the resizing and cropping operation to ensure images meet this height requirement.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`ordering_enabled`**
    - Determines whether the reordering functionality is enabled, allowing images to be rearranged according to the 'new_order' parameter if specified. This parameter enables or disables the ability to customize the sequence of the image batch.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`new_order`**
    - Defines a custom sequence for reordering the images when 'ordering_enabled' is set to 'enabled', influencing the final arrangement of the image batch. This parameter should be a comma-separated list of indices representing the new order of images.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`image1`**
    - Represents one of up to twelve possible images to be included in the batch processing, contributing to the dynamic resizing, cropping, and optional reordering.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`image2`**
    - Represents one of up to twelve possible images to be included in the batch processing, contributing to the dynamic resizing, cropping, and optional reordering.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`image3`**
    - Represents one of up to twelve possible images to be included in the batch processing, contributing to the dynamic resizing, cropping, and optional reordering.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`image4`**
    - Represents one of up to twelve possible images to be included in the batch processing, contributing to the dynamic resizing, cropping, and optional reordering.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`image5`**
    - Represents one of up to twelve possible images to be included in the batch processing, contributing to the dynamic resizing, cropping, and optional reordering.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`image6`**
    - Represents one of up to twelve possible images to be included in the batch processing, contributing to the dynamic resizing, cropping, and optional reordering.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`image7`**
    - Represents one of up to twelve possible images to be included in the batch processing, contributing to the dynamic resizing, cropping, and optional reordering.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`image8`**
    - Represents one of up to twelve possible images to be included in the batch processing, contributing to the dynamic resizing, cropping, and optional reordering.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`image9`**
    - Represents one of up to twelve possible images to be included in the batch processing, contributing to the dynamic resizing, cropping, and optional reordering.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`image10`**
    - Represents one of up to twelve possible images to be included in the batch processing, contributing to the dynamic resizing, cropping, and optional reordering.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`image11`**
    - Represents one of up to twelve possible images to be included in the batch processing, contributing to the dynamic resizing, cropping, and optional reordering.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`image12`**
    - Represents one of up to twelve possible images to be included in the batch processing, contributing to the dynamic resizing, cropping, and optional reordering.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The processed batch of images, resized, cropped, and optionally reordered according to the specified parameters.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageBatchManagement:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "width": ("INT", {"default": 512}),
                "height": ("INT", {"default": 768}),
                "ordering_enabled": (["disabled", "enabled"], {"default": "disabled"})
            },
            "optional": {
                "new_order": ("STRING", {"default": ""}),
                **{f"image{i}": ("IMAGE",) for i in range(1, 13)}
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "reorder"
    CATEGORY = "SuperBeastsAI/Image"

    def reorder(self, width, height, ordering_enabled, new_order, **kwargs):
        image_keys = [f'image{i}' for i in range(1, 13)]
        images = [kwargs.get(key) for key in image_keys if kwargs.get(key) is not None]

        if ordering_enabled == "enabled" and new_order:
            order_indices = [int(idx) - 1 for idx in new_order.split(',') if idx.strip()]
            images = [images[idx] for idx in order_indices if idx < len(images)]

        processed_images = []
        for img in images:
            pil_img = tensor2pil(img)
            resized_cropped_img = resize_and_crop(pil_img, width, height)
            img_tensor = pil2tensor(resized_cropped_img)
            processed_images.append(img_tensor)

        result = torch.cat(processed_images, dim=0) if processed_images else torch.empty(0, 3, height, width)
        return (result,)

```
