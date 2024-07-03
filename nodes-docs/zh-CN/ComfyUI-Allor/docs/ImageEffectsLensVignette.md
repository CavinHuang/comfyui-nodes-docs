
# Documentation
- Class name: ImageEffectsLensVignette
- Category: image/effects/lens
- Output node: False

ImageEffectsLensVignette节点用于给图像添加暗角效果，模拟图像边缘与中心相比亮度或饱和度降低的现象。这种效果模仿了某些相机镜头拍摄的照片的特征外观，为图像的中心主体增添了深度感或焦点感。

# Input types
## Required
- images
    - 将要应用暗角效果的输入图像。这个参数对于定义将要进行变换的基础内容至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- lens_shape
    - 定义暗角效果的形状，影响亮度或饱和度如何向图像边缘衰减。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- lens_edge
    - 指定暗角效果的边缘行为，决定效果如何在图像周围或对称地应用。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- lens_curvy
    - 调整暗角效果的曲率，允许对从中心到边缘的过渡进行更具创意的控制。
    - Comfy dtype: FLOAT
    - Python dtype: float
- lens_zoom
    - 控制暗角效果的缩放级别，影响不受暗角影响的图像区域。
    - Comfy dtype: FLOAT
    - Python dtype: float
- brightness
    - 调整图像的整体亮度，通过修改光线水平来增强暗角效果的视觉影响。
    - Comfy dtype: FLOAT
    - Python dtype: float
- saturation
    - 修改图像的饱和度水平，通过改变颜色的强度来补充暗角效果。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- image
    - 应用暗角效果后的结果图像，通过控制边缘的渐变来突出中心主体的焦点。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- mask
    - 用于应用暗角效果的遮罩，指示图像中受变换影响的区域。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageEffectsLensVignette:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "lens_shape": (["circle", "rectangle"],),
                "lens_edge": (["around", "symmetric"],),
                "lens_curvy": ("FLOAT", {
                    "default": 3.0,
                    "max": 15.0,
                    "step": 0.1,
                }),
                "lens_zoom": ("FLOAT", {
                    "default": 0.0,
                    "step": 0.1,
                }),
                "brightness": ("FLOAT", {
                    "default": 0.25,
                    "max": 1.0,
                    "step": 0.01
                }),
                "saturation": ("FLOAT", {
                    "default": 0.5,
                    "max": 1.0,
                    "step": 0.01
                }),
            },
        }

    RETURN_TYPES = ("IMAGE", "MASK")
    FUNCTION = "node"
    CATEGORY = "image/effects/lens"

    def node(self, images, lens_shape, lens_edge, lens_curvy, lens_zoom, brightness, saturation):
        tensor = images.clone().detach()

        lens_zoom += 1

        height, width = tensor[0, :, :, 0].shape

        if lens_edge == "around":
            mask = radialspace_2D((height, width), lens_curvy, lens_zoom, lens_shape).unsqueeze(0).unsqueeze(3)
        elif lens_edge == "symmetric":
            if height != width:
                new_height = new_width = max(height, width)
                crop_top_bottom = (new_height - height) // 2
                crop_left_right = (new_width - width) // 2

                mask = radialspace_2D((new_height, new_width), lens_curvy, lens_zoom, lens_shape)[
                       crop_top_bottom:-crop_top_bottom or None,
                       crop_left_right:-crop_left_right or None
                ].unsqueeze(0).unsqueeze(3)
            else:
                mask = radialspace_2D((height, width), lens_curvy, lens_zoom, lens_shape).unsqueeze(0).unsqueeze(3)
        else:
            raise ValueError("Not existing lens_edge parameter.")

        tensor = tensor.permute(0, 3, 1, 2)
        tensor[:, 0:3, :, :] = F.adjust_brightness(tensor[:, 0:3, :, :], brightness)
        tensor[:, 0:3, :, :] = F.adjust_saturation(tensor[:, 0:3, :, :], saturation)
        tensor = tensor.permute(0, 2, 3, 1)

        result = images * (1 - mask) + tensor * mask

        mask = mask.squeeze()

        return result, mask

```
