
# Documentation
- Class name: ImageEffectsLensOpticAxis
- Category: image/effects/lens
- Output node: False

ImageEffectsLensOpticAxis节点用于在图像上应用镜头光轴效果，根据镜头形状、边缘、曲率、缩放、亮度和饱和度等参数操纵图像的外观。它创建一个蒙版来选择性地应用变换，模拟镜头光轴对输入图像的光学效果。

# Input types
## Required
- images
    - 将应用镜头光轴效果的输入图像。这个参数至关重要，因为它作为效果应用的基础。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- lens_shape
    - 定义应用于图像的镜头效果的形状，影响光轴效果的整体外观。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- lens_edge
    - 指定镜头效果的边缘行为，决定效果如何在图像边界处淡化或过渡。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- lens_curvy
    - 调整镜头效果的曲率，允许自定义光轴效果的强度和形状。
    - Comfy dtype: FLOAT
    - Python dtype: float
- lens_zoom
    - 控制镜头效果的缩放级别，影响光轴效果在图像上的比例和强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- lens_aperture
    - 决定镜头效果的光圈大小，影响图像中的景深和焦点区域。
    - Comfy dtype: FLOAT
    - Python dtype: float
- blur_intensity
    - 设置与镜头光轴效果一起应用的模糊效果的强度，有助于整体模拟相机镜头的视觉效果。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 应用镜头光轴效果后的图像，展示了变换后的外观。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- mask
    - 用于应用镜头光轴效果的蒙版，指示图像中受变换影响的区域。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageEffectsLensOpticAxis:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "lens_shape": (["circle", "square", "rectangle", "corners"],),
                "lens_edge": (["around", "symmetric"],),
                "lens_curvy": ("FLOAT", {
                    "default": 4.0,
                    "max": 15.0,
                    "step": 0.1,
                }),
                "lens_zoom": ("FLOAT", {
                    "default": 2.0,
                    "step": 0.1,
                }),
                "lens_aperture": ("FLOAT", {
                    "default": 0.5,
                    "max": 10.0,
                    "step": 0.1,
                }),
                "blur_intensity": ("INT", {
                    "default": 30,
                    "min": 2,
                    "step": 2
                }),
            },
        }

    RETURN_TYPES = ("IMAGE", "MASK")
    FUNCTION = "node"
    CATEGORY = "image/effects/lens"

    def node(self, images, lens_shape, lens_edge, lens_curvy, lens_zoom, lens_aperture, blur_intensity):
        blur_intensity -= 1
        lens_zoom += 1

        height, width = images[0, :, :, 0].shape

        if lens_edge == "around":
            mask = radialspace_2D((height, width), lens_curvy, lens_zoom, lens_shape, 0.0, 1.0 + lens_curvy).unsqueeze(0).unsqueeze(3)
        elif lens_edge == "symmetric":
            if height != width:
                new_height = new_width = max(height, width)
                crop_top_bottom = (new_height - height) // 2
                crop_left_right = (new_width - width) // 2

                mask = radialspace_2D((new_height, new_width), lens_curvy, lens_zoom, lens_shape, 0.0, 1.0 + lens_curvy)[
                   crop_top_bottom:-crop_top_bottom or None,
                   crop_left_right:-crop_left_right or None
                ].unsqueeze(0).unsqueeze(3)
            else:
                mask = radialspace_2D((height, width), lens_curvy, lens_zoom, lens_shape, 0.0, 1.0 + lens_curvy).unsqueeze(0).unsqueeze(3)
        else:
            raise ValueError("Not existing lens_edge parameter.")

        center_x = width // 2
        center_y = height // 2

        y_v, x_v = torch.meshgrid(torch.arange(height), torch.arange(width), indexing='ij')

        dx = x_v - center_x
        dy = y_v - center_y

        distance = torch.sqrt(dx ** 2 + dy ** 2)

        map_x = x_v + mask[0, :, :, 0] * dx / distance * (-lens_aperture * 100)
        map_y = y_v + mask[0, :, :, 0] * dy / distance * (-lens_aperture * 100)

        map_x = map_x.to(torch.float32).numpy()
        map_y = map_y.to(torch.float32).numpy()

        shifted_images = cv2_layer(images, lambda x: cv2.remap(x, map_x, map_y, cv2.INTER_LINEAR))
        shifted_mask = cv2_layer(mask, lambda x: cv2.remap(x, map_x, map_y, cv2.INTER_LINEAR))
        edited_images = cv2_layer(shifted_images, lambda x: cv2.stackBlur(x, (blur_intensity, blur_intensity)))

        mask = torch.clamp(mask, 0.0, 1.0)
        shifted_mask = torch.clamp(shifted_mask, 0.0, 1.0)

        result = shifted_images * (1 - mask) + edited_images * mask

        return result, shifted_mask

```
