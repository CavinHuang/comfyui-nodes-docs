# Documentation
- Class name: MaskToRegion
- Category: Masquerade Nodes
- Output node: False
- Repo Ref: https://github.com/BadCafeCode/masquerade-nodes-comfyui

MaskToRegion节点旨在处理给定的掩码，并确定一个矩形区域，该区域在指定的约束条件下适应掩码。它智能地调整边界框的尺寸以适应掩码，同时保持所需的属性，如纵横比、可除性或倍数。该节点在需要精确操作掩码区域的应用中发挥着关键作用，例如图像分割或目标检测。

# Input types
## Required
- mask
    - 'mask'参数至关重要，因为它定义了从中派生区域的输入掩码。它是节点操作以产生所需输出的主要数据源。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- padding
    - 'padding'参数允许在掩码周围增加空间，这在需要在感兴趣的对象周围留出一些缓冲区的应用中可能至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- constraints
    - 'constraints'参数在确定如何调整区域尺寸方面至关重要。它决定了是否应保持纵横比、强制执行可除性或尊重倍数。
    - Comfy dtype: COMBO[keep_ratio, keep_ratio_divisible, multiple_of, ignore]
    - Python dtype: str
- constraint_x
    - 'constraint_x'参数与'constraint_y'一起使用时，有助于定义宽度和高度调整的约束条件，确保输出区域满足特定的尺寸要求。
    - Comfy dtype: INT
    - Python dtype: int
- constraint_y
    - 'constraint_y'参数类似于'constraint_x'，它有助于设置区域的垂直约束，补充了由'constraint_x'设置的水平约束。
    - Comfy dtype: INT
    - Python dtype: int
- min_width
    - 'min_width'参数确保结果区域的宽度不会低于指定的最小值，这对于保持所包含对象的可见性至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- min_height
    - 'min_height'参数类似于'min_width'，它保证区域的高度满足最小阈值，防止对象在垂直方向上被过度压缩。
    - Comfy dtype: INT
    - Python dtype: int
- batch_behavior
    - 'batch_behavior'参数影响批量中区域的处理方式，允许匹配所有区域的大小或确保一致的纵横比。
    - Comfy dtype: COMBO[match_ratio, match_size]
    - Python dtype: str

# Output types
- region
    - 'region'输出参数代表了在应用所有指定的约束和调整后，包含输入掩码的最终矩形区域。它是依赖于精确区域定位的下游任务的关键组成部分。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class MaskToRegion:
    """
    Given a mask, returns a rectangular region that fits the mask with the given constraints
    """

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'mask': ('IMAGE',), 'padding': ('INT', {'default': 0, 'min': 0, 'max': VERY_BIG_SIZE, 'step': 1}), 'constraints': (['keep_ratio', 'keep_ratio_divisible', 'multiple_of', 'ignore'],), 'constraint_x': ('INT', {'default': 64, 'min': 2, 'max': VERY_BIG_SIZE, 'step': 1}), 'constraint_y': ('INT', {'default': 64, 'min': 2, 'max': VERY_BIG_SIZE, 'step': 1}), 'min_width': ('INT', {'default': 0, 'min': 0, 'max': VERY_BIG_SIZE, 'step': 1}), 'min_height': ('INT', {'default': 0, 'min': 0, 'max': VERY_BIG_SIZE, 'step': 1}), 'batch_behavior': (['match_ratio', 'match_size'],)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'get_region'
    CATEGORY = 'Masquerade Nodes'

    def get_region(self, mask, padding, constraints, constraint_x, constraint_y, min_width, min_height, batch_behavior):
        mask = tensor2mask(mask)
        mask_size = mask.size()
        mask_width = int(mask_size[2])
        mask_height = int(mask_size[1])
        is_empty = ~torch.gt(torch.max(torch.reshape(mask, [mask_size[0], mask_width * mask_height]), dim=1).values, 0.0)
        mask[is_empty, 0, 0] = 1.0
        boxes = masks_to_boxes(mask)
        mask[is_empty, 0, 0] = 0.0
        min_x = torch.max(boxes[:, 0] - padding, torch.tensor(0.0))
        min_y = torch.max(boxes[:, 1] - padding, torch.tensor(0.0))
        max_x = torch.min(boxes[:, 2] + padding, torch.tensor(mask_width))
        max_y = torch.min(boxes[:, 3] + padding, torch.tensor(mask_height))
        width = max_x - min_x
        height = max_y - min_y
        target_width = torch.max(width, torch.tensor(min_width))
        target_height = torch.max(height, torch.tensor(min_height))
        if constraints == 'keep_ratio':
            target_width = torch.max(target_width, target_height * constraint_x // constraint_y)
            target_height = torch.max(target_height, target_width * constraint_y // constraint_x)
        elif constraints == 'keep_ratio_divisible':
            max_factors = torch.min(constraint_x // target_width, constraint_y // target_height)
            max_factor = int(torch.max(max_factors).item())
            for i in range(1, max_factor + 1):
                divisible = constraint_x % i == 0 and constraint_y % i == 0
                if divisible:
                    big_enough = ~torch.lt(target_width, constraint_x // i) * ~torch.lt(target_height, constraint_y // i)
                    target_width[big_enough] = constraint_x // i
                    target_height[big_enough] = constraint_y // i
        elif constraints == 'multiple_of':
            target_width[torch.gt(target_width % constraint_x, 0)] = (target_width // constraint_x + 1) * constraint_x
            target_height[torch.gt(target_height % constraint_y, 0)] = (target_height // constraint_y + 1) * constraint_y
        if batch_behavior == 'match_size':
            target_width[:] = torch.max(target_width)
            target_height[:] = torch.max(target_height)
        elif batch_behavior == 'match_ratio':
            ratios = torch.abs(target_width / target_height - 1)
            ratios[is_empty] = 10000
            match_ratio = torch.min(ratios, dim=0).indices.item()
            target_width = torch.max(target_width, target_height * target_width[match_ratio] // target_height[match_ratio])
            target_height = torch.max(target_height, target_width * target_height[match_ratio] // target_width[match_ratio])
        missing = target_width - width
        min_x = min_x - missing // 2
        max_x = max_x + (missing - missing // 2)
        missing = target_height - height
        min_y = min_y - missing // 2
        max_y = max_y + (missing - missing // 2)
        bad = torch.lt(min_x, 0)
        max_x[bad] -= min_x[bad]
        min_x[bad] = 0
        bad = torch.lt(min_y, 0)
        max_y[bad] -= min_y[bad]
        min_y[bad] = 0
        bad = torch.gt(max_x, mask_width)
        min_x[bad] -= max_x[bad] - mask_width
        max_x[bad] = mask_width
        bad = torch.gt(max_y, mask_height)
        min_y[bad] -= max_y[bad] - mask_height
        max_y[bad] = mask_height
        region = torch.zeros((mask_size[0], mask_height, mask_width))
        for i in range(0, mask_size[0]):
            if not is_empty[i]:
                ymin = int(min_y[i].item())
                ymax = int(max_y[i].item())
                xmin = int(min_x[i].item())
                xmax = int(max_x[i].item())
                region[i, ymin:ymax + 1, xmin:xmax + 1] = 1
        return (region,)
```