
# Documentation
- Class name: Crop Image TargetSize (JPS)
- Category: JPS Nodes/Image
- Output node: False

Crop Image TargetSize (JPS)节点旨在将图像调整为特定的目标尺寸，并提供裁剪、缩放以及应用各种插值和锐化技术的选项。它通过允许精确控制输出图像的尺寸和质量，为图像处理提供了灵活性，以满足不同的图像操作需求。

# Input types
## Required
- image
    - 需要处理的输入图像。它作为基础，用于裁剪、调整大小和应用其他变换，以满足目标尺寸和质量规格。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- target_w
    - 输出图像的目标宽度。此参数指定图像应调整到的所需宽度，可以通过裁剪或调整大小来实现。
    - Comfy dtype: INT
    - Python dtype: int
- target_h
    - 输出图像的目标高度。与target_w类似，它指定了图像调整的所需高度。
    - Comfy dtype: INT
    - Python dtype: int
- crop_position
    - 指定应从哪个位置裁剪图像。这会影响图像在裁剪到目标尺寸之前的对齐方式。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- offset
    - 在裁剪前调整图像位置时使用的通用偏移值。它允许微调裁剪对齐。
    - Comfy dtype: INT
    - Python dtype: int
- interpolation
    - 用于调整图像大小的方法。不同的插值技术可能会影响图像的质量和外观。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- sharpening
    - 决定是否以及在多大程度上锐化输出图像，以增强其细节和整体清晰度。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- IMAGE
    - 经过指定的裁剪、缩放、插值和锐化变换处理后的图像。它代表满足目标尺寸和质量标准的最终输出。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class Crop_Image_TargetSize:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("IMAGE",),
                "target_w": ("INT", { "default": 0 , "min": 0, "step": 8, "display": "number" }),
                "target_h": ("INT", { "default": 0 , "min": 0, "step": 8, "display": "number" }),                
                "crop_position": (["center","top", "bottom", "left", "right"],),
                "offset": ("INT", { "default": 0, "min": -2048, "max": 2048, "step": 1, "display": "number" }),
                "interpolation": (["lanczos", "nearest", "bilinear", "bicubic", "area", "nearest-exact"],),
                "sharpening": ("FLOAT", {"default": 0.0, "min": 0, "max": 1, "step": 0.05}),
            }
        }
    
    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("IMAGE",)
    FUNCTION = "crop_targetsize"
    CATEGORY = "JPS Nodes/Image"

    def crop_targetsize(self, image, target_w, target_h, crop_position, offset, interpolation, sharpening):
        _, current_h, current_w, _ = image.shape

        current_ar = current_w / current_h

        if target_w / current_ar >= target_h:
            new_w = target_w
            new_h = round(new_w / current_ar)
            offset_h = offset
            offset_w = 0
        else:
            new_h = target_h
            new_w = round(new_h * current_ar)
            offset_w = offset
            offset_h = 0

  #      print("New Size")
  #      print(new_w)
  #      print(new_h)

        resized_image = image.permute([0,3,1,2])

        if interpolation == "lanczos":
            resized_image = comfy.utils.lanczos(resized_image, new_w, new_h)
        else:
            resized_image = F.interpolate(resized_image, size=(new_h, new_w), mode=interpolation)

        resized_image = resized_image.permute([0,2,3,1])

        output_image = resized_image

        if (crop_position == "left"):
            newoffset_w = offset_w
        elif (crop_position == "right"):
            newoffset_w = new_w - target_w + offset_w
        else:
            newoffset_w = (new_w - target_w) // 2 + offset_w

        if (crop_position == "top"):
            newoffset_h = offset_h
        elif (crop_position == "bottom"):
            newoffset_h = new_h - target_h + offset_h
        else:
            newoffset_h = (new_h - target_h) // 2 + offset_h

        if newoffset_w < 0:
            newoffset_w = 0
        elif newoffset_w + target_w > new_w:
            newoffset_w = new_w - target_w

        if newoffset_h < 0:
            newoffset_h = 0
        elif newoffset_h + target_h > new_h:
            newoffset_h = new_h - target_h
        
        x = newoffset_w
        x2 = newoffset_w+target_w
        y = newoffset_h
        y2 = newoffset_h+target_h

 #       print("x: "+str(x))
 #       print("x2: "+str(x2))
 #       print("y: "+str(y))
 #       print("y2: "+str(y2))

        if sharpening > 0:
            output_image = contrast_adaptive_sharpening(output_image, sharpening)

        output_image = output_image[:, y:y2, x:x2, :]

        return(output_image, )

```
