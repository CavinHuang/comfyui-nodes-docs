# Documentation
- Class name: InstantCameraMotionBrush
- Category: DragNUWA
- Output node: False
- Repo Ref: https://github.com/chaojie/ComfyUI-DragNUWA.git

InstantCameraMotionBrush旨在模拟虚拟环境中的摄像机运动效果。通过生成表示摄像机在帧中移动轨迹的运动刷子来实现此目的。该节点的主要功能是创建摄像机动作的动态视觉表示，例如平移、缩放和倾斜，可以用于增强场景的真实感或在后期制作中添加艺术效果。

# Input types
## Required
- model_length
    - 模型长度参数决定了摄像机运动序列的持续时间。它对于确定运动刷效果的范围以及随时间的展开方式至关重要。较长的序列允许更复杂的运动路径，而较短的序列则导致更快、更突然的移动。
    - Comfy dtype: INT
    - Python dtype: int
- width
    - 宽度参数指定了将要应用摄像机运动的水平分辨率。这对于将运动刷准确缩放到场景的尺寸非常重要，确保运动在帧的上下文中看起来自然和比例恰当。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 高度参数定义了帧的垂直分辨率。与宽度类似，它对于正确缩放运动刷以适应帧的尺寸很重要，有助于运动效果的整体连贯性和视觉吸引力。
    - Comfy dtype: INT
    - Python dtype: int
- action
    - 动作参数决定了要模拟的摄像机运动类型。它影响运动轨迹和运动刷将代表摄像机运动的方式，满足视觉内容中不同的创意需求和叙事目的。
    - Comfy dtype: COMBO
    - Python dtype: str
- speed
    - 速度参数调整摄像机移动的速度。它直接影响运动效果的强度和节奏，允许对最终视觉结果进行细微控制。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- MotionBrush
    - 输出MotionBrush是一个表示计算摄像机运动轨迹的张量。它包含了摄像机运动的精髓，为进一步处理和集成到视觉作品中提供了基础。
    - Comfy dtype: Tensor
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class InstantCameraMotionBrush:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'model_length': ('INT', {'default': 14}), 'width': ('INT', {'default': 576}), 'height': ('INT', {'default': 320}), 'action': (['left', 'right', 'up', 'down', 'zoomin', 'zoomout'], {'default': 'left'}), 'speed': ('FLOAT', {'default': 1})}}
    RETURN_TYPES = ('MotionBrush',)
    FUNCTION = 'run_inference'
    CATEGORY = 'DragNUWA'

    def run_inference(self, model_length, width, height, action, speed):
        motion_brush = torch.zeros(model_length - 1, height, width, 2)
        xmotionbrush = motion_brush[:, :, :, :1]
        ymotionbrush = motion_brush[:, :, :, 1:]
        xcount = 10
        ycount = 10
        if width < xcount:
            xcount = width
        if height < ycount:
            ycount = height
        xratio = width / xcount
        yratio = height / ycount
        model_width = width
        model_height = height
        box = [0, 0, width, height]
        tracking_points = []
        if action == 'zoomin':
            for j in range(ycount - 1):
                for k in range(xcount - 1):
                    item = []
                    for i in range(model_length - 1):
                        xi = int(k * xratio) + i * speed / (width / 2) * (k * xratio - width / 2)
                        yi = int(j * yratio) + i * speed / (height / 2) * (j * yratio - height / 2)
                        if xi > model_width - 1:
                            xi = model_width - 1
                        if yi > model_height - 1:
                            yi = model_height - 1
                        if xi < 0:
                            xi = 0
                        if yi < 0:
                            yi = 0
                        item.append([xi, yi])
                    tracking_points.append(item)
        elif action == 'zoomout':
            for j in range(ycount - 1):
                for k in range(xcount - 1):
                    item = []
                    for i in range(model_length - 1):
                        xi = int(k * xratio) + i * -speed / (width / 2) * (k * xratio - width / 2)
                        yi = int(j * yratio) + i * -speed / (height / 2) * (j * yratio - height / 2)
                        if xi > model_width - 1:
                            xi = model_width - 1
                        if yi > model_height - 1:
                            yi = model_height - 1
                        if xi < 0:
                            xi = 0
                        if yi < 0:
                            yi = 0
                        item.append([xi, yi])
                    tracking_points.append(item)
        elif action == 'left':
            for j in range(ycount - 1):
                for k in range(xcount - 1):
                    item = []
                    for i in range(model_length - 1):
                        xi = int(k * xratio) + i * -speed
                        yi = int(j * yratio)
                        if xi > model_width - 1:
                            xi = model_width - 1
                        if yi > model_height - 1:
                            yi = model_height - 1
                        if xi < 0:
                            xi = 0
                        if yi < 0:
                            yi = 0
                        item.append([xi, yi])
                    tracking_points.append(item)
        elif action == 'right':
            for j in range(ycount - 1):
                for k in range(xcount - 1):
                    item = []
                    for i in range(model_length - 1):
                        xi = int(k * xratio) + i * speed
                        yi = int(j * yratio)
                        if xi > model_width - 1:
                            xi = model_width - 1
                        if yi > model_height - 1:
                            yi = model_height - 1
                        if xi < 0:
                            xi = 0
                        if yi < 0:
                            yi = 0
                        item.append([xi, yi])
                    tracking_points.append(item)
        elif action == 'up':
            for j in range(ycount - 1):
                for k in range(xcount - 1):
                    item = []
                    for i in range(model_length - 1):
                        xi = int(k * xratio)
                        yi = int(j * yratio) + i * -speed
                        if xi > model_width - 1:
                            xi = model_width - 1
                        if yi > model_height - 1:
                            yi = model_height - 1
                        if xi < 0:
                            xi = 0
                        if yi < 0:
                            yi = 0
                        item.append([xi, yi])
                    tracking_points.append(item)
        elif action == 'down':
            for j in range(ycount - 1):
                for k in range(xcount - 1):
                    item = []
                    for i in range(model_length - 1):
                        xi = int(k * xratio)
                        yi = int(j * yratio) + i * speed
                        if xi > model_width - 1:
                            xi = model_width - 1
                        if yi > model_height - 1:
                            yi = model_height - 1
                        if xi < 0:
                            xi = 0
                        if yi < 0:
                            yi = 0
                        item.append([xi, yi])
                    tracking_points.append(item)
        motion_brush = load_motionbrush_from_tracking_points_without_model(model_length, model_width, model_height, tracking_points)
        return (motion_brush,)
```