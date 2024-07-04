
# Documentation
- Class name: ImageGenResolutionFromImage
- Category: ControlNet Preprocessors
- Output node: False

该节点旨在根据输入图像计算生成分辨率。它分析所提供图像的尺寸，并计算出应用于图像生成的宽度和高度，确保输出分辨率直接源自输入图像的大小。

# Input types
## Required
- image
    - 需要计算生成分辨率的输入图像。该参数至关重要，因为它通过分析图像尺寸直接影响输出分辨率。
    - Comfy dtype: IMAGE
    - Python dtype: np.ndarray

# Output types
- IMAGE_GEN_WIDTH (INT)
    - 根据输入图像尺寸计算得出的图像生成宽度。
    - Comfy dtype: INT
    - Python dtype: int
- IMAGE_GEN_HEIGHT (INT)
    - 根据输入图像尺寸计算得出的图像生成高度。
    - Comfy dtype: INT
    - Python dtype: int


## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [SVD_img2vid_Conditioning](../../Comfy/Nodes/SVD_img2vid_Conditioning.md)



## Source code
```python
class ImageGenResolutionFromImage:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": { "image": ("IMAGE", ) }
        }
    
    RETURN_TYPES = ("INT", "INT")
    RETURN_NAMES = ("IMAGE_GEN_WIDTH (INT)", "IMAGE_GEN_HEIGHT (INT)")
    FUNCTION = "execute"

    CATEGORY = "ControlNet Preprocessors"

    def execute(self, image):
        _, H, W, _ = image.shape
        return (W, H)

```
