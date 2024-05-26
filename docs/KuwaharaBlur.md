# Documentation
- Class name: KuwaharaBlur
- Category: postprocessing/Filters
- Output node: False
- Repo Ref: https://github.com/EllangoK/ComfyUI-post-processing-nodes

KuwaharaBlur 类旨在对图像应用 Kuwahara 滤波器，这是一种用于图像处理的非线性数字滤波器。它可以平滑图像同时保留边缘，特别适用于在不模糊重要细节的情况下减少图像噪声。该节点基于将图像划分为较小的块，并根据局部方差用过滤后的版本替换每个，从而保留图像的结构完整性。

# Input types
## Required
- image
    - 图像参数至关重要，因为它是 Kuwahara 滤波器处理的主要输入。它是节点派生输出的来源，图像的内容和质量直接影响噪声减少和边缘保留的有效性。
    - Comfy dtype: IMAGE
    - Python dtype: np.ndarray
- blur_radius
    - 模糊半径参数决定了 Kuwahara 滤波器应用的平滑效果的程度。它影响用于处理的块的大小，从而直接影响噪声减少和细节保留之间的平衡。
    - Comfy dtype: INT
    - Python dtype: int
- method
    - 方法参数决定了要应用的 Kuwahara 滤波器类型，可以是 'mean' 或 'gaussian'。这个选择影响过滤过程和结果图像，'mean' 提供更均匀的平滑，而 'gaussian' 根据图像的局部属性提供更自适应的平滑。
    - Comfy dtype: COMBO
    - Python dtype: str

# Output types
- output_image
    - 输出图像代表了应用 Kuwahara 滤波器后处理过的图像。它反映了节点的主要功能，是噪声减少和边缘保留努力的结晶，提供了更清晰、更明确的结果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class KuwaharaBlur:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',), 'blur_radius': ('INT', {'default': 3, 'min': 0, 'max': 31, 'step': 1}), 'method': (['mean', 'gaussian'],)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'apply_kuwahara_filter'
    CATEGORY = 'postprocessing/Filters'

    def apply_kuwahara_filter(self, image: np.ndarray, blur_radius: int, method: str):
        if blur_radius == 0:
            return (image,)
        out = torch.zeros_like(image)
        (batch_size, height, width, channels) = image.shape
        for b in range(batch_size):
            image = image[b].cpu().numpy() * 255.0
            image = image.astype(np.uint8)
            out[b] = torch.from_numpy(kuwahara(image, method=method, radius=blur_radius)) / 255.0
        return (out,)
```