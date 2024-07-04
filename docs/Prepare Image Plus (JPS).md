
# Documentation
- Class name: `Prepare Image Plus (JPS)`
- Category: `JPS Nodes/Image`
- Output node: `False`

Prepare Image Plus节点旨在配置并应用一系列图像预处理设置，包括调整大小、裁剪、填充、插值、锐化和翻转。它允许对图像处理方式进行详细定制，确保图像在用于后续操作（如机器学习模型输入或视觉呈现）之前得到最佳准备。

# Input types
## Required
- image
    - 主要的图像输入，用于处理。该参数至关重要，因为它指定了将应用所有预处理设置的图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- target_w
    - 指定调整大小后图像的目标宽度，影响处理后图像的最终尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- target_h
    - 指定调整大小后图像的目标高度，影响处理后图像的最终尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- offset_w
    - 确定应用于图像的水平偏移量，可以调整图像的位置或对齐方式。
    - Comfy dtype: INT
    - Python dtype: int
- offset_h
    - 确定应用于图像的垂直偏移量，影响图像在垂直方向上的位置或对齐方式。
    - Comfy dtype: INT
    - Python dtype: int
- crop_left
    - 指定从图像左侧裁剪的数量，用于去除不需要的边缘或构图。
    - Comfy dtype: INT
    - Python dtype: int
- crop_right
    - 指定从图像右侧裁剪的数量，有助于构图或去除多余部分。
    - Comfy dtype: INT
    - Python dtype: int
- crop_top
    - 确定从图像顶部裁剪的数量，可以帮助调整构图或聚焦图像的特定部分。
    - Comfy dtype: INT
    - Python dtype: int
- crop_bottom
    - 确定从图像底部裁剪的数量，用于构图或去除不必要的部分。
    - Comfy dtype: INT
    - Python dtype: int
- padding_left
    - 指定添加到图像左侧的填充量，可用于对齐或美观目的。
    - Comfy dtype: INT
    - Python dtype: int
- padding_right
    - 指定添加到图像右侧的填充量，有助于对齐或视觉设计。
    - Comfy dtype: INT
    - Python dtype: int
- padding_top
    - 确定添加到图像顶部的填充量，可用于对齐或实现特定的视觉效果。
    - Comfy dtype: INT
    - Python dtype: int
- padding_bottom
    - 确定添加到图像底部的填充量，用于对齐或实现所需的视觉布局。
    - Comfy dtype: INT
    - Python dtype: int
- interpolation
    - 定义用于调整图像大小的方法，影响调整大小后图像的质量和外观。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- sharpening
    - 指定应用于图像的锐化程度，增强边缘定义和细节。
    - Comfy dtype: FLOAT
    - Python dtype: float
- resize_type
    - 确定应用于图像的调整大小方法，如拉伸或裁剪以适应指定的尺寸。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- flip
    - 指示图像是否应水平、垂直翻转或不翻转，影响图像的方向。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- IMAGE
    - Comfy dtype: IMAGE
    - 输出是应用了指定预处理设置（包括调整大小、裁剪、填充、插值、锐化和翻转）后的图像。
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Prepare_Image_Plus:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("IMAGE",),
                "target_w": ("INT", { "default": 1024 , "min": 0, "step": 8, "display": "number" }),
                "target_h": ("INT", { "default": 1024 , "min": 0, "step": 8, "display": "number" }),
                "offset_w": ("INT", { "default": 0, "min": -99, "max": 99, "step": 1, "display": "number" }),
                "offset_h": ("INT", { "default": 0, "min": -99, "max": 99, "step": 1, "display": "number" }),
                "crop_left": ("INT", { "default": 0, "min": 0, "max": 90, "step": 1, "display": "number" }),
                "crop_right": ("INT", { "default": 0, "min": 0, "max": 90, "step": 1, "display": "number" }),
                "crop_top": ("INT", { "default": 0, "min": 0, "max": 90, "step": 1, "display": "number" }),
                "crop_bottom": ("INT", { "default": 0, "min": 0, "max": 90, "step": 1, "display": "number" }),
                "padding_left": ("INT", { "default": 0, "min": 0, "max": 500, "step": 1, "display": "number" }),
                "padding_right": ("INT", { "default": 0, "min": 0, "max": 500, "step": 1, "display": "number" }),
                "padding_top": ("INT", { "default": 0, "min": 0, "max": 500, "step": 1, "display": "number" }),
                "padding_bottom": ("INT", { "default": 0, "min": 0, "max": 500, "step": 1, "display": "number" }),
                "interpolation": (["lanczos", "nearest", "bilinear", "bicubic", "area", "nearest-exact"],),
                "sharpening": ("FLOAT", {"default": 0.0, "min": 0, "max": 1, "step": 0.05}),
                "resize_type": (["Crop", "Stretch"],),
                "flip": (["No", "X-Axis", "Y-Axis"],),
            }
        }
    
    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("IMAGE",)
    FUNCTION = "prepare_image"
    CATEGORY = "JPS Nodes/Image"

    def prepare_image(self, image, target_w, target_h, offset_w, offset_h, crop_left, crop_right, crop_top, crop_bottom, padding_left, padding_right, padding_top, padding_bottom,interpolation, sharpening,resize_type,flip):
        _, input_h, input_w, _ = image.shape

        dim = ()
        if flip == "X-Axis":
            dim += (2,)
            image = torch.flip(image, dim)            
        if flip == "Y-Axis":
            dim += (2,)
            image = torch.flip(image, dim)

        if crop_left + crop_right > 90:
            crop_left = 90 / (crop_left + crop_right) * crop_left
            crop_right = 90 / (crop_left + crop_right) * crop_right
        
        if crop_top + crop_bottom > 90:
            crop_top = 90 / (crop_top + crop_bottom) * crop_top
            crop_bottom = 90 / (crop_top + crop_bottom) * crop_bottom

        left = int(input_w-(input_w * (100-crop_left) / 100))
        right = int(input_w-(input_w * (100-crop_right) / 100))
        top = int(input_h-(input_h * (100-crop_top) / 100))
        bottom = int(input_h-(input_h * (100-crop_bottom) / 100))
        
        image = image[:, 0+top:input_h-bottom, 0+left:input_w-right, :]
  
        input_h = input_h - top - bottom
        input_w = input_w - left - right
  
        left = int(((input_w * (100+padding_left) / 100) - input_w))
        right = int(((input_w * (100+padding_right) / 100) - input_w))
        top = int(((input_h * (100+padding_top) / 100) - input_h))
        bottom = int(((input_h * (100+padding_bottom) / 100) - input_h))

        pil_image = Image.fromarray(np.clip(255. * image.cpu().numpy().squeeze(), 0, 255).astype(np.uint8))
        padded_image = Image.new("RGB", (pil_image.width + left + right, pil_image.height + top + bottom), color="black")
        padded_image.paste(pil_image, (left, top))
        image = torch.from_numpy(np.array(padded_image).astype(np.float32) / 255.0).unsqueeze(0)

        input_h = input_h + top + bottom
        input_w = input_w + left + right

        if resize_type != "Stretch":

            resize_needed_w = target_w / input_w 
            resize_needed_h = target_h / input_h 

            if resize_needed_w >= resize_needed_h:
                min_zoom_factor = resize_needed_w
            else:
                min_zoom_factor = resize_needed_h

            zoom_factor = min_zoom_factor

            zoomed_w = round(input_w * zoom_factor)
            zoomed_h = round(input_h * zoom_factor)

            offset_w = int(zoomed_w / 100 * offset_w / 2)
            offset_h = int(zoomed_h / 100 * offset_h / 2)

            resized_image = image.permute([0,3,1,2])

            if interpolation == "lanczos":
                resized_image = comfy.utils.lanczos(resized_image, zoomed_w, zoomed_h)
            else:
                resized_image = F.interpolate(resized_image, size=(zoomed_h, zoomed_w), mode=interpolation)

            resized_image = resized_image.permute([0,2,3,1])

            x0 = round((zoomed_w - target_w) / 2)
            x1 = round(x0 + target_w)
            y0 = round((zoomed_h - target_h) / 2)
            y1 = round(y0 + target_h)

            if x0 + offset_w + target_w < zoomed_w and offset_w > 0:
                x0 = x0 + offset_w
                x1 = x0 + target_w
            elif x0 + offset_w + target_w >= zoomed_w and offset_w > 0:
                x0 = zoomed_w - target_w 
                x1 = zoomed_w
            elif x0 + offset_w > 0 and offset_w < 0:
                    x0 = x0 + offset_w
                    x1 = x0 + target_w
            elif x0 + offset_w <= 0 and offset_w < 0:
                    x0 = 0
                    x1 = target_w

            if y0 + offset_h + target_h < zoomed_h and offset_h > 0:
                y0 = y0 + offset_h
                y1 = y0 + target_h
            elif y0 + offset_h + target_h >= zoomed_h and offset_h > 0:
                y0 = zoomed_h - target_h 
                y1 = zoomed_h
            elif y0 + offset_h > 0 and offset_h < 0:
                    y0 = y0 + offset_h
                    y1 = y0 + target_h
            elif y0 + offset_h <= 0 and offset_h < 0:
                    y0 = 0
                    y1 = target_h
            output_image = resized_image

            output_image = output_image[:, y0:y1, x0:x1, :]

        else:

            resized_image = image.permute([0,3,1,2])

            if interpolation == "lanczos":
                resized_image = comfy.utils.lanczos(resized_image, target_w, target_h)
            else:
                resized_image = F.interpolate(resized_image, size=(target_h, target_w), mode=interpolation)

            resized_image = resized_image.permute([0,2,3,1])
            output_image = resized_image

        if sharpening > 0:
            output_image = contrast_adaptive_sharpening(output_image, sharpening)

        return(output_image,)

```
