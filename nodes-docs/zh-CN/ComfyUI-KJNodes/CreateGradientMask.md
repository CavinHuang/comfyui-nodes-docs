# Documentation
- Class name: CreateGradientMask
- Category: KJNodes/masking/generate
- Output node: False
- Repo Ref: https://github.com/kijai/ComfyUI-KJNodes.git

CreateGradientMask 节点旨在生成可用于各种图像处理任务的渐变蒙版。它通过计算图像宽度上的线性渐变来创建蒙版，然后根据帧序列中的当前帧对渐变进行调整。这允许实现可以随着时间变化或在图像的不同部分变化的动态遮罩效果。

# Input types
## Required
- invert
    - 'invert' 参数决定是否需要将渐变蒙版反转。这对于创建互补蒙版或基于蒙版的方向应用不同的效果非常有用。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- frames
    - 'frames' 参数指定了要生成蒙版的帧数。它直接影响输出的批次大小，对于创建动画或时间变化效果至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- width
    - 'width' 参数以像素为单位设置渐变蒙版的宽度。它对于定义蒙版的空间分辨率和影响渐变的粒度至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 'height' 参数以像素为单位设置渐变蒙版的高度。它与 'width' 参数一起工作，以确定蒙版的总体大小。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- MASK
    - 输出的 MASK 是表示渐变蒙版的张量。它是后续图像操作和效果应用的关键组件。
    - Comfy dtype: TORCH.TENSOR
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class CreateGradientMask:
    RETURN_TYPES = ('MASK',)
    FUNCTION = 'createmask'
    CATEGORY = 'KJNodes/masking/generate'

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'invert': ('BOOLEAN', {'default': False}), 'frames': ('INT', {'default': 0, 'min': 0, 'max': 255, 'step': 1}), 'width': ('INT', {'default': 256, 'min': 16, 'max': 4096, 'step': 1}), 'height': ('INT', {'default': 256, 'min': 16, 'max': 4096, 'step': 1})}}

    def createmask(self, frames, width, height, invert):
        batch_size = frames
        out = []
        image_batch = np.zeros((batch_size, height, width), dtype=np.float32)
        for i in range(batch_size):
            gradient = np.linspace(1.0, 0.0, width, dtype=np.float32)
            time = i / frames
            offset_gradient = gradient - time
            image_batch[i] = offset_gradient.reshape(1, -1)
        output = torch.from_numpy(image_batch)
        mask = output
        out.append(mask)
        if invert:
            return (1.0 - torch.cat(out, dim=0),)
        return (torch.cat(out, dim=0),)
```