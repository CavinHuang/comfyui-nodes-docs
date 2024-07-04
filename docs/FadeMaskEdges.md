
# Documentation
- Class name: FadeMaskEdges
- Category: Bmad/CV/Misc
- Output node: False
- Repo Ref: https://github.com/bmad4ever/ComfyUI-Bmad-Custom-Nodes

FadeMaskEdges节点主要用于对图像主体的边缘进行预乘和Alpha混合，以防止外部像素渗入。这对于具有黑色轮廓的绘图等风格化主体特别有用，通过允许不同的边缘淡化效果来优化主体与背景的混合。

# Input types
## Required
- binary_image
    - 需要处理的二值图像，主要针对其边缘进行预乘和Alpha混合。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- edge_size
    - 定义边缘淡化的大小，影响主体边缘与背景的混合程度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- edge_tightness
    - 控制边缘淡化的紧密度，影响从主体到背景的过渡平滑度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- edge_exponent
    - 决定淡化曲线，允许自定义边缘过渡效果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- smoothing_diameter
    - 指定边缘平滑的直径，用于在预乘和Alpha设置后优化混合效果。
    - Comfy dtype: INT
    - Python dtype: int
- paste_original_blacks
    - 布尔标志，表示是否将原始黑色像素粘贴回图像，有助于保持主体的完整性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- image
    - 经过处理的图像，其边缘已进行预乘和Alpha混合，可用于进一步处理或展示。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FadeMaskEdges:
    """
    The original intent is to premultiply and alpha blend a subject's edges to avoid outer pixels creeping in.

    A very slight blur near the edges afterwards when using paste_original_blacks and low tightness may be required,
     but this should be done after premultiplying and setting the alpha.

    Stylized subject's, such as drawings with black outlines, may benefit from using different 2 edge fades:
        1. a fade with higher edge size for the premultiplication, fading the subject into blackness
        2. a tighter fade for the alpha
    """

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "binary_image": ("IMAGE",),
                "edge_size": ("FLOAT", {"default": 5.0, "min": 1.0, "step": 1.0}),
                # how quick does it fade to black
                "edge_tightness": ("FLOAT", {"default": 1.1, "min": 1.0, "max": 10.0, "step": 0.05}),
                # how does it fade, may be used to weaken small lines; 1 = linear transition
                "edge_exponent": ("FLOAT", {"default": 1, "min": 0.1, "max": 10.0, "step": 0.1}),
                "smoothing_diameter": ("INT", {"default": 10, "min": 2, "max": 256, "step": 1}),
                "paste_original_blacks": ("BOOLEAN", {"default": True})
            }
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "apply"
    CATEGORY = "Bmad/CV/Misc"

    def apply(self, binary_image, edge_size, edge_tightness, edge_exponent, smoothing_diameter, paste_original_blacks):
        binary_image = tensor2opencv(binary_image, 1)
        # _, binary_image = cv.threshold(gray_image, 128, 255, cv.THRESH_BINARY) # suppose it's already binary

        # compute L2 (euclidean) distance -> normalize with respect to edge size -> smooth
        distance_transform = cv.distanceTransform(binary_image, cv.DIST_L2, cv.DIST_MASK_3)
        normalized_distance = distance_transform / edge_size
        smoothed_distance = cv.bilateralFilter(normalized_distance, smoothing_diameter, 75, 75)

        # darken the white pixels based on smoothed distance and "edge tightness"
        diff = 1 - smoothed_distance
        darkened_image = (abs(diff * edge_tightness) ** (1 / edge_exponent)) * np.sign(diff)
        darkened_image = np.clip(darkened_image, 0, 1)
        darkened_image = (darkened_image * 255).astype(np.uint8)

        if paste_original_blacks:  # mask original black pixels
            black_mask = binary_image < 1
            darkened_image[black_mask] = 0

        output_image = binary_image - darkened_image  # darken original image
        output_image = opencv2tensor(output_image)
        return (output_image,)

```
