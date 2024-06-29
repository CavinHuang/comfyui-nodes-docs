---
tags:
- Mask
- MaskMorphology
---

# GrowMaskWithBlur
## Documentation
- Class name: `GrowMaskWithBlur`
- Category: `KJNodes/masking`
- Output node: `False`

The GrowMaskWithBlur node is designed to manipulate masks or batches of masks by expanding or contracting them, optionally applying blur, and performing various other transformations such as flipping, filling holes, and interpolating between frames. This node is versatile in mask processing, allowing for dynamic adjustments and enhancements to mask data.
## Input types
### Required
- **`mask`**
    - The input mask or batch of masks to be processed. It serves as the primary data upon which all transformations are applied.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`expand`**
    - Determines the amount by which the mask(s) will be expanded or contracted. Positive values expand the mask, while negative values contract it.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`incremental_expandrate`**
    - Specifies the rate at which the expand parameter is adjusted per frame, allowing for dynamic resizing over a sequence of masks.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`tapered_corners`**
    - When enabled, applies tapered corners to the mask(s) during expansion or contraction, affecting the shape of the processed mask.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`flip_input`**
    - If set to true, flips the input mask(s) horizontally before any other processing is done.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`blur_radius`**
    - Applies a blur effect to the mask(s) with the specified radius. A value greater than 0 activates this effect.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`lerp_alpha`**
    - The alpha value used for linear interpolation between frames, enabling smooth transitions in animated mask sequences.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`decay_factor`**
    - A decay factor applied to the mask(s) over frames, allowing for gradual fading or intensification of features.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`fill_holes`**
    - When enabled, fills any holes in the mask(s), which can be particularly useful for creating more solid or coherent mask shapes.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`mask`**
    - Comfy dtype: `MASK`
    - The primary output mask after applying the specified transformations.
    - Python dtype: `torch.Tensor`
- **`mask_inverted`**
    - Comfy dtype: `MASK`
    - The inverted version of the primary output mask, providing an alternative visualization or application.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class GrowMaskWithBlur:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "mask": ("MASK",),
                "expand": ("INT", {"default": 0, "min": -MAX_RESOLUTION, "max": MAX_RESOLUTION, "step": 1}),
                "incremental_expandrate": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 100.0, "step": 0.1}),
                "tapered_corners": ("BOOLEAN", {"default": True}),
                "flip_input": ("BOOLEAN", {"default": False}),
                "blur_radius": ("FLOAT", {
                    "default": 0.0,
                    "min": 0.0,
                    "max": 100,
                    "step": 0.1
                }),
                "lerp_alpha": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                "decay_factor": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
            },
            "optional": {
                "fill_holes": ("BOOLEAN", {"default": False}),
            },
        }

    CATEGORY = "KJNodes/masking"
    RETURN_TYPES = ("MASK", "MASK",)
    RETURN_NAMES = ("mask", "mask_inverted",)
    FUNCTION = "expand_mask"
    DESCRIPTION = """
# GrowMaskWithBlur
- mask: Input mask or mask batch
- expand: Expand or contract mask or mask batch by a given amount
- incremental_expandrate: increase expand rate by a given amount per frame
- tapered_corners: use tapered corners
- flip_input: flip input mask
- blur_radius: value higher than 0 will blur the mask
- lerp_alpha: alpha value for interpolation between frames
- decay_factor: decay value for interpolation between frames
- fill_holes: fill holes in the mask (slow)"""
    
    def expand_mask(self, mask, expand, tapered_corners, flip_input, blur_radius, incremental_expandrate, lerp_alpha, decay_factor, fill_holes=False):
        alpha = lerp_alpha
        decay = decay_factor
        if flip_input:
            mask = 1.0 - mask
        c = 0 if tapered_corners else 1
        kernel = np.array([[c, 1, c],
                           [1, 1, 1],
                           [c, 1, c]])
        growmask = mask.reshape((-1, mask.shape[-2], mask.shape[-1])).cpu()
        out = []
        previous_output = None
        current_expand = expand
        for m in growmask:
            output = m.numpy()
            for _ in range(abs(round(current_expand))):
                if current_expand < 0:
                    output = scipy.ndimage.grey_erosion(output, footprint=kernel)
                else:
                    output = scipy.ndimage.grey_dilation(output, footprint=kernel)
            if current_expand < 0:
                current_expand -= abs(incremental_expandrate)
            else:
                current_expand += abs(incremental_expandrate)
            if fill_holes:
                binary_mask = output > 0
                output = scipy.ndimage.binary_fill_holes(binary_mask)
                output = output.astype(np.float32) * 255
            output = torch.from_numpy(output)
            if alpha < 1.0 and previous_output is not None:
                # Interpolate between the previous and current frame
                output = alpha * output + (1 - alpha) * previous_output
            if decay < 1.0 and previous_output is not None:
                # Add the decayed previous output to the current frame
                output += decay * previous_output
                output = output / output.max()
            previous_output = output
            out.append(output)

        if blur_radius != 0:
            # Convert the tensor list to PIL images, apply blur, and convert back
            for idx, tensor in enumerate(out):
                # Convert tensor to PIL image
                pil_image = tensor2pil(tensor.cpu().detach())[0]
                # Apply Gaussian blur
                pil_image = pil_image.filter(ImageFilter.GaussianBlur(blur_radius))
                # Convert back to tensor
                out[idx] = pil2tensor(pil_image)
            blurred = torch.cat(out, dim=0)
            return (blurred, 1.0 - blurred)
        else:
            return (torch.stack(out, dim=0), 1.0 - torch.stack(out, dim=0),)

```
