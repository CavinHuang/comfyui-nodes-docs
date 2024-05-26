# Documentation
- Class name: KfDebug_Segs
- Category: Debugging
- Output node: True
- Repo Ref: https://github.com/dmarx/ComfyUI-Keyframed

该节点在深学习框架内便于可视化和分析分割结果，使用户能够检查和理解模型在区分图像不同部分方面的性能。

# Input types
## Required
- image
    - 输入的图像或数组对节点的运行至关重要，因为它是分割的基础。输入的质量和分辨率直接影响分割结果的准确性和细节。
    - Comfy dtype: COMBO["Image", "ndarray"]
    - Python dtype: Image or torch.Tensor
## Optional
- mask
    - 提供掩码参数有助于通过指定图像中的兴趣区域来细化分割过程。它增强了节点专注于特定段的能力，从而改善了整体的分割结果。
    - Comfy dtype: ndarray
    - Python dtype: numpy.ndarray

# Output types
- segmented_image
    - 输出代表分割过程的结果，输入图像的不同部分被识别和区分。这对于进一步分析和理解模型的性能至关重要。
    - Comfy dtype: Image
    - Python dtype: PIL.Image
- segmentation_map
    - 该输出提供了分割的详细地图，指示了图像中每个段的边界和分类。这对于评估分割算法的精度和有效性至关重要。
    - Comfy dtype: ndarray
    - Python dtype: numpy.ndarray

# Usage tips
- Infra type: CPU

# Source code
```
class KfDebug_Segs(KfDebug_Passthrough):
    RETURN_TYPES = ('SEGS',)
```