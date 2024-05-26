# Documentation
- Class name: InstantObjectMotionBrush
- Category: DragNUWA
- Output node: False
- Repo Ref: https://github.com/chaojie/ComfyUI-DragNUWA.git

InstantObjectMotionBrush旨在为图像或视频中的对象生成运动效果。该节点识别对象的轨迹，并根据指定的参数应用运动刷效果，以创造性或真实感的方式增强运动的视觉表现。

# Input types
## Required
- model_length
    - 模型长度决定了运动效果的持续时间，影响运动轨迹的平滑度和细节。
    - Comfy dtype: INT
    - Python dtype: int
- brush_mask
    - 画笔遮罩对于定义图像中将应用运动效果的兴趣区域至关重要，确保对运动效果的应用进行精确控制。
    - Comfy dtype: MASK
    - Python dtype: numpy.ndarray
- action
    - 动作参数决定了将模拟的运动类型，例如放大、缩小、向左移动、向右移动、向上或向下，这直接影响运动轨迹和运动效果的视觉结果。
    - Comfy dtype: COMBO
    - Python dtype: str
- speed
    - 速度调整运动效果执行的速度，影响运动的强度和真实感。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- motion_brush
    - 输出的运动刷表示计算出的运动轨迹和位移信息，这对于渲染最终的运动效果至关重要。
    - Comfy dtype: MOTIONBRUSH
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class InstantObjectMotionBrush:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'model_length': ('INT', {'default': 14}), 'brush_mask': ('MASK',), 'action': (['left', 'right', 'up', 'down', 'zoomin', 'zoomout'], {'default': 'left'}), 'speed': ('FLOAT', {'default': 5})}}
    RETURN_TYPES = ('MotionBrush',)
    FUNCTION = 'run_inference'
    CATEGORY = 'DragNUWA'

    def run_inference(self, model_length, brush_mask, action, speed):
        model_width = brush_mask.shape[2]
        model_height = brush_mask.shape[1]
        from torchvision.ops import masks_to_boxes
        boxes = masks_to_boxes(brush_mask)
        box = boxes[0].int().tolist()
        print(f'model_width{model_width}model_height{model_height}box{box}')
        xcount = 10
        ycount = 10
        if box[2] - box[0] < xcount:
            xcount = box[2] - box[0]
        if box[3] - box[1] < ycount:
            ycount = box[3] - box[1]
        xratio = (box[2] - box[0]) / xcount
        yratio = (box[3] - box[1]) / ycount
        tracking_points = []
        if action == 'zoomin':
            for j in range(ycount - 1):
                for k in range(xcount - 1):
                    if not bool(brush_mask[0][box[1] + int(j * yratio)][box[0] + int(k * xratio)]):
                        continue
                    item = []
                    for i in range(model_length - 1):
                        width = box[2] - box[0]
                        height = box[3] - box[1]
                        xi = box[0] + int(k * xratio) + i * speed / (width / 2) * (k * xratio - width / 2)
                        yi = box[1] + int(j * yratio) + i * speed / (height / 2) * (j * yratio - height / 2)
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
                    if not bool(brush_mask[0][box[1] + int(j * yratio)][box[0] + int(k * xratio)]):
                        continue
                    item = []
                    for i in range(model_length - 1):
                        width = box[2] - box[0]
                        height = box[3] - box[1]
                        xi = box[0] + int(k * xratio) + i * -speed / (width / 2) * (k * xratio - width / 2)
                        yi = box[1] + int(j * yratio) + i * -speed / (height / 2) * (j * yratio - height / 2)
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
                    if not bool(brush_mask[0][box[1] + int(j * yratio)][box[0] + int(k * xratio)]):
                        continue
                    item = []
                    for i in range(model_length - 1):
                        width = box[2] - box[0]
                        height = box[3] - box[1]
                        xi = box[0] + int(k * xratio) + i * -speed
                        yi = box[1] + int(j * yratio)
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
                    if not bool(brush_mask[0][box[1] + int(j * yratio)][box[0] + int(k * xratio)]):
                        continue
                    item = []
                    for i in range(model_length - 1):
                        width = box[2] - box[0]
                        height = box[3] - box[1]
                        xi = box[0] + int(k * xratio) + i * speed
                        yi = box[1] + int(j * yratio)
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
                    if not bool(brush_mask[0][box[1] + int(j * yratio)][box[0] + int(k * xratio)]):
                        continue
                    item = []
                    for i in range(model_length - 1):
                        width = box[2] - box[0]
                        height = box[3] - box[1]
                        xi = box[0] + int(k * xratio)
                        yi = box[1] + int(j * yratio) + i * -speed
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
                    if not bool(brush_mask[0][box[1] + int(j * yratio)][box[0] + int(k * xratio)]):
                        continue
                    item = []
                    for i in range(model_length - 1):
                        width = box[2] - box[0]
                        height = box[3] - box[1]
                        xi = box[0] + int(k * xratio)
                        yi = box[1] + int(j * yratio) + i * speed
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