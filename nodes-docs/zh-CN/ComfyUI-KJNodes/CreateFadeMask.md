# Documentation
- Class name: CreateFadeMask
- Category: KJNodes/deprecated
- Output node: False
- Repo Ref: https://github.com/kijai/ComfyUI-KJNodes.git

CreateFadeMask 节点旨在生成一系列渐变遮罩，平滑地从一种不透明度过渡到另一种。它利用插值技术创建视觉上吸引人的渐变效果，特别适用于视觉效果和图像处理应用。

# Input types
## Required
- invert
    - ‘invert’参数决定是否需要反转渐变遮罩，这对于某些需要反转不透明度过渡的视觉效果至关重要。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- frames
    - ‘frames’参数指定渐变遮罩序列中的帧数，这直接影响渐变效果的持续时间和间隔。
    - Comfy dtype: INT
    - Python dtype: int
- width
    - ‘width’参数设置渐变遮罩中每个帧的宽度，影响输出的整体尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - ‘height’参数定义渐变遮罩中每个帧的高度，这对于保持输出的纵横比和视觉一致性至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- interpolation
    - ‘interpolation’参数选择用于渐变效果的插值类型，这可以显著改变不透明度级别之间过渡的外观。
    - Comfy dtype: COMBO['linear', 'ease_in', 'ease_out', 'ease_in_out']
    - Python dtype: str
- start_level
    - ‘start_level’参数设定渐变遮罩的初始不透明度级别，这是确定渐变效果起始点的关键因素。
    - Comfy dtype: FLOAT
    - Python dtype: float
- midpoint_level
    - ‘midpoint_level’参数指示渐变遮罩序列中点的不透明度级别，有助于控制过渡中心处的渐变速度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_level
    - ‘end_level’参数决定渐变遮罩的最终不透明度级别，这决定了渐变效果如何结束。
    - Comfy dtype: FLOAT
    - Python dtype: float
- midpoint_frame
    - ‘midpoint_frame’参数指定渐变效果中点发生的帧，允许对过渡的时机进行精确控制。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- mask
    - 输出‘mask’是一系列渐变遮罩，它们代表了从开始级别到结束级别的不透明度过渡，根据指定的参数创建。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class CreateFadeMask:
    RETURN_TYPES = ('MASK',)
    FUNCTION = 'createfademask'
    CATEGORY = 'KJNodes/deprecated'

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'invert': ('BOOLEAN', {'default': False}), 'frames': ('INT', {'default': 2, 'min': 2, 'max': 255, 'step': 1}), 'width': ('INT', {'default': 256, 'min': 16, 'max': 4096, 'step': 1}), 'height': ('INT', {'default': 256, 'min': 16, 'max': 4096, 'step': 1}), 'interpolation': (['linear', 'ease_in', 'ease_out', 'ease_in_out'],), 'start_level': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'midpoint_level': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'end_level': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'midpoint_frame': ('INT', {'default': 0, 'min': 0, 'max': 4096, 'step': 1})}}

    def createfademask(self, frames, width, height, invert, interpolation, start_level, midpoint_level, end_level, midpoint_frame):

        def ease_in(t):
            return t * t

        def ease_out(t):
            return 1 - (1 - t) * (1 - t)

        def ease_in_out(t):
            return 3 * t * t - 2 * t * t * t
        batch_size = frames
        out = []
        image_batch = np.zeros((batch_size, height, width), dtype=np.float32)
        if midpoint_frame == 0:
            midpoint_frame = batch_size // 2
        for i in range(batch_size):
            if i <= midpoint_frame:
                t = i / midpoint_frame
                if interpolation == 'ease_in':
                    t = ease_in(t)
                elif interpolation == 'ease_out':
                    t = ease_out(t)
                elif interpolation == 'ease_in_out':
                    t = ease_in_out(t)
                color = start_level - t * (start_level - midpoint_level)
            else:
                t = (i - midpoint_frame) / (batch_size - midpoint_frame)
                if interpolation == 'ease_in':
                    t = ease_in(t)
                elif interpolation == 'ease_out':
                    t = ease_out(t)
                elif interpolation == 'ease_in_out':
                    t = ease_in_out(t)
                color = midpoint_level - t * (midpoint_level - end_level)
            color = np.clip(color, 0, 255)
            image = np.full((height, width), color, dtype=np.float32)
            image_batch[i] = image
        output = torch.from_numpy(image_batch)
        mask = output
        out.append(mask)
        if invert:
            return (1.0 - torch.cat(out, dim=0),)
        return (torch.cat(out, dim=0),)
```