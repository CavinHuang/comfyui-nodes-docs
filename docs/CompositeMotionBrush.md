# Documentation
- Class name: CompositeMotionBrush
- Category: DragNUWA
- Output node: False
- Repo Ref: https://github.com/chaojie/ComfyUI-DragNUWA.git

该节点将多个运动层集成到单一的复合层中，应用一种基于预定义模式的混合算法，优先考虑某些运动向量，从而增强整体运动表示。

# Input types
## Required
- model
    - 模型参数定义了运动层的结构基础，决定了输入运动数据的维度和长度，这对节点的运行至关重要。
    - Comfy dtype: DragNUWA
    - Python dtype: DragNUWA
- motion_brush_layer0
    - 该参数代表运动信息的基础层，作为节点混合过程的初始输入，显著影响最终复合运动输出。
    - Comfy dtype: MotionBrush
    - Python dtype: MotionBrush
- motion_brush_layer1
    - 次级运动层，在混合过程中提供额外的运动向量供考虑，通过引入新的运动元素影响最终的复合运动。
    - Comfy dtype: MotionBrush
    - Python dtype: MotionBrush
- mode
    - 该参数决定了节点用于集成运动层的混合策略，默认设置为'override'，这决定了如何在最终输出中优先考虑运动向量。
    - Comfy dtype: CompositeMotionBrushMode
    - Python dtype: CompositeMotionBrushMode

# Output types
- results
    - 输出代表复合运动层，是根据指定模式混合输入运动层的结果，提供了运动的增强表示。
    - Comfy dtype: MotionBrush
    - Python dtype: MotionBrush

# Usage tips
- Infra type: CPU

# Source code
```
class CompositeMotionBrush:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'model': ('DragNUWA',), 'motion_brush_layer0': ('MotionBrush',), 'motion_brush_layer1': ('MotionBrush',), 'mode': (CompositeMotionBrushMode, {'default': 'override'})}}
    RETURN_TYPES = ('MotionBrush',)
    FUNCTION = 'run_inference'
    CATEGORY = 'DragNUWA'

    def run_inference(self, model, motion_brush_layer0, motion_brush_layer1, mode):
        results = motion_brush_layer0
        for i in range(model.model_length):
            for x in range(0, model.width):
                masked = False
                for y in range(0, model.height):
                    premasked = masked
                    masked = False
                    if abs(float(motion_brush_layer1[i][y][x][0])) > 0.0001 or abs(float(motion_brush_layer1[i][y][x][1])) > 0.0001:
                        masked = True
                    elif premasked and y + 1 < model.height:
                        y1max = model.height
                        if y + 50 < y1max:
                            y1max = y + 50
                        for y1 in range(y + 1, y1max):
                            if abs(float(motion_brush_layer1[i][y1][x][0])) > 0.0001 or abs(float(motion_brush_layer1[i][y1][x][1])) > 0.0001:
                                masked = True
                    if masked:
                        results[i][y][x][0] = motion_brush_layer1[i][y][x][0]
                        results[i][y][x][1] = motion_brush_layer1[i][y][x][1]
                    else:
                        results[i][y][x][0] = motion_brush_layer0[i][y][x][0]
                        results[i][y][x][1] = motion_brush_layer0[i][y][x][1]
        return (results,)
```