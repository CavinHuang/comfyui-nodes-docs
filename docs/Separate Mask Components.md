# Documentation
- Class name: SeparateMaskComponents
- Category: Masquerade Nodes
- Output node: False
- Repo Ref: https://github.com/BadCafeCode/masquerade-nodes-comfyui

该节点旨在将单个掩码分解为其组成的连续组件。它通过对掩码应用形态学操作来识别掩码内的唯一段。该节点不仅返回分离的掩码，还提供了一个映射，可以在下游流程中使用，以将各个组件与其原始批次位置相关联。

# Input types
## Required
- mask
    - 输入掩码是该节点的关键参数，因为它代表了要从中分离出连续组件的初始数据。掩码的结构直接影响节点的操作和结果分段。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- mask
    - 输出是一系列分离的掩码，每个掩码对应输入掩码中识别出的一个独特的连续组件。这些掩码对于批处理中的进一步分析或处理至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- mask_mappings
    - 此输出提供映射，将每个分离的掩码与其在原始批次中的相应位置相关联。它是维护整个处理流程中数据关系完整性的重要工具。
    - Comfy dtype: INT
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class SeparateMaskComponents:
    """
    Separates a mask into multiple contiguous components. Returns the individual masks created as well as a MASK_MAPPING which can be used in other nodes when dealing with batches.
    """

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'mask': ('IMAGE',)}}
    RETURN_TYPES = ('IMAGE', 'MASK_MAPPING')
    RETURN_NAMES = ('mask', 'mask_mappings')
    FUNCTION = 'separate'
    CATEGORY = 'Masquerade Nodes'

    def separate(self, mask):
        mask = tensor2mask(mask)
        thresholded = torch.gt(mask, 0).unsqueeze(1)
        (B, H, W) = mask.shape
        components = torch.arange(B * H * W, device=mask.device, dtype=mask.dtype).reshape(B, 1, H, W) + 1
        components[~thresholded] = 0
        while True:
            previous_components = components
            components = torch.nn.functional.max_pool2d(components, kernel_size=3, stride=1, padding=1)
            components[~thresholded] = 0
            if torch.equal(previous_components, components):
                break
        components = components.reshape(B, H, W)
        segments = torch.unique(components)
        result = torch.zeros([len(segments) - 1, H, W])
        index = 0
        mapping = torch.zeros([len(segments) - 1], device=mask.device, dtype=torch.int)
        for i in range(len(segments)):
            segment = segments[i].item()
            if segment == 0:
                continue
            image_index = int((segment - 1) // (H * W))
            segment_mask = components[image_index, :, :] == segment
            result[index][segment_mask] = mask[image_index][segment_mask]
            mapping[index] = image_index
            index += 1
        return (result, mapping)
```