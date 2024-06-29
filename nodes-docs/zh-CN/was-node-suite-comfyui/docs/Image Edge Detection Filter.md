# Documentation
- Class name: WAS_Image_Edge
- Category: WAS Suite/Image/Filter
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

`image_edges` 方法旨在对输入图像应用边缘检测。它使用 'normal' 或 'laplacian' 模式处理图像，以突出图像内的边缘，增强视觉特征，以便进行进一步的分析或处理。

# Input types
## Required
- image
    - 'image' 参数至关重要，因为它是节点将处理的输入。它通过确定将要检测边缘的内容来影响节点的执行。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- mode
    - 'mode' 参数指示要应用的边缘检测类型。它对节点的功能至关重要，因为它决定了用于在图像中查找边缘的算法。
    - Comfy dtype: COMBO[normal, laplacian]
    - Python dtype: str

# Output types
- edges_image
    - 'edges_image' 输出包含根据所选模式突出显示边缘的处理后的图像。它很重要，因为它代表了节点操作的直接结果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Image_Edge:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image': ('IMAGE',), 'mode': (['normal', 'laplacian'],)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'image_edges'
    CATEGORY = 'WAS Suite/Image/Filter'

    def image_edges(self, image, mode):
        image = tensor2pil(image)
        if mode:
            if mode == 'normal':
                image = image.filter(ImageFilter.FIND_EDGES)
            elif mode == 'laplacian':
                image = image.filter(ImageFilter.Kernel((3, 3), (-1, -1, -1, -1, 8, -1, -1, -1, -1), 1, 0))
            else:
                image = image
        return (torch.from_numpy(np.array(image).astype(np.float32) / 255.0).unsqueeze(0),)
```