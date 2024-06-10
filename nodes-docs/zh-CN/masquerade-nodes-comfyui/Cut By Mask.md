# Documentation
- Class name: CutByMask
- Category: Masquerade Nodes
- Output node: False
- Repo Ref: https://github.com/BadCafeCode/masquerade-nodes-comfyui

CutByMask节点旨在根据掩码的边界框裁剪图像。如果提供了特定的宽度和高度，则能够将图像调整到这些尺寸。此外，它还可以处理多个掩码，从单个图像中提取不同的部分，使其成为图像处理任务中的多功能工具。

# Input types
## Required
- image
    - 图像参数代表将根据掩码裁剪的输入图像。它是节点操作的基本部分，因为它决定了将要调整大小和处理的内容。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- mask
    - 掩码参数用于定义裁剪过程后将保留的图像区域。它在确定节点的最终输出中起着关键作用。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- force_resize_width
    - force_resize_width参数允许调整结果图像的宽度。它是可选的，当需要为输出指定特定宽度时可以使用。
    - Comfy dtype: INT
    - Python dtype: int
- force_resize_height
    - force_resize_height参数使能调整结果图像的高度。与force_resize_width类似，它是可选的，用于控制输出的垂直尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- mask_mapping_optional
    - 当提供多个掩码时，使用mask_mapping_optional参数，允许节点根据每个掩码处理图像的不同部分。它增强了节点批量处理的功能。
    - Comfy dtype: MASK_MAPPING
    - Python dtype: List[torch.Tensor]

# Output types
- result
    - 结果参数代表CutByMask节点的最终输出，即根据输入参数和掩码裁剪和调整大小后的图像或图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class CutByMask:
    """
    Cuts the image to the bounding box of the mask. If force_resize_width or force_resize_height are provided, the image will be resized to those dimensions. The `mask_mapping_optional` input can be provided from a 'Separate Mask Components' node to cut multiple pieces out of a single image in a batch.
    """

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image': ('IMAGE',), 'mask': ('IMAGE',), 'force_resize_width': ('INT', {'default': 0, 'min': 0, 'max': VERY_BIG_SIZE, 'step': 1}), 'force_resize_height': ('INT', {'default': 0, 'min': 0, 'max': VERY_BIG_SIZE, 'step': 1})}, 'optional': {'mask_mapping_optional': ('MASK_MAPPING',)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'cut'
    CATEGORY = 'Masquerade Nodes'

    def cut(self, image, mask, force_resize_width, force_resize_height, mask_mapping_optional=None):
        if len(image.shape) < 4:
            C = 1
        else:
            C = image.shape[3]
        image = tensor2rgba(image)
        mask = tensor2mask(mask)
        if mask_mapping_optional is not None:
            image = image[mask_mapping_optional]
        (B, H, W, _) = image.shape
        mask = torch.nn.functional.interpolate(mask.unsqueeze(1), size=(H, W), mode='nearest')[:, 0, :, :]
        (MB, _, _) = mask.shape
        if MB < B:
            assert B % MB == 0
            mask = mask.repeat(B // MB, 1, 1)
        is_empty = ~torch.gt(torch.max(torch.reshape(mask, [MB, H * W]), dim=1).values, 0.0)
        mask[is_empty, 0, 0] = 1.0
        boxes = masks_to_boxes(mask)
        mask[is_empty, 0, 0] = 0.0
        min_x = boxes[:, 0]
        min_y = boxes[:, 1]
        max_x = boxes[:, 2]
        max_y = boxes[:, 3]
        width = max_x - min_x + 1
        height = max_y - min_y + 1
        use_width = int(torch.max(width).item())
        use_height = int(torch.max(height).item())
        if force_resize_width > 0:
            use_width = force_resize_width
        if force_resize_height > 0:
            use_height = force_resize_height
        alpha_mask = torch.ones((B, H, W, 4))
        alpha_mask[:, :, :, 3] = mask
        image = image * alpha_mask
        result = torch.zeros((B, use_height, use_width, 4))
        for i in range(0, B):
            if not is_empty[i]:
                ymin = int(min_y[i].item())
                ymax = int(max_y[i].item())
                xmin = int(min_x[i].item())
                xmax = int(max_x[i].item())
                single = image[i, ymin:ymax + 1, xmin:xmax + 1, :].unsqueeze(0)
                resized = torch.nn.functional.interpolate(single.permute(0, 3, 1, 2), size=(use_height, use_width), mode='bicubic').permute(0, 2, 3, 1)
                result[i] = resized[0]
        if C == 1:
            return (tensor2mask(result),)
        elif C == 3 and torch.min(result[:, :, :, 3]) == 1:
            return (tensor2rgb(result),)
        else:
            return (result,)
```