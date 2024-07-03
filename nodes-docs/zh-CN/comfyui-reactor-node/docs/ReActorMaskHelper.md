
# Documentation
- Class name: ReActorMaskHelper
- Category: 🌌 ReActor
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ReActorMaskHelper节点旨在辅助ReActor框架内的遮罩处理过程。它主要用于组合、膨胀和优化遮罩，以便在人脸交换或修复任务中使用。该节点利用特定的检测提示和遮罩操作技术来优化遮罩处理过程，从而获得更好的结果。

# Input types
## Required
- image
    - 'image'参数是遮罩相关操作的主要输入，作为检测、操作和转换过程的基础。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- swapped_image
    - 此参数表示人脸交换操作后的图像，可能需要进一步的遮罩处理或调整。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- bbox_model_name
    - 指定用于边界框检测的模型名称，影响遮罩生成的初始步骤。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- bbox_threshold
    - 边界框检测的阈值，决定模型在识别潜在兴趣区域时的敏感度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- bbox_dilation
    - 表示应用于边界框的膨胀因子，可能会扩大考虑遮罩应用的区域。
    - Comfy dtype: INT
    - Python dtype: int
- bbox_crop_factor
    - 定义在检测到的边界框周围裁剪的程度，影响最终遮罩的覆盖区域。
    - Comfy dtype: FLOAT
    - Python dtype: float
- bbox_drop_size
    - 边界框被考虑的最小尺寸，过滤掉太小的检测结果。
    - Comfy dtype: INT
    - Python dtype: int
- sam_model_name
    - 用于SAM（语义注意力遮罩）预测的模型名称，对于优化遮罩细节至关重要。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- sam_dilation
    - 专门用于SAM预测的膨胀因子，调整遮罩边界以获得更好的拟合或覆盖。
    - Comfy dtype: INT
    - Python dtype: int
- sam_threshold
    - SAM预测的阈值，根据置信度分数决定包含哪些遮罩。
    - Comfy dtype: FLOAT
    - Python dtype: float
- bbox_expansion
    - 指定边界框超出其检测边界的扩展程度，影响遮罩覆盖的区域。
    - Comfy dtype: INT
    - Python dtype: int
- mask_hint_threshold
    - 生成遮罩提示的阈值，用于需要预先识别遮罩区域的过程。
    - Comfy dtype: FLOAT
    - Python dtype: float
- mask_hint_use_negative
    - 表示是否在遮罩生成过程中使用负面提示（不需遮罩的区域）。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: bool
- morphology_operation
    - 指定应用于遮罩的形态学操作类型（如膨胀、腐蚀），影响其形状和边界。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- morphology_distance
    - 形态学操作的距离参数，决定变换的程度。
    - Comfy dtype: INT
    - Python dtype: int
- blur_radius
    - 遮罩模糊的半径，用于软化边缘或使遮罩与图像更无缝地融合。
    - Comfy dtype: INT
    - Python dtype: int
- sigma_factor
    - 计算高斯模糊中sigma值的因子，影响遮罩边缘的平滑度。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- mask_optional
    - 可选的遮罩输入，可用于额外的遮罩操作或调整。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Output types
- IMAGE
    - 应用遮罩修改后的处理图像，可用于进一步使用或显示。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- MASK
    - 节点生成或修改的最终遮罩，适用于遮罩或合成操作。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- MASK_PREVIEW
    - 遮罩的预览，通常用于可视化或调试目的。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- SWAPPED_FACE
    - 人脸交换操作后的图像，可能包括遮罩调整以改善整合效果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Built-in or C extension class, unable to automatically detect source code
```
