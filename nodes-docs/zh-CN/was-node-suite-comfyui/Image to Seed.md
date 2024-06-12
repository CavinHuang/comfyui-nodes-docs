# Documentation
- Class name: WAS_Image_To_Seed
- Category: WAS Suite/Image/Analyze
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

函数`image_to_seed`旨在将一系列图像转换成相应的种子集合。它利用每张图像的固有属性生成一个唯一标识符，这些标识符可以用于各种应用，如图像索引或检索系统。该节点在分析流程中扮演关键角色，使得视觉数据能够转换成既紧凑又能够代表原始内容的形式。

# Input types
## Required
- images
    - 参数'images'对于节点的操作至关重要，因为它是节点处理的输入数据。每张图像通过一系列操作被转换成一个种子。输入图像的质量和特性直接影响生成的种子及其后续应用。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]

# Output types
- seeds
    - 输出'seeds'是代表从输入图像派生的种子的整数列表。每个种子都是图像内容的基于哈希的摘要，提供了简洁且独特的表示。这个输出很重要，因为它为下游任务中的进一步处理或分析奠定了基础。
    - Comfy dtype: INT
    - Python dtype: List[int]

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Image_To_Seed:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'images': ('IMAGE',)}}
    RETURN_TYPES = ('INT',)
    OUTPUT_IS_LIST = (True,)
    FUNCTION = 'image_to_seed'
    CATEGORY = 'WAS Suite/Image/Analyze'

    def image_to_seed(self, images):
        seeds = []
        for image in images:
            image = tensor2pil(image)
            seeds.append(image2seed(image))
        return (seeds,)
```