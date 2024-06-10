# Documentation
- Class name: PruneByMask
- Category: Masquerade Nodes
- Output node: False
- Repo Ref: https://github.com/BadCafeCode/masquerade-nodes-comfyui

PruneByMask节点旨在根据相关掩码的质量选择性地从一批图像中筛选图像。具体来说，它仅保留那些掩码的平均像素值达到或超过0.5阈值的图像，确保后续处理集中在具有足够清晰掩码的图像上。

# Input types
## Required
- image
    - 图像参数代表要处理的图像批次。这是一个关键的输入，因为节点的筛选操作完全依赖于这些图像的内容。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- mask
    - 掩码参数对应于批次中图像的相关掩码。节点评估这些掩码的平均像素值，以确定在输出中保留哪些图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- filtered_images
    - filtered_images输出包含通过了节点筛选标准的输入图像子集，这些图像的筛选是基于它们相关掩码的平均像素值。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class PruneByMask:
    """
    Filters out the images in a batch that don't have an associated mask with an average pixel value of at least 0.5.
    """

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image': ('IMAGE',), 'mask': ('IMAGE',)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'prune'
    CATEGORY = 'Masquerade Nodes'

    def prune(self, image, mask):
        mask = tensor2mask(mask)
        mean = torch.mean(torch.mean(mask, dim=2), dim=1)
        return (image[mean >= 0.5],)
```