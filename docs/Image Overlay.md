
# Documentation
- Class name: Image Overlay
- Category: Efficiency Nodes/Image
- Output node: False

Image Overlay节点用于将一个图像叠加到另一个图像上，并提供多种自定义选项，如调整大小、旋转、透明度调整和可选的遮罩。该节点通过对叠加图像应用变换和混合技术，然后将其与基础图像合并，从而实现创建复合图像。

# Input types
## Required
- base_image
    - 作为叠加图像应用目标的基础图像。它充当复合图像的背景。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- overlay_image
    - 要叠加到基础图像上的图像。在叠加之前，可以调整此图像的大小、旋转角度和透明度。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- overlay_resize
    - 指定如何调整叠加图像的大小以适应基础图像，选项包括适应尺寸、按因子缩放或调整到特定的宽度和高度。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- resize_method
    - 用于调整叠加图像大小的方法，影响调整后图像的质量和外观。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- rescale_factor
    - 当选择"按rescale_factor调整大小"选项时，叠加图像的缩放因子。
    - Comfy dtype: FLOAT
    - Python dtype: float
- width
    - 当选择"调整到指定宽度和高度"选项时，叠加图像调整后的宽度。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 当选择"调整到指定宽度和高度"选项时，叠加图像调整后的高度。
    - Comfy dtype: INT
    - Python dtype: int
- x_offset
    - 叠加图像在基础图像上放置的水平偏移量。
    - Comfy dtype: INT
    - Python dtype: int
- y_offset
    - 叠加图像在基础图像上放置的垂直偏移量。
    - Comfy dtype: INT
    - Python dtype: int
- rotation
    - 在应用到基础图像之前，叠加图像旋转的角度（以度为单位）。
    - Comfy dtype: INT
    - Python dtype: float
- opacity
    - 叠加图像的不透明度，允许创建透明叠加效果。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- optional_mask
    - 可选的遮罩，可应用于叠加图像，控制叠加图像不同部分的透明度。
    - Comfy dtype: MASK
    - Python dtype: Optional[torch.Tensor]

# Output types
- image
    - 应用叠加后的基础图像，反映了所有指定的变换和调整。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


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
