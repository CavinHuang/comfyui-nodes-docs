# Documentation
- Class name: CompositeMotionBrushWithoutModel
- Category: DragNUWA
- Output node: False
- Repo Ref: https://github.com/chaojie/ComfyUI-DragNUWA.git

该节点整合两层运动信息以产生复合运动刷效果。它基于定义的操作模式，优先考虑某些层的运动数据融合原则。节点的目的是通过对输入层的合理结合，增强运动表示，创造出连贯且视觉上吸引人的效果。

# Input types
## Required
- motion_brush_layer0
    - 第一层运动信息，作为复合效果的基础层。它在建立将与第二层结合进一步细化的运动初始表示中至关重要。
    - Comfy dtype: MotionBrush
    - Python dtype: numpy.ndarray
- motion_brush_layer1
    - 第二层运动信息，提供与基础层混合的额外运动线索。它的重要性在于能够引入新的运动元素并调整整体的复合效果。
    - Comfy dtype: MotionBrush
    - Python dtype: numpy.ndarray
- mode
    - 模式参数决定了两层运动信息如何结合。它在控制最终输出中至关重要，因为它决定了哪些运动元素优先以及它们在复合中如何相互作用。
    - Comfy dtype: CompositeMotionBrushMode
    - Python dtype: CompositeMotionBrushMode

# Output types
- results
    - 输出代表最终的复合运动刷，它是根据指定模式对两个输入层的混合。它封装了集成的运动数据，准备进行进一步的处理或可视化。
    - Comfy dtype: MotionBrush
    - Python dtype: numpy.ndarray

# Usage tips
- Infra type: CPU

# Source code
```
class CompositeMotionBrushWithoutModel:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'motion_brush_layer0': ('MotionBrush',), 'motion_brush_layer1': ('MotionBrush',), 'mode': (CompositeMotionBrushMode, {'default': 'override'})}}
    RETURN_TYPES = ('MotionBrush',)
    FUNCTION = 'run_inference'
    CATEGORY = 'DragNUWA'

    def run_inference(self, motion_brush_layer0, motion_brush_layer1, mode):
        model_length = motion_brush_layer0.shape[0]
        height = motion_brush_layer0.shape[1]
        width = motion_brush_layer0.shape[2]
        results = motion_brush_layer0
        for i in range(model_length):
            xmasked = False
            for x in range(0, width):
                xpremasked = xmasked
                xmasked = False
                masked = False
                for y in range(0, height):
                    premasked = masked
                    masked = False
                    if abs(float(motion_brush_layer1[i][y][x][0])) > 0.0001 or abs(float(motion_brush_layer1[i][y][x][1])) > 0.0001:
                        masked = True
                        xmasked = True
                    elif premasked and y + 1 < height:
                        y1max = height
                        if y + 50 < y1max:
                            y1max = y + 50
                        for y1 in range(y + 1, y1max):
                            if abs(float(motion_brush_layer1[i][y1][x][0])) > 0.0001 or abs(float(motion_brush_layer1[i][y1][x][1])) > 0.0001:
                                masked = True
                                xmasked = True
                    if masked:
                        results[i][y][x][0] = motion_brush_layer1[i][y][x][0]
                        results[i][y][x][1] = motion_brush_layer1[i][y][x][1]
                    else:
                        if xpremasked and x + 1 < width:
                            x1max = width
                            if x + 50 < x1max:
                                x1max = x + 50
                            for x1 in range(x + 1, x1max):
                                if abs(float(motion_brush_layer1[i][y][x1][0])) > 0.0001 or abs(float(motion_brush_layer1[i][y][x1][1])) > 0.0001:
                                    masked = True
                                    xmasked = True
                        if masked:
                            results[i][y][x][0] = motion_brush_layer1[i][y][x][0]
                            results[i][y][x][1] = motion_brush_layer1[i][y][x][1]
                        else:
                            results[i][y][x][0] = motion_brush_layer0[i][y][x][0]
                            results[i][y][x][1] = motion_brush_layer0[i][y][x][1]
        return (results,)
```