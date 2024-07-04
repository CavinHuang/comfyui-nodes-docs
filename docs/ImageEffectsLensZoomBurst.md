
# Documentation
- Class name: `ImageEffectsLensZoomBurst`
- Category: `image/effects/lens`
- Output node: `False`

ImageEffectsLensZoomBurst节点用于为图像应用放大爆炸效果，通过动态缩放、旋转和可选的稳定处理来改变图像外观，从而创造出类似运动的视觉效果。该节点旨在通过模拟快速放大效果来增强视觉内容，常用于为图像特定区域添加戏剧性效果或焦点。

# Input types
## Required
- **`images`**
    - 需要应用放大爆炸效果的输入图像。这些图像是变换的主要对象，效果参数将应用于其上以创造所需的视觉效果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- **`scale`**
    - 定义放大爆炸效果的缩放因子，决定了在效果应用过程中图像会被放大或缩小的程度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- **`samples`**
    - 指定创建放大爆炸效果时使用的样本数量，影响最终输出的平滑度和强度。
    - Comfy dtype: INT
    - Python dtype: int
- **`position_x`**
    - 放大爆炸效果在图像中心的x坐标位置，允许针对特定图像区域进行有针对性的视觉强调。
    - Comfy dtype: FLOAT
    - Python dtype: int
- **`position_y`**
    - 放大爆炸效果在图像中心的y坐标位置，允许针对特定图像区域进行有针对性的视觉强调。
    - Comfy dtype: FLOAT
    - Python dtype: int
- **`rotation`**
    - 确定与放大效果一起应用于图像的旋转角度，为视觉效果增添动态扭转。
    - Comfy dtype: FLOAT
    - Python dtype: float
- **`method`**
    - 应用放大爆炸效果的方法，可能影响效果的外观和性能。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- **`stabilization`**
    - 指示是否应用稳定技术来减少潜在的模糊或失真效果，增强放大爆炸的视觉清晰度。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: bool

# Output types
- **`image`**
    - 应用放大爆炸效果后的输出图像，展示了经过变换的视觉外观，呈现出预期的动态、类似运动的视觉效果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageEffectsLensZoomBurst:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "scale": ("FLOAT", {
                    "default": 1.5,
                    "min": 1.0,
                    "step": 0.01
                }),
                "samples": ("INT", {
                    "default": 100,
                    "min": 1,
                }),
                "position_x": ("FLOAT", {
                    "default": 0.5,
                    "max": 1.0,
                    "step": 0.01
                }),
                "position_y": ("FLOAT", {
                    "default": 0.5,
                    "max": 1.0,
                    "step": 0.01
                }),
                "rotation": ("FLOAT", {
                    "default": 0.0,
                    "min": 0.0,
                    "max": 360.0,
                }),
                "method": (["circle", "point"],),
                "stabilization": (["true", "false"],),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/effects/lens"

    # noinspection PyUnresolvedReferences
    def zoom_burst(
            self,
            image,
            scale,
            samples,
            position,
            rotation,
            method,
            stabilization,
    ):
        if scale < 1.0:
            raise ValueError("Parameter scale can't be smaller then initial image size.")

        h, w = image.shape[:2]

        x = np.arange(w)
        y = np.arange(h)

        xx, yy = np.meshgrid(x, y)

        cx = int(w * position[0])
        cy = int(h * position[1])

        if method == "circle":
            d = np.sqrt((xx - cx) ** 2 + (yy - cy) ** 2)
            max_d = np.sqrt((w / 2) ** 2 + (h / 2) ** 2)

            map_x_up = (xx - d * (scale - 1.0) / max_d * (xx - cx) / samples).astype(np.float32)
            map_y_up = (yy - d * (scale - 1.0) / max_d * (yy - cy) / samples).astype(np.float32)

            map_x_down = (xx + d * (scale - 1.0) / max_d * (xx - cx) / samples).astype(np.float32)
            map_y_down = (yy + d * (scale - 1.0) / max_d * (yy - cy) / samples).astype(np.float32)
        elif method == "point":
            map_x_up = (xx - (xx - cx) * (scale - 1.0) / samples).astype(np.float32)
            map_y_up = (yy - (yy - cy) * (scale - 1.0) / samples).astype(np.float32)

            map_x_down = (xx + (xx - cx) * (scale - 1.0) / samples).astype(np.float32)
            map_y_down = (yy + (yy - cy) * (scale - 1.0) / samples).astype(np.float32)
        else:
            raise ValueError("Unsupported method.")

        if rotation > 0.0:
            angle_step = rotation / samples

            rm_up = cv2.getRotationMatrix2D((cx, cy), angle_step, 1)
            rm_down = cv2.getRotationMatrix2D((cx, cy), -angle_step, 1)
        else:
            vibration_angle = 1.0
            vibration_step = vibration_angle / samples

            rm_up_even = cv2.getRotationMatrix2D((cx, cy), vibration_step, 1)
            rm_down_even = cv2.getRotationMatrix2D((cx, cy), -vibration_step, 1)

            rm_up_odd = cv2.getRotationMatrix2D((cx, cy), -vibration_step, 1)
            rm_down_odd = cv2.getRotationMatrix2D((cx, cy), vibration_step, 1)

        for i in range(samples):
            if stabilization:
                tmp_up = cv2.remap(image, map_x_up, map_y_up, cv2.INTER_LINEAR)
                tmp_down = cv2.remap(image, map_x_down, map_y_down, cv2.INTER_LINEAR, borderMode=cv2.BORDER_REFLECT)

                if rotation > 0.0:
                    tmp_up = cv2.warpAffine(tmp_up, rm_up, (w, h), borderMode=cv2.BORDER_REFLECT)
                    tmp_down = cv2.warpAffine(tmp_down, rm_down, (w, h), borderMode=cv2.BORDER_REFLECT)
                else:
                    if i % 2 == 0:
                        tmp_up = cv2.warpAffine(tmp_up, rm_up_even, (w, h), borderMode=cv2.BORDER_REFLECT)
                        tmp_down = cv2.warpAffine(tmp_down, rm_down_even, (w, h), borderMode=cv2.BORDER_REFLECT)
                    else:
                        tmp_up = cv2.warpAffine(tmp_up, rm_up_odd, (w, h), borderMode=cv2.BORDER_REFLECT)
                        tmp_down = cv2.warpAffine(tmp_down, rm_down_odd, (w, h), borderMode=cv2.BORDER_REFLECT)

                image = cv2.addWeighted(tmp_up, 0.5, tmp_down, 0.5, 0)
            else:
                tmp = cv2.remap(image, map_x_up, map_y_up, cv2.INTER_LINEAR)

                if rotation > 0.0:
                    rm = cv2.getRotationMatrix2D((cx, cy), angle_step, 1)
                    tmp = cv2.warpAffine(tmp, rm, (w, h), borderMode=cv2.BORDER_REFLECT)
                else:
                    if i % 2 == 0:
                        tmp = cv2.warpAffine(tmp, rm_up_even, (w, h), borderMode=cv2.BORDER_REFLECT)
                    else:
                        tmp = cv2.warpAffine(tmp, rm_up_odd, (w, h), borderMode=cv2.BORDER_REFLECT)

                image = cv2.addWeighted(tmp, 0.5, image, 0.5, 0)

        return image

    def node(self, images, scale, samples, position_x, position_y, rotation, method, stabilization):
        tensor = images.clone().detach()

        return (cv2_layer(tensor, lambda x: self.zoom_burst(
            x, scale, samples, (position_x, position_y), rotation, method, True if stabilization == "true" else False
        )),)

```
