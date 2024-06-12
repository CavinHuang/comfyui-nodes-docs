---
tags:
- Image
- ImageBlend
- ImageComposite
---

# Bounded Image Blend
## Documentation
- Class name: `Bounded Image Blend`
- Category: `WAS Suite/Image/Bound`
- Output node: `False`

This node is designed to blend two images within specified bounds, allowing for precise control over the blending process. It supports adjusting the blend factor and feathering to achieve smooth transitions between the images.
## Input types
### Required
- **`target`**
    - The target image onto which the source image will be blended. It serves as the base layer in the blending operation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`target_bounds`**
    - Specifies the bounds within which the source image will be blended onto the target. This allows for localized blending within the target image.
    - Comfy dtype: `IMAGE_BOUNDS`
    - Python dtype: `Tuple[int, int, int, int]`
- **`source`**
    - The source image to be blended onto the target. It overlays the target within the specified bounds.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`blend_factor`**
    - Determines the intensity of the source image's influence in the blend. A higher value results in the source image being more prominent.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`feathering`**
    - Applies a smoothing effect to the edges of the blended area, creating a more seamless transition between the source and target images.
    - Comfy dtype: `INT`
    - Python dtype: `float`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The result of blending the source image onto the target within the specified bounds, incorporating the blend factor and feathering for smooth transitions.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class WAS_Bounded_Image_Blend:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "target": ("IMAGE",),
                "target_bounds": ("IMAGE_BOUNDS",),
                "source": ("IMAGE",),
                "blend_factor": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0}),
                "feathering": ("INT", {"default": 16, "min": 0, "max": 0xffffffffffffffff}),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "bounded_image_blend"

    CATEGORY = "WAS Suite/Image/Bound"

    def bounded_image_blend(self, target, target_bounds, source, blend_factor, feathering):
        # Ensure we are working with batches
        target = target.unsqueeze(0) if target.dim() == 3 else target
        source = source.unsqueeze(0) if source.dim() == 3 else source

        # If number of target images and source images don't match then all source images
        # will be applied only to the first target image, otherwise they will be applied
        # 1 to 1
        # If the number of target bounds and source images don't match then all sourcess will
        # use the first target bounds for scaling and placing the source images, otherwise they
        # will be applied 1 to 1
        tgt_len = 1 if len(target) != len(source) else len(source)
        bounds_len = 1 if len(target_bounds) != len(source) else len(source)

        # Convert target PyTorch tensors to PIL images
        tgt_arr = [tensor2pil(tgt) for tgt in target[:tgt_len]]
        src_arr = [tensor2pil(src) for src in source]

        result_tensors = []
        for idx in range(len(src_arr)):
            src = src_arr[idx]
            # If only one target image, then ensure it is the only one used
            if (tgt_len == 1 and idx == 0) or tgt_len > 1:
                tgt = tgt_arr[idx]

            # If only one bounds object, no need to extract and calculate more than once.
            #   Additionally, if only one bounds obuect, then the mask only needs created once
            if (bounds_len == 1 and idx == 0) or bounds_len > 1:
                # Extract the target bounds
                rmin, rmax, cmin, cmax = target_bounds[idx]

                # Calculate the dimensions of the target bounds
                height, width = (rmax - rmin + 1, cmax - cmin + 1)

                # Create the feathered mask portion the size of the target bounds
                if feathering > 0:
                    inner_mask = Image.new('L', (width - (2 * feathering), height - (2 * feathering)), 255)
                    inner_mask = ImageOps.expand(inner_mask, border=feathering, fill=0)
                    inner_mask = inner_mask.filter(ImageFilter.GaussianBlur(radius=feathering))
                else:
                    inner_mask = Image.new('L', (width, height), 255)

                # Create a blend mask using the inner_mask and blend factor
                inner_mask = inner_mask.point(lambda p: p * blend_factor)

                # Create the blend mask with the same size as the target image
                tgt_mask = Image.new('L', tgt.size, 0)
                # Paste the feathered mask portion into the blend mask at the target bounds position
                tgt_mask.paste(inner_mask, (cmin, rmin))

            # Resize the source image to match the dimensions of the target bounds
            src_resized = src.resize((width, height), Image.Resampling.LANCZOS)

            # Create a blank image with the same size and mode as the target
            src_positioned = Image.new(tgt.mode, tgt.size)

            # Paste the source image onto the blank image using the target bounds
            src_positioned.paste(src_resized, (cmin, rmin))

            # Blend the source and target images using the blend mask
            result = Image.composite(src_positioned, tgt, tgt_mask)

            # Convert the result back to a PyTorch tensor
            result_tensors.append(pil2tensor(result))

        return (torch.cat(result_tensors, dim=0),)

```
