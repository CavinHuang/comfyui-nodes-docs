
# Documentation
- Class name: `ImageTransformRotate`
- Category: `image/transform`
- Output node: `False`

ImageTransformRotate节点用于将一批图像旋转指定角度。它支持可选的图像扩展以完全容纳旋转后的图像，并采用超采样抗锯齿(SSAA)技术以获得更高质量的结果。该节点可以处理各种旋转方法，为图像变换任务提供了灵活性。

# Input types
## Required
- **`images`**
    - 要旋转的图像批次。这个参数至关重要，因为它指定了将要进行旋转的输入图像。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]
- **`angle`**
    - 图像将被旋转的角度。这个参数决定了应用于批次中每个图像的旋转程度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- **`expand`**
    - 一个布尔标志，指示是否应扩展图像以适应旋转后的图像而不进行裁剪。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: bool
- **`SSAA`**
    - 指示应用于图像的超采样抗锯齿级别，以提高旋转质量。更高的SSAA值会产生更平滑的边缘和减少锯齿，从而提高旋转图像的视觉质量。
    - Comfy dtype: INT
    - Python dtype: int
- **`method`**
    - 指定用于旋转图像的方法，允许采用不同的图像旋转方法。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- **`image`**
    - 旋转后的图像，以批次形式返回。这个输出反映了在应用指定旋转和任何额外处理步骤后的变换图像。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageTransformRotate:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "angle": ("FLOAT", {
                    "default": 35.0,
                    "max": 360.0,
                    "step": 0.1
                }),
                "expand": (["true", "false"],),
                "SSAA": ("INT", {
                    "default": 4,
                    "min": 1,
                    "max": 16,
                    "step": 1
                }),
                "method": (["lanczos", "bicubic", "hamming", "bilinear", "box", "nearest"],),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/transform"

    def node(self, images, angle, expand, SSAA, method):
        height, width = images[0, :, :, 0].shape

        def rotate_tensor(tensor):
            if method == "lanczos":
                resize_sampler = Image.LANCZOS
                rotate_sampler = Image.BICUBIC
            elif method == "bicubic":
                resize_sampler = Image.BICUBIC
                rotate_sampler = Image.BICUBIC
            elif method == "hamming":
                resize_sampler = Image.HAMMING
                rotate_sampler = Image.BILINEAR
            elif method == "bilinear":
                resize_sampler = Image.BILINEAR
                rotate_sampler = Image.BILINEAR
            elif method == "box":
                resize_sampler = Image.BOX
                rotate_sampler = Image.NEAREST
            elif method == "nearest":
                resize_sampler = Image.NEAREST
                rotate_sampler = Image.NEAREST
            else:
                raise ValueError()

            if SSAA > 1:
                img = tensor.tensor_to_image()
                img_us_scaled = img.resize((width * SSAA, height * SSAA), resize_sampler)
                img_rotated = img_us_scaled.rotate(angle, rotate_sampler, expand == "true", fillcolor=(0, 0, 0, 0))
                img_down_scaled = img_rotated.resize((img_rotated.width // SSAA, img_rotated.height // SSAA), resize_sampler)
                result = img_down_scaled.image_to_tensor()
            else:
                img = tensor.tensor_to_image()
                img_rotated = img.rotate(angle, rotate_sampler, expand == "true", fillcolor=(0, 0, 0, 0))
                result = img_rotated.image_to_tensor()

            return result

        if angle == 0.0 or angle == 360.0:
            return (images,)
        else:
            return (torch.stack([
                rotate_tensor(images[i]) for i in range(len(images))
            ]),)

```
