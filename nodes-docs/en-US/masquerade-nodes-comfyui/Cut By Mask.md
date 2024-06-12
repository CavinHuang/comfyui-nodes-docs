---
tags:
- Image
- ImageComposite
---

# Cut By Mask
## Documentation
- Class name: `Cut By Mask`
- Category: `Masquerade Nodes`
- Output node: `False`

The 'Cut By Mask' node is designed to precisely extract or isolate parts of an image based on a specified mask. It allows for the resizing of the cut-out image to specific dimensions, optionally handling multiple image segments in a batch when provided with mask mappings from a 'Separate Mask Components' node.
## Input types
### Required
- **`image`**
    - The input image to be processed. It serves as the primary canvas from which parts will be cut out based on the mask.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`mask`**
    - The mask that defines the areas of the input image to be cut out. It acts as a stencil, specifying which parts of the image are to be extracted or isolated.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`force_resize_width`**
    - An optional width to which the cut-out image(s) will be resized. If specified, it overrides the natural size of the cut-out segments, enabling uniformity in output dimensions.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`force_resize_height`**
    - An optional height to which the cut-out image(s) will be resized. Similar to force_resize_width, it allows for the standardization of output sizes across different cut-outs.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`mask_mapping_optional`**
    - An optional mapping of mask components, typically provided by a 'Separate Mask Components' node. It enables the cutting of multiple image segments in a single operation, based on distinct mask parts.
    - Comfy dtype: `MASK_MAPPING`
    - Python dtype: `torch.Tensor`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output image(s) after being cut by the mask. This can be a single image or multiple images, depending on whether mask mapping was used, resized as specified.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [Paste By Mask](../../masquerade-nodes-comfyui/Nodes/Paste By Mask.md)



## Source code
```python
class CutByMask:
    """
    Cuts the image to the bounding box of the mask. If force_resize_width or force_resize_height are provided, the image will be resized to those dimensions. The `mask_mapping_optional` input can be provided from a 'Separate Mask Components' node to cut multiple pieces out of a single image in a batch.
    """
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
                "mask": ("IMAGE",),
                "force_resize_width": ("INT", {"default": 0, "min": 0, "max": VERY_BIG_SIZE, "step": 1}),
                "force_resize_height": ("INT", {"default": 0, "min": 0, "max": VERY_BIG_SIZE, "step": 1}),
            },
            "optional": {
                "mask_mapping_optional": ("MASK_MAPPING",),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "cut"

    CATEGORY = "Masquerade Nodes"

    def cut(self, image, mask, force_resize_width, force_resize_height, mask_mapping_optional = None):
        if len(image.shape) < 4:
            C = 1
        else:
            C = image.shape[3]

        # We operate on RGBA to keep the code clean and then convert back after
        image = tensor2rgba(image)
        mask = tensor2mask(mask)

        if mask_mapping_optional is not None:
            image = image[mask_mapping_optional]

        # Scale the mask to be a matching size if it isn't
        B, H, W, _ = image.shape
        mask = torch.nn.functional.interpolate(mask.unsqueeze(1), size=(H, W), mode='nearest')[:,0,:,:]
        MB, _, _ = mask.shape

        if MB < B:
            assert(B % MB == 0)
            mask = mask.repeat(B // MB, 1, 1)

        # masks_to_boxes errors if the tensor is all zeros, so we'll add a single pixel and zero it out at the end
        is_empty = ~torch.gt(torch.max(torch.reshape(mask,[MB, H * W]), dim=1).values, 0.)
        mask[is_empty,0,0] = 1.
        boxes = masks_to_boxes(mask)
        mask[is_empty,0,0] = 0.

        min_x = boxes[:,0]
        min_y = boxes[:,1]
        max_x = boxes[:,2]
        max_y = boxes[:,3]

        width = max_x - min_x + 1
        height = max_y - min_y + 1

        use_width = int(torch.max(width).item())
        use_height = int(torch.max(height).item())

        if force_resize_width > 0:
            use_width = force_resize_width

        if force_resize_height > 0:
            use_height = force_resize_height

        alpha_mask = torch.ones((B, H, W, 4))
        alpha_mask[:,:,:,3] = mask

        image = image * alpha_mask

        result = torch.zeros((B, use_height, use_width, 4))
        for i in range(0, B):
            if not is_empty[i]:
                ymin = int(min_y[i].item())
                ymax = int(max_y[i].item())
                xmin = int(min_x[i].item())
                xmax = int(max_x[i].item())
                single = (image[i, ymin:ymax+1, xmin:xmax+1,:]).unsqueeze(0)
                resized = torch.nn.functional.interpolate(single.permute(0, 3, 1, 2), size=(use_height, use_width), mode='bicubic').permute(0, 2, 3, 1)
                result[i] = resized[0]

        # Preserve our type unless we were previously RGB and added non-opaque alpha due to the mask size
        if C == 1:
            return (tensor2mask(result),)
        elif C == 3 and torch.min(result[:,:,:,3]) == 1:
            return (tensor2rgb(result),)
        else:
            return (result,)

```
