---
tags:
- LensEffects
- VisualEffects
---

# ImageEffectsLensChromaticAberration
## Documentation
- Class name: `ImageEffectsLensChromaticAberration`
- Category: `image/effects/lens`
- Output node: `False`

This node applies a chromatic aberration effect to images, simulating the way light disperses through a lens, creating a visually distinctive color-fringing effect. It enhances visual content by adding an artistic or realistic touch of lens imperfection, often used to give images a more dynamic or vintage appearance.
## Input types
### Required
- **`images`**
    - The input images to which the chromatic aberration effect will be applied. This parameter is crucial for defining the base content that will undergo the transformation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`shift`**
    - Determines the shift in pixels to simulate the chromatic aberration effect, affecting the displacement of color channels.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`method`**
    - Specifies the method used for handling edge pixels during the chromatic aberration effect, ensuring the effect is applied consistently across the image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`shift_type`**
    - Defines the type of shift applied to the chromatic aberration effect, influencing the direction and nature of the color channel displacement.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`mixing_type`**
    - Controls how the original and shifted color channels are combined, affecting the overall intensity and appearance of the chromatic aberration effect.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`transpose`**
    - Determines if and how the image is transposed before applying the chromatic aberration effect, impacting the orientation of the effect.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`colors`**
    - Selects the color channels to be shifted, directly influencing the color composition of the chromatic aberration effect.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`lens_curvy`**
    - Adjusts the curvature of the lens effect, modifying how pronounced the chromatic aberration appears across the images.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The transformed images with the chromatic aberration effect applied, showcasing the visual enhancement or artistic touch added to the original content.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageEffectsLensChromaticAberration:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "shift": ("INT", {
                    "default": 10,
                    "step": 1,
                }),
                "method": (["reflect", "edge", "constant"],),
                "shift_type": ("INT", {
                    "default": 1,
                    "min": 1,
                    "max": 4,
                    "step": 1,
                }),
                "mixing_type": ("INT", {
                    "default": 1,
                    "min": 1,
                    "max": 4,
                    "step": 1,
                }),
                "transpose": (["none", "rotate", "reflect"],),
                "colors": (["rb", "rg", "gb"],),
                "lens_curvy": ("FLOAT", {
                    "default": 1.0,
                    "max": 15.0,
                    "step": 0.1,
                }),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/effects/lens"

    def node(self, images, shift, method, shift_type, mixing_type, transpose, colors, lens_curvy):
        # noinspection PyUnboundLocalVariable
        def apply(image):
            img = image.clone().detach()

            if transpose == "rotate":
                img = img.permute(1, 0, 2)
            elif transpose == "none" or transpose == "reflect":
                pass
            else:
                raise ValueError("Not existing reverse.")

            r, g, b = img[:, :, 0:3].split(1, 2)
            height, width = img[:, :, 0].shape

            def get_space(size, min_val, max_val):
                size += shift * 2

                if min_val == max_val:
                    return torch.linspace(min_val, max_val, size)
                else:
                    return radialspace_1D(size, lens_curvy, 1.0, min_val, max_val)

            if shift_type == 1:
                f_shifts = get_space(height, -shift, shift)

                if transpose == "reflect":
                    t_shifts = get_space(width, -shift, shift)
            elif shift_type == 2:
                f_shifts = get_space(height, 0, shift)
                f_shifts = torch.flip(f_shifts, dims=(0,))

                if transpose == "reflect":
                    t_shifts = get_space(width, 0, shift)
                    t_shifts = torch.flip(t_shifts, dims=(0,))
            elif shift_type == 3:
                f_shifts = get_space(height, 0, shift)

                if transpose == "reflect":
                    t_shifts = get_space(width, 0, shift)
            elif shift_type == 4:
                f_shifts = get_space(height, shift, shift)

                if transpose == "reflect":
                    t_shifts = get_space(width, shift, shift)
            else:
                raise ValueError("Not existing shift_type.")

            if mixing_type == 1:
                f_shifts = f_shifts
                s_shifts = -f_shifts

                if transpose == "reflect":
                    t_shifts = t_shifts
                    c_shifts = -t_shifts
            elif mixing_type == 2:
                f_shifts = -f_shifts
                s_shifts = f_shifts

                if transpose == "reflect":
                    t_shifts = -t_shifts
                    c_shifts = t_shifts
            elif mixing_type == 3:
                f_shifts = f_shifts
                s_shifts = f_shifts

                if transpose == "reflect":
                    t_shifts = t_shifts
                    c_shifts = t_shifts
            elif mixing_type == 4:
                f_shifts = -f_shifts
                s_shifts = -f_shifts

                if transpose == "reflect":
                    t_shifts = -t_shifts
                    c_shifts = -t_shifts
            else:
                raise ValueError("Not existing mixing_type.")

            if colors == "rb":
                def cat(f_value, s_value):
                    return torch.cat([f_value, g, s_value], 2)

                f = r
                s = b
            elif colors == "rg":
                def cat(f_value, s_value):
                    return torch.cat([f_value, s_value, b], 2)

                f = r
                s = g
            elif colors == "gb":
                def cat(f_value, s_value):
                    return torch.cat([r, f_value, s_value], 2)

                f = g
                s = b
            else:
                raise ValueError("Not existing colors.")

            f_pad = F.pad(f.squeeze(), [shift, shift], padding_mode=method).unsqueeze(2)
            s_pad = F.pad(s.squeeze(), [shift, shift], padding_mode=method).unsqueeze(2)

            f_shifted = torch.zeros_like(f_pad)
            s_shifted = torch.zeros_like(s_pad)

            for i in range(height + (shift * 2)):
                f_shifted[i] = torch.roll(f_pad[i], shifts=int(f_shifts[i]), dims=0)
                s_shifted[i] = torch.roll(s_pad[i], shifts=int(s_shifts[i]), dims=0)

            if transpose == "reflect":
                for i in range(width + (shift * 2)):
                    f_shifted[:, i] = torch.roll(f_shifted[:, i], shifts=int(t_shifts[i]), dims=0)
                    s_shifted[:, i] = torch.roll(s_shifted[:, i], shifts=int(c_shifts[i]), dims=0)

            f_result = f_shifted[shift:-shift, shift:-shift, :]
            s_result = s_shifted[shift:-shift, shift:-shift, :]

            img[:, :, 0:3] = cat(f_result, s_result)

            if transpose == "rotate":
                img = img.permute(1, 0, 2)
            elif transpose == "none" or transpose == "reflect":
                pass
            else:
                raise ValueError("Not existing reverse.")

            return img

        return (torch.stack([
            apply(images[i]) for i in range(len(images))
        ]),)

```
