---
tags:
- Batch
- Image
- ImageBatch
---

# Image Batch
## Documentation
- Class name: `Image Batch`
- Category: `WAS Suite/Image`
- Output node: `False`

The Image Batch node is designed to combine multiple images into a single batch, allowing for operations that require batch processing or collective analysis of images. It ensures that images are compatible in dimensions before batching them together, making it suitable for workflows that involve image manipulation, augmentation, or processing in batches.
## Input types
### Required
### Optional
- **`images_a`**
    - The first image to be included in the batch. It serves as a reference for resizing subsequent images if their dimensions do not match, ensuring uniformity in the batch.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`images_b`**
    - The second image to be included in the batch. It is resized to match the dimensions of the first image if necessary, ensuring that all images in the batch have uniform dimensions.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`images_c`**
    - The third image to be included in the batch, resized if necessary to ensure uniform dimensions across the batch.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`images_d`**
    - The fourth image to be included in the batch, resized if necessary to ensure uniform dimensions across the batch.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is a single batched image, combined from the input images. This batch can be used for further processing or analysis as a collective group.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [FakeScribblePreprocessor](../../comfyui_controlnet_aux/Nodes/FakeScribblePreprocessor.md)



## Source code
```python
class WAS_Image_Batch:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
            },
            "optional": {
                "images_a": ("IMAGE",),
                "images_b": ("IMAGE",),
                "images_c": ("IMAGE",),
                "images_d": ("IMAGE",),
                # "images_e": ("IMAGE",),
                # "images_f": ("IMAGE",),
                # Theoretically, an infinite number of image input parameters can be added.
            },
        }

    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("image",)
    FUNCTION = "image_batch"
    CATEGORY = "WAS Suite/Image"

    def _check_image_dimensions(self, tensors, names):
        reference_dimensions = tensors[0].shape[1:]  # Ignore batch dimension
        mismatched_images = [names[i] for i, tensor in enumerate(tensors) if tensor.shape[1:] != reference_dimensions]

        if mismatched_images:
            raise ValueError(f"WAS Image Batch Warning: Input image dimensions do not match for images: {mismatched_images}")

    def image_batch(self, **kwargs):
        batched_tensors = [kwargs[key] for key in kwargs if kwargs[key] is not None]
        image_names = [key for key in kwargs if kwargs[key] is not None]

        if not batched_tensors:
            raise ValueError("At least one input image must be provided.")

        self._check_image_dimensions(batched_tensors, image_names)
        batched_tensors = torch.cat(batched_tensors, dim=0)
        return (batched_tensors,)

```
