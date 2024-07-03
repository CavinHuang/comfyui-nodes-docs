
# Documentation
- Class name: ImageTransformCropCorners
- Category: image/transform
- Output node: False

ImageTransformCropCorners 节点用于对图像的角落进行裁剪操作，可以实现指定半径的圆角效果。它支持选择性地对每个角落进行圆角处理，并使用超采样抗锯齿（SSAA）技术来获得更高质量的结果。

# Input types
## Required
- images
    - 需要进行角落裁剪处理的输入图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- radius
    - 需要圆化的角落的半径。
    - Comfy dtype: INT
    - Python dtype: int
- top_left_corner
    - 指示是否对左上角进行圆角处理的标志。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- top_right_corner
    - 指示是否对右上角进行圆角处理的标志。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- bottom_right_corner
    - 指示是否对右下角进行圆角处理的标志。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- bottom_left_corner
    - 指示是否对左下角进行圆角处理的标志。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- SSAA
    - 超采样抗锯齿因子，用于提高圆角处理的质量。
    - Comfy dtype: INT
    - Python dtype: int
- method
    - 在SSAA过程中用于调整图像大小的方法。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- image
    - 经过指定角落裁剪和圆角处理后的图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageTransformCropCorners:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "radius": ("INT", {
                    "default": 180,
                    "max": 360,
                    "step": 1
                }),
                "top_left_corner": (["true", "false"],),
                "top_right_corner": (["true", "false"],),
                "bottom_right_corner": (["true", "false"],),
                "bottom_left_corner": (["true", "false"],),
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

    # noinspection PyUnresolvedReferences, PyArgumentList
    def node(
            self,
            images,
            radius,
            top_left_corner,
            top_right_corner,
            bottom_right_corner,
            bottom_left_corner,
            SSAA,
            method
    ):
        sampler = get_sampler_by_name(method)

        height, width = images[0, :, :, 0].shape

        canvas = Image.new("RGBA", (width * SSAA, height * SSAA), (0, 0, 0, 0))
        draw = ImageDraw.Draw(canvas)

        draw.rounded_rectangle(
            ((0, 0), (width * SSAA, height * SSAA)),
            radius * SSAA, (255, 255, 255, 255),
            corners=(
                True if top_left_corner == "true" else False,
                True if top_right_corner == "true" else False,
                True if bottom_right_corner == "true" else False,
                True if bottom_left_corner == "true" else False
            )
        )

        canvas = canvas.resize((width, height), sampler)
        mask = 1.0 - canvas.image_to_tensor()[:, :, 3]

        def crop_tensor(tensor):
            return torch.stack([
                (tensor[:, :, i] - mask).clamp(0, 1) for i in range(tensor.shape[2])
            ], dim=2)

        return (torch.stack([
            crop_tensor(images[i]) for i in range(len(images))
        ]),)

```
