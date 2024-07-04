
# Documentation
- Class name: JWImageResize
- Category: jamesWalker55
- Output node: False

JWImageResize节点的设计目的是调整图像尺寸至指定的宽度和高度，同时使用选定的插值方法来保持图像质量。

# Input types
## Required
- image
    - 需要调整尺寸的输入图像张量。它对定义将进行调整的视觉内容至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- height
    - 指定调整后图像的目标高度，直接影响图像的垂直尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- width
    - 确定调整后图像的目标宽度，直接影响图像的水平尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- interpolation_mode
    - 在调整图像大小时用于像素值之间插值的方法，这会影响输出图像的质量和外观。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- image
    - 调整尺寸后的图像张量，已按照指定的尺寸和插值质量进行了调整。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [GroundingDinoSAMSegment (segment anything)](../../comfyui_segment_anything/Nodes/GroundingDinoSAMSegment (segment anything).md)
    - [IPAdapterEncoder](../../ComfyUI_IPAdapter_plus/Nodes/IPAdapterEncoder.md)
    - [CLIPVisionEncode](../../Comfy/Nodes/CLIPVisionEncode.md)
    - [VAEEncode](../../Comfy/Nodes/VAEEncode.md)
    - [FaceDetailer](../../ComfyUI-Impact-Pack/Nodes/FaceDetailer.md)
    - Reroute



## Source code
```python
@register_node("JWImageLoadRGB", "Image Load RGB")
class _:
    CATEGORY = "jamesWalker55"
    INPUT_TYPES = lambda: {
        "required": {
            "path": ("STRING", {"default": "./image.png"}),
        }
    }
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"

    def execute(self, path: str):
        assert isinstance(path, str)

        img = load_image(path)
        return (img,)

```
