
# Documentation
- Class name: ImageEffectsLensBokeh
- Category: image/effects/lens
- Output node: False

ImageEffectsLensBokeh 节点用于为图像添加散景效果，模拟真实相机镜头在对焦区域外产生的美学模糊效果。该节点通过调整与镜头特性和模糊强度相关的参数，创造出视觉上吸引人的效果，模仿真实相机镜头的行为。

# Input types
## Required
- images
    - 需要应用散景效果的输入图像。这个参数对于定义将要进行变换的基础内容至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- blades_shape
    - 定义模拟散景效果的镜头形状，影响模糊的整体外观。
    - Comfy dtype: INT
    - Python dtype: int
- blades_radius
    - 指定镜头光圈叶片的半径，影响散景模糊的大小和形状。
    - Comfy dtype: INT
    - Python dtype: int
- blades_rotation
    - 确定镜头光圈叶片的旋转角度，影响散景模糊的方向。
    - Comfy dtype: FLOAT
    - Python dtype: float
- blur_size
    - 设置模糊效果的大小，允许微调散景效果在图像上的显著程度。
    - Comfy dtype: INT
    - Python dtype: int
- blur_type
    - 指定要应用的模糊类型，提供不同的方法来实现散景效果。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- method
    - 确定应用镜头模糊的方法，影响散景效果的最终外观。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- image
    - 应用散景效果后的转换图像，展示通过模拟镜头特性和调整模糊效果所实现的视觉增强。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageEffectsLensBokeh:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "blades_shape": ("INT", {
                    "default": 5,
                    "min": 3,
                }),
                "blades_radius": ("INT", {
                    "default": 10,
                    "min": 1,
                }),
                "blades_rotation": ("FLOAT", {
                    "default": 0.0,
                    "min": 0.0,
                    "max": 360.0,
                }),
                "blur_size": ("INT", {
                    "default": 10,
                    "min": 1,
                    "step": 2
                }),
                "blur_type": (["bilateral", "stack", "none"],),
                "method": (["dilate", "filter"],),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/effects/lens"

    # noinspection PyUnresolvedReferences
    def lens_blur(self, image, blades_shape, blades_radius, blades_rotation, method):
        angles = np.linspace(0, 2 * np.pi, blades_shape + 1)[:-1] + blades_rotation * np.pi / 180
        x = blades_radius * np.cos(angles) + blades_radius
        y = blades_radius * np.sin(angles) + blades_radius
        pts = np.stack([x, y], axis=1).astype(np.int32)

        mask = np.zeros((blades_radius * 2 + 1, blades_radius * 2 + 1), np.uint8)
        cv2.fillPoly(mask, [pts], 255)

        gaussian_kernel = np.array([[0, -1, 0], [-1, 5, -1], [0, -1, 0]])

        if method == "dilate":
            kernel = cv2.filter2D(mask, -1, gaussian_kernel)
            result = cv2.dilate(image, kernel)
        elif method == "filter":
            height, width = image.shape[:2]
            dilate_size = min(height, width) // 512

            if dilate_size > 0:
                image = cv2.dilate(image, np.ones((dilate_size, dilate_size), np.uint8))

            kernel = mask.astype(np.float32) / np.sum(mask)
            kernel = cv2.filter2D(kernel, -1, gaussian_kernel)
            result = cv2.filter2D(image, -1, kernel)
        else:
            raise ValueError("Unsupported method.")

        return result

    def node(self, images, blades_shape, blades_radius, blades_rotation, blur_size, blur_type, method):
        tensor = images.clone().detach()
        blur_size -= 1

        if blur_type == "bilateral":
            tensor = cv2_layer(tensor, lambda x: cv2.bilateralFilter(x, blur_size, -100, 100))
        elif blur_type == "stack":
            tensor = cv2_layer(tensor, lambda x: cv2.stackBlur(x, (blur_size, blur_size)))
        elif blur_type == "none":
            pass
        else:
            raise ValueError("Unsupported blur type.")

        return (cv2_layer(tensor, lambda x: self.lens_blur(
            x, blades_shape, blades_radius, blades_rotation, method
        )),)

```
