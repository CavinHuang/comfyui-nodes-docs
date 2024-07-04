
# Documentation
- Class name: ImageEffectsLensChromaticAberration
- Category: image/effects/lens
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

此节点应用色差效果到图像上，模拟光线通过镜头时的色散现象，创造出具有视觉特色的色彩边缘效果。它通过添加艺术性或真实的镜头瑕疵来增强视觉内容，常用于赋予图像更动态或复古的外观。

# Input types
## Required
- images
    - 将应用色差效果的输入图像。这个参数对于定义将要进行变换的基础内容至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- shift
    - 确定模拟色差效果的像素偏移量，影响颜色通道的位移程度。
    - Comfy dtype: INT
    - Python dtype: int
- method
    - 指定在应用色差效果时处理边缘像素的方法，确保效果在整个图像上一致应用。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- shift_type
    - 定义应用于色差效果的偏移类型，影响颜色通道位移的方向和性质。
    - Comfy dtype: INT
    - Python dtype: int
- mixing_type
    - 控制原始和偏移颜色通道的混合方式，影响色差效果的整体强度和外观。
    - Comfy dtype: INT
    - Python dtype: int
- transpose
    - 决定在应用色差效果之前是否以及如何转置图像，影响效果的方向。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- colors
    - 选择要偏移的颜色通道，直接影响色差效果的颜色组成。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- lens_curvy
    - 调整镜头效果的曲率，修改色差在图像上的显著程度。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- image
    - 应用了色差效果的转换后图像，展示了对原始内容添加的视觉增强或艺术效果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


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
