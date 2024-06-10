---
tags:
- Image
- VisualEffects
---

# 🎨 Halftone Filter
## Documentation
- Class name: `CR Halftone Filter`
- Category: `🧩 Comfyroll Studio/👾 Graphics/🎨 Filter`
- Output node: `False`

The CR Halftone Filter node applies a halftone effect to images, simulating the look of classic print media by transforming images into a pattern of dots. This node supports various customization options, including dot size, shape, and resolution, as well as color channel separation for more detailed control over the halftone effect.
## Input types
### Required
- **`image`**
    - The input image to apply the halftone effect to. This node accepts both PIL Images and PyTorch tensors, automatically converting tensors to PIL Images if necessary.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Union[torch.Tensor, PIL.Image.Image]`
- **`dot_size`**
    - Specifies the size of the dots in the halftone pattern, allowing for control over the granularity of the effect.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`dot_shape`**
    - Determines the shape of the dots in the halftone pattern, offering customization of the visual style of the halftone effect.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`resolution`**
    - Controls the resolution of the output image, with options for normal or high resolution, affecting the scale of the halftone effect.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`angle_c`**
    - The angle of the cyan color channel in the CMYK color space, allowing for precise control over the orientation of the halftone dots.
    - Comfy dtype: `INT`
    - Python dtype: `float`
- **`angle_m`**
    - The angle of the magenta color channel in the CMYK color space, enabling adjustment of the halftone dot orientation for this color.
    - Comfy dtype: `INT`
    - Python dtype: `float`
- **`angle_y`**
    - The angle of the yellow color channel in the CMYK color space, used to set the orientation of the halftone dots for this color.
    - Comfy dtype: `INT`
    - Python dtype: `float`
- **`angle_k`**
    - The angle for the black (key) color channel in the CMYK color space, allowing for customization of the halftone dot orientation.
    - Comfy dtype: `INT`
    - Python dtype: `float`
- **`greyscale`**
    - A boolean indicating whether the image should be converted to greyscale before applying the halftone effect, simplifying the color palette.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`antialias`**
    - A boolean indicating whether antialiasing should be applied, smoothing the edges of the halftone dots for a cleaner appearance.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`antialias_scale`**
    - Defines the scale factor used during antialiasing to adjust the image size temporarily, enhancing the smoothness of the halftone dots.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`border_blending`**
    - A boolean indicating whether border blending should be applied, potentially softening the transition between the halftone dots and the image background.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`IMAGE`**
    - Comfy dtype: `IMAGE`
    - The output image after applying the halftone effect, converted to RGB format regardless of the original color space.
    - Python dtype: `torch.Tensor`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL string providing additional help and documentation for the CR Halftone Filter node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_HalftoneFilter:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
    
        shapes = ["ellipse", "rectangle"]
        rez = ["normal", "hi-res (2x output size)"]
    
        return {
            "required": {
                "image": ("IMAGE",),
                "dot_size": ("INT", {"default": 5, "min": 1, "max": 30, "step": 1}),
                "dot_shape": (shapes, {"default": "ellipse"}),
                #"scale": ("INT", {"default": 1, "min": 1, "max": 8, "step": 1}),
                "resolution": (rez, {"default": "normal"}),
                "angle_c": ("INT", {"default": 75, "min": 0, "max": 360, "step": 1}),
                "angle_m": ("INT", {"default": 45, "min": 0, "max": 360, "step": 1}),
                "angle_y": ("INT", {"default": 15, "min": 0, "max": 360, "step": 1}),
                "angle_k": ("INT", {"default": 0, "min": 0, "max": 360, "step": 1}),
                "greyscale": ("BOOLEAN", {"default": True}),
                "antialias": ("BOOLEAN", {"default": True}),
                "antialias_scale": ("INT", {"default": 2, "min": 1, "max": 4, "step": 1}),
                "border_blending":  ("BOOLEAN", {"default": False}),                       
            },
        }

    RETURN_TYPES = ("IMAGE", "STRING", )
    RETURN_NAMES = ("IMAGE", "show_help", )
    FUNCTION = "halftone_effect"
    CATEGORY = icons.get("Comfyroll/Graphics/Filter")
                 
    def tensor_to_pil(self, tensor):
        if tensor.ndim == 4 and tensor.shape[0] == 1:  # Check for batch dimension
            tensor = tensor.squeeze(0)  # Remove batch dimension
        if tensor.dtype == torch.float32:  # Check for float tensors
            tensor = tensor.mul(255).byte()  # Convert to range [0, 255] and change to byte type
        elif tensor.dtype != torch.uint8:  # If not float and not uint8, conversion is needed
            tensor = tensor.byte()  # Convert to byte type

        numpy_image = tensor.cpu().numpy()

        # Determine the correct mode based on the number of channels
        if tensor.ndim == 3:
            if tensor.shape[2] == 1:
                mode = 'L'  # Grayscale
            elif tensor.shape[2] == 3:
                mode = 'RGB'  # RGB
            elif tensor.shape[2] == 4:
                mode = 'RGBA'  # RGBA
            else:
                raise ValueError(f"Unsupported channel number: {tensor.shape[2]}")
        else:
            raise ValueError(f"Unexpected tensor shape: {tensor.shape}")

        pil_image = Image.fromarray(numpy_image, mode)
        return pil_image

    def pil_to_tensor(self, pil_image):
        numpy_image = np.array(pil_image)
        tensor = torch.from_numpy(numpy_image).float().div(255)  # Convert to range [0, 1]
        tensor = tensor.unsqueeze(0)  # Add batch dimension
        return tensor
        
    def halftone_effect(self, image, dot_size, dot_shape, resolution, angle_c, angle_m, angle_y, angle_k, greyscale, antialias, border_blending, antialias_scale):
        
        sample = dot_size
        shape = dot_shape
        
        # Map resolution to scale
        resolution_to_scale = {
            "normal": 1,
            "hi-res (2x output size)": 2,
        }
        scale = resolution_to_scale.get(resolution, 1)  # Default to 1 if resolution is not recognized
             
         # If the input is a PyTorch tensor, convert to PIL Image
        if isinstance(image, torch.Tensor):
            image = self.tensor_to_pil(image)
        
        # Ensure the image is a PIL Image
        if not isinstance(image, Image.Image):
            raise TypeError("The provided image is neither a PIL Image nor a PyTorch tensor.")

        pil_image = image  # Now we are sure pil_image is defined

        # Convert to greyscale or CMYK
        if greyscale:
            pil_image = pil_image.convert("L")
            channel_images = [pil_image]
            angles = [angle_k]
        else:
            pil_image = pil_image.convert("CMYK")
            channel_images = list(pil_image.split())
            angles = [angle_c, angle_m, angle_y, angle_k]

        # Apply the halftone effect using PIL
        halftone_images = self._halftone_pil(pil_image, channel_images, sample, scale, angles, antialias, border_blending, antialias_scale, shape)

        # Merge channels and convert to RGB
        if greyscale:
            new_image = halftone_images[0].convert("RGB")  # Convert the greyscale image to RGB
        else:
            new_image = Image.merge("CMYK", halftone_images).convert("RGB")
        
        result_tensor = self.pil_to_tensor(new_image)

        # Debug print to check the final tensor shape
        print("Final tensor shape:", result_tensor.shape)

        return (result_tensor, show_help, ) 

    def _halftone_pil(self, im, cmyk, sample, scale, angles, antialias, border_blending, antialias_scale, shape):
        # If we're antialiasing, we'll multiply the size of the image by this
        # scale while drawing, and then scale it back down again afterwards.
        antialias_res = antialias_scale if antialias else 1
        scale = scale * antialias_res

        dots = []

        for channel_index, (channel, angle) in enumerate(zip(cmyk, angles)):
            channel = channel.rotate(angle, expand=1)
            size = channel.size[0] * scale, channel.size[1] * scale
            half_tone = Image.new("L", size)
            draw = ImageDraw.Draw(half_tone)

            # Cycle through one sample point at a time, drawing a circle for
            # each one:
            for x in range(0, channel.size[0], sample):
                for y in range(0, channel.size[1], sample):

                    # Adjust the sampling near the borders for non-square angles
                    if border_blending and angle % 90 != 0 and (x < sample or y < sample or x > channel.size[0] - sample or y > channel.size[1] - sample):
                        # Get a weighted average of the neighboring pixels
                        neighboring_pixels = channel.crop((max(x - 1, 0), max(y - 1, 0), min(x + 2, channel.size[0]), min(y + 2, channel.size[1])))
                        pixels = list(neighboring_pixels.getdata())
                        weights = [0.5 if i in [0, len(pixels)-1] else 1 for i in range(len(pixels))]
                        weighted_mean = sum(p * w for p, w in zip(pixels, weights)) / sum(weights)
                        mean = weighted_mean
                    else:
                        # Area we sample to get the level:
                        box = channel.crop((x, y, x + sample, y + sample))
                        # The average level for that box (0-255):
                        mean = ImageStat.Stat(box).mean[0]

                    # The diameter or side length of the shape to draw based on the mean (0-1):
                    size = (mean / 255) ** 0.5

                    # Size of the box we'll draw the circle in:
                    box_size = sample * scale

                    # Diameter or side length of shape we'll draw:
                    draw_size = size * box_size

                    # Position of top-left of box we'll draw the circle in:
                    box_x, box_y = (x * scale), (y * scale)

                    # Positioned of top-left and bottom-right of circle:
                    x1 = box_x + ((box_size - draw_size) / 2)
                    y1 = box_y + ((box_size - draw_size) / 2)
                    x2 = x1 + draw_size
                    y2 = y1 + draw_size

                    # Draw the shape based on the variable passed
                    draw_method = getattr(draw, shape, None)
                    if draw_method:
                        draw_method([(x1, y1), (x2, y2)], fill=255)

            half_tone = half_tone.rotate(-angle, expand=1)
            width_half, height_half = half_tone.size

            # Top-left and bottom-right of the image to crop to:
            xx1 = (width_half - im.size[0] * scale) / 2
            yy1 = (height_half - im.size[1] * scale) / 2
            xx2 = xx1 + im.size[0] * scale
            yy2 = yy1 + im.size[1] * scale

            half_tone = half_tone.crop((xx1, yy1, xx2, yy2))

            if antialias:
                # Scale it back down to antialias the image.
                w = int((xx2 - xx1) / antialias_scale)
                h = int((yy2 - yy1) / antialias_scale)
                half_tone = half_tone.resize((w, h), resample=Image.LANCZOS)

            dots.append(half_tone)
            
            show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Filter-Nodes#cr-halftone-filter"

        return (dots, show_help, )  

```
