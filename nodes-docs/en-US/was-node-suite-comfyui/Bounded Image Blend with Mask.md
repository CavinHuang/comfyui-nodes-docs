---
tags:
- Image
- ImageBlend
- ImageComposite
---

# Bounded Image Blend with Mask
## Documentation
- Class name: `Bounded Image Blend with Mask`
- Category: `WAS Suite/Image/Bound`
- Output node: `False`

This node specializes in blending two images within specified boundaries using a mask, allowing for precise control over the blending process. It supports feathering and blend factor adjustments to fine-tune the blending effect, making it ideal for applications requiring seamless integration of images.
## Input types
### Required
- **`target`**
    - The target image onto which the source image will be blended. It serves as the backdrop for the blending operation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Image.Image`
- **`target_mask`**
    - A mask image used to define the blending area on the target image. It determines where and how the source image will be blended onto the target.
    - Comfy dtype: `MASK`
    - Python dtype: `Image.Image`
- **`target_bounds`**
    - Specifies the boundaries within the target image where the blending should occur, allowing for precise control over the location of the blend.
    - Comfy dtype: `IMAGE_BOUNDS`
    - Python dtype: `Tuple[int, int, int, int]`
- **`source`**
    - The source image to be blended onto the target image. This image will be manipulated according to the blend factor and feathering settings.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Image.Image`
- **`blend_factor`**
    - A value that controls the intensity of the blending effect, allowing for adjustments in how prominently the source image appears on the target.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`feathering`**
    - The amount of feathering applied to the edges of the blend, creating a smoother transition between the blended images.
    - Comfy dtype: `INT`
    - Python dtype: `float`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The result of the blending operation, featuring the source image seamlessly integrated into the target image within the specified boundaries.
    - Python dtype: `Tuple[Image.Image]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class WAS_Bounded_Image_Blend_With_Mask:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "target": ("IMAGE",),
                "target_mask": ("MASK",),
                "target_bounds": ("IMAGE_BOUNDS",),
                "source": ("IMAGE",),
                "blend_factor": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0}),
                "feathering": ("INT", {"default": 16, "min": 0, "max": 0xffffffffffffffff}),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "bounded_image_blend_with_mask"

    CATEGORY = "WAS Suite/Image/Bound"

    def bounded_image_blend_with_mask(self, target, target_mask, target_bounds, source, blend_factor, feathering):
        # Ensure we are working with batches
        target = target.unsqueeze(0) if target.dim() == 3 else target
        source = source.unsqueeze(0) if source.dim() == 3 else source
        target_mask = target_mask.unsqueeze(0) if target_mask.dim() == 2 else target_mask

        # If number of target masks and source images don't match, then only the first mask will be used on
        # the source images, otherwise, each mask will be used for each source image 1 to 1
        # Simarly, if the number of target images and source images don't match then
        # all source images will be applied only to the first target, otherwise they will be applied
        # 1 to 1
        tgt_mask_len = 1 if len(target_mask) != len(source) else len(source)
        tgt_len = 1 if len(target) != len(source) else len(source)
        bounds_len = 1 if len(target_bounds) != len(source) else len(source)

        tgt_arr = [tensor2pil(tgt) for tgt in target[:tgt_len]]
        src_arr = [tensor2pil(src) for src in source]
        tgt_mask_arr=[]

        # Convert Target Mask(s) to grayscale image format
        for m_idx in range(tgt_mask_len):
            np_array = np.clip((target_mask[m_idx].cpu().numpy().squeeze() * 255.0), 0, 255)
            tgt_mask_arr.append(Image.fromarray((np_array).astype(np.uint8), mode='L'))

        result_tensors = []
        for idx in range(len(src_arr)):
            src = src_arr[idx]
            # If only one target image, then ensure it is the only one used
            if (tgt_len == 1 and idx == 0) or tgt_len > 1:
                tgt = tgt_arr[idx]

            # If only one bounds, no need to extract and calculate more than once
            if (bounds_len == 1 and idx == 0) or bounds_len > 1:
                # Extract the target bounds
                rmin, rmax, cmin, cmax = target_bounds[idx]

                # Calculate the dimensions of the target bounds
                height, width = (rmax - rmin + 1, cmax - cmin + 1)

            # If only one mask, then ensure that is the only the first is used
            if (tgt_mask_len == 1 and idx == 0) or tgt_mask_len > 1:
                tgt_mask = tgt_mask_arr[idx]

            # If only one mask and one bounds, then mask only needs to
            #   be extended once because all targets will be the same size
            if (tgt_mask_len == 1 and bounds_len == 1 and idx == 0) or \
                (tgt_mask_len > 1 or bounds_len > 1):

                # This is an imperfect, but easy way to determine if  the mask based on the
                #   target image or source image. If not target, assume source. If neither,
                #   then it's not going to look right regardless
                if (tgt_mask.size != tgt.size):
                    # Create the blend mask with the same size as the target image
                    mask_extended_canvas = Image.new('L', tgt.size, 0)

                    # Paste the mask portion into the extended mask at the target bounds position
                    mask_extended_canvas.paste(tgt_mask, (cmin, rmin))

                    tgt_mask = mask_extended_canvas

                # Apply feathering (Gaussian blur) to the blend mask if feather_amount is greater than 0
                if feathering > 0:
                    tgt_mask = tgt_mask.filter(ImageFilter.GaussianBlur(radius=feathering))

                # Apply blending factor to the tgt mask now that it has been extended
                tgt_mask = tgt_mask.point(lambda p: p * blend_factor)

            # Resize the source image to match the dimensions of the target bounds
            src_resized = src.resize((width, height), Image.Resampling.LANCZOS)

            # Create a blank image with the same size and mode as the target
            src_positioned = Image.new(tgt.mode, tgt.size)

            # Paste the source image onto the blank image using the target
            src_positioned.paste(src_resized, (cmin, rmin))

            # Blend the source and target images using the blend mask
            result = Image.composite(src_positioned, tgt, tgt_mask)

            # Convert the result back to a PyTorch tensor
            result_tensors.append(pil2tensor(result))

        return (torch.cat(result_tensors, dim=0),)

```
