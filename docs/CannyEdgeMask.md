# Documentation
- Class name: CannyEdgeMask
- Category: postprocessing/Masks
- Output node: False
- Repo Ref: https://github.com/EllangoK/ComfyUI-post-processing-nodes

此类节点封装了对输入图像应用Canny边缘检测算法的功能，根据指定的阈值生成突出显示图像中边缘的二值边缘掩码。

# Input types
## Required
- image
    - 要应用Canny边缘检测的输入图像。它是节点操作的关键，因为它是算法处理以产生边缘掩码的主要数据。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- lower_threshold
    - 下阈值参数对于控制边缘检测的灵敏度至关重要。它与上阈值一起工作，以确定哪些边缘足够强以包含在最终的边缘掩码中。
    - Comfy dtype: INT
    - Python dtype: int
- upper_threshold
    - 上阈值参数与下阈值一起，在定义边缘检测的标准中起着重要作用。它通过只包括达到或超过此阈值的边缘来帮助细化边缘。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- edge_mask
    - 输出是一个二值边缘掩码，代表Canny算法检测到的边缘。这个掩码非常重要，因为它用于进一步的图像处理或分析。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class CannyEdgeMask:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',), 'lower_threshold': ('INT', {'default': 100, 'min': 0, 'max': 500, 'step': 10}), 'upper_threshold': ('INT', {'default': 200, 'min': 0, 'max': 500, 'step': 10})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'canny'
    CATEGORY = 'postprocessing/Masks'

    def canny(self, image: torch.Tensor, lower_threshold: int, upper_threshold: int):
        (batch_size, height, width, _) = image.shape
        result = torch.zeros(batch_size, height, width)
        for b in range(batch_size):
            tensor_image = image[b].numpy().copy()
            gray_image = (cv2.cvtColor(tensor_image, cv2.COLOR_RGB2GRAY) * 255).astype(np.uint8)
            canny = cv2.Canny(gray_image, lower_threshold, upper_threshold)
            tensor = torch.from_numpy(canny)
            result[b] = tensor
        return (result,)
```