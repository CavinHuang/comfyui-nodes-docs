---
tags:
- Image
- ImageComposite
---

# Image Overlay
## Documentation
- Class name: `Image Overlay`
- Category: `Efficiency Nodes/Image`
- Output node: `False`

The ImageOverlay node is designed to overlay one image onto another with various customization options such as resizing, rotation, opacity adjustment, and optional masking. This node enables the creation of composite images by applying transformations and blending techniques to the overlay image before merging it with the base image.
## Input types
### Required
- **`base_image`**
    - The base image onto which the overlay image will be applied. It serves as the background for the composite image.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`overlay_image`**
    - The image to be overlaid onto the base image. This image can be resized, rotated, and its opacity adjusted before overlaying.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`overlay_resize`**
    - Specifies how the overlay image should be resized to fit the base image, with options including fitting to dimensions, rescaling by a factor, or resizing to specific width and height.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`resize_method`**
    - The method used for resizing the overlay image, affecting the quality and appearance of the resized image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`rescale_factor`**
    - The factor by which the overlay image is rescaled when the 'Resize by rescale_factor' option is selected.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`width`**
    - The width to which the overlay image is resized when the 'Resize to width & height' option is selected.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - The height to which the overlay image is resized when the 'Resize to width & height' option is selected.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`x_offset`**
    - The horizontal offset at which the overlay image is placed over the base image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`y_offset`**
    - The vertical offset at which the overlay image is placed over the base image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`rotation`**
    - The angle in degrees to rotate the overlay image before applying it to the base image.
    - Comfy dtype: `INT`
    - Python dtype: `float`
- **`opacity`**
    - The opacity level of the overlay image, allowing for transparent overlays.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`optional_mask`**
    - An optional mask that can be applied to the overlay image, controlling the transparency of different parts of the overlay.
    - Comfy dtype: `MASK`
    - Python dtype: `Optional[torch.Tensor]`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The base image after the overlay has been applied, reflecting all specified transformations and adjustments.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class TSC_ImageOverlay:

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "base_image": ("IMAGE",),
                "overlay_image": ("IMAGE",),
                "overlay_resize": (["None", "Fit", "Resize by rescale_factor", "Resize to width & heigth"],),
                "resize_method": (["nearest-exact", "bilinear", "area"],),
                "rescale_factor": ("FLOAT", {"default": 1, "min": 0.01, "max": 16.0, "step": 0.1}),
                "width": ("INT", {"default": 512, "min": 0, "max": MAX_RESOLUTION, "step": 64}),
                "height": ("INT", {"default": 512, "min": 0, "max": MAX_RESOLUTION, "step": 64}),
                "x_offset": ("INT", {"default": 0, "min": -48000, "max": 48000, "step": 10}),
                "y_offset": ("INT", {"default": 0, "min": -48000, "max": 48000, "step": 10}),
                "rotation": ("INT", {"default": 0, "min": -180, "max": 180, "step": 5}),
                "opacity": ("FLOAT", {"default": 0, "min": 0, "max": 100, "step": 5}),
            },
            "optional": {"optional_mask": ("MASK",),}
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "apply_overlay_image"
    CATEGORY = "Efficiency Nodes/Image"

    def apply_overlay_image(self, base_image, overlay_image, overlay_resize, resize_method, rescale_factor,
                            width, height, x_offset, y_offset, rotation, opacity, optional_mask=None):

        # Pack tuples and assign variables
        size = width, height
        location = x_offset, y_offset
        mask = optional_mask

        # Check for different sizing options
        if overlay_resize != "None":
            #Extract overlay_image size and store in Tuple "overlay_image_size" (WxH)
            overlay_image_size = overlay_image.size()
            overlay_image_size = (overlay_image_size[2], overlay_image_size[1])
            if overlay_resize == "Fit":
                h_ratio = base_image.size()[1] / overlay_image_size[1]
                w_ratio = base_image.size()[2] / overlay_image_size[0]
                ratio = min(h_ratio, w_ratio)
                overlay_image_size = tuple(round(dimension * ratio) for dimension in overlay_image_size)
            elif overlay_resize == "Resize by rescale_factor":
                overlay_image_size = tuple(int(dimension * rescale_factor) for dimension in overlay_image_size)
            elif overlay_resize == "Resize to width & heigth":
                overlay_image_size = (size[0], size[1])

            samples = overlay_image.movedim(-1, 1)
            overlay_image = comfy.utils.common_upscale(samples, overlay_image_size[0], overlay_image_size[1], resize_method, False)
            overlay_image = overlay_image.movedim(1, -1)
            
        overlay_image = tensor2pil(overlay_image)

         # Add Alpha channel to overlay
        overlay_image = overlay_image.convert('RGBA')
        overlay_image.putalpha(Image.new("L", overlay_image.size, 255))

        # If mask connected, check if the overlay_image image has an alpha channel
        if mask is not None:
            # Convert mask to pil and resize
            mask = tensor2pil(mask)
            mask = mask.resize(overlay_image.size)
            # Apply mask as overlay's alpha
            overlay_image.putalpha(ImageOps.invert(mask))

        # Rotate the overlay image
        overlay_image = overlay_image.rotate(rotation, expand=True)

        # Apply opacity on overlay image
        r, g, b, a = overlay_image.split()
        a = a.point(lambda x: max(0, int(x * (1 - opacity / 100))))
        overlay_image.putalpha(a)

        # Split the base_image tensor along the first dimension to get a list of tensors
        base_image_list = torch.unbind(base_image, dim=0)

        # Convert each tensor to a PIL image, apply the overlay, and then convert it back to a tensor
        processed_base_image_list = []
        for tensor in base_image_list:
            # Convert tensor to PIL Image
            image = tensor2pil(tensor)

            # Paste the overlay image onto the base image
            if mask is None:
                image.paste(overlay_image, location)
            else:
                image.paste(overlay_image, location, overlay_image)

            # Convert PIL Image back to tensor
            processed_tensor = pil2tensor(image)

            # Append to list
            processed_base_image_list.append(processed_tensor)

        # Combine the processed images back into a single tensor
        base_image = torch.stack([tensor.squeeze() for tensor in processed_base_image_list])

        # Return the edited base image
        return (base_image,)

```
